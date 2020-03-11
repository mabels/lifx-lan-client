import { BufferStream } from './buffer-stream';

export type InnerToBuffer<T> = (obj: T, buf: BufferStream) => BufferStream;
export type InnerToObject<T> = (buf: BufferStream) => T;

export interface SerdeProps<T> {
  readonly size?: number;
  readonly tagged?: boolean;
  readonly toObject?: InnerToObject<T>;
  readonly toBuffer?: InnerToBuffer<T>;
}

export class SerdeHandler<T = {}> {
  public readonly size: number;
  public readonly tagged: boolean;
  private readonly innerToBuffer: InnerToBuffer<T>;
  private readonly innerToObject: InnerToObject<T>;

  public constructor(props: SerdeProps<T> = {}) {
    this.size = props.size || 0;
    this.tagged = !!props.tagged;
    this.innerToBuffer = props.toBuffer || ((_: T, buf: BufferStream) => buf);
    this.innerToObject = props.toObject || ((_: BufferStream) => undefined as unknown as T);
  }

  public toObject(buf: Buffer): T {
    if (buf.length !== this.size) {
      throw new Error("Invalid length given for echoRequest LIFX packet");
    }
    return this.innerToObject(new BufferStream(buf));
  }

  public toBuffer(obj: T): Buffer {
    return this.innerToBuffer(obj, BufferStream.alloc(this.size)).asBuf;
  }
}
