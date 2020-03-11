import { BufferStream } from "./buffer-stream";
import { isUInt16 } from "../validate";
import { SerdeHandler } from "./serde";

/**
 * @typedef {Object} RGBW
 * @property {Number} rgbw.r - hue value
 * @property {Number} rgbw.g - saturation value
 * @property {Number} rgbw.b - brightness value
 * @property {Number} rgbw.white - kelvin value
 */
export namespace RGBW {
  export interface Type {
    red: number;
    green: number;
    blue: number;
    white: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 8,
    /**
     * Converts the given packet specific object into a packet
     * @param  {BufferStream} buf hsbk as buffer
     * @param  {Number} offset offset to the buffer
     * @return {HSBK} packet
     */
    toObject(buf: BufferStream): Type {
      return {
        red: buf.readUInt16LE(),
        green: buf.readUInt16LE(),
        blue: buf.readUInt16LE(),
        white: buf.readUInt16LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Buffer} buffer output buffer
     * @param  {Number} offset offset in the output buffer
     * @param  {HSBK} hsbk offset in the output buffer
     * @return {BufferStream} packet
     */
    toBuffer(rgbw: Type, buffer: BufferStream, context: string = "RGBW:color") {
      isUInt16(rgbw.red || 0, context);
      isUInt16(rgbw.green || 0, context);
      isUInt16(rgbw.blue || 0, context);
      isUInt16(rgbw.white || 0, context);
      buffer.writeUInt16LE(rgbw.red || 0);
      buffer.writeUInt16LE(rgbw.green || 0);
      buffer.writeUInt16LE(rgbw.blue || 0);
      buffer.writeUInt16LE(rgbw.white || 0);
      return buffer;
    }
  });
}
