'use strict';

const Packet = {
  size: 1
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function(buf) {
  const obj = {};
  let offset = 0;

  // Check length
  if (buf.length !== this.size) {
    throw new Error('Invalid length given for getCountZones LIFX packet');
  }

  obj.scan = buf.readUInt8(offset);
  offset += 1;

  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Object} obj.scan scan value
 * @return {Buffer}     packet
 */
Packet.toBuffer = function(obj) {
  const buf = Buffer.alloc(this.size);
  buf.fill(0);
  let offset = 0;

  if (obj.scan === undefined) {
    throw new TypeError('obj.scan value must be given for getCountZones LIFX packet');
  }
  if (typeof obj.scan !== 'boolean') {
    throw new TypeError('Invalid scan value given for getCountZones LIFX packet, must be boolean');
  }

  buf.writeUInt8(obj.scan, offset);
  offset += 1;

  return buf;
};

module.exports = Packet;
