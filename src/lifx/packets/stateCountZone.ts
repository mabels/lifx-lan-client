import { SerdeHandler } from "./serde";
import { BufferStream, HighLow } from "./buffer-stream";

export namespace StateCountZone {
  export interface Type {
    readonly time: HighLow;
    readonly count: number;
  }

  export const Serde = new SerdeHandler<Type>({
    size: 9,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream): Type {
      return {
        time: buf.readUInt64LE(),
        count: buf.readUInt8()
      };
    }
  });
}
