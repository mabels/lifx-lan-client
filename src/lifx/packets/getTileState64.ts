import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";
import { isUInt8 } from "../validate";

export namespace GetTileState64 {
  export interface Type {
    readonly tileIndex: number;
    readonly length: number;
    readonly reserved: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 6,

    /**
     * @typedef {Object} GetTileState64
     * @property {Number} tileIndex an 8bit value
     * @property {Number} length an 8bit value
     * @property {Number} reserved an 8bit value
     * @property {Number} x an 8bit value
     * @property {Number} y an 8bit value
     * @property {Number} width an 8bit valu
     */

    /**
     * Converts the given packet specific object into a packet
     * @param  {Type} obj object with configuration data
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream): BufferStream {
      ["tileIndex", "length", "reserved", "x", "y", "width"].forEach(field => {
        isUInt8((obj as any)[field], `getTileState64:${field}`);
      });
      buf.writeUInt8(obj.tileIndex);
      buf.writeUInt8(obj.length);
      buf.writeUInt8(obj.reserved);
      buf.writeUInt8(obj.x);
      buf.writeUInt8(obj.y);
      buf.writeUInt8(obj.width);
      return buf;
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Buffer} buf object with configuration data
     * @return {Type} packet
     */
    toObject: function(buf: BufferStream) {
      return {
        tileIndex: buf.readUInt8(),
        length: buf.readUInt8(),
        reserved: buf.readUInt8(),
        x: buf.readUInt8(),
        y: buf.readUInt8(),
        width: buf.readUInt8()
      };
    }
  });
}
