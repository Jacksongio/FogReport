export interface ConflictType {
  id: string;
  name: string;
  icon: string;
}

export const conflictTypes: ConflictType[] = [
  { id: "territorial", name: "Territorial Military Conflict", icon: "🗺️" },
  { id: "nuclear", name: "Nuclear Military Threat", icon: "☢️" },
  { id: "proxy", name: "Proxy Military War", icon: "🎭" },
  { id: "conventional", name: "Conventional Military War", icon: "⚔️" },
  { id: "naval", name: "Naval Military Conflict", icon: "🚢" },
  { id: "air", name: "Air Military Campaign", icon: "✈️" },
];

export function detectConflictType(details: string): string {
  if (!details) return "";

  const lowerDetails = details.toLowerCase();

  if (
    lowerDetails.includes("nuclear") ||
    lowerDetails.includes("nuke") ||
    lowerDetails.includes("atomic") ||
    lowerDetails.includes("warhead") ||
    lowerDetails.includes("radiation") ||
    lowerDetails.includes("fallout")
  ) {
    return "nuclear";
  }

  if (
    lowerDetails.includes("naval") ||
    lowerDetails.includes("navy") ||
    lowerDetails.includes("fleet") ||
    lowerDetails.includes("ship") ||
    lowerDetails.includes("submarine") ||
    lowerDetails.includes("maritime") ||
    lowerDetails.includes("sea") ||
    lowerDetails.includes("ocean") ||
    lowerDetails.includes("blockade") ||
    lowerDetails.includes("port")
  ) {
    return "naval";
  }

  if (
    lowerDetails.includes("air force") ||
    lowerDetails.includes("aircraft") ||
    lowerDetails.includes("fighter") ||
    lowerDetails.includes("bomber") ||
    lowerDetails.includes("missile") ||
    lowerDetails.includes("drone") ||
    lowerDetails.includes("airspace") ||
    lowerDetails.includes("bombing") ||
    lowerDetails.includes("aerial") ||
    lowerDetails.includes("helicopter")
  ) {
    return "air";
  }

  if (
    lowerDetails.includes("proxy") ||
    lowerDetails.includes("indirect") ||
    lowerDetails.includes("militia") ||
    lowerDetails.includes("rebel") ||
    lowerDetails.includes("insurgent") ||
    lowerDetails.includes("guerrilla") ||
    lowerDetails.includes("support") ||
    lowerDetails.includes("backing")
  ) {
    return "proxy";
  }

  if (
    lowerDetails.includes("territorial") ||
    lowerDetails.includes("border") ||
    lowerDetails.includes("invasion") ||
    lowerDetails.includes("occupy") ||
    lowerDetails.includes("annex") ||
    lowerDetails.includes("territory") ||
    lowerDetails.includes("land") ||
    lowerDetails.includes("region") ||
    lowerDetails.includes("disputed") ||
    lowerDetails.includes("claim")
  ) {
    return "territorial";
  }

  if (
    lowerDetails.includes("military") ||
    lowerDetails.includes("army") ||
    lowerDetails.includes("troops") ||
    lowerDetails.includes("soldier") ||
    lowerDetails.includes("war") ||
    lowerDetails.includes("battle") ||
    lowerDetails.includes("combat") ||
    lowerDetails.includes("attack") ||
    lowerDetails.includes("defense") ||
    lowerDetails.includes("offensive")
  ) {
    return "conventional";
  }

  return "";
}
