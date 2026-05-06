export interface ExampleScenario {
  title: string;
  description: string;
  selectedCountry: string;
  offensiveCountry: string;
  defensiveCountry: string;
  conflictScenario: string;
  scenarioDetails: string;
  severityLevel: string;
  timeFrame: string;
  tradeDependencies: number;
  sanctionsImpact: number;
  marketStability: number;
  defenseCapabilities: number;
  allianceSupport: number;
  strategicResources: number;
}

export const exampleQuestions: ExampleScenario[] = [
  {
    title: "Atlantic Space Port Rivalry",
    description: "Competitive space launch facility expansion",
    selectedCountry: "GB",
    offensiveCountry: "FR",
    defensiveCountry: "GB",
    conflictScenario: "Naval Expansion",
    scenarioDetails:
      "France deploys advanced naval assets to secure exclusive Atlantic launch corridors for their expanding space program, challenging British satellite deployment zones and threatening UK space industry competitiveness.",
    severityLevel: "high",
    timeFrame: "long",
    tradeDependencies: 75,
    sanctionsImpact: 85,
    marketStability: 30,
    defenseCapabilities: 65,
    allianceSupport: 90,
    strategicResources: 55,
  },
  {
    title: "Alpine Energy Corridor Dispute",
    description: "Strategic pipeline route disagreement",
    selectedCountry: "IT",
    offensiveCountry: "DE",
    defensiveCountry: "IT",
    conflictScenario: "Territorial Dispute",
    scenarioDetails:
      "Germany establishes new energy infrastructure routes through disputed Alpine regions, challenging Italian territorial claims and prompting EU mediation responses in the area.",
    severityLevel: "extreme",
    timeFrame: "medium",
    tradeDependencies: 90,
    sanctionsImpact: 95,
    marketStability: 20,
    defenseCapabilities: 70,
    allianceSupport: 85,
    strategicResources: 80,
  },
  {
    title: "Baltic Energy Infrastructure",
    description: "Critical pipeline security concerns",
    selectedCountry: "FI",
    offensiveCountry: "RU",
    defensiveCountry: "FI",
    conflictScenario: "Proxy Warfare",
    scenarioDetails:
      "Russian-backed groups target energy infrastructure in the Baltic region while Russia threatens direct intervention if Finland strengthens NATO cooperation.",
    severityLevel: "high",
    timeFrame: "medium",
    tradeDependencies: 60,
    sanctionsImpact: 70,
    marketStability: 40,
    defenseCapabilities: 85,
    allianceSupport: 80,
    strategicResources: 65,
  },
  {
    title: "India-Pakistan Border Conflict",
    description: "Kashmir region military escalation",
    selectedCountry: "IN",
    offensiveCountry: "PK",
    defensiveCountry: "IN",
    conflictScenario: "Border Conflict",
    scenarioDetails:
      "Pakistan-backed militants cross the Line of Control, prompting Indian military response and raising nuclear escalation concerns.",
    severityLevel: "extreme",
    timeFrame: "immediate",
    tradeDependencies: 45,
    sanctionsImpact: 50,
    marketStability: 35,
    defenseCapabilities: 80,
    allianceSupport: 60,
    strategicResources: 70,
  },
  {
    title: "North Korea Nuclear Escalation",
    description: "DPRK missile program advancement",
    selectedCountry: "KR",
    offensiveCountry: "KP",
    defensiveCountry: "KR",
    conflictScenario: "Nuclear Threat",
    scenarioDetails:
      "North Korea conducts ICBM tests and threatens preemptive nuclear strikes against South Korea and US military bases in the region.",
    severityLevel: "extreme",
    timeFrame: "immediate",
    tradeDependencies: 35,
    sanctionsImpact: 60,
    marketStability: 25,
    defenseCapabilities: 75,
    allianceSupport: 95,
    strategicResources: 50,
  },
  {
    title: "Turkey-Greece Aegean Dispute",
    description: "Maritime boundaries and energy exploration",
    selectedCountry: "GR",
    offensiveCountry: "TR",
    defensiveCountry: "GR",
    conflictScenario: "Resource Conflict",
    scenarioDetails:
      "Turkey sends drilling ships into disputed Aegean waters claimed by Greece, escalating maritime tensions within NATO alliance.",
    severityLevel: "medium",
    timeFrame: "long",
    tradeDependencies: 55,
    sanctionsImpact: 40,
    marketStability: 60,
    defenseCapabilities: 65,
    allianceSupport: 70,
    strategicResources: 75,
  },
  {
    title: "Antarctic Research Zone Dispute",
    description: "Scientific territory access rights",
    selectedCountry: "CL",
    offensiveCountry: "AR",
    defensiveCountry: "CL",
    conflictScenario: "Territorial Dispute",
    scenarioDetails:
      "Argentina establishes expanded research stations in disputed Antarctic zones, challenging Chilean scientific claims and potentially drawing in international Antarctic Treaty partners.",
    severityLevel: "high",
    timeFrame: "medium",
    tradeDependencies: 30,
    sanctionsImpact: 35,
    marketStability: 45,
    defenseCapabilities: 50,
    allianceSupport: 65,
    strategicResources: 40,
  },
  {
    title: "Japan-China Maritime Tensions",
    description: "Senkaku/Diaoyu Islands dispute escalation",
    selectedCountry: "JP",
    offensiveCountry: "CN",
    defensiveCountry: "JP",
    conflictScenario: "Maritime Dispute",
    scenarioDetails:
      "Chinese coast guard and naval vessels increase presence around disputed islands, prompting Japanese military response and US alliance activation.",
    severityLevel: "medium",
    timeFrame: "long",
    tradeDependencies: 85,
    sanctionsImpact: 75,
    marketStability: 50,
    defenseCapabilities: 80,
    allianceSupport: 90,
    strategicResources: 60,
  },
  {
    title: "Ethiopia-Egypt Nile Dam Crisis",
    description: "Water rights and infrastructure dispute",
    selectedCountry: "EG",
    offensiveCountry: "ET",
    defensiveCountry: "EG",
    conflictScenario: "Resource Conflict",
    scenarioDetails:
      "Ethiopia begins filling the Grand Renaissance Dam without agreement, threatening Egypt's water security and prompting military posturing.",
    severityLevel: "medium",
    timeFrame: "long",
    tradeDependencies: 40,
    sanctionsImpact: 30,
    marketStability: 55,
    defenseCapabilities: 60,
    allianceSupport: 45,
    strategicResources: 85,
  },
  {
    title: "Venezuela-Guyana Border Dispute",
    description: "Essequibo territory and oil resources",
    selectedCountry: "GY",
    offensiveCountry: "VE",
    defensiveCountry: "GY",
    conflictScenario: "Resource Conflict",
    scenarioDetails:
      "Venezuela mobilizes forces near Essequibo region following major oil discoveries, challenging Guyana's territorial claims and threatening energy investments.",
    severityLevel: "medium",
    timeFrame: "long",
    tradeDependencies: 25,
    sanctionsImpact: 45,
    marketStability: 65,
    defenseCapabilities: 35,
    allianceSupport: 55,
    strategicResources: 90,
  },
];
