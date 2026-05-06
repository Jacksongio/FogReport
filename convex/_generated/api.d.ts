/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as analyses from "../analyses.js";
import type * as auth from "../auth.js";
import type * as briefings from "../briefings.js";
import type * as http from "../http.js";
import type * as seedActions from "../seedActions.js";
import type * as seedData_bases from "../seedData/bases.js";
import type * as seedData_basesA from "../seedData/basesA.js";
import type * as seedData_basesB from "../seedData/basesB.js";
import type * as seedData_basesC from "../seedData/basesC.js";
import type * as seedData_basesD from "../seedData/basesD.js";
import type * as seedData_basesE from "../seedData/basesE.js";
import type * as seedData_basesF from "../seedData/basesF.js";
import type * as seedData_chokepoints from "../seedData/chokepoints.js";
import type * as seedData_countries from "../seedData/countries.js";
import type * as seedData_countriesA from "../seedData/countriesA.js";
import type * as seedData_countriesB from "../seedData/countriesB.js";
import type * as seedData_countriesC from "../seedData/countriesC.js";
import type * as seedData_countriesD from "../seedData/countriesD.js";
import type * as seedData_countriesE from "../seedData/countriesE.js";
import type * as seedData_countriesF from "../seedData/countriesF.js";
import type * as seedData_defenseIndustries from "../seedData/defenseIndustries.js";
import type * as seedData_historicalIncidents from "../seedData/historicalIncidents.js";
import type * as seedData_intelAgencies from "../seedData/intelAgencies.js";
import type * as seedData_signatories from "../seedData/signatories.js";
import type * as seedData_sofUnits from "../seedData/sofUnits.js";
import type * as seedData_subStateActors from "../seedData/subStateActors.js";
import type * as seedData_subStateActorsA from "../seedData/subStateActorsA.js";
import type * as seedData_subStateActorsB from "../seedData/subStateActorsB.js";
import type * as seedData_treaties from "../seedData/treaties.js";
import type * as seedData_treatiesAlliance from "../seedData/treatiesAlliance.js";
import type * as seedData_treatiesArms from "../seedData/treatiesArms.js";
import type * as seedData_treatiesExtras from "../seedData/treatiesExtras.js";
import type * as seedData_treatiesGeneva from "../seedData/treatiesGeneva.js";
import type * as seedData_treatiesOther from "../seedData/treatiesOther.js";
import type * as seedData_treatiesRegional from "../seedData/treatiesRegional.js";
import type * as seedData_treatiesUN from "../seedData/treatiesUN.js";
import type * as seedData_types from "../seedData/types.js";
import type * as seedData_weapons from "../seedData/weapons.js";
import type * as seedData_weaponsA from "../seedData/weaponsA.js";
import type * as seedData_weaponsB from "../seedData/weaponsB.js";
import type * as seedData_weaponsC from "../seedData/weaponsC.js";
import type * as seedMutations from "../seedMutations.js";
import type * as simulations from "../simulations.js";
import type * as treaties from "../treaties.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  analyses: typeof analyses;
  auth: typeof auth;
  briefings: typeof briefings;
  http: typeof http;
  seedActions: typeof seedActions;
  "seedData/bases": typeof seedData_bases;
  "seedData/basesA": typeof seedData_basesA;
  "seedData/basesB": typeof seedData_basesB;
  "seedData/basesC": typeof seedData_basesC;
  "seedData/basesD": typeof seedData_basesD;
  "seedData/basesE": typeof seedData_basesE;
  "seedData/basesF": typeof seedData_basesF;
  "seedData/chokepoints": typeof seedData_chokepoints;
  "seedData/countries": typeof seedData_countries;
  "seedData/countriesA": typeof seedData_countriesA;
  "seedData/countriesB": typeof seedData_countriesB;
  "seedData/countriesC": typeof seedData_countriesC;
  "seedData/countriesD": typeof seedData_countriesD;
  "seedData/countriesE": typeof seedData_countriesE;
  "seedData/countriesF": typeof seedData_countriesF;
  "seedData/defenseIndustries": typeof seedData_defenseIndustries;
  "seedData/historicalIncidents": typeof seedData_historicalIncidents;
  "seedData/intelAgencies": typeof seedData_intelAgencies;
  "seedData/signatories": typeof seedData_signatories;
  "seedData/sofUnits": typeof seedData_sofUnits;
  "seedData/subStateActors": typeof seedData_subStateActors;
  "seedData/subStateActorsA": typeof seedData_subStateActorsA;
  "seedData/subStateActorsB": typeof seedData_subStateActorsB;
  "seedData/treaties": typeof seedData_treaties;
  "seedData/treatiesAlliance": typeof seedData_treatiesAlliance;
  "seedData/treatiesArms": typeof seedData_treatiesArms;
  "seedData/treatiesExtras": typeof seedData_treatiesExtras;
  "seedData/treatiesGeneva": typeof seedData_treatiesGeneva;
  "seedData/treatiesOther": typeof seedData_treatiesOther;
  "seedData/treatiesRegional": typeof seedData_treatiesRegional;
  "seedData/treatiesUN": typeof seedData_treatiesUN;
  "seedData/types": typeof seedData_types;
  "seedData/weapons": typeof seedData_weapons;
  "seedData/weaponsA": typeof seedData_weaponsA;
  "seedData/weaponsB": typeof seedData_weaponsB;
  "seedData/weaponsC": typeof seedData_weaponsC;
  seedMutations: typeof seedMutations;
  simulations: typeof simulations;
  treaties: typeof treaties;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
