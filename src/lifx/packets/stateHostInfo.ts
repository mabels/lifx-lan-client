import { SerdeHandler } from "./serde";

export namespace StateHostInfo {
  export interface Type {
    readonly signal: number;
    readonly tx: number;
    readonly rx: number;
    readonly mcuTemperature: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 14,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf) {
      return {
        signal: buf.readFloatLE(),
        tx: buf.readUInt32LE(),
        rx: buf.readUInt32LE(),
        mcuTemperature: buf.readUInt16LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj, buf) {
      buf.writeFloatLE(obj.signal);
      buf.writeUInt32LE(obj.tx);
      buf.writeUInt32LE(obj.rx);
      buf.writeUInt16LE(obj.mcuTemperature);
      return buf;
    }
  });
}
