import { HSBK, HSBKPacket } from "./hsbk";
import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";
import { isUInt32, isUInt8 } from "../../lifx";

export namespace SetTileState64 {
  /**
   * @typedef {Object} SetTileState64
   * @property {Number} tileIndex an 8bit value
   * @property {Number} length an 8bit value
   * @property {Number} reserved an 8bit value
   * @property {Number} x an 8bit value
   * @property {Number} y an 8bit value
   * @property {Number} width an 8bit value
   * @property {HSBK[]} colors an array of HSBK values
   */

  export interface Type {
    readonly tileIndex: number;
    readonly length: number;
    readonly reserved: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly colors: HSBK[];
    readonly duration: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 10 + 64 * HSBKPacket.size,
    /**
     * Converts the given packet specific object into a packet
     * @param  {Buffer} buf Buffer of the data
     * @return {Type} packet
     */
    toObject: function(buf: BufferStream) {
      return {
        tileIndex: buf.readUInt8(),
        length: buf.readUInt8(),
        reserved: buf.readUInt8(),
        x: buf.readUInt8(),
        y: buf.readUInt8(),
        width: buf.readUInt8(),
        duration: buf.readUInt32LE(),
        colors: Array(64)
          .fill(undefined)
          .map(() => HSBKPacket.toObject(buf))
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Type} obj object with configuration data
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      isUInt8(obj.reserved, `setTileState64:reserved`);
      ["tileIndex", "length", "x", "y", "width"].forEach(field => {
        isUInt8((obj as any)[field], `setTileState64:${field}`);
      });
      isUInt32(obj.duration || 0, "setTileState64:duration");

      buf.writeUInt8(obj.tileIndex);
      buf.writeUInt8(obj.length);
      buf.writeUInt8(obj.reserved || 0);
      buf.writeUInt8(obj.x);
      buf.writeUInt8(obj.y);
      buf.writeUInt8(obj.width);
      buf.writeUInt32LE(obj.duration || 0);
      obj.colors.forEach(color =>
        HSBKPacket.toBuffer(buf, color, "setTileState64:color")
      );
      return buf;
    }
  });
}
