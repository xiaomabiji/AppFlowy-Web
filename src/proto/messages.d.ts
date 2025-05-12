import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace af_proto. */
export namespace af_proto {

    /** Namespace messages. */
    namespace messages {

        /** Properties of a Rid. */
        interface IRid {

            /** Rid timestamp */
            timestamp?: (number|Long|null);

            /** Rid counter */
            counter?: (number|null);
        }

        /**
         * Rid represents Redis stream message Id, which is a unique identifier
         * in scope of individual Redis stream - here workspace scope - assigned
         * to each update stored in Redis.
         *
         * Default: "0-0"
         */
        class Rid implements IRid {

            /**
             * Constructs a new Rid.
             * @param [properties] Properties to set
             */
            constructor(properties?: af_proto.messages.IRid);

            /** Rid timestamp. */
            public timestamp: (number|Long);

            /** Rid counter. */
            public counter: number;

            /**
             * Creates a new Rid instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Rid instance
             */
            public static create(properties?: af_proto.messages.IRid): af_proto.messages.Rid;

            /**
             * Encodes the specified Rid message. Does not implicitly {@link af_proto.messages.Rid.verify|verify} messages.
             * @param message Rid message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: af_proto.messages.IRid, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Rid message, length delimited. Does not implicitly {@link af_proto.messages.Rid.verify|verify} messages.
             * @param message Rid message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: af_proto.messages.IRid, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Rid message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Rid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): af_proto.messages.Rid;

            /**
             * Decodes a Rid message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Rid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): af_proto.messages.Rid;

            /**
             * Verifies a Rid message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Rid message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Rid
             */
            public static fromObject(object: { [k: string]: any }): af_proto.messages.Rid;

            /**
             * Creates a plain object from a Rid message. Also converts values to other types if specified.
             * @param message Rid
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: af_proto.messages.Rid, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Rid to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Rid
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SyncRequest. */
        interface ISyncRequest {

            /** SyncRequest lastMessageId */
            lastMessageId?: (af_proto.messages.IRid|null);

            /** SyncRequest stateVector */
            stateVector?: (Uint8Array|null);
        }

        /**
         * SyncRequest message is send by either a server or a client, which informs about the
         * last collab state known to either party.
         *
         * If other side has more recent data, it should send `Update` message in the response.
         * If other side has missing data, it should send its own `SyncRequest` in the response.
         */
        class SyncRequest implements ISyncRequest {

            /**
             * Constructs a new SyncRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: af_proto.messages.ISyncRequest);

            /** SyncRequest lastMessageId. */
            public lastMessageId?: (af_proto.messages.IRid|null);

            /** SyncRequest stateVector. */
            public stateVector: Uint8Array;

            /**
             * Creates a new SyncRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SyncRequest instance
             */
            public static create(properties?: af_proto.messages.ISyncRequest): af_proto.messages.SyncRequest;

            /**
             * Encodes the specified SyncRequest message. Does not implicitly {@link af_proto.messages.SyncRequest.verify|verify} messages.
             * @param message SyncRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: af_proto.messages.ISyncRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SyncRequest message, length delimited. Does not implicitly {@link af_proto.messages.SyncRequest.verify|verify} messages.
             * @param message SyncRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: af_proto.messages.ISyncRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SyncRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): af_proto.messages.SyncRequest;

            /**
             * Decodes a SyncRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): af_proto.messages.SyncRequest;

            /**
             * Verifies a SyncRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SyncRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SyncRequest
             */
            public static fromObject(object: { [k: string]: any }): af_proto.messages.SyncRequest;

            /**
             * Creates a plain object from a SyncRequest message. Also converts values to other types if specified.
             * @param message SyncRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: af_proto.messages.SyncRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SyncRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SyncRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Update. */
        interface IUpdate {

            /** Update messageId */
            messageId?: (af_proto.messages.IRid|null);

            /** Update flags */
            flags?: (number|null);

            /** Update payload */
            payload?: (Uint8Array|null);
        }

        /**
         * Update message is send either in response to `SyncRequest` or independently by
         * the client/server. It contains the Yjs doc update that can represent incremental
         * changes made over corresponding collab, or full document state.
         */
        class Update implements IUpdate {

            /**
             * Constructs a new Update.
             * @param [properties] Properties to set
             */
            constructor(properties?: af_proto.messages.IUpdate);

            /** Update messageId. */
            public messageId?: (af_proto.messages.IRid|null);

            /** Update flags. */
            public flags: number;

            /** Update payload. */
            public payload: Uint8Array;

            /**
             * Creates a new Update instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Update instance
             */
            public static create(properties?: af_proto.messages.IUpdate): af_proto.messages.Update;

            /**
             * Encodes the specified Update message. Does not implicitly {@link af_proto.messages.Update.verify|verify} messages.
             * @param message Update message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: af_proto.messages.IUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Update message, length delimited. Does not implicitly {@link af_proto.messages.Update.verify|verify} messages.
             * @param message Update message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: af_proto.messages.IUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Update message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Update
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): af_proto.messages.Update;

            /**
             * Decodes an Update message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Update
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): af_proto.messages.Update;

            /**
             * Verifies an Update message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Update message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Update
             */
            public static fromObject(object: { [k: string]: any }): af_proto.messages.Update;

            /**
             * Creates a plain object from an Update message. Also converts values to other types if specified.
             * @param message Update
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: af_proto.messages.Update, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Update to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Update
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AwarenessUpdate. */
        interface IAwarenessUpdate {

            /** AwarenessUpdate payload */
            payload?: (Uint8Array|null);
        }

        /**
         * AwarenessUpdate message is send to inform about the latest changes in the
         * Yjs doc awareness state.
         */
        class AwarenessUpdate implements IAwarenessUpdate {

            /**
             * Constructs a new AwarenessUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: af_proto.messages.IAwarenessUpdate);

            /** AwarenessUpdate payload. */
            public payload: Uint8Array;

            /**
             * Creates a new AwarenessUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AwarenessUpdate instance
             */
            public static create(properties?: af_proto.messages.IAwarenessUpdate): af_proto.messages.AwarenessUpdate;

            /**
             * Encodes the specified AwarenessUpdate message. Does not implicitly {@link af_proto.messages.AwarenessUpdate.verify|verify} messages.
             * @param message AwarenessUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: af_proto.messages.IAwarenessUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AwarenessUpdate message, length delimited. Does not implicitly {@link af_proto.messages.AwarenessUpdate.verify|verify} messages.
             * @param message AwarenessUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: af_proto.messages.IAwarenessUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AwarenessUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AwarenessUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): af_proto.messages.AwarenessUpdate;

            /**
             * Decodes an AwarenessUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AwarenessUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): af_proto.messages.AwarenessUpdate;

            /**
             * Verifies an AwarenessUpdate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AwarenessUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AwarenessUpdate
             */
            public static fromObject(object: { [k: string]: any }): af_proto.messages.AwarenessUpdate;

            /**
             * Creates a plain object from an AwarenessUpdate message. Also converts values to other types if specified.
             * @param message AwarenessUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: af_proto.messages.AwarenessUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AwarenessUpdate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AwarenessUpdate
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an AccessChanged. */
        interface IAccessChanged {

            /** AccessChanged canRead */
            canRead?: (boolean|null);

            /** AccessChanged canWrite */
            canWrite?: (boolean|null);

            /** AccessChanged reason */
            reason?: (string|null);
        }

        /**
         * AccessChanged message is sent only by the server when we recognise, that
         * connected client has lost the access to a corresponding collab.
         */
        class AccessChanged implements IAccessChanged {

            /**
             * Constructs a new AccessChanged.
             * @param [properties] Properties to set
             */
            constructor(properties?: af_proto.messages.IAccessChanged);

            /** AccessChanged canRead. */
            public canRead: boolean;

            /** AccessChanged canWrite. */
            public canWrite: boolean;

            /** AccessChanged reason. */
            public reason: string;

            /**
             * Creates a new AccessChanged instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AccessChanged instance
             */
            public static create(properties?: af_proto.messages.IAccessChanged): af_proto.messages.AccessChanged;

            /**
             * Encodes the specified AccessChanged message. Does not implicitly {@link af_proto.messages.AccessChanged.verify|verify} messages.
             * @param message AccessChanged message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: af_proto.messages.IAccessChanged, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AccessChanged message, length delimited. Does not implicitly {@link af_proto.messages.AccessChanged.verify|verify} messages.
             * @param message AccessChanged message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: af_proto.messages.IAccessChanged, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AccessChanged message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AccessChanged
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): af_proto.messages.AccessChanged;

            /**
             * Decodes an AccessChanged message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AccessChanged
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): af_proto.messages.AccessChanged;

            /**
             * Verifies an AccessChanged message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AccessChanged message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AccessChanged
             */
            public static fromObject(object: { [k: string]: any }): af_proto.messages.AccessChanged;

            /**
             * Creates a plain object from an AccessChanged message. Also converts values to other types if specified.
             * @param message AccessChanged
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: af_proto.messages.AccessChanged, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AccessChanged to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for AccessChanged
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Message. */
        interface IMessage {

            /** Message objectId */
            objectId?: (string|null);

            /** Message collabType */
            collabType?: (number|null);

            /** Message syncRequest */
            syncRequest?: (af_proto.messages.ISyncRequest|null);

            /** Message update */
            update?: (af_proto.messages.IUpdate|null);

            /** Message awarenessUpdate */
            awarenessUpdate?: (af_proto.messages.IAwarenessUpdate|null);

            /** Message accessChanged */
            accessChanged?: (af_proto.messages.IAccessChanged|null);
        }

        /** All messages send between client/server are wrapped into a `Message`. */
        class Message implements IMessage {

            /**
             * Constructs a new Message.
             * @param [properties] Properties to set
             */
            constructor(properties?: af_proto.messages.IMessage);

            /** Message objectId. */
            public objectId: string;

            /** Message collabType. */
            public collabType: number;

            /** Message syncRequest. */
            public syncRequest?: (af_proto.messages.ISyncRequest|null);

            /** Message update. */
            public update?: (af_proto.messages.IUpdate|null);

            /** Message awarenessUpdate. */
            public awarenessUpdate?: (af_proto.messages.IAwarenessUpdate|null);

            /** Message accessChanged. */
            public accessChanged?: (af_proto.messages.IAccessChanged|null);

            /** Message data. */
            public data?: ("syncRequest"|"update"|"awarenessUpdate"|"accessChanged");

            /**
             * Creates a new Message instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Message instance
             */
            public static create(properties?: af_proto.messages.IMessage): af_proto.messages.Message;

            /**
             * Encodes the specified Message message. Does not implicitly {@link af_proto.messages.Message.verify|verify} messages.
             * @param message Message message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: af_proto.messages.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Message message, length delimited. Does not implicitly {@link af_proto.messages.Message.verify|verify} messages.
             * @param message Message message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: af_proto.messages.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Message message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): af_proto.messages.Message;

            /**
             * Decodes a Message message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): af_proto.messages.Message;

            /**
             * Verifies a Message message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Message message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Message
             */
            public static fromObject(object: { [k: string]: any }): af_proto.messages.Message;

            /**
             * Creates a plain object from a Message message. Also converts values to other types if specified.
             * @param message Message
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: af_proto.messages.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Message to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Message
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
