import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";

export namespace StateLabel {
  export interface Type {
    readonly label: string;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 32,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf) {
      return {
        label: buf.toString("utf8", 32)
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {String} obj.label label to set, maximum 32 bytes
     * @return {Buffer}     packet
     */
    toBuffer: function(obj, buf: BufferStream) {
      buf.write(obj.label, 32, "utf8");
      return buf;
    }
  });
}
