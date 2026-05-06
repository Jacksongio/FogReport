import type { WeaponSystem } from "./types";
import { weaponsA } from "./weaponsA";
import { weaponsB } from "./weaponsB";
import { weaponsC } from "./weaponsC";

export const WEAPONS: WeaponSystem[] = [...weaponsA, ...weaponsB, ...weaponsC];
