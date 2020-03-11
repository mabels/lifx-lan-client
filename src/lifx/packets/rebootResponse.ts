import { SerdeHandler } from "./serde";

export namespace RebootResponse {
  export type Type = unknown;
  export const Serde = new SerdeHandler();
}
