'use strict';

const {utils} = require('../../lifx');

const Packet = {
  size: 20
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
    throw new Error('Invalid length given for stateWifiFirmware LIFX packet');
  }

  obj.build = utils.readUInt64LE(buf, offset);
  offset += 8;

  obj.install = utils.readUInt64LE(buf, offset);
  offset += 8;

  const version = buf.readUInt32LE(offset);
  obj.majorVersion = (version >> 16) & 0xFF;
  obj.minorVersion = version & 0xFF;
  offset += 4;

  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @return {Buffer}     packet
 */
Packet.toBuffer = function(obj) {
  const buf = Buffer.alloc(this.size);
  buf.fill(0);
  let offset = 0;

  utils.writeUInt64LE(buf, offset, obj.build);
  offset += 8;

  utils.writeUInt64LE(buf, offset, obj.install);
  offset += 8;

  buf.writeUInt32LE(obj.version, offset);
  offset += 4;

  return buf;
};

module.exports = Packet;
