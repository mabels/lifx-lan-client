'use strict';

const Packet = {
  size: 1 + 1 + 1 + 1 + 1 + 1
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Number} obj.startIndex start zone index, between 0 and 255
 * @param  {Number} obj.endIndex end zone index, between 0 and 255
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  const buf = new Buffer(this.size);
  buf.fill(0);
  let offset = 0;

  ['tile_index', 'length', 'reserved', 'x', 'y', 'width'].forEach(field => {
    if (typeof obj[field] !== 'number' && obj[field] < 0 || obj[field] > 255) {
     throw new RangeError(`Invalid ${field} value given for setTileState64 LIFX packet, must be a number between 0 and 255`);
   }
  });
  buf.writeUInt8(obj.tile_index, offset);
  offset += 1;
  buf.writeUInt8(obj.length, offset);
  offset += 1;
  buf.writeUInt8(obj.reserved, offset);
  offset += 1;
  buf.writeUInt8(obj.x, offset);
  offset += 1;
  buf.writeUInt8(obj.y, offset);
  offset += 1;
  buf.writeUInt8(obj.width, offset);
  offset += 1;

  return buf;
};

module.exports = Packet;
