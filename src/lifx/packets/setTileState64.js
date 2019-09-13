"use strict";

const { constants } = require("../../lifx");

const Packet = {
  size: 1 + 1 + 1 + 1 + 1 + 1 + 4 + 64 * (2 + 2 + 2 + 2),
  HSBK: {
    toBuffer(obj, buf, offset) {
      if ((typeof obj.hue !== "number" && obj.hue < 0) || obj.hue > 65535) {
        throw new RangeError(
          "Invalid color hue given for setColor LIFX packet, must be a number between 0 and 65535"
        );
      }
      buf.writeUInt16LE(obj.hue, offset);
      offset += 2;
    
      if (
        (typeof obj.saturation !== "number" && obj.saturation < 0) ||
        obj.saturation > 65535
      ) {
        throw new RangeError(
          "Invalid color saturation given for setColor LIFX packet, must be a number between 0 and 65535"
        );
      }
      buf.writeUInt16LE(obj.saturation, offset);
      offset += 2;
    
      if (
        (typeof obj.brightness !== "number" && obj.brightness < 0) ||
        obj.brightness > 65535
      ) {
        throw new RangeError(
          "Invalid color brightness given for setColor LIFX packet, must be a number between 0 and 65535"
        );
      }
      buf.writeUInt16LE(obj.brightness, offset);
      offset += 2;
    
      if (obj.kelvin === undefined) {
        obj.kelvin = constants.HSBK_DEFAULT_KELVIN;
      }
      if (
        (typeof obj.kelvin !== "number" && obj.kelvin < 2500) ||
        obj.kelvin > 9000
      ) {
        throw new RangeError(
          "Invalid color kelvin given for setColor LIFX packet, must be a number between 2500 and 9000"
        );
      }
      buf.writeUInt16LE(obj.kelvin, offset);
      offset += 2;   
      return offset;
    }
  }
};

/**
 * Converts packet specific data from a buffer to an object
 * @param  {Buffer} buf Buffer containing only packet specific data no header
 * @return {Object}     Information contained in packet
 */
Packet.toObject = function(buf) {
  throw new Error("toObject is not implemented setTileState64");
};

/**
 * Converts the given packet specific object into a packet
 * @param  {Object} obj object with configuration data
 * @param  {Object} obj.color an objects with colors to set
 * @param  {Number} obj.color.hue between 0 and 65535
 * @param  {Number} obj.color.saturation between 0 and 65535
 * @param  {Number} obj.color.brightness between 0 and 65535
 * @param  {Number} obj.color.kelvin between 2500 and 9000
 * @param  {Number} [obj.duration] transition time in milliseconds
 * @return {Buffer} packet
 */
Packet.toBuffer = function(obj) {
  const buf = new Buffer(this.size);
  buf.fill(0);
  let offset = 0;

  // obj.stream field has unknown function so leave it as 0
  buf.writeUInt8(obj.tile_index, offset);
  offset += 1;
  buf.writeUInt8(obj.length, offset);
  offset += 1;
  buf.writeUInt8(obj.reserved || 0, offset);
  offset += 1;
  buf.writeUInt8(obj.x, offset);
  offset += 1;
  buf.writeUInt8(obj.y, offset);
  offset += 1;
  buf.writeUInt8(obj.width, offset);
  offset += 1;
  buf.writeUInt32LE(obj.duration, offset);
  offset += 4;
  obj.colors.forEach(color => {
    offset = Packet.HSBK.toBuffer(color, buf, offset); 
  });
  return buf;
};

module.exports = Packet;
