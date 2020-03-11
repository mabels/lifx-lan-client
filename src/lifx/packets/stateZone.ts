import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";
import { HSBK, HSBKPacket } from "./hsbk";
import { isUInt8 } from "../validate";

export namespace StateZone {
  export interface Type {
    readonly count: number;
    readonly index: number;
    readonly color: HSBK;
  }

  export const Serde = new SerdeHandler({
    size: 10,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return {
        count: buf.readUInt8(),
        index: buf.readUInt8(),
        color: HSBKPacket.toObject(buf)
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {Number} obj.count between 0 and 255
     * @param  {Number} obj.index between 0 and 255
     * @param  {Object} obj.color an object with colors to set
     * @param  {Number} obj.color.hue between 0 and 65535
     * @param  {Number} obj.color.saturation between 0 and 65535
     * @param  {Number} obj.color.brightness between 0 and 65535
     * @param  {Number} obj.color.kelvin between 2500 and 9000
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      isUInt8(
        obj.count,
        "Invalid count value given for stateZone LIFX packet, must be a number between 0 and 255"
      );
      buf.writeUInt8(obj.count);

      isUInt8(
        obj.index,
        "Invalid index value given for stateZone LIFX packet, must be a number between 0 and 255"
      );
      buf.writeUInt8(obj.index);

      HSBKPacket.toBuffer(
        buf,
        obj.color,
        "Invalid color given for stateZone LIFX packet, must be a number between 0 and 65535"
      );
      return buf;
    }
  });
}
