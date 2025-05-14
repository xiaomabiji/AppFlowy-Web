# Sync protocol v2

```js
// controller is responsible for binding persistence and web socket connection
// to Yjs events
const controller = new WorkspaceController({
    workspaceId,
    baseWebsocketUrl: 'ws://localhost:8000/ws/v2/',
    authToken
})

const doc = new Y.Doc({
    guid: objectId, // collab UUID as string
    collectionid: workspaceId // workspace UUID as string
})

const awareness = new awareness.Awareness(doc)

// setup necessary callbacks for awareness and doc events
// works on either Awareness or Y.Doc alone
await controller.mount(awareness)

// remove callbacks from Y.Doc|Awareness instance
controller.unmount(awareness)
awareness.destroy() // Yjs method should unmount as well
```