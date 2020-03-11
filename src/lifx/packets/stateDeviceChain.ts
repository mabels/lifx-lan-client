
import { Tile } from './tile';
import { SerdeHandler } from './serde';
import { isUInt8 } from '../validate';

export namespace StateDeviceChain {
/**
 * @typedef {Object} StateDeviceChain
 * @property {Number} startIndex - UInt8 startIndex
 * @property {Number} totalCount - UInt8 totalCount
 * @property {Tile[]} tileDevices- Array of Tiles
 */
export interface Type {
  readonly startIndex: number;
  readonly totalCount: number;
  readonly tileDevice: Tile.Type[];
}

export const Serde = new SerdeHandler<Type>({
  size: 2 + (Tile.Serde.size * 16),

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {StateDeviceChain}     Information contained in packet
 */
toObject: function(buf) {
  return {
  startIndex: buf.readUInt8(offset),
  totalCount: Math.min(buf.readUInt8(buf.length - 1), 16);
  offset += 1;
  obj.tileDevices = Array(obj.totalCount).fill(undefined).map(() => {
    const ret = Packet.Tile.toObject(buf, offset);
    offset = ret.offset;
    return ret.tile;
  });
  offset += 1;
  return obj;
},

/**
 * Converts packet specific data from a buffer to an object
 * @param  {StateDeviceChain} obj - as Object
 * @return {Buffer} - Buffer of the packet
 */
toBuffer: function(obj) {
  isUInt8(obj.startIndex, 'stateDeviceChain:start_index');

  buf.writeUInt8(obj.startIndex);
  const len = Math.min(obj.tileDevices.length, obj.totalCount || 16);
  buf.writeUInt8(len, Packet.size - 1);
  obj.tileDevices.slice(0, len).reduce((ofs, tile) => {
    return Packet.Tile.toBuffer(buf, ofs, tile).offset;
  }, 1);
  return buf;
}
});

