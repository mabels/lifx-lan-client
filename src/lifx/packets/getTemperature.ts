import { SerdeHandler } from "./serde";

export namespace GetTemperature {
  export type Type = unknown;
  export const Serde = new SerdeHandler();
}
