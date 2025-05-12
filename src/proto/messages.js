/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const af_proto = $root.af_proto = (() => {

    /**
     * Namespace af_proto.
     * @exports af_proto
     * @namespace
     */
    const af_proto = {};

    af_proto.messages = (function() {

        /**
         * Namespace messages.
         * @memberof af_proto
         * @namespace
         */
        const messages = {};

        messages.Rid = (function() {

            /**
             * Properties of a Rid.
             * @memberof af_proto.messages
             * @interface IRid
             * @property {number|Long|null} [timestamp] Rid timestamp
             * @property {number|null} [counter] Rid counter
             */

            /**
             * Constructs a new Rid.
             * @memberof af_proto.messages
             * @classdesc Rid represents Redis stream message Id, which is a unique identifier
             * in scope of individual Redis stream - here workspace scope - assigned
             * to each update stored in Redis.
             * 
             * Default: "0-0"
             * @implements IRid
             * @constructor
             * @param {af_proto.messages.IRid=} [properties] Properties to set
             */
            function Rid(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Rid timestamp.
             * @member {number|Long} timestamp
             * @memberof af_proto.messages.Rid
             * @instance
             */
            Rid.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Rid counter.
             * @member {number} counter
             * @memberof af_proto.messages.Rid
             * @instance
             */
            Rid.prototype.counter = 0;

            /**
             * Creates a new Rid instance using the specified properties.
             * @function create
             * @memberof af_proto.messages.Rid
             * @static
             * @param {af_proto.messages.IRid=} [properties] Properties to set
             * @returns {af_proto.messages.Rid} Rid instance
             */
            Rid.create = function create(properties) {
                return new Rid(properties);
            };

            /**
             * Encodes the specified Rid message. Does not implicitly {@link af_proto.messages.Rid.verify|verify} messages.
             * @function encode
             * @memberof af_proto.messages.Rid
             * @static
             * @param {af_proto.messages.IRid} message Rid message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Rid.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.timestamp);
                if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.counter);
                return writer;
            };

            /**
             * Encodes the specified Rid message, length delimited. Does not implicitly {@link af_proto.messages.Rid.verify|verify} messages.
             * @function encodeDelimited
             * @memberof af_proto.messages.Rid
             * @static
             * @param {af_proto.messages.IRid} message Rid message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Rid.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Rid message from the specified reader or buffer.
             * @function decode
             * @memberof af_proto.messages.Rid
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {af_proto.messages.Rid} Rid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Rid.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.af_proto.messages.Rid();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.timestamp = reader.fixed64();
                            break;
                        }
                    case 2: {
                            message.counter = reader.uint32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Rid message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof af_proto.messages.Rid
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {af_proto.messages.Rid} Rid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Rid.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Rid message.
             * @function verify
             * @memberof af_proto.messages.Rid
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Rid.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.counter != null && message.hasOwnProperty("counter"))
                    if (!$util.isInteger(message.counter))
                        return "counter: integer expected";
                return null;
            };

            /**
             * Creates a Rid message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof af_proto.messages.Rid
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {af_proto.messages.Rid} Rid
             */
            Rid.fromObject = function fromObject(object) {
                if (object instanceof $root.af_proto.messages.Rid)
                    return object;
                let message = new $root.af_proto.messages.Rid();
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.counter != null)
                    message.counter = object.counter >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Rid message. Also converts values to other types if specified.
             * @function toObject
             * @memberof af_proto.messages.Rid
             * @static
             * @param {af_proto.messages.Rid} message Rid
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Rid.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                    object.counter = 0;
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.counter != null && message.hasOwnProperty("counter"))
                    object.counter = message.counter;
                return object;
            };

            /**
             * Converts this Rid to JSON.
             * @function toJSON
             * @memberof af_proto.messages.Rid
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Rid.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Rid
             * @function getTypeUrl
             * @memberof af_proto.messages.Rid
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Rid.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/af_proto.messages.Rid";
            };

            return Rid;
        })();

        messages.SyncRequest = (function() {

            /**
             * Properties of a SyncRequest.
             * @memberof af_proto.messages
             * @interface ISyncRequest
             * @property {af_proto.messages.IRid|null} [lastMessageId] SyncRequest lastMessageId
             * @property {Uint8Array|null} [stateVector] SyncRequest stateVector
             */

            /**
             * Constructs a new SyncRequest.
             * @memberof af_proto.messages
             * @classdesc SyncRequest message is send by either a server or a client, which informs about the
             * last collab state known to either party.
             * 
             * If other side has more recent data, it should send `Update` message in the response.
             * If other side has missing data, it should send its own `SyncRequest` in the response.
             * @implements ISyncRequest
             * @constructor
             * @param {af_proto.messages.ISyncRequest=} [properties] Properties to set
             */
            function SyncRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SyncRequest lastMessageId.
             * @member {af_proto.messages.IRid|null|undefined} lastMessageId
             * @memberof af_proto.messages.SyncRequest
             * @instance
             */
            SyncRequest.prototype.lastMessageId = null;

            /**
             * SyncRequest stateVector.
             * @member {Uint8Array} stateVector
             * @memberof af_proto.messages.SyncRequest
             * @instance
             */
            SyncRequest.prototype.stateVector = $util.newBuffer([]);

            /**
             * Creates a new SyncRequest instance using the specified properties.
             * @function create
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {af_proto.messages.ISyncRequest=} [properties] Properties to set
             * @returns {af_proto.messages.SyncRequest} SyncRequest instance
             */
            SyncRequest.create = function create(properties) {
                return new SyncRequest(properties);
            };

            /**
             * Encodes the specified SyncRequest message. Does not implicitly {@link af_proto.messages.SyncRequest.verify|verify} messages.
             * @function encode
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {af_proto.messages.ISyncRequest} message SyncRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.lastMessageId != null && Object.hasOwnProperty.call(message, "lastMessageId"))
                    $root.af_proto.messages.Rid.encode(message.lastMessageId, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.stateVector != null && Object.hasOwnProperty.call(message, "stateVector"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.stateVector);
                return writer;
            };

            /**
             * Encodes the specified SyncRequest message, length delimited. Does not implicitly {@link af_proto.messages.SyncRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {af_proto.messages.ISyncRequest} message SyncRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SyncRequest message from the specified reader or buffer.
             * @function decode
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {af_proto.messages.SyncRequest} SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.af_proto.messages.SyncRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.lastMessageId = $root.af_proto.messages.Rid.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.stateVector = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SyncRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {af_proto.messages.SyncRequest} SyncRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SyncRequest message.
             * @function verify
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SyncRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.lastMessageId != null && message.hasOwnProperty("lastMessageId")) {
                    let error = $root.af_proto.messages.Rid.verify(message.lastMessageId);
                    if (error)
                        return "lastMessageId." + error;
                }
                if (message.stateVector != null && message.hasOwnProperty("stateVector"))
                    if (!(message.stateVector && typeof message.stateVector.length === "number" || $util.isString(message.stateVector)))
                        return "stateVector: buffer expected";
                return null;
            };

            /**
             * Creates a SyncRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {af_proto.messages.SyncRequest} SyncRequest
             */
            SyncRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.af_proto.messages.SyncRequest)
                    return object;
                let message = new $root.af_proto.messages.SyncRequest();
                if (object.lastMessageId != null) {
                    if (typeof object.lastMessageId !== "object")
                        throw TypeError(".af_proto.messages.SyncRequest.lastMessageId: object expected");
                    message.lastMessageId = $root.af_proto.messages.Rid.fromObject(object.lastMessageId);
                }
                if (object.stateVector != null)
                    if (typeof object.stateVector === "string")
                        $util.base64.decode(object.stateVector, message.stateVector = $util.newBuffer($util.base64.length(object.stateVector)), 0);
                    else if (object.stateVector.length >= 0)
                        message.stateVector = object.stateVector;
                return message;
            };

            /**
             * Creates a plain object from a SyncRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {af_proto.messages.SyncRequest} message SyncRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SyncRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.lastMessageId = null;
                    if (options.bytes === String)
                        object.stateVector = "";
                    else {
                        object.stateVector = [];
                        if (options.bytes !== Array)
                            object.stateVector = $util.newBuffer(object.stateVector);
                    }
                }
                if (message.lastMessageId != null && message.hasOwnProperty("lastMessageId"))
                    object.lastMessageId = $root.af_proto.messages.Rid.toObject(message.lastMessageId, options);
                if (message.stateVector != null && message.hasOwnProperty("stateVector"))
                    object.stateVector = options.bytes === String ? $util.base64.encode(message.stateVector, 0, message.stateVector.length) : options.bytes === Array ? Array.prototype.slice.call(message.stateVector) : message.stateVector;
                return object;
            };

            /**
             * Converts this SyncRequest to JSON.
             * @function toJSON
             * @memberof af_proto.messages.SyncRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SyncRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SyncRequest
             * @function getTypeUrl
             * @memberof af_proto.messages.SyncRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SyncRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/af_proto.messages.SyncRequest";
            };

            return SyncRequest;
        })();

        messages.Update = (function() {

            /**
             * Properties of an Update.
             * @memberof af_proto.messages
             * @interface IUpdate
             * @property {af_proto.messages.IRid|null} [messageId] Update messageId
             * @property {number|null} [flags] Update flags
             * @property {Uint8Array|null} [payload] Update payload
             */

            /**
             * Constructs a new Update.
             * @memberof af_proto.messages
             * @classdesc Update message is send either in response to `SyncRequest` or independently by
             * the client/server. It contains the Yjs doc update that can represent incremental
             * changes made over corresponding collab, or full document state.
             * @implements IUpdate
             * @constructor
             * @param {af_proto.messages.IUpdate=} [properties] Properties to set
             */
            function Update(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Update messageId.
             * @member {af_proto.messages.IRid|null|undefined} messageId
             * @memberof af_proto.messages.Update
             * @instance
             */
            Update.prototype.messageId = null;

            /**
             * Update flags.
             * @member {number} flags
             * @memberof af_proto.messages.Update
             * @instance
             */
            Update.prototype.flags = 0;

            /**
             * Update payload.
             * @member {Uint8Array} payload
             * @memberof af_proto.messages.Update
             * @instance
             */
            Update.prototype.payload = $util.newBuffer([]);

            /**
             * Creates a new Update instance using the specified properties.
             * @function create
             * @memberof af_proto.messages.Update
             * @static
             * @param {af_proto.messages.IUpdate=} [properties] Properties to set
             * @returns {af_proto.messages.Update} Update instance
             */
            Update.create = function create(properties) {
                return new Update(properties);
            };

            /**
             * Encodes the specified Update message. Does not implicitly {@link af_proto.messages.Update.verify|verify} messages.
             * @function encode
             * @memberof af_proto.messages.Update
             * @static
             * @param {af_proto.messages.IUpdate} message Update message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Update.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                    $root.af_proto.messages.Rid.encode(message.messageId, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.flags);
                if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.payload);
                return writer;
            };

            /**
             * Encodes the specified Update message, length delimited. Does not implicitly {@link af_proto.messages.Update.verify|verify} messages.
             * @function encodeDelimited
             * @memberof af_proto.messages.Update
             * @static
             * @param {af_proto.messages.IUpdate} message Update message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Update.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Update message from the specified reader or buffer.
             * @function decode
             * @memberof af_proto.messages.Update
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {af_proto.messages.Update} Update
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Update.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.af_proto.messages.Update();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.messageId = $root.af_proto.messages.Rid.decode(reader, reader.uint32());
                            break;
                        }
                    case 2: {
                            message.flags = reader.uint32();
                            break;
                        }
                    case 3: {
                            message.payload = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Update message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof af_proto.messages.Update
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {af_proto.messages.Update} Update
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Update.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Update message.
             * @function verify
             * @memberof af_proto.messages.Update
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Update.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.messageId != null && message.hasOwnProperty("messageId")) {
                    let error = $root.af_proto.messages.Rid.verify(message.messageId);
                    if (error)
                        return "messageId." + error;
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                    if (!$util.isInteger(message.flags))
                        return "flags: integer expected";
                if (message.payload != null && message.hasOwnProperty("payload"))
                    if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                        return "payload: buffer expected";
                return null;
            };

            /**
             * Creates an Update message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof af_proto.messages.Update
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {af_proto.messages.Update} Update
             */
            Update.fromObject = function fromObject(object) {
                if (object instanceof $root.af_proto.messages.Update)
                    return object;
                let message = new $root.af_proto.messages.Update();
                if (object.messageId != null) {
                    if (typeof object.messageId !== "object")
                        throw TypeError(".af_proto.messages.Update.messageId: object expected");
                    message.messageId = $root.af_proto.messages.Rid.fromObject(object.messageId);
                }
                if (object.flags != null)
                    message.flags = object.flags >>> 0;
                if (object.payload != null)
                    if (typeof object.payload === "string")
                        $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                    else if (object.payload.length >= 0)
                        message.payload = object.payload;
                return message;
            };

            /**
             * Creates a plain object from an Update message. Also converts values to other types if specified.
             * @function toObject
             * @memberof af_proto.messages.Update
             * @static
             * @param {af_proto.messages.Update} message Update
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Update.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.messageId = null;
                    object.flags = 0;
                    if (options.bytes === String)
                        object.payload = "";
                    else {
                        object.payload = [];
                        if (options.bytes !== Array)
                            object.payload = $util.newBuffer(object.payload);
                    }
                }
                if (message.messageId != null && message.hasOwnProperty("messageId"))
                    object.messageId = $root.af_proto.messages.Rid.toObject(message.messageId, options);
                if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                if (message.payload != null && message.hasOwnProperty("payload"))
                    object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                return object;
            };

            /**
             * Converts this Update to JSON.
             * @function toJSON
             * @memberof af_proto.messages.Update
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Update.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Update
             * @function getTypeUrl
             * @memberof af_proto.messages.Update
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Update.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/af_proto.messages.Update";
            };

            return Update;
        })();

        messages.AwarenessUpdate = (function() {

            /**
             * Properties of an AwarenessUpdate.
             * @memberof af_proto.messages
             * @interface IAwarenessUpdate
             * @property {Uint8Array|null} [payload] AwarenessUpdate payload
             */

            /**
             * Constructs a new AwarenessUpdate.
             * @memberof af_proto.messages
             * @classdesc AwarenessUpdate message is send to inform about the latest changes in the
             * Yjs doc awareness state.
             * @implements IAwarenessUpdate
             * @constructor
             * @param {af_proto.messages.IAwarenessUpdate=} [properties] Properties to set
             */
            function AwarenessUpdate(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AwarenessUpdate payload.
             * @member {Uint8Array} payload
             * @memberof af_proto.messages.AwarenessUpdate
             * @instance
             */
            AwarenessUpdate.prototype.payload = $util.newBuffer([]);

            /**
             * Creates a new AwarenessUpdate instance using the specified properties.
             * @function create
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {af_proto.messages.IAwarenessUpdate=} [properties] Properties to set
             * @returns {af_proto.messages.AwarenessUpdate} AwarenessUpdate instance
             */
            AwarenessUpdate.create = function create(properties) {
                return new AwarenessUpdate(properties);
            };

            /**
             * Encodes the specified AwarenessUpdate message. Does not implicitly {@link af_proto.messages.AwarenessUpdate.verify|verify} messages.
             * @function encode
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {af_proto.messages.IAwarenessUpdate} message AwarenessUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AwarenessUpdate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
                return writer;
            };

            /**
             * Encodes the specified AwarenessUpdate message, length delimited. Does not implicitly {@link af_proto.messages.AwarenessUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {af_proto.messages.IAwarenessUpdate} message AwarenessUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AwarenessUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AwarenessUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {af_proto.messages.AwarenessUpdate} AwarenessUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AwarenessUpdate.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.af_proto.messages.AwarenessUpdate();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.payload = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AwarenessUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {af_proto.messages.AwarenessUpdate} AwarenessUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AwarenessUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AwarenessUpdate message.
             * @function verify
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AwarenessUpdate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.payload != null && message.hasOwnProperty("payload"))
                    if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                        return "payload: buffer expected";
                return null;
            };

            /**
             * Creates an AwarenessUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {af_proto.messages.AwarenessUpdate} AwarenessUpdate
             */
            AwarenessUpdate.fromObject = function fromObject(object) {
                if (object instanceof $root.af_proto.messages.AwarenessUpdate)
                    return object;
                let message = new $root.af_proto.messages.AwarenessUpdate();
                if (object.payload != null)
                    if (typeof object.payload === "string")
                        $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                    else if (object.payload.length >= 0)
                        message.payload = object.payload;
                return message;
            };

            /**
             * Creates a plain object from an AwarenessUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {af_proto.messages.AwarenessUpdate} message AwarenessUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AwarenessUpdate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.payload = "";
                    else {
                        object.payload = [];
                        if (options.bytes !== Array)
                            object.payload = $util.newBuffer(object.payload);
                    }
                if (message.payload != null && message.hasOwnProperty("payload"))
                    object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                return object;
            };

            /**
             * Converts this AwarenessUpdate to JSON.
             * @function toJSON
             * @memberof af_proto.messages.AwarenessUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AwarenessUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AwarenessUpdate
             * @function getTypeUrl
             * @memberof af_proto.messages.AwarenessUpdate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AwarenessUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/af_proto.messages.AwarenessUpdate";
            };

            return AwarenessUpdate;
        })();

        messages.AccessChanged = (function() {

            /**
             * Properties of an AccessChanged.
             * @memberof af_proto.messages
             * @interface IAccessChanged
             * @property {boolean|null} [canRead] AccessChanged canRead
             * @property {boolean|null} [canWrite] AccessChanged canWrite
             * @property {string|null} [reason] AccessChanged reason
             */

            /**
             * Constructs a new AccessChanged.
             * @memberof af_proto.messages
             * @classdesc AccessChanged message is sent only by the server when we recognise, that
             * connected client has lost the access to a corresponding collab.
             * @implements IAccessChanged
             * @constructor
             * @param {af_proto.messages.IAccessChanged=} [properties] Properties to set
             */
            function AccessChanged(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AccessChanged canRead.
             * @member {boolean} canRead
             * @memberof af_proto.messages.AccessChanged
             * @instance
             */
            AccessChanged.prototype.canRead = false;

            /**
             * AccessChanged canWrite.
             * @member {boolean} canWrite
             * @memberof af_proto.messages.AccessChanged
             * @instance
             */
            AccessChanged.prototype.canWrite = false;

            /**
             * AccessChanged reason.
             * @member {string} reason
             * @memberof af_proto.messages.AccessChanged
             * @instance
             */
            AccessChanged.prototype.reason = "";

            /**
             * Creates a new AccessChanged instance using the specified properties.
             * @function create
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {af_proto.messages.IAccessChanged=} [properties] Properties to set
             * @returns {af_proto.messages.AccessChanged} AccessChanged instance
             */
            AccessChanged.create = function create(properties) {
                return new AccessChanged(properties);
            };

            /**
             * Encodes the specified AccessChanged message. Does not implicitly {@link af_proto.messages.AccessChanged.verify|verify} messages.
             * @function encode
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {af_proto.messages.IAccessChanged} message AccessChanged message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessChanged.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.canRead != null && Object.hasOwnProperty.call(message, "canRead"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.canRead);
                if (message.canWrite != null && Object.hasOwnProperty.call(message, "canWrite"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.canWrite);
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.reason);
                return writer;
            };

            /**
             * Encodes the specified AccessChanged message, length delimited. Does not implicitly {@link af_proto.messages.AccessChanged.verify|verify} messages.
             * @function encodeDelimited
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {af_proto.messages.IAccessChanged} message AccessChanged message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessChanged.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AccessChanged message from the specified reader or buffer.
             * @function decode
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {af_proto.messages.AccessChanged} AccessChanged
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessChanged.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.af_proto.messages.AccessChanged();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.canRead = reader.bool();
                            break;
                        }
                    case 2: {
                            message.canWrite = reader.bool();
                            break;
                        }
                    case 3: {
                            message.reason = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AccessChanged message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {af_proto.messages.AccessChanged} AccessChanged
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessChanged.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AccessChanged message.
             * @function verify
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AccessChanged.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.canRead != null && message.hasOwnProperty("canRead"))
                    if (typeof message.canRead !== "boolean")
                        return "canRead: boolean expected";
                if (message.canWrite != null && message.hasOwnProperty("canWrite"))
                    if (typeof message.canWrite !== "boolean")
                        return "canWrite: boolean expected";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                return null;
            };

            /**
             * Creates an AccessChanged message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {af_proto.messages.AccessChanged} AccessChanged
             */
            AccessChanged.fromObject = function fromObject(object) {
                if (object instanceof $root.af_proto.messages.AccessChanged)
                    return object;
                let message = new $root.af_proto.messages.AccessChanged();
                if (object.canRead != null)
                    message.canRead = Boolean(object.canRead);
                if (object.canWrite != null)
                    message.canWrite = Boolean(object.canWrite);
                if (object.reason != null)
                    message.reason = String(object.reason);
                return message;
            };

            /**
             * Creates a plain object from an AccessChanged message. Also converts values to other types if specified.
             * @function toObject
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {af_proto.messages.AccessChanged} message AccessChanged
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AccessChanged.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.canRead = false;
                    object.canWrite = false;
                    object.reason = "";
                }
                if (message.canRead != null && message.hasOwnProperty("canRead"))
                    object.canRead = message.canRead;
                if (message.canWrite != null && message.hasOwnProperty("canWrite"))
                    object.canWrite = message.canWrite;
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                return object;
            };

            /**
             * Converts this AccessChanged to JSON.
             * @function toJSON
             * @memberof af_proto.messages.AccessChanged
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AccessChanged.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for AccessChanged
             * @function getTypeUrl
             * @memberof af_proto.messages.AccessChanged
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            AccessChanged.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/af_proto.messages.AccessChanged";
            };

            return AccessChanged;
        })();

        messages.Message = (function() {

            /**
             * Properties of a Message.
             * @memberof af_proto.messages
             * @interface IMessage
             * @property {string|null} [objectId] Message objectId
             * @property {number|null} [collabType] Message collabType
             * @property {af_proto.messages.ISyncRequest|null} [syncRequest] Message syncRequest
             * @property {af_proto.messages.IUpdate|null} [update] Message update
             * @property {af_proto.messages.IAwarenessUpdate|null} [awarenessUpdate] Message awarenessUpdate
             * @property {af_proto.messages.IAccessChanged|null} [accessChanged] Message accessChanged
             */

            /**
             * Constructs a new Message.
             * @memberof af_proto.messages
             * @classdesc All messages send between client/server are wrapped into a `Message`.
             * @implements IMessage
             * @constructor
             * @param {af_proto.messages.IMessage=} [properties] Properties to set
             */
            function Message(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Message objectId.
             * @member {string} objectId
             * @memberof af_proto.messages.Message
             * @instance
             */
            Message.prototype.objectId = "";

            /**
             * Message collabType.
             * @member {number} collabType
             * @memberof af_proto.messages.Message
             * @instance
             */
            Message.prototype.collabType = 0;

            /**
             * Message syncRequest.
             * @member {af_proto.messages.ISyncRequest|null|undefined} syncRequest
             * @memberof af_proto.messages.Message
             * @instance
             */
            Message.prototype.syncRequest = null;

            /**
             * Message update.
             * @member {af_proto.messages.IUpdate|null|undefined} update
             * @memberof af_proto.messages.Message
             * @instance
             */
            Message.prototype.update = null;

            /**
             * Message awarenessUpdate.
             * @member {af_proto.messages.IAwarenessUpdate|null|undefined} awarenessUpdate
             * @memberof af_proto.messages.Message
             * @instance
             */
            Message.prototype.awarenessUpdate = null;

            /**
             * Message accessChanged.
             * @member {af_proto.messages.IAccessChanged|null|undefined} accessChanged
             * @memberof af_proto.messages.Message
             * @instance
             */
            Message.prototype.accessChanged = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * Message data.
             * @member {"syncRequest"|"update"|"awarenessUpdate"|"accessChanged"|undefined} data
             * @memberof af_proto.messages.Message
             * @instance
             */
            Object.defineProperty(Message.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["syncRequest", "update", "awarenessUpdate", "accessChanged"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Message instance using the specified properties.
             * @function create
             * @memberof af_proto.messages.Message
             * @static
             * @param {af_proto.messages.IMessage=} [properties] Properties to set
             * @returns {af_proto.messages.Message} Message instance
             */
            Message.create = function create(properties) {
                return new Message(properties);
            };

            /**
             * Encodes the specified Message message. Does not implicitly {@link af_proto.messages.Message.verify|verify} messages.
             * @function encode
             * @memberof af_proto.messages.Message
             * @static
             * @param {af_proto.messages.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.objectId != null && Object.hasOwnProperty.call(message, "objectId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.objectId);
                if (message.collabType != null && Object.hasOwnProperty.call(message, "collabType"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.collabType);
                if (message.syncRequest != null && Object.hasOwnProperty.call(message, "syncRequest"))
                    $root.af_proto.messages.SyncRequest.encode(message.syncRequest, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.update != null && Object.hasOwnProperty.call(message, "update"))
                    $root.af_proto.messages.Update.encode(message.update, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.awarenessUpdate != null && Object.hasOwnProperty.call(message, "awarenessUpdate"))
                    $root.af_proto.messages.AwarenessUpdate.encode(message.awarenessUpdate, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.accessChanged != null && Object.hasOwnProperty.call(message, "accessChanged"))
                    $root.af_proto.messages.AccessChanged.encode(message.accessChanged, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Message message, length delimited. Does not implicitly {@link af_proto.messages.Message.verify|verify} messages.
             * @function encodeDelimited
             * @memberof af_proto.messages.Message
             * @static
             * @param {af_proto.messages.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Message message from the specified reader or buffer.
             * @function decode
             * @memberof af_proto.messages.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {af_proto.messages.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.af_proto.messages.Message();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.objectId = reader.string();
                            break;
                        }
                    case 2: {
                            message.collabType = reader.int32();
                            break;
                        }
                    case 3: {
                            message.syncRequest = $root.af_proto.messages.SyncRequest.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            message.update = $root.af_proto.messages.Update.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            message.awarenessUpdate = $root.af_proto.messages.AwarenessUpdate.decode(reader, reader.uint32());
                            break;
                        }
                    case 6: {
                            message.accessChanged = $root.af_proto.messages.AccessChanged.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Message message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof af_proto.messages.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {af_proto.messages.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Message message.
             * @function verify
             * @memberof af_proto.messages.Message
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Message.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                let properties = {};
                if (message.objectId != null && message.hasOwnProperty("objectId"))
                    if (!$util.isString(message.objectId))
                        return "objectId: string expected";
                if (message.collabType != null && message.hasOwnProperty("collabType"))
                    if (!$util.isInteger(message.collabType))
                        return "collabType: integer expected";
                if (message.syncRequest != null && message.hasOwnProperty("syncRequest")) {
                    properties.data = 1;
                    {
                        let error = $root.af_proto.messages.SyncRequest.verify(message.syncRequest);
                        if (error)
                            return "syncRequest." + error;
                    }
                }
                if (message.update != null && message.hasOwnProperty("update")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        let error = $root.af_proto.messages.Update.verify(message.update);
                        if (error)
                            return "update." + error;
                    }
                }
                if (message.awarenessUpdate != null && message.hasOwnProperty("awarenessUpdate")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        let error = $root.af_proto.messages.AwarenessUpdate.verify(message.awarenessUpdate);
                        if (error)
                            return "awarenessUpdate." + error;
                    }
                }
                if (message.accessChanged != null && message.hasOwnProperty("accessChanged")) {
                    if (properties.data === 1)
                        return "data: multiple values";
                    properties.data = 1;
                    {
                        let error = $root.af_proto.messages.AccessChanged.verify(message.accessChanged);
                        if (error)
                            return "accessChanged." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Message message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof af_proto.messages.Message
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {af_proto.messages.Message} Message
             */
            Message.fromObject = function fromObject(object) {
                if (object instanceof $root.af_proto.messages.Message)
                    return object;
                let message = new $root.af_proto.messages.Message();
                if (object.objectId != null)
                    message.objectId = String(object.objectId);
                if (object.collabType != null)
                    message.collabType = object.collabType | 0;
                if (object.syncRequest != null) {
                    if (typeof object.syncRequest !== "object")
                        throw TypeError(".af_proto.messages.Message.syncRequest: object expected");
                    message.syncRequest = $root.af_proto.messages.SyncRequest.fromObject(object.syncRequest);
                }
                if (object.update != null) {
                    if (typeof object.update !== "object")
                        throw TypeError(".af_proto.messages.Message.update: object expected");
                    message.update = $root.af_proto.messages.Update.fromObject(object.update);
                }
                if (object.awarenessUpdate != null) {
                    if (typeof object.awarenessUpdate !== "object")
                        throw TypeError(".af_proto.messages.Message.awarenessUpdate: object expected");
                    message.awarenessUpdate = $root.af_proto.messages.AwarenessUpdate.fromObject(object.awarenessUpdate);
                }
                if (object.accessChanged != null) {
                    if (typeof object.accessChanged !== "object")
                        throw TypeError(".af_proto.messages.Message.accessChanged: object expected");
                    message.accessChanged = $root.af_proto.messages.AccessChanged.fromObject(object.accessChanged);
                }
                return message;
            };

            /**
             * Creates a plain object from a Message message. Also converts values to other types if specified.
             * @function toObject
             * @memberof af_proto.messages.Message
             * @static
             * @param {af_proto.messages.Message} message Message
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Message.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.objectId = "";
                    object.collabType = 0;
                }
                if (message.objectId != null && message.hasOwnProperty("objectId"))
                    object.objectId = message.objectId;
                if (message.collabType != null && message.hasOwnProperty("collabType"))
                    object.collabType = message.collabType;
                if (message.syncRequest != null && message.hasOwnProperty("syncRequest")) {
                    object.syncRequest = $root.af_proto.messages.SyncRequest.toObject(message.syncRequest, options);
                    if (options.oneofs)
                        object.data = "syncRequest";
                }
                if (message.update != null && message.hasOwnProperty("update")) {
                    object.update = $root.af_proto.messages.Update.toObject(message.update, options);
                    if (options.oneofs)
                        object.data = "update";
                }
                if (message.awarenessUpdate != null && message.hasOwnProperty("awarenessUpdate")) {
                    object.awarenessUpdate = $root.af_proto.messages.AwarenessUpdate.toObject(message.awarenessUpdate, options);
                    if (options.oneofs)
                        object.data = "awarenessUpdate";
                }
                if (message.accessChanged != null && message.hasOwnProperty("accessChanged")) {
                    object.accessChanged = $root.af_proto.messages.AccessChanged.toObject(message.accessChanged, options);
                    if (options.oneofs)
                        object.data = "accessChanged";
                }
                return object;
            };

            /**
             * Converts this Message to JSON.
             * @function toJSON
             * @memberof af_proto.messages.Message
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Message.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Message
             * @function getTypeUrl
             * @memberof af_proto.messages.Message
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Message.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/af_proto.messages.Message";
            };

            return Message;
        })();

        return messages;
    })();

    return af_proto;
})();

export { $root as default };
