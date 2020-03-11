import { SerdeHandler } from "./serde";
import { HSBK, HSBKPacket } from "./hsbk";
import { BufferStream } from "./buffer-stream";

export namespace SetColor {
  export interface Type {
    readonly stream: number;
    readonly color: HSBK;
    readonly duration: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 13,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream): Type {
      return {
        stream: buf.readUInt8(),
        color: HSBKPacket.toObject(buf),
        duration: buf.readUInt32LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {Object} obj.color an objects with colors to set
     * @param  {Number} obj.color.hue between 0 and 65535
     * @param  {Number} obj.color.saturation between 0 and 65535
     * @param  {Number} obj.color.brightness between 0 and 65535
     * @param  {Number} obj.color.kelvin between 2500 and 9000
     * @param  {Number} [obj.duration] transition time in milliseconds
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      buf.writeUInt8(obj.stream);
      HSBKPacket.toBuffer(buf, obj.color, "setColor:color");
      buf.writeUInt32LE(obj.duration);
      return buf;
    }
  });
}
