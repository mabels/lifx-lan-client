import { BufferStream } from "./buffer-stream";
import { isUInt16 } from "../validate";
import { SerdeHandler } from "./serde";

export namespace HSBK {
  /**
   * @typedef {Object} HSBK
   * @property {Number} hsbk.hue - hue value
   * @property {Number} hsbk.saturation - saturation value
   * @property {Number} hsbk.brightness - brightness value
   * @property {Number} hsbk.kelvin - kelvin value
   */
  export interface Type {
    readonly hue: number;
    readonly saturation: number;
    readonly brightness: number;
    readonly kelvin: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 8,
    /**
     * Converts the given packet specific object into a packet
     * @param  {BufferStream} buf hsbk as buffer
     * @param  {Number} offset offset to the buffer
     * @return {Type} packet
     */
    toObject(buf: BufferStream): Type {
      return {
        hue: buf.readUInt16LE(),
        saturation: buf.readUInt16LE(),
        brightness: buf.readUInt16LE(),
        kelvin: buf.readUInt16LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Buffer} buffer output buffer
     * @param  {Number} offset offset in the output buffer
     * @param  {Type} hsbk offset in the output buffer
     * @return {BufferStream} packet
     */
    toBuffer(hsbk: Type, buffer: BufferStream, context: string = "HSBK") {
      if (obj.color.kelvin === undefined) {
        obj.color.kelvin = Constants.HSBK_DEFAULT_KELVIN;
      }
      if (
        (typeof obj.color.kelvin !== "number" && obj.color.kelvin < 2500) ||
        obj.color.kelvin > 9000
      ) {
        throw new RangeError(
          "Invalid color kelvin given for setColor LIFX packet, must be a number between 2500 and 9000"
        );
      }
      isUInt16(hsbk.hue, context);
      isUInt16(hsbk.saturation, context);
      isUInt16(hsbk.brightness, context);
      isUInt16(hsbk.kelvin, context);
      buffer.writeUInt16LE(hsbk.hue);
      buffer.writeUInt16LE(hsbk.saturation);
      buffer.writeUInt16LE(hsbk.brightness);
      buffer.writeUInt16LE(hsbk.kelvin);

      return buffer;
    }
  });
}
