import { Constants } from "../constants";
import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";

export namespace StateVersion {
  export interface Type {
    readonly vendorId: number;
    readonly vendorName: string;
    readonly productId: number;
    readonly version: number;
  }

  class ComputeVendorName implements Type {
    public readonly vendorName: string;
    constructor(
      public readonly vendorId: number,
      public readonly productId: number,
      public readonly version: number
    ) {
      // const vendor = find(Constants.LIFX_VENDOR_IDS, {id: obj.vendorId});
      // if (vendor !== undefined) {
      this.vendorName = "" + this.vendorId;
    }
  }

  export const Packet = new SerdeHandler<Type>({
    size: 12,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return new ComputeVendorName(
        buf.readUInt32LE(),
        buf.readUInt32LE(),
        buf.readUInt32LE()
      );
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      buf.writeUInt32LE(obj.vendorId);
      buf.writeUInt32LE(obj.productId);
      buf.writeUInt32LE(obj.version);
      return buf;
    }
  });
}
