import type { TreatyDocument } from "./types";
import { treatiesUN } from "./treatiesUN";
import { treatiesGeneva } from "./treatiesGeneva";
import { treatiesArms } from "./treatiesArms";
import { treatiesAlliance } from "./treatiesAlliance";
import { treatiesOther } from "./treatiesOther";
import { treatiesRegional } from "./treatiesRegional";
import { treatiesExtras } from "./treatiesExtras";

export const TREATIES: TreatyDocument[] = [
  ...treatiesUN,
  ...treatiesGeneva,
  ...treatiesArms,
  ...treatiesAlliance,
  ...treatiesOther,
  ...treatiesRegional,
  ...treatiesExtras,
];
