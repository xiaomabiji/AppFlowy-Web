
import { IndexeddbPersistence } from 'y-indexeddb';
import * as Y from 'yjs';
import * as idb from 'lib0/indexeddb';

export class WorkspaceController {
    docs: Map<string, Y.Doc>;
    ws: WebSocket;
    db: IDBObjectStore
    
    constructor(options: WorkspaceControllerOptions) {
        this.docs = new Map()
        this.ws = new WebSocket(options.baseWebsocketUrl)
    }

    bind(collab: Y.Doc) {
        collab.on('updateV1', this._onUpdate)
    }

    _onUpdate(update: Uint8Array, origin: any|undefined) {

    }
}

export interface WorkspaceControllerOptions {
    workspaceId: string,
    baseWebsocketUrl: string,
}