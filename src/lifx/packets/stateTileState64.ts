import { HSBKPacket, HSBK } from "./hsbk";
import { BufferStream } from "./buffer-stream";
import { SerdeHandler } from "./serde";
import { isUInt8 } from "../validate";

export namespace StateTileState64 {
  export interface Type {
    readonly tileIndex: number;
    readonly reserved: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly colors: HSBK[];
  }

  export const Serde = new SerdeHandler<Type>({
    size: 5 + HSBKPacket.size * 64,

    /**
     * @typedef {Object} StateTileState64
     * @property {Number} tileIndex an 8bit value
     * @property {Number} reserved an 8bit value
     * @property {Number} x an 8bit value
     * @property {Number} y an 8bit value
     * @property {Number} width an 8bit value
     * @property {HSBK[]} colors an array of HSBK values
     */

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Type}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return {
        tileIndex: buf.readUInt8(),
        reserved: buf.readUInt8(),
        x: buf.readUInt8(),
        y: buf.readUInt8(),
        width: buf.readUInt8(),
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
      ["tileIndex", "x", "y", "width"].forEach(field => {
        isUInt8((obj as any)[field], `setTileState64:${field}`);
      });
      buf.writeUInt8(obj.tileIndex);
      buf.writeUInt8(obj.reserved || 0);
      buf.writeUInt8(obj.x);
      buf.writeUInt8(obj.y);
      buf.writeUInt8(obj.width);
      obj.colors.forEach(color =>
        HSBKPacket.toBuffer(buf, color, "setTileState64")
      );
      return buf;
    }
  });
}
