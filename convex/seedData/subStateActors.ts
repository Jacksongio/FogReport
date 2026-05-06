import type { SubStateActor } from "./types";
import { subStateActorsA } from "./subStateActorsA";
import { subStateActorsB } from "./subStateActorsB";

export const SUB_STATE_ACTORS: SubStateActor[] = [
  ...subStateActorsA,
  ...subStateActorsB,
];
