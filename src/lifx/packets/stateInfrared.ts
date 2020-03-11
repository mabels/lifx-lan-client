import { BufferStream } from "./buffer-stream";
import { SerdeHandler } from "./serde";

export namespace StateInfraded {
  export interface Type {
    readonly brightness: number;
  }

  export const Packet = new SerdeHandler<Type>({
    size: 2,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return {
        brightness: buf.readUInt16LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj, buf) {
      buf.writeUInt16LE(obj.brightness);
      return buf;
    }
  });
}
