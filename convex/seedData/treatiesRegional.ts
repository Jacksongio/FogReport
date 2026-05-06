import type { TreatyDocument } from "./types";

export const treatiesRegional: TreatyDocument[] = [
  {
    slug: "antarctic-treaty",
    title: "Antarctic Treaty",
    shortName: "Antarctic Treaty",
    category: "other",
    adoptionDate: "1959-12-01",
    entryIntoForce: "1961-06-23",
    depositary: "United States",
    summary:
      "Reserves Antarctica for peaceful purposes; prohibits military activities, weapons testing, and nuclear explosions on the continent. Establishes free access for inspection. 56 parties as of 2024.",
    articles: [
      {
        number: "I",
        title: "Peaceful purposes only",
        content:
          "Reserves Antarctica for peaceful purposes only and prohibits any measures of a military nature, including establishment of military bases, fortifications, and weapons testing. Permits military personnel and equipment for scientific research or peaceful purposes.",
      },
      {
        number: "V",
        title: "Nuclear prohibition",
        content:
          "Prohibits any nuclear explosions in Antarctica and the disposal of radioactive waste material there.",
      },
      {
        number: "VII",
        title: "Inspection right",
        content:
          "Provides parties the right to designate observers with full access to all areas of Antarctica, including all stations, installations, and equipment, to ensure compliance.",
      },
    ],
  },
  {
    slug: "tlatelolco-treaty",
    title: "Treaty of Tlatelolco (Latin American NWFZ)",
    shortName: "Treaty of Tlatelolco",
    category: "arms_control",
    adoptionDate: "1967-02-14",
    entryIntoForce: "1969-04-22",
    summary:
      "Establishes the first nuclear-weapon-free zone in a populated region. Prohibits parties from manufacturing, acquiring, testing, or storing nuclear weapons in Latin America and the Caribbean. OPANAL administers compliance.",
    articles: [
      {
        number: "1",
        title: "Obligations of parties",
        content:
          "Obliges parties to use exclusively for peaceful purposes the nuclear material under their jurisdiction, and to prohibit and prevent the testing, use, manufacture, production, acquisition, possession, control, or any form of stationing of nuclear weapons in their territory.",
      },
      {
        number: "Additional Protocol I",
        title: "Extra-regional powers with territory in the zone",
        content:
          "Obliges extra-regional states with territories in the zone (US, UK, FR, NL) to apply the same denuclearization regime to those territories. All four signed and ratified.",
      },
      {
        number: "Additional Protocol II",
        title: "Negative security assurances",
        content:
          "Obliges nuclear-weapon states (US, UK, FR, RU, CN) to refrain from using or threatening to use nuclear weapons against parties to the treaty. All five NWS have signed and ratified.",
      },
    ],
  },
  {
    slug: "rarotonga-treaty",
    title: "Treaty of Rarotonga (South Pacific NWFZ)",
    shortName: "Treaty of Rarotonga",
    category: "arms_control",
    adoptionDate: "1985-08-06",
    entryIntoForce: "1986-12-11",
    summary:
      "Establishes a nuclear-weapon-free zone in the South Pacific. Prohibits parties from manufacturing, possessing, testing, or stationing nuclear weapons in their territories.",
    articles: [
      {
        number: "3",
        title: "Renunciation of nuclear weapons",
        content:
          "Obliges parties not to manufacture or otherwise acquire, possess, or have control over any nuclear explosive device by any means anywhere inside or outside the zone.",
      },
      {
        number: "5",
        title: "No stationing",
        content:
          "Obliges parties not to allow the stationing of any nuclear explosive device on their territory.",
      },
      {
        number: "Protocols 1-3",
        title: "NWS commitments",
        content:
          "Three protocols obliging NWS not to test in the zone (Protocol 3) or station weapons (Protocol 1 with territories), plus negative security assurance (Protocol 2). US, UK, FR ratified all; RU and CN ratified Protocols 2 and 3.",
      },
    ],
  },
  {
    slug: "bangkok-treaty",
    title: "Treaty of Bangkok (Southeast Asian NWFZ)",
    shortName: "SEANWFZ",
    category: "arms_control",
    adoptionDate: "1995-12-15",
    entryIntoForce: "1997-03-27",
    summary:
      "Establishes a nuclear-weapon-free zone in Southeast Asia covering all 10 ASEAN states and their EEZs/continental shelves. Protocol open to NWS but unsigned by all five as of 2024.",
    articles: [
      {
        number: "3",
        title: "Basic obligations",
        content:
          "Obliges parties not to develop, manufacture, otherwise acquire, possess, control, station, transport, test, or use nuclear weapons; and not to allow such activities in their territories.",
      },
      {
        number: "7",
        title: "Foreign ships and aircraft",
        content:
          "Each state party retains the right to decide for itself whether to allow visits by foreign ships and aircraft to its ports and airfields, transit through territorial sea or archipelagic waters, and overflight, in a manner not regulated by the relevant rights of innocent passage and transit passage.",
      },
    ],
  },
  {
    slug: "pelindaba-treaty",
    title: "Treaty of Pelindaba (African NWFZ)",
    shortName: "Treaty of Pelindaba",
    category: "arms_control",
    adoptionDate: "1996-04-11",
    entryIntoForce: "2009-07-15",
    summary:
      "Establishes a nuclear-weapon-free zone covering the African continent and surrounding islands. Provides for negative security assurances by NWS through three protocols.",
    articles: [
      {
        number: "3",
        title: "Renunciation of nuclear weapons",
        content:
          "Obliges parties not to conduct research on, develop, manufacture, stockpile, acquire, possess, or have control over any nuclear explosive device.",
      },
      {
        number: "7",
        title: "Prohibition of dumping radioactive waste",
        content:
          "Obliges parties to prohibit the dumping of radioactive wastes and other radioactive matter in the zone.",
      },
      {
        number: "Protocol I",
        title: "NWS negative security assurances",
        content:
          "Obliges NWS not to use or threaten to use nuclear weapons against parties. US has signed but not ratified; UK, FR, RU, CN have ratified.",
      },
    ],
  },
];
