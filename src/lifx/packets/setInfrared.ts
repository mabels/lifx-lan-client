import { SerdeHandler } from "./serde";
import { isUInt16 } from "../validate";
import { BufferStream } from './buffer-stream';

export namespace SetInfrared {
export interface Type {
  readonly brightness: number;
}

export const Packet = new SerdeHandler<Type>({
  size: 2,

  /**
   * Converts packet specific data from a buffer to an object
   * @param  {Buffer} buf Buffer containing only packet specific data no header
   * @return {Object}     Information contained in packet
   */
  toObject: function(buf) {
    return {
      brightness: buf.readUInt16LE()
    };
  },

  /**
   * Converts the given packet specific object into a packet
   * @param  {Object} obj object with configuration data
   * @param  {Number} obj.brightness between 0 and 65535
   * @return {Buffer} packet
   */
  toBuffer: function(obj: Type, buf: BufferStream) {
    isUInt16(
      obj.brightness,
      "Invalid brightness given for setInfrared LIFX packet, must be a number between 0 and 65535"
    );
    buf.writeUInt16LE(obj.brightness);
    return buf;
  }
});
}
