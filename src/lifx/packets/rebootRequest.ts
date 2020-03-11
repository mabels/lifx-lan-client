import { SerdeHandler } from "./serde";

export namespace RebootRequest {
  export type Type = unknown;
  export const Serde = new SerdeHandler();
}
