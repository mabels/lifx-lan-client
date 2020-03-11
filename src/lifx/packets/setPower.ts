import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";
import { isUInt16 } from "../validate";

export namespace SetPower {
  export interface Type {
    level: number;
    duration: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 6,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf) {
      return {
        level: buf.readUInt16LE(),
        duration: buf.readUInt32LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {Number} obj.level 0 for off, 65535 for on
     * @param  {Number} [obj.duration] transition time in milliseconds
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      isUInt16(
        obj.level,
        "Invalid level given for setPower LIFX packet, only 0 and 65535 are supported"
      );
      buf.writeUInt16LE(obj.level);
      isUInt16(obj.duration, "Invalid duration given for setPower LIFX packet");
      buf.writeUInt32LE(obj.duration || 0);
      return buf;
    }
  });
}
