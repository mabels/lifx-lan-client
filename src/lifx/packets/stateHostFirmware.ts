import { SerdeHandler } from "./serde";
import { HighLow } from "./buffer-stream";

export namespace StateHostFirmware {
  export interface Type {
    readonly build: HighLow;
    readonly install: HighLow;
    readonly majorVersion: number;
    readonly minorVersion: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 20,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf) {
      return {
        build: buf.readUInt64LE(),
        install: buf.readUInt64LE(),
        minorVersion: buf.readUInt16LE(),
        majorVersion: buf.readUInt16LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj, buf) {
      utils.writeUInt64LE(buf, obj.build);
      utils.writeUInt64LE(buf, obj.install);
      buf.writeUInt16LE(obj.minorVersion);
      buf.writeUInt16LE(obj.majorVersion);
      return buf;
    }
  });
}
