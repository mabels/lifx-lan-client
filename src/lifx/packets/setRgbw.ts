import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";
import { RGBWPacket, RGBW } from "./rgbw";
import { isUInt16 } from "../validate";

export namespace SetRgbw {
  export interface Type {
    readonly color: RGBW;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 8,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream): Type {
      return {
        color: RGBWPacket.toObject(buf)
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {Object} obj.color an objects with RGBW colors to set
     * @param  {Number} obj.color.red between 0 and 65535
     * @param  {Number} obj.color.green between 0 and 65535
     * @param  {Number} obj.color.blue between 0 and 65535
     * @param  {Number} obj.color.white between 0 and 65535
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      RGBWPacket.toBuffer(buf, obj.color, "SetRgbw.color");
      return buf;
    }
  });
}
