
export interface HighLow {
  readonly low: number;
  readonly high: number;
}

export class BufferStream {
  public offset: number;
  private readonly buf: Buffer;

  public static alloc(size: number) {
    return new BufferStream(Buffer.alloc(size));
  }

  constructor(buf: Buffer, offset = 0) {
    buf.fill(0);
    this.buf = buf;
    this.offset = offset;
  }

  public get length() { return this.buf.length; }
  public get asBuf() { return this.buf; }

  public toString(code: string, length: number) {
    const ret = this.buf.toString(code, this.offset, length);
    this.offset += length;
    return ret.replace(/\0/g, "");
  }

  public write(data: string, length: number, code: string = 'utf-8') {
    this.buf.write(data, this.offset, length);
    this.offset += length;
  }

  public writeFloatLE(val: number) {
    this.buf.writeFloatLE(val, this.offset);
    this.offset += 1;
  }

  public readUInt64LE(): HighLow {
    return {
      low: this.readUInt32LE(),
      high: this.readUInt32LE()
    };
  }
  public writeUInt64LE(val: HighLow) {
    this.writeUInt32LE(val.low);
    this.writeUInt32LE(val.high);
  }

  public readFloatLE() {
    const val = this.buf.readFloatLE(this.offset);
    this.offset += 4;
    return val;
  }

  public readUInt8() {
    const val = this.asBuf.readUInt8(this.offset);
    this.offset += 1;
    return val;
  }

  public writeUInt8(val: number) {
    this.asBuf.writeUInt8(val, this.offset);
    this.offset += 1;
  }

  public readUInt16LE() {
    const val = this.asBuf.readUInt16LE(this.offset);
    this.offset += 2;
    return val;
  }
  public writeUInt16LE(val: number) {
    this.asBuf.writeUInt16LE(val, this.offset);
    this.offset += 2;
  }
  public readUInt32LE() {
    const val = this.asBuf.readUInt32LE(this.offset);
    this.offset += 4;
    return val;
  }
  public writeUInt32LE(val: number) {
    this.asBuf.writeUInt32LE(val, this.offset);
    this.offset += 4;
  }

}
