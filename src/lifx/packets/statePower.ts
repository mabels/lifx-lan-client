import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";

export namespace StatePower {
  export interface Type {
    readonly level: number;
  }
  export const Serde = new SerdeHandler({
    size: 2,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return {
        level: buf.readUInt16LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      buf.writeUInt16LE(obj.level);
      return buf;
    }
  });
}
