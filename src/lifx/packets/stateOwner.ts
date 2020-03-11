import { SerdeHandler } from "./serde";
import { BufferStream, HighLow } from "./buffer-stream";

export namespace StateOwner {
  export interface Type {
    readonly owner: string;
    readonly label: string;
    readonly updatedAt: HighLow;
  }

  export const Serde = new SerdeHandler({
    size: 56,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return {
        owner: buf.toString("hex", 16),
        label: buf.toString("utf8", 32),
        updatedAt: buf.readUInt64LE()
      };
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      buf.write(obj.owner || "", 16, "hex");
      buf.write(obj.label || "", 32, "utf8");
      buf.writeUInt64LE(obj.updatedAt);
      return buf;
    }
  });
}
