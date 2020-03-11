import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";

export namespace EchoRequest {
  export interface Type {
    readonly payload: string;
  }

  export const Packet = new SerdeHandler<Type>({
    size: 64,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream): Type {
      return {
        payload: buf.toString("utf8", 64)
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * This packet expects payload field of max. length 64 utf8
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      if (obj.payload.length > 64) {
        throw new Error("Invalid length given for echoRequest LIFX packet");
      }
      buf.write(obj.payload, 64);
      return buf;
    }
  });
}
