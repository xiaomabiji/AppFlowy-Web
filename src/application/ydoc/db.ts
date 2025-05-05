import * as random from 'lib0/random'
import * as idb from 'lib0/indexeddb'
import * as Y from 'yjs'

const log = console.log

export class Db {
    workspaceId: string
    private _db: IDBDatabase|null
    /** string last received Redis stream message ID */
    private _lastMessageId: string
    private _storeTask: any|null
    /** client ID reused between sessions */
    private _clientId: number

    constructor(workspaceId: string) {
        this.workspaceId = workspaceId
        this._db = null
        this._lastMessageId = '0-0'
        this._storeTask = null
        this._clientId = random.uint53()
    }

    get db(): IDBDatabase {
        if (!this._db) {
            throw Error('IndexedDb not initialized')
        }
        return this._db
    }

    get clientId(): number {
        return this._clientId
    }

    get lastMessageId(): string {
        return this._lastMessageId
    }

    set lastMessageId(value: string) {
        let tx = this.db.transaction('meta', 'readwrite')
        let meta = tx.objectStore('meta')
        idb.put(meta, value, 'lastMessageId')
    }

    async open() {
        if (!this._db) {
            this._db = await idb.openDB('appflowy/' + this.workspaceId, db => {
                switch (db.version) {
                    default: {
                        const updates = db.createObjectStore('updates', {autoIncrement: true}) // full document states
                        updates.createIndex('ixDocId', 'docId', {unique: false})
                        db.createObjectStore('docs') // full document states
                        db.createObjectStore('meta') // metadata (e.g. last message ID, client ID)
                    }
                }
            })
            await this.fetchMeta()
        }
    }

    async fetchMeta() {
        const tx = this.db.transaction('meta', 'readwrite')
        const meta = tx.objectStore('meta')
        this._lastMessageId = '' + await idb.get(meta, 'lastMessageId') || '0-0'
        const clientId = +(await idb.get(meta, 'lastMessageId'))
        if (clientId) {
            this._clientId = clientId
        } else {
            await idb.put(meta, this._clientId, 'clientId')
        }
    }

    async close() {
        if (this._db) {
            this._db.close()
            this._db = null
        }
    }

    async destroy() {
        await idb.deleteDB('appflowy/' + this.workspaceId)
    }

    /**
     * Fetches document state from the database.
     *
     * @param {string} docId unique document identifier (e.g. a UUID).
     * @return {Y.Doc}
     */
    collab(docId: string) {
        const doc = new Y.Doc({
            guid: docId,
            collectionid: this.workspaceId,
        })
        doc.clientID = this.clientId
        return this.loadDoc(doc);
    }

    /**
     * @param {Y.Doc} doc
     * @return {Y.Doc}
     */
    async loadDoc(doc: Y.Doc) {
        const db = this.db
        let tx = db.transaction('docs', 'readonly')
        let docs = tx.objectStore('docs')
        let docState: Uint8Array = await idb.get(docs, doc.guid)
        if (docState) {
            log(`[${doc.guid}] last document state: ${docState.length} bytes`)
            Y.applyUpdateV2(doc, docState)
        } else {
            log(`[${doc.guid}] full document state not found`)
        }
        let appliedUpdates = []
        tx = db.transaction('updates', 'readonly')
        let updateIndex = tx.objectStore('updates').index('ixDocId')
        let entries = await idb.getAllKeysValues(updateIndex, doc.guid)
        for (const entry of entries) {
            log(`[${doc.guid}] applying update ${entry.k}`)
            switch (entry.v.flags) {
                case 0: {
                    Y.applyUpdate(doc, entry.v.update)
                    break
                }
                case 1: {
                    Y.applyUpdateV2(doc, entry.v.update)
                    break
                }
            }
            appliedUpdates.push(entry.k)
        }

        if (appliedUpdates.length > 0) {
            log(`[${doc.guid}] compacting ${appliedUpdates.length} applied updates`)
            tx = this.db.transaction('docs', 'readwrite')
            docs = tx.objectStore('docs')
            const docState = Y.encodeStateAsUpdateV2(doc)
            await idb.put(docs, docState, doc.guid)
            tx = this.db.transaction('updates', 'readwrite')
            const updates = tx.objectStore('updates')
            await idb.del(updates, appliedUpdates.length)
        }

        // signup for storing updates to newly loaded doc
        doc.on('update', (update: Uint8Array, lastMessageId: string) => {
            log(`[${doc.guid}] persisting update (${update.length} bytes) from ${lastMessageId || 'local'}`)
            let db = this
            if (db._storeTask) {
                db._storeTask = db._storeTask.then(() => {
                    return db.storeUpdate(doc.guid, update, 0, lastMessageId)
                })
            } else {
                db._storeTask = db.storeUpdate(doc.guid, update, 0, lastMessageId)
            }
        })
        return doc
    }

    /**
     * Persist document update to the database.
     *
     * @param {string} docId unique document identifier (e.g. a UUID).
     * @param {Uint8Array} update Yjs document update.
     * @param {number} flags
     * @param {string|null} lastMessageId last received Redis stream message ID associated with this update. If null
     * this update is considered a local change.
     * @returns {Promise<number>}
     */
    async storeUpdate(docId: string, update: Uint8Array, flags: number, lastMessageId: string) {
        const tx = this.db.transaction(['updates'], 'readwrite')
        const updates = tx.objectStore('updates')
        const id = await idb.addAutoKey(updates, {docId, update, flags, lastMessageId})
        this._lastMessageId = lastMessageId
        this._storeTask = null
        log(`[${docId}] stored update ${id}`)
        return id
    }

    /**
     * Deletes all document-associated data from the database.
     * @param {string} docId
     * @returns {Promise<void>}
     */
    async deleteDoc(docId: string) {
        const tx = this.db.transaction(['docs', 'updates'], 'readwrite')
        const docs = tx.objectStore('docs')
        const updates = tx.objectStore('updates')
        let updateIndex = updates.index('ixDocId')
        let indexKeys = await idb.getAllKeys(updateIndex, docId)
        await idb.del(updates, indexKeys)
        await idb.del(docs, docId)
    }
}