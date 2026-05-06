export type CountryProfile = {
  code: string;
  name: string;
  region: string;
  nuclearStatus: "declared" | "undeclared" | "former" | "none";
  militaryBudgetUsdBillions?: number;
  activeMilitaryPersonnel?: number;
  doctrine?: string;
  aircraft: string[];
  missiles: string[];
  naval: string[];
  groundForces: string[];
  bases: string[];
  alliances: string[];
  notableCapabilities: string[];
};

export type TreatyArticle = {
  number: string;
  title?: string;
  content: string;
};

export type TreatyDocument = {
  slug: string;
  title: string;
  shortName?: string;
  category:
    | "un_system"
    | "humanitarian"
    | "arms_control"
    | "alliance"
    | "diplomatic"
    | "law_of_war"
    | "law_of_sea"
    | "space"
    | "other";
  adoptionDate?: string;
  entryIntoForce?: string;
  depositary?: string;
  summary: string;
  fullTextUrl?: string;
  articles: TreatyArticle[];
};

export type SignatoryStatus =
  | "ratified"
  | "signed"
  | "acceded"
  | "withdrew"
  | "non_party";

export type SignatoryRecord = {
  treatySlug: string;
  countryCode: string;
  status: SignatoryStatus;
  date?: string;
};

export type MilitaryBase = {
  slug: string;
  name: string;
  hostCountryCode: string;
  region: string;
  location: string;
  latitude?: number;
  longitude?: number;
  type:
    | "air"
    | "naval"
    | "joint"
    | "army"
    | "missile_defense"
    | "intel"
    | "logistics"
    | "space"
    | "nuclear";
  primaryServiceBranch?: string;
  tenantCountryCodes: string[];
  hostedUnits: string[];
  hostedSystems: string[];
  role: string;
  notes?: string;
};

export type StrategicChokepoint = {
  slug: string;
  name: string;
  region: string;
  type: "strait" | "canal" | "gap" | "passage";
  widthKm?: number;
  annualTraffic?: string;
  bordersCountryCodes: string[];
  controllingPowers: string[];
  alternativeRoutes: string[];
  significance: string;
  historicalIncidents?: string[];
};

export type DefenseIndustry = {
  slug: string;
  name: string;
  countryCode: string;
  headquarters: string;
  ownership: "state-owned" | "publicly-traded" | "private" | "consortium";
  revenueUsdBillions?: number;
  keyProducts: string[];
  majorCustomers: string[];
  notes: string;
};

export type IntelligenceAgency = {
  slug: string;
  name: string;
  countryCode: string;
  type:
    | "external_humint"
    | "internal_security"
    | "sigint"
    | "military_intelligence"
    | "geospatial"
    | "cyber"
    | "consolidated";
  foundedYear?: number;
  estimatedPersonnel?: number;
  headquarters?: string;
  mission: string;
  notableCapabilities: string[];
  notableOperations?: string[];
};

export type SofUnit = {
  slug: string;
  name: string;
  countryCode: string;
  parentService: string;
  type:
    | "tier_1"
    | "tier_2"
    | "ranger"
    | "naval_sof"
    | "airborne_sof"
    | "intelligence_sof"
    | "cyber_sof"
    | "civil_affairs"
    | "psyop"
    | "law_enforcement_sof";
  foundedYear?: number;
  estimatedStrength?: number;
  homeBase?: string;
  role: string;
  notableOperations?: string[];
};

export type SubStateActor = {
  slug: string;
  name: string;
  aliases: string[];
  type:
    | "militant_group"
    | "paramilitary"
    | "proxy_force"
    | "private_military_company"
    | "separatist"
    | "insurgent"
    | "organized_crime"
    | "cyber_actor";
  region: string;
  areaOfOperations: string[];
  foundedYear?: number;
  estimatedStrength?: number;
  primarySponsorCountryCode?: string;
  ideology?: string;
  keyLeaders?: string[];
  arsenal: string[];
  notableOperations?: string[];
  description: string;
};

export type HistoricalIncident = {
  slug: string;
  name: string;
  startDate: string;
  endDate?: string;
  region: string;
  type:
    | "interstate_war"
    | "civil_war"
    | "intervention"
    | "nuclear_crisis"
    | "naval_incident"
    | "air_incident"
    | "covert_op"
    | "terror_incident"
    | "blockade"
    | "annexation";
  primaryParties: string[];
  summary: string;
  keyEvents: string[];
  outcome: string;
  lessons: string[];
};

export type WeaponSystem = {
  slug: string;
  name: string;
  category:
    | "fighter_aircraft"
    | "bomber"
    | "uav"
    | "cruise_missile"
    | "ballistic_missile"
    | "hypersonic"
    | "air_defense"
    | "carrier"
    | "submarine"
    | "destroyer"
    | "tank"
    | "artillery"
    | "anti_ship"
    | "anti_tank"
    | "icbm"
    | "slbm";
  originCountryCode: string;
  yearIntroduced?: number;
  rangeKm?: number;
  speedMach?: number;
  payload?: string;
  operators: string[];
  notableFeatures?: string;
  description: string;
};
