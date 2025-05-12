
import { IndexeddbPersistence } from 'y-indexeddb';
import * as Y from 'yjs';
import * as idb from 'lib0/indexeddb';
import * as awareness from 'y-protocols/awareness';
import { Db } from './db';

export class WorkspaceController {
    docs: Map<string, Y.Doc>;
    ws: WebSocket;
    db: Db
    
    constructor(options: WorkspaceControllerOptions) {
        this.docs = new Map()
        this.ws = new WebSocket(options.baseWebsocketUrl)
        this.db = new Db(options.workspaceId)
    }

    mount(collab: Y.Doc|awareness.Awareness) {
        if (collab instanceof Y.Doc) {
            collab.on('updateV1', this._onUpdate)
        } else if (collab instanceof awareness.Awareness) {
            collab.on('change', this._onAwarenessUpdate)
        }
    }

    _onUpdate(update: Uint8Array, origin: any|undefined) {
        throw new Error('Method not implemented.');
    }

    _onAwarenessUpdate(e: AwarenessEvent, origin: any|undefined) {
        throw new Error('Method not implemented.');
    }
}

interface AwarenessEvent {
    added: number[],
    updated: number[],
    removed: number[],
}

export interface WorkspaceControllerOptions {
    workspaceId: string,
    baseWebsocketUrl: string,
}