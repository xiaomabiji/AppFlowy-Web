import { af_proto } from "@/proto/messages"

export class Ws {
    private _ws: WebSocket|null
    private _onOpen: (event: Event) => void
    private _onMessage: (event: MessageEvent) => void
    private _onError: (event: Event) => void
    private _onClose: (event: CloseEvent) => void

    constructor() {
        this._ws = null
        this._onOpen = () => {}
        this._onMessage = () => {}
        this._onError = () => {}
        this._onClose = () => {}
    }

    send(message: af_proto.messages.IMessage) {
        const bytes = af_proto.messages.Message.encode(message).finish()
        this._ws!.send(bytes)
    }

    onMessage(callback: (event: af_proto.messages.IMessage) => void) {
        this._onMessage = (e: MessageEvent) => {
            if (e.data instanceof ArrayBuffer) {
                const bytes = new Uint8Array(e.data)
                try {
                    const message = af_proto.messages.Message.decode(bytes)
                    callback(message)
                } catch (err) {
                    console.error('Error decoding message:', err)
                    this._onError(e)
                }
            } else {
                this._onError(e)
            }
        }
    }

    onError(callback: (event: Event) => void) {
        this._onError = callback
    }

    onOpen(callback: (event: Event) => void) {
        this._onOpen = callback
    }

    onClose(callback: (event: CloseEvent) => void) {
        this._onClose = callback
    }

    connect(url: string) {
        if (this._ws) {
            this._ws.close()
        }
        const ws = new WebSocket(url)
        ws.binaryType = 'arraybuffer'
        ws.onmessage = this._onMessage
        this._ws = ws
        return new Promise<void>((resolve, reject) => {
            ws.onerror = (e) => {
                this._onError(e) 
                reject(e)
            }
            ws.onopen = (e) => {
                this._onOpen(e) 
                resolve()
            }
            ws.onclose = (e) => {
                this._onClose(e)
                reject(e)
            }
        })
    }

    close() {
        //TODO: close the connection
        if (this._ws) {
            this._ws.close()
            this._ws = null
        }
    }
}