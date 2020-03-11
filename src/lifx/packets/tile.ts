import { BufferStream, HighLow } from "./buffer-stream";
import { SerdeHandler } from "./serde";
import {
  isUInt32,
  isUInt16,
  isUInt64LowHigh,
  isUInt8,
  isFloat
} from "../validate";

export namespace Tile {
  export interface Type {
    readonly accelMeasX: number;
    readonly accelMeasY: number;
    readonly accelMeasZ: number;
    readonly reserved0: number;
    readonly userX: number;
    readonly userY: number;
    readonly width: number;
    readonly height: number;
    readonly reserved1: number;
    readonly deviceVersionVendor: number;
    readonly deviceVersionProduct: number;
    readonly deviceVersionVersion: number;
    readonly firmwareBuild: HighLow;
    readonly reserved2: HighLow;
    readonly firmwareVersionMinor: number;
    readonly firmwareVersionMajor: number;
    readonly reserved3: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 55,

    /**
     * @typedef {Object} Tile
     * @property {Number} - UInt16 accelMeasX
     * @property {Number} - UInt16 accelMeasY
     * @property {Number} - UInt16 accelMeasZ
     * @property {Number} - UInt16 reserved0
     * @property {Number} - Float userX
     * @property {Number} - Float userY
     * @property {Number} - UInt8 width
     * @property {Number} - UInt8 height
     * @property {Number} - UInt8 reserved1
     * @property {Number} - UInt32 deviceVersionVendor
     * @property {Number} - UInt32 deviceVersionProduct
     * @property {Number} - UInt32 deviceVersionVersion
     * @property {UInt64LowHigh} - firmwareBuild
     * @property {UInt64LowHigh} - reserved2
     * @property {Number} - UInt16 firmwareVersionMinor
     * @property {Number} - UInt16 firmwareVersionMajor
     * @property {Number} - UInt32 reserved3
     */

    /**
     * @typedef {Object} OffsetBuffer
     * @property {Number} offset - offset after the buffer
     * @property {Buffer} buffer - buffer
     */

    /**
     * Converts the given packet specific object into a packet
     * @param  {Buffer} buffer output buffer
     * @param  {Number} offset offset in the output buffer
     * @param  {Type} tile offset in the output buffer
     * @return {OffsetBuffer} packet
     */
    toBuffer: function(tile: Type, buffer: BufferStream) {
      tile = Object.assign(
        {
          accelMeasX: 0,
          accelMeasY: 0,
          accelMeasZ: 0,
          reserved0: 0,
          userX: 0,
          userY: 0,
          width: 0,
          height: 0,
          reserved1: 0,
          deviceVersionVendor: 0,
          deviceVersionProduct: 0,
          deviceVersionVersion: 0,
          firmwareBuild: { low: 0, high: 0 },
          reserved2: { low: 0, high: 0 },
          firmwareVersionMinor: 0,
          firmwareVersionMajor: 0,
          reserved3: 0
        },
        tile
      );
      isUInt16(tile.accelMeasX, "Tile:accelMeasX");
      isUInt16(tile.accelMeasY, "Tile:accelMeasY");
      isUInt16(tile.accelMeasZ, "Tile:accelMeasZ");
      isUInt16(tile.reserved0, "Tile:reserved0");
      isFloat(tile.userX, "Tile:userX");
      isFloat(tile.userY, "Tile:userY");
      isUInt8(tile.width, "Tile:width");
      isUInt8(tile.height, "Tile:height");
      isUInt8(tile.reserved1, "Tile:reserved1");
      isUInt32(tile.deviceVersionVendor, "Tile:deviceVersionVendor");
      isUInt32(tile.deviceVersionProduct, "Tile:deviceVersionProduct");
      isUInt32(tile.deviceVersionVersion, "Tile:deviceVersionVersion");
      isUInt64LowHigh(tile.firmwareBuild, "Tile:firmwareBuild");
      isUInt64LowHigh(tile.reserved2, "Tile:reserved2");
      isUInt16(tile.firmwareVersionMinor, "Tile:firmwareVersionMinor");
      isUInt16(tile.firmwareVersionMajor, "Tile:firmwareVersionMajor");
      isUInt32(tile.reserved3, "Tile:reserved3");

      buffer.writeUInt16LE(tile.accelMeasX);
      buffer.writeUInt16LE(tile.accelMeasY);
      buffer.writeUInt16LE(tile.accelMeasZ);
      buffer.writeUInt16LE(tile.reserved0);
      buffer.writeFloatLE(tile.userX);
      buffer.writeFloatLE(tile.userY);
      buffer.writeUInt8(tile.width);
      buffer.writeUInt8(tile.height);
      buffer.writeUInt8(tile.reserved1);
      buffer.writeUInt32LE(tile.deviceVersionVendor);
      buffer.writeUInt32LE(tile.deviceVersionProduct);
      buffer.writeUInt32LE(tile.deviceVersionVersion);
      buffer.writeUInt32LE(tile.firmwareBuild.low);
      buffer.writeUInt32LE(tile.firmwareBuild.high);
      buffer.writeUInt32LE(tile.reserved2.low);
      buffer.writeUInt32LE(tile.reserved2.high);
      buffer.writeUInt16LE(tile.firmwareVersionMinor);
      buffer.writeUInt16LE(tile.firmwareVersionMajor);
      buffer.writeUInt32LE(tile.reserved3);
      return buffer;
    },

    /**
     * @typedef {Object} OffsetTile
     * @property {Number} offset - offset after the buffer
     * @property {Type} tile - Tile value
     */

    /**
     * Converts the given packet specific object into a packet
     * @param  {Buffer} buf tile as buffer
     * @param  {Number} offset offset to the buffer
     * @return {OffsetTile} packet
     */
    toObject: function(buf: BufferStream) {
      return {
        accelMeasX: buf.readUInt16LE(),
        accelMeasY: buf.readUInt16LE(),
        accelMeasZ: buf.readUInt16LE(),
        reserved0: buf.readUInt16LE(),
        userX: buf.readFloatLE(),
        userY: buf.readFloatLE(),
        width: buf.readUInt8(),
        height: buf.readUInt8(),
        reserved1: buf.readUInt8(),
        deviceVersionVendor: buf.readUInt32LE(),
        deviceVersionProduct: buf.readUInt32LE(),
        deviceVersionVersion: buf.readUInt32LE(),
        firmwareBuild: buf.readUInt64LE(),
        reserved2: buf.readUInt64LE(),
        firmwareVersionMinor: buf.readUInt16LE(),
        firmwareVersionMajor: buf.readUInt16LE(),
        reserved3: buf.readUInt32LE()
      };
    }
  });
}
