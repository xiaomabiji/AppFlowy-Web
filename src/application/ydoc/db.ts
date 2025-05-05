import * as random from 'lib0/random'
import * as idb from 'idb'
import * as Y from 'yjs'
import { update } from 'cypress/types/lodash'

const log = console.log

export interface Update {
    /** unique document identifier (e.g. a UUID). */
    docId: string
    /** Yjs Doc update */
    update: Uint8Array
    /** Flags used to inform about details of Yjs serialization */
    flags: number
    /** If not null: unique stream message identifier assigned to an update by the server */
    lastMessageId: string|null
}

export class Db {
    workspaceId: string
    private _db: idb.IDBPDatabase|null
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

    get db(): idb.IDBPDatabase {
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
        meta.put(value, 'lastMessageId')
    }

    async open() {
        if (!this._db) {
            this._db = await idb.openDB('appflowy/' + this.workspaceId, 1, {
                upgrade(db, oldVersion, newVersion, transaction) {
                    switch (oldVersion) {
                        default: {
                            const updates = db.createObjectStore('updates', { keyPath: 'id', autoIncrement: true}) // full document states
                            updates.createIndex('ixDocId', 'docId', {unique: false})
                            db.createObjectStore('docs') // full document states
                            db.createObjectStore('meta') // metadata (e.g. last message ID, client ID)
                        }
                    }
                }
            })
            await this.fetchMeta()
        }
    }

    async fetchMeta() {
        const tx = this.db.transaction('meta', 'readwrite')
        const meta = tx.objectStore('meta')
        this._lastMessageId = '' + await meta.get('lastMessageId') || '0-0'
        const clientId = +(await meta.get('lastMessageId'))
        if (clientId) {
            this._clientId = clientId
        } else {
            await meta.put(this._clientId, 'clientId')
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
        return this.mount(doc);
    }

    /**
     * Mount a Yjs document to the IndexedDB database.
     * 
     * @param {Y.Doc} doc
     * @return {Y.Doc}
     */
    async mount(doc: Y.Doc) {
        const db = this.db
        const readTx = db.transaction(['docs', 'updates'], 'readonly')
        const docs = readTx.objectStore('docs')
        const docState = await docs.get(doc.guid)
        if (docState) {
            log(`[${doc.guid}] last document state: ${docState.length} bytes`)
            Y.applyUpdateV2(doc, docState)
        } else {
            log(`[${doc.guid}] full document state not found`)
        }
        const appliedUpdates = []
        const updates = readTx.objectStore('updates')
        const updateIndex = updates.index('ixDocId')
        
        const keys = await updateIndex.getAllKeys(doc.guid)
        const values = await updateIndex.getAll(keys)
        for (let i = 0; i < values.length; i++) {
            const key = keys[i]
            const value = values[i]
            log(`[${doc.guid}] applying update ${key}`)

            switch (value.flags) {
                case 0: {
                    Y.applyUpdate(doc, value.update)
                    break
                }
                case 1: {
                    Y.applyUpdateV2(doc, value.update)
                    break
                }
            }
            appliedUpdates.push(key)
        }

        // signup for storing updates to newly loaded doc
        doc.on('update', (bytes: Uint8Array, lastMessageId: string) => {
            log(`[${doc.guid}] persisting update (${bytes.length} bytes) from ${lastMessageId || 'local'}`)
            let db = this
            const update: Update = {
                docId: doc.guid,
                update: bytes,
                flags: 0,
                lastMessageId: lastMessageId || null,
            }
            if (db._storeTask) {
                db._storeTask = db._storeTask.then(() => {
                    return db.storeUpdate(update)
                })
            } else {
                db._storeTask = db.storeUpdate(update)
            }
        })

        if (appliedUpdates.length > 0) {
            // there are pending updates which we can merge into the document state
            // and delete from the database
            log(`[${doc.guid}] compacting ${appliedUpdates.length} applied updates`)

            const writeTx = this.db.transaction(['docs', 'updates'], 'readwrite')
            const docs = writeTx.objectStore('docs')
            const docState = Y.encodeStateAsUpdateV2(doc)
            await docs.put(docState, doc.guid)
            const updates = writeTx.objectStore('updates')
            await updates.delete(appliedUpdates)
        }
        return doc
    }

    /**
     * Persist document update to the database.
     *
     * @param {Update} update
     * @returns {Promise<number>}
     */
    async storeUpdate(update: Update): Promise<number> {
        const tx = this.db.transaction(['updates'], 'readwrite')
        const updates = tx.objectStore('updates')
        const id = await updates.put(update)
        if (update.lastMessageId && update.lastMessageId > this.lastMessageId) {
            this.lastMessageId = update.lastMessageId
        }
        this._storeTask = null
        log(`[${update.docId}] stored update ${id}`)
        return +id
    }

    /**
     * Deletes all document-associated data from the database.
     * @param {string} docId
     * @returns {Promise<void>}
     */
    async deleteDoc(docId: string) {
        if (this._storeTask) {
            // if there are pending store tasks, wait for them to finish
            await this._storeTask
            this._storeTask = null
        }
        const tx = this.db.transaction(['docs', 'updates'], 'readwrite')
        const docs = tx.objectStore('docs')
        const updates = tx.objectStore('updates')
        let updateIndex = updates.index('ixDocId')
        let indexKeys = await updateIndex.getAllKeys(docId)
        await updates.delete(indexKeys)
        await docs.delete(docId)
    }
}