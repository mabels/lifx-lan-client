"use strict";

const Packet = {
  size:
    1 +
    16 * (2 + 2 + 2 + 2 + 4 + 4 + 1 + 1 + 1 + 4 + 4 + 4 + 8 + 8 + 2 + 2 + 4) +
    1,
  Tile: {
    toObject: function(buf, offset) {
      const tile = {};
      tile.accel_meas_x = buf.readUInt16LE(offset);
      offset += 2;
      tile.accel_meas_y = buf.readUInt16LE(offset);
      offset += 2;
      tile.accel_meas_z = buf.readUInt16LE(offset);
      offset += 2;
      tile.reserved = buf.readUInt16LE(offset);
      offset += 2;
      tile.user_x = buf.readUInt32LE(offset);
      offset += 4;
      tile.user_y = buf.readUInt32LE(offset);
      offset += 4;
      tile.width = buf.readUInt8(offset);
      offset += 1;
      tile.height = buf.readUInt8(offset);
      offset += 1;
      tile.reserved = buf.readUInt8(offset);
      offset += 1;
      tile.device_version_vendor = buf.readUInt32LE(offset);
      offset += 4;
      tile.device_version_product = buf.readUInt32LE(offset);
      offset += 4;
      tile.device_version_version = buf.readUInt32LE(offset);
      offset += 4;
      tile.firmware_build = {
        low: buf.readUInt32LE(offset),
        high: buf.readUInt32LE(offset+2)
      };
      offset += 8;
      tile.reserved = {
        low: buf.readUInt32LE(offset),
        high: buf.readUInt32LE(offset+2)
      };
      offset += 8;
      tile.firmware_version_minor = buf.readUInt16LE(offset);
      offset += 2;
      tile.firmware_version_major = buf.readUInt16LE(offset);
      offset += 2;
      tile.reserved = buf.readUInt32LE(offset);
      offset += 4;
      return { offset, tile };
    }
  }
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function(buf) {
  if (buf.length !== this.size) {
    throw new Error("Invalid length given for stateLabel LIFX packet");
  }
  let offset = 0;
  const obj = {};
  obj.start_index = buf.readUInt8(offset);
  offset += 1;
  obj.tile_devices = new Array(16).fill(undefined).map((_, idx) => {
    const ret = Packet.Tile.toObject(buf, offset);
    offset = ret.offset;
    return ret.tile;
  });
  obj.total_count = buf.readUInt8(offset);
  offset += 1;
  return obj;
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {String} obj.label label to set, maximum 32 bytes
 * @return {Buffer}     packet
 */
Packet.toBuffer = function(obj) {
  throw new Error('not implemented yet stateDeviceChain toBuffer');
};

module.exports = Packet;
