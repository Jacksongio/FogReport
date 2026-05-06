export interface Country {
  code: string;
  name: string;
  flag: string;
  power: number;
  military: number;
  economic: number;
  diplomatic: number;
}

export interface BriefingSection {
  point: string;
  content: string;
}

export interface TreatyReference {
  title: string;
  relevance: string;
}

export interface BriefingData {
  date: string;
  title: string;
  sections: BriefingSection[];
  recommendations: string[];
  conclusion: string;
  finalRecommendation?: string;
  classification: string;
  author: string;
  treatyReferences?: TreatyReference[];
  disclaimer?: string;
}

export interface RagMetadata {
  ragGenerated: boolean;
  treatiesAnalyzed: number;
  briefingId?: unknown;
  qa?: any;
  sources?: {
    bases?: any[];
    weapons?: any[];
    treatyArticles?: any[];
    chokepoints?: any[];
    intelAgencies?: any[];
    sofUnits?: any[];
    defenseIndustries?: any[];
    subStateActors?: any[];
    historicalIncidents?: any[];
  };
}
