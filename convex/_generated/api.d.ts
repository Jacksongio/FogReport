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
import type * as simulations from "../simulations.js";
import type * as treaties from "../treaties.js";
import type * as treatiesIngest from "../treatiesIngest.js";

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
  simulations: typeof simulations;
  treaties: typeof treaties;
  treatiesIngest: typeof treatiesIngest;
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
