import { SerdeHandler } from "./serde";
import { HSBK, HSBKPacket } from "./hsbk";
import { BufferStream } from "./buffer-stream";
import { isUInt8, isUInt16, isUInt32 } from "../validate";
import { Constants } from "../constants";

export namespace SetColorZones {
  export interface Type {
    startIndex: number;
    endIndex: number;
    color: HSBK;
    duration: number;
    apply: Constants.APPLICATION_REQUEST_VALUES;
  }

  export const Serde = new SerdeHandler({
    size: 15,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream): Type {
      return {
        startIndex: buf.readUInt8(),
        endIndex: buf.readUInt8(),
        color: HSBKPacket.toObject(buf),
        duration: buf.readUInt32LE(),
        apply: buf.readUInt8()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @param  {Number} obj.startIndex between 0 and 255
     * @param  {Number} obj.endIndex between 0 and 255
     * @param  {Object} obj.color an object with colors to set
     * @param  {Number} obj.color.hue between 0 and 65535
     * @param  {Number} obj.color.saturation between 0 and 65535
     * @param  {Number} obj.color.brightness between 0 and 65535
     * @param  {Number} obj.color.kelvin between 2500 and 9000
     * @param  {Number} [obj.duration] transition time in milliseconds
     * @param  {Number} obj.apply value 0 (NO_APPLY), 1 (APPLY) or 2 (APPLY_ONLY)
     * @return {Buffer} packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      isUInt8(
        obj.startIndex,
        "Invalid startIndex value given for setColorZones LIFX packet, must be a number between 0 and 255"
      );
      buf.writeUInt8(obj.startIndex);

      isUInt8(
        obj.endIndex,
        "Invalid endIndex value given for setColorZones LIFX packet, must be a number between 0 and 255"
      );
      buf.writeUInt8(obj.endIndex);

      HSBKPacket.toBuffer(
        buf,
        obj.color,
        "Invalid color given for setColorZones LIFX packet, must be a number between 0 and 65535"
      );
      isUInt32(obj.duration, "Invalid duration for setColorZones given");
      // Duration is 0 by default
      buf.writeUInt32LE(obj.duration || 0);

      if ((typeof obj.apply !== "number" && obj.apply < 0) || obj.apply > 2) {
        throw new RangeError(
          "Invalid apply value given for setColorZones LIFX packet, must be a number between 0 and 2"
        );
      }
      buf.writeUInt8(obj.apply);

      return buf;
    }
  });
}
