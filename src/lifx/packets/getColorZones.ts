import { SerdeHandler } from "./serde";
import { BufferStream } from './buffer-stream';
import { isUInt8 } from '../validate';

export interface GetColorZones {
  startIndex: number;
  endIndex: number;
}

export const Packet = new SerdeHandler({
  size: 2,

  /**
   * Converts the given packet specific object into a packet
   * @param  {Object} obj object with configuration data
   * @param  {Number} obj.startIndex start zone index, between 0 and 255
   * @param  {Number} obj.endIndex end zone index, between 0 and 255
   * @return {Buffer} packet
   */
  toBuffer: function(obj: GetColorZones, buf: BufferStream): BufferStream {
    isUInt8(obj.startIndex, "Invalid startIndex value given for setColorZones LIFX packet, must be a number between 0 and 255");
    isUInt8(obj.endIndex, "Invalid endIndex value given for setColorZones LIFX packet, must be a number between 0 and 255");

    buf.writeUInt8(obj.startIndex);
    buf.writeUInt8(obj.endIndex);
    return buf;
  }
});
