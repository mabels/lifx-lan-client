import { SerdeHandler } from "./serde";
import { BufferStream } from "./buffer-stream";

export namespace StateService {
  export interface Type {
    readonly service: number;
    readonly port: number;
    readonly serviceName: string;
  }

  function computedStateService(service: number, port: number) {
    let serviceName = "unknown";
    switch (service) {
      case 1:
        serviceName = "udp";
        break;
      case 2:
      case 3:
      case 4:
        serviceName = "reserved";
        break;
    }
    return {
      service,
      port,
      serviceName
    };
  }

  export const Serde = new SerdeHandler({
    size: 5,

    /**
     * Converts packet specific data from a buffer to an object
     * @param  {Buffer} buf Buffer containing only packet specific data no header
     * @return {Object}     Information contained in packet
     */
    toObject: function(buf: BufferStream) {
      return computedStateService(buf.readUInt8(), buf.readUInt32LE());
    },

    /**
     * Converts the given packet specific object into a packet
     * @param  {Object} obj object with configuration data
     * @return {Buffer}     packet
     */
    toBuffer: function(obj: Type, buf: BufferStream) {
      buf.writeUInt8(obj.service);
      buf.writeUInt32LE(obj.port);
      return buf;
    }
  });
}
