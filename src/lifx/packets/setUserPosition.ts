import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";
import { isFloat, isUInt16, isUInt8 } from "../validate";

export namespace SetUserPosition {
  export interface Type {
    readonly tileIndex: number;
    readonly reserved: number;
    readonly userX: number;
    readonly userY: number;
  }

  export const Serde = new SerdeHandler({
    size: 11,

    /**
     * @typedef {Object} SetUserPosition
     * @property {Number} - UInt8 tileIndex
     * @property {Number} - UInt16 reserved
     * @property {Number} - Float userX
     * @property {Number} - Float userY
     */

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Type}  Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return {
        tileIndex: buf.readUInt8(),
        reserved: buf.readUInt16LE(),
        userX: buf.readFloatLE(),
        userY: buf.readFloatLE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Type} obj object with configuration data
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      isUInt8(obj.tileIndex, "SetUserPosition: tileIndex");
      isUInt16(obj.reserved || 0, "SetUserPosition: reserved");
      isFloat(obj.userX, "SetUserPosition: userX");
      isFloat(obj.userY, "SetUserPosition: userY");
      buf.writeUInt8(obj.tileIndex);
      buf.writeUInt16LE(obj.reserved || 0);
      buf.writeFloatLE(obj.userX);
      buf.writeFloatLE(obj.userY);
      return buf;
    }
  });
}
