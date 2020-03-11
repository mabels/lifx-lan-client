import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";

export namespace StateAmbientLight {
  export interface Type {
    readonly flux: number;
  }

  export const Packet = new SerdeHandler({
    size: 4,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf) {
      return {
        flux: buf.readFloatLE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {Number} obj.flux flux value to set
     * @return {Buffer}     packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      buf.writeFloatLE(obj.flux);
      return buf;
    }
  });
}
