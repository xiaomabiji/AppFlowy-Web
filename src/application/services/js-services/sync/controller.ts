import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import { af_proto } from '@/proto/messages';
import { CollabOrigin, Types } from '@/application/types';
import { Db } from '@/application/services/js-services/sync/db';
import { Ws } from '@/application/services/js-services/sync/ws';

export enum UpdateFlags {
    V1 = 0x00,
    V2 = 0x01,
}

export const parseRid = (rid: string): af_proto.messages.IRid => {
    const ridParts = rid.split('-');
    if (ridParts.length !== 2) {
        throw new Error('Invalid RID format');
    }
    const [timestamp, sequenceNumber] = ridParts;
    return {
        timestamp: +timestamp,
        counter: +sequenceNumber,
    };
}

/**
 * WorkspaceController is responsible for managing the connection to the
 * AppFlowy server and handling the synchronization of Yjs documents, as
 * well as its persistence.
 * It uses a WebSocket connection to send and receive updates and awareness
 * changes.
 */
export class WorkspaceController {
    docs: Map<string, MountContext>;
    ws: Ws;
    db: Db;
    options: WorkspaceControllerOptions;
    
    constructor(options: WorkspaceControllerOptions) {
        this.options = options
        this.docs = new Map()
        this.db = new Db(options.workspaceId)

        this.ws = new Ws()
        this.ws.onMessage((message: af_proto.messages.IMessage) => {
            this._handleMessage(message)
        })
    }

    /**
     * Open the database and connect to the WebSocket server.
     * This method should be called before mounting any documents.
     */
    public async open() {
        await this.db.open()
        await this.ws.connect(this._webSocketUrl())
    }

    public close() {
        this.db.close()
        this.ws.close()
    }

    /**
     * Mount a Yjs document and its awareness object to the controller. 
     * It will register event listeners for updates and awareness changes 
     * to be send to the server and store the document state changes in 
     * the persistent storage.
     * 
     * It will apply the latest updates from the server and the persistent
     * storage to the document.
     * 
     * If will also send a sync request to the server to get the current 
     * state of the document known to the server.
     * 
     * @param context - The context object contains the Yjs document 
     * and awareness instance to be mounted.
     * @returns Promise completing with `true` if the document was 
     * successfully mounted, `false` if it was already mounted.
     */
    public async mount(context: MountContext): Promise<boolean> {
        if (context.doc === undefined && context.awareness === undefined) {
            throw new Error('Either doc or awareness must be provided')
        }
        context.doc = context.doc || context.awareness?.doc!
        const { doc, awareness, collabType } = context

        if (this.docs.has(doc.guid)) {
            return false // already mounted
        }

        await this.db.mount(doc)
        doc.on('update', (update: Uint8Array, origin: CollabOrigin) => {
            if (origin === CollabOrigin.Local) {
                this._onUpdate(doc, collabType, update)
            }
        })
        doc.on('destroy', () => {
            this.docs.delete(doc.guid)
        })
        if (awareness) {
            awareness.on('change', (e: AwarenessEvent, _origin: CollabOrigin) => {
                this._onAwarenessChange(awareness, e)
            })
        }
        this.ws.send({
            objectId: doc.guid,
            collabType,
            syncRequest: {
                stateVector: Y.encodeStateVector(doc),
                lastMessageId: parseRid(this.db.lastMessageId),
            }
        })
        this.docs.set(doc.guid, context)

        return true
    }

    private _onUpdate(doc: Y.Doc, collabType: number, update: Uint8Array) {
        this.ws.send({
            objectId: doc.guid,
            collabType: collabType,
            update: {
                payload: update,
                flags: UpdateFlags.V1,
            }
        })
    }

    private _onAwarenessChange(a: awarenessProtocol.Awareness, { added, updated, removed }: AwarenessEvent) {
        const payload = awarenessProtocol.encodeAwarenessUpdate(a, added.concat(updated).concat(removed))
        this.ws.send({
            awarenessUpdate: {
                payload
            }
        })
    }

    private async _handleMessage(message: af_proto.messages.IMessage) {
        const objectId = message.objectId!
        const collabType = message.collabType!
        if (message.update) {
            const messageId = message.update.messageId!;
            const payload = message.update.payload!;
            const flags = message.update.flags!;
            const context = this.docs.get(objectId)
            if (context) {
                const doc = context.doc!
                if (flags === UpdateFlags.V1) {
                    Y.applyUpdate(doc, payload, CollabOrigin.Remote)
                } else if (flags === UpdateFlags.V2) {
                    Y.applyUpdateV2(doc, payload, CollabOrigin.Remote)
                }
            } else {
                // If the document is not mounted, we need to store the update
                // in the persistent store for later application.
                this.db.storeUpdate({
                    docId: objectId,
                    lastMessageId: origin,
                    update: payload,
                    flags,
                })
            }
        }
        
        if (message.awarenessUpdate) {
            const payload = message.awarenessUpdate.payload!;
            const context = this.docs.get(objectId)
            if (context?.awareness) {
                awarenessProtocol.applyAwarenessUpdate(context.awareness, payload, CollabOrigin.Remote)
            }
        }
        
        if (message.syncRequest) {
            const context = this.docs.get(objectId)
            let doc = context?.doc
            if (!doc) {
                doc = await this.db.collab(objectId)
            } 
            const update = Y.encodeStateAsUpdateV2(doc!)
            this.ws.send({
                objectId,
                collabType,
                update: {
                    payload: update,
                    flags: UpdateFlags.V2,
                }
            })
        }
        
        if (message.accessChanged) {
            const { canRead, canWrite, reason } = message.accessChanged
            if (!canRead && !canWrite) {
                console.warn(`Access denied for object ${objectId}: ${reason}`)
            }
        }
    }

    private _webSocketUrl(): string {
        const options = this.options
        let url = options.baseWebsocketUrl
        if (!url.endsWith('/')) {
            url += '/'
        }
        url += options.workspaceId
        url += '&uid=' + options.uid
        url += '&deviceId=' + options.deviceId
        url += '&clientId=' + this.db.clientId
        url += '&token=' + options.authToken
        return url
    }
}

interface AwarenessEvent {
    added: number[],
    updated: number[],
    removed: number[],
}

interface MountContext {
    doc?: Y.Doc,
    awareness?: awarenessProtocol.Awareness,
    collabType: Types
}

export interface WorkspaceControllerOptions {
    workspaceId: string,
    baseWebsocketUrl: string,
    authToken: string,
    uid: string,
    deviceId: string,
}