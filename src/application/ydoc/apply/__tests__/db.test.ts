import { YjsEditorKey } from '@/application/types';
import { applyYDoc } from '@/application/ydoc/apply';
import * as Y from 'yjs';
import { Db } from '../../db';

describe('IndexedDB', () => {
  it('should consistently read client ID', async () => {
    const workspaceId = 'test_client_id';
    let expectedClientId;

    const db = new Db(workspaceId);
    try {
      await db.open();
      expectedClientId = db.clientId;
      await db.close();
    } finally {
      await db.destroy
    }

    const db2 = new Db(workspaceId);
    try {
      await db2.open();
      const clientId = db2.clientId;
      expect(clientId).equal(expectedClientId);
    } finally {
      await db2.destroy();
    }
  });
  
  it('should persist collab data', async () => {
    const workspaceId = 'persist_collab_data';
    const guid = 'test-guid';
    const db = new Db(workspaceId);
    try {
      await db.open();

      // init document state in the database
      {
        const ydoc = new Y.Doc({guid});
        await db.mount(ydoc)
        const ytext = ydoc.getText('text');
        for (let c of 'hello') {
          ytext.insert(ytext.length, c);
        }
        ydoc.destroy();
      }

      // try to read the document state
      {
        const ydoc = new Y.Doc({guid});
        await db.mount(ydoc)
        const ytext = ydoc.getText('text');
        expect(ytext.toString()).equal('hello');
        ydoc.destroy();
      }

      // delete the document state
      await db.deleteDoc(guid)
      {
        const ydoc = new Y.Doc({guid});
        await db.mount(ydoc)
        const ytext = ydoc.getText('text');
        expect(ytext.toString()).equal('');
        ydoc.destroy();
      }
    
    } finally {
      await db.destroy();
    }
  });
});

export {};
