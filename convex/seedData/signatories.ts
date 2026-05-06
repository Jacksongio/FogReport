import type { SignatoryRecord, SignatoryStatus } from "./types";

// All country codes covered in countriesA-E
const ALL = [
  "US", "CN", "RU", "GB", "FR", "DE", "JP", "IN", "IL", "KR",
  "AU", "IT", "ES", "NL", "TR", "PL", "CA", "BR", "SA", "PK",
  "IR", "KP", "EG", "UA", "TW", "ID", "VN", "TH", "MX", "ZA",
  "SE", "NO", "FI", "DK", "BE", "GR", "AR", "SG", "AE", "QA",
  "NZ", "CH", "AT", "CZ", "HU", "RO", "PT", "IE", "MY", "PH",
];

// Countries that are UN members (TW is not represented in the UN)
const UN_MEMBERS = ALL.filter((c) => c !== "TW");

// NATO members among our 50
const NATO = [
  "US", "GB", "FR", "DE", "IT", "ES", "NL", "TR", "PL", "CA",
  "BE", "GR", "NO", "DK", "CZ", "HU", "RO", "PT", "SE", "FI",
];

// EU members among our 50
const EU = [
  "FR", "DE", "IT", "ES", "NL", "PL", "BE", "GR", "DK", "CZ",
  "HU", "RO", "PT", "IE", "AT", "SE", "FI",
];

// CSTO active membership (Armenia frozen, not in our 50)
const CSTO = ["RU"]; // BY, KZ, KG, TJ not in our 50

// FPDA participants
const FPDA = ["GB", "AU", "NZ", "MY", "SG"];

// ANZUS
const ANZUS = ["US", "AU", "NZ"];

// Rio Treaty (TIAR) — current parties among our 50
const RIO = ["US", "BR", "AR", "MX"]; // MX denounced 2002 but kept for reference; treat as withdrew

// Recognized nuclear-weapon states under NPT (US, RU, GB, FR, CN)
const NPT_NWS = ["US", "RU", "GB", "FR", "CN"];

// NPT non-parties (never joined or withdrew)
const NPT_NON_PARTIES = ["IN", "PK", "IL", "KP"]; // KP withdrew 2003

// CTBT signed-but-not-ratified or non-parties (Annex 2 holdouts among our 50)
const CTBT_NON_PARTIES = ["US", "CN", "IN", "PK", "KP", "IL", "IR", "EG"];

// TPNW parties among our 50 (very few major states)
const TPNW_PARTIES = ["IE", "AT", "MX", "ZA", "NZ", "TH", "PH"];

// CWC near-universal; non-parties globally are very few. Among our 50: KP and IL, EG (signed not ratified)
const CWC_NON_PARTIES = ["KP", "IL", "EG"];

// BWC: most parties; among our 50, IL and EG not parties
const BWC_NON_PARTIES = ["IL", "EG"];

// Ottawa (Mine Ban) major non-parties among our 50
const OTTAWA_NON_PARTIES = [
  "US", "RU", "CN", "IN", "PK", "IR", "IL", "KR", "EG", "SA",
  "AE", "QA", "VN", "MY", "SG", "KP",
];

// CCM (Cluster Munitions) major non-parties among our 50
const CCM_NON_PARTIES = [
  "US", "RU", "CN", "IN", "PK", "IL", "KR", "BR", "AR", "EG",
  "SA", "AE", "QA", "TR", "VN", "TH", "MY", "SG", "KP", "IR",
  "ZA", "FI",
];

// ATT non-parties or unsigned (US unsigned 2019)
const ATT_NON_PARTIES = ["US", "RU", "CN", "IR", "IN", "PK", "KP", "EG", "SA"];

// CCW: most major; KP not party
const CCW_NON_PARTIES = ["KP", "EG", "VN", "TH", "MY", "ID"];

// Rome Statute (ICC) major non-parties among our 50
const ROME_NON_PARTIES = [
  "US", "RU", "CN", "IN", "IL", "KP", "IR", "EG", "TR", "PK",
  "SA", "AE", "QA", "VN", "TH", "MY", "ID", "PH",
];

// Genocide Convention: near-universal among UN members
const GENOCIDE_NON_PARTIES: string[] = []; // assume all UN members in our 50

// Refugee Convention non-parties / non-1967 among our 50
const REFUGEE_NON_PARTIES = ["IN", "PK", "TH", "MY", "ID", "SA", "AE", "QA"];

// VCDR & VCLT: near universal among UN members; US has not ratified VCLT but treats as customary
const VCLT_NON_PARTIES = ["US", "FR"]; // both treat as customary law

// UNCLOS major non-parties — US has not ratified
const UNCLOS_NON_PARTIES = ["US", "TR", "VN", "IR"]; // signed-not-ratified or non-party variations

// Outer Space Treaty: very wide; no notable non-parties among our 50
const OST_NON_PARTIES: string[] = [];

// Hague Conventions (1907 IV): wide; treat as customary; mark older non-signatories minimally
const HAGUE_NON_PARTIES: string[] = [];

// Geneva Conventions I-IV (1949): universal; all UN members are parties
const GENEVA_NON_PARTIES: string[] = [];

// Additional Protocol I: most parties; major non-parties: US, IL, IR, IN, PK, TR, AE
const AP1_NON_PARTIES = ["US", "IL", "IR", "IN", "PK", "TR"];

// Additional Protocol II: similar; US, IN, PK, IR, IL, TR among non-parties
const AP2_NON_PARTIES = ["US", "IN", "PK", "IR", "IL", "TR"];

function exclude(allList: string[], notList: string[]): string[] {
  const set = new Set(notList);
  return allList.filter((c) => !set.has(c));
}

function expand(
  treatySlug: string,
  parties: string[],
  status: SignatoryStatus = "ratified",
): SignatoryRecord[] {
  return parties.map((countryCode) => ({
    treatySlug,
    countryCode,
    status,
  }));
}

export const SIGNATORIES: SignatoryRecord[] = [
  // ============ UN system ============
  ...expand("un-charter", UN_MEMBERS),
  ...expand("genocide-convention", exclude(UN_MEMBERS, GENOCIDE_NON_PARTIES)),
  ...expand("refugee-convention", exclude(UN_MEMBERS, REFUGEE_NON_PARTIES)),
  ...expand("hague-1907-iv", exclude(UN_MEMBERS, HAGUE_NON_PARTIES)),

  // ============ Geneva ============
  ...expand("geneva-i-1949", exclude(UN_MEMBERS, GENEVA_NON_PARTIES)),
  ...expand("geneva-ii-1949", exclude(UN_MEMBERS, GENEVA_NON_PARTIES)),
  ...expand("geneva-iii-1949", exclude(UN_MEMBERS, GENEVA_NON_PARTIES)),
  ...expand("geneva-iv-1949", exclude(UN_MEMBERS, GENEVA_NON_PARTIES)),
  ...expand(
    "additional-protocol-i-1977",
    exclude(UN_MEMBERS, AP1_NON_PARTIES),
  ),
  ...expand(
    "additional-protocol-ii-1977",
    exclude(UN_MEMBERS, AP2_NON_PARTIES),
  ),

  // ============ Arms control ============
  // NPT: NWS, NNWS, and non-parties
  ...expand("npt", NPT_NWS, "ratified"),
  ...expand(
    "npt",
    exclude(UN_MEMBERS, [...NPT_NWS, ...NPT_NON_PARTIES]),
    "ratified",
  ),
  ...expand("npt", ["KP"], "withdrew"),
  ...expand("npt", ["IN", "PK", "IL"], "non_party"),

  // CTBT: signed by most; ratification still pending for Annex 2 holdouts
  ...expand("ctbt", exclude(UN_MEMBERS, CTBT_NON_PARTIES), "ratified"),
  ...expand("ctbt", ["US", "CN", "IL", "EG", "IR"], "signed"),
  ...expand("ctbt", ["IN", "PK", "KP"], "non_party"),

  // TPNW
  ...expand("tpnw", TPNW_PARTIES, "ratified"),

  // CWC
  ...expand("cwc", exclude(UN_MEMBERS, CWC_NON_PARTIES), "ratified"),
  ...expand("cwc", ["IL"], "signed"),
  ...expand("cwc", ["KP", "EG"], "non_party"),

  // BWC
  ...expand("bwc", exclude(UN_MEMBERS, BWC_NON_PARTIES), "ratified"),
  ...expand("bwc", ["IL", "EG"], "non_party"),

  // Ottawa Treaty
  ...expand("ottawa-treaty", exclude(UN_MEMBERS, OTTAWA_NON_PARTIES), "ratified"),
  ...expand("ottawa-treaty", OTTAWA_NON_PARTIES, "non_party"),

  // CCM
  ...expand("ccm", exclude(UN_MEMBERS, CCM_NON_PARTIES), "ratified"),
  ...expand("ccm", CCM_NON_PARTIES, "non_party"),

  // ATT
  ...expand("att", exclude(UN_MEMBERS, ATT_NON_PARTIES), "ratified"),
  ...expand("att", ["US"], "withdrew"),
  ...expand("att", ATT_NON_PARTIES.filter((c) => c !== "US"), "non_party"),

  // CCW
  ...expand("ccw", exclude(UN_MEMBERS, CCW_NON_PARTIES), "ratified"),
  ...expand("ccw", CCW_NON_PARTIES, "non_party"),

  // ============ Alliances ============
  ...expand("north-atlantic-treaty", NATO),
  ...expand("anzus-treaty", ANZUS),
  ...expand("us-japan-security-treaty", ["US", "JP"]),
  ...expand("us-rok-mutual-defense-treaty", ["US", "KR"]),
  ...expand("us-philippines-mutual-defense-treaty", ["US", "PH"]),
  ...expand("rio-treaty", ["US", "BR", "AR"]),
  ...expand("rio-treaty", ["MX"], "withdrew"),
  ...expand("csto-treaty", CSTO),
  ...expand("fpda", FPDA),

  // ============ Diplomatic / law ============
  ...expand("vcdr", UN_MEMBERS),
  ...expand("vclt", exclude(UN_MEMBERS, VCLT_NON_PARTIES), "ratified"),
  ...expand("vclt", VCLT_NON_PARTIES, "non_party"),

  // ============ Law of the sea ============
  ...expand("unclos", exclude(UN_MEMBERS, UNCLOS_NON_PARTIES), "ratified"),
  ...expand("unclos", UNCLOS_NON_PARTIES, "non_party"),

  // ============ Space ============
  ...expand("outer-space-treaty", exclude(UN_MEMBERS, OST_NON_PARTIES)),

  // ============ Rome Statute (ICC) ============
  ...expand("rome-statute-icc", exclude(UN_MEMBERS, ROME_NON_PARTIES), "ratified"),
  ...expand("rome-statute-icc", ROME_NON_PARTIES, "non_party"),

  // ============ Helsinki Final Act (CSCE participating states) ============
  // 35 original signatories include US, CA, RU, all of Europe; later expanded to 57 OSCE participants
  ...expand(
    "helsinki-final-act",
    [
      "US", "CA", "RU", "GB", "FR", "DE", "IT", "ES", "NL", "BE",
      "GR", "DK", "NO", "SE", "FI", "PL", "CZ", "HU", "RO", "PT",
      "IE", "AT", "BY", "UA", "TR",
    ],
    "signed",
  ),

  // ============ New START (US-RU bilateral) ============
  ...expand("new-start", ["US", "RU"], "ratified"),
  ...expand("new-start", ["RU"], "withdrew"), // Russia announced suspension Feb 2023; recorded as withdrew for retrieval

  // ============ INF Treaty (defunct) ============
  ...expand("inf-treaty", ["US", "RU"], "withdrew"),

  // ============ Open Skies Treaty ============
  // 32 remaining parties; US and RU withdrew
  ...expand("open-skies-treaty", ["US", "RU"], "withdrew"),
  ...expand(
    "open-skies-treaty",
    [
      "GB", "FR", "DE", "IT", "ES", "NL", "BE", "GR", "DK", "NO",
      "SE", "FI", "PL", "CZ", "HU", "RO", "PT", "TR", "UA", "CA",
    ],
    "ratified",
  ),

  // ============ Budapest Memorandum (politically binding) ============
  // Signatories: US, GB, RU + recipients UA, BY, KZ
  ...expand("budapest-memorandum", ["US", "GB", "RU", "UA", "BY", "KZ"], "signed"),

  // ============ Wassenaar Arrangement (42 participating states) ============
  ...expand(
    "wassenaar-arrangement",
    [
      "US", "GB", "FR", "DE", "IT", "ES", "NL", "BE", "GR", "DK",
      "NO", "SE", "FI", "PL", "CZ", "HU", "RO", "PT", "IE", "AT",
      "CH", "TR", "RU", "JP", "KR", "AU", "NZ", "CA", "ZA", "AR",
      "MX", "IN", "MY",
    ],
    "signed",
  ),

  // ============ MTCR (35 partner states) ============
  ...expand(
    "mtcr",
    [
      "US", "GB", "FR", "DE", "IT", "ES", "NL", "BE", "GR", "DK",
      "NO", "SE", "FI", "PL", "CZ", "HU", "PT", "IE", "AT", "CH",
      "TR", "RU", "JP", "KR", "AU", "NZ", "CA", "ZA", "AR", "BR",
      "IN",
    ],
    "signed",
  ),

  // ============ OAS Charter ============
  // OAS membership: all American states except Cuba (suspended 1962, lifted 2009 but not rejoined)
  ...expand(
    "oas-charter",
    ["US", "CA", "MX", "BR", "AR", "CL", "CO", "PE", "VE", "EC"],
    "ratified",
  ),

  // ============ EU Treaty Article 42.7 ============
  ...expand("eu-treaty-42-7", EU, "ratified"),

  // ============ Convention Against Torture (CAT) ============
  // Near-universal but not US-friendly to Optional Protocol
  ...expand(
    "convention-against-torture",
    exclude(UN_MEMBERS, ["KP", "IR", "PK", "MM"]),
    "ratified",
  ),
  ...expand(
    "convention-against-torture",
    ["KP", "IR", "PK", "MM"],
    "non_party",
  ),
];
