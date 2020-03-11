import { SerdeHandler } from "./serde";
import { BufferStream } from './buffer-stream';
import { isBoolean } from '../validate';

export interface GetCountZone {
  readonly scan: number;
}
export const Packet = new SerdeHandler<GetCountZone>({
  size: 1,

  /**
   * Converts packet specific data from a buffer to an object
   * @param  {BufferStream} buf Buffer containing only packet specific data no header
   * @return {GetCountZone}     Information contained in packet
   */
  toObject: function(buf): GetCountZone {
    return {
      scan: buf.readUInt8()
    }
  },

  /**
   * Converts the given packet specific object into a packet
   * @param  {Object} obj object with configuration data
   * @param  {Object} obj.scan scan value
   * @return {Buffer}     packet
   */
  toBuffer: function(obj: GetCountZone, buf: BufferStream): BufferStream {
    isBoolean(obj.scan,
        "Invalid scan value given for getCountZones LIFX packet, must be boolean");
    buf.writeUInt8(obj.scan);
    return buf;
  }
});
