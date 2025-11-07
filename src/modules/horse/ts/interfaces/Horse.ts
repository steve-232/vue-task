import type { HorseName, HorseColor } from "../types";

export interface Horse {
  id: number;
  name: HorseName;
  condition: number;
  color: HorseColor;
}
