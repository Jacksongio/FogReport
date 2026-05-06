import type { TreatyDocument } from "./types";

export const treatiesArms: TreatyDocument[] = [
  {
    slug: "npt",
    title: "Treaty on the Non-Proliferation of Nuclear Weapons",
    shortName: "NPT",
    category: "arms_control",
    adoptionDate: "1968-07-01",
    entryIntoForce: "1970-03-05",
    depositary: "United Kingdom, Russia, United States",
    summary:
      "Three-pillar nuclear order: non-proliferation, peaceful uses of nuclear energy, and disarmament. Recognizes five nuclear-weapon states (US, RU, UK, FR, CN). Indefinitely extended in 1995. Cornerstone of the global non-proliferation regime.",
    articles: [
      {
        number: "I",
        title: "NWS non-transfer obligation",
        content:
          "Obliges nuclear-weapon states not to transfer nuclear weapons or other nuclear explosive devices, or control over them, to any recipient, and not to assist, encourage, or induce any non-nuclear-weapon state to manufacture or otherwise acquire them.",
      },
      {
        number: "II",
        title: "NNWS non-acquisition obligation",
        content:
          "Obliges non-nuclear-weapon states not to receive nuclear weapons or other nuclear explosive devices, not to manufacture or otherwise acquire them, and not to seek or receive assistance in their manufacture.",
      },
      {
        number: "III",
        title: "IAEA safeguards",
        content:
          "Requires non-nuclear-weapon states to accept IAEA safeguards on all source and special fissionable material in peaceful nuclear activities to verify non-diversion.",
      },
      {
        number: "IV",
        title: "Peaceful uses",
        content:
          "Affirms the inalienable right of all parties to develop nuclear energy for peaceful purposes consistent with Articles I and II, and obliges parties to facilitate the fullest possible exchange of equipment, materials, and information.",
      },
      {
        number: "VI",
        title: "Disarmament obligation",
        content:
          "Obliges all parties to pursue negotiations in good faith on effective measures relating to cessation of the nuclear arms race at an early date and to nuclear disarmament, and on a treaty on general and complete disarmament.",
      },
      {
        number: "X",
        title: "Withdrawal",
        content:
          "Allows a party to withdraw with three months' notice if extraordinary events related to the subject matter of the treaty have jeopardized its supreme interests. North Korea announced withdrawal in 2003.",
      },
    ],
  },
  {
    slug: "ctbt",
    title: "Comprehensive Nuclear-Test-Ban Treaty",
    shortName: "CTBT",
    category: "arms_control",
    adoptionDate: "1996-09-10",
    entryIntoForce: "Not in force",
    depositary: "UN Secretary-General",
    summary:
      "Bans all nuclear explosions for any purpose, civilian or military. Has not entered into force pending ratification by remaining Annex 2 states (US, CN, IN, PK, KP, IL, IR, EG). The CTBTO operates an International Monitoring System detecting test signatures.",
    articles: [
      {
        number: "I",
        title: "Basic obligations",
        content:
          "Obliges each party not to carry out any nuclear weapon test explosion or any other nuclear explosion, and to prohibit and prevent any such explosion at any place under its jurisdiction or control.",
      },
      {
        number: "IV",
        title: "Verification regime",
        content:
          "Establishes the International Monitoring System (IMS) using seismic, hydroacoustic, infrasound, and radionuclide stations, plus on-site inspection and consultation/clarification mechanisms.",
      },
      {
        number: "XIV",
        title: "Entry into force",
        content:
          "Conditions entry into force on ratification by all 44 Annex 2 states with nuclear capabilities. Russia revoked its ratification in 2023.",
      },
    ],
  },
  {
    slug: "tpnw",
    title: "Treaty on the Prohibition of Nuclear Weapons",
    shortName: "TPNW",
    category: "arms_control",
    adoptionDate: "2017-07-07",
    entryIntoForce: "2021-01-22",
    depositary: "UN Secretary-General",
    summary:
      "Comprehensively bans nuclear weapons. Not joined by any nuclear-armed state or NATO member (Netherlands the sole NATO state to participate in negotiations). Sets a normative ban distinct from the NPT framework.",
    articles: [
      {
        number: "1",
        title: "Comprehensive prohibition",
        content:
          "Prohibits parties from developing, testing, producing, manufacturing, otherwise acquiring, possessing, or stockpiling nuclear weapons; from transferring or receiving them; from using or threatening to use them; from assisting any prohibited activity; and from stationing them on national territory.",
      },
      {
        number: "4",
        title: "Toward total elimination",
        content:
          "Sets out pathways for nuclear-armed states or states hosting weapons to join via verifiable elimination or removal.",
      },
    ],
  },
  {
    slug: "cwc",
    title:
      "Convention on the Prohibition of the Development, Production, Stockpiling and Use of Chemical Weapons",
    shortName: "Chemical Weapons Convention",
    category: "arms_control",
    adoptionDate: "1993-01-13",
    entryIntoForce: "1997-04-29",
    depositary: "UN Secretary-General",
    summary:
      "Prohibits chemical weapons comprehensively and establishes the OPCW (Hague) for verification. Near-universal membership. Syria's accession in 2013 followed alleged chemical weapons use; OPCW Investigation and Identification Team has named perpetrators.",
    articles: [
      {
        number: "I",
        title: "General obligations",
        content:
          "Obliges parties never to develop, produce, otherwise acquire, stockpile, or retain chemical weapons; never to transfer them; never to use them; never to engage in military preparations to use them; and to destroy existing stockpiles and production facilities.",
      },
      {
        number: "II",
        title: "Definition of chemical weapons",
        content:
          "Defines chemical weapons by combining toxic chemicals (other than for permitted purposes) and their means of delivery (munitions, devices, equipment).",
      },
      {
        number: "VIII",
        title: "OPCW verification",
        content:
          "Establishes the OPCW with routine and challenge inspection authority over chemical industry and military facilities to verify compliance.",
      },
      {
        number: "IX",
        title: "Challenge inspection",
        content:
          "Authorizes any party to request a challenge inspection of any facility or location of another party to clarify and resolve compliance concerns; the inspected party cannot refuse access.",
      },
    ],
  },
  {
    slug: "bwc",
    title:
      "Convention on the Prohibition of the Development, Production and Stockpiling of Bacteriological (Biological) and Toxin Weapons and on Their Destruction",
    shortName: "Biological Weapons Convention",
    category: "arms_control",
    adoptionDate: "1972-04-10",
    entryIntoForce: "1975-03-26",
    depositary: "United Kingdom, Russia, United States",
    summary:
      "First disarmament treaty banning an entire category of weapons. Lacks a formal verification mechanism; relies on confidence-building measures and Review Conferences.",
    articles: [
      {
        number: "I",
        title: "Comprehensive prohibition",
        content:
          "Obliges parties never in any circumstances to develop, produce, stockpile, or otherwise acquire or retain microbial or other biological agents or toxins of types and in quantities that have no justification for prophylactic, protective, or other peaceful purposes, or weapons designed to use them for hostile purposes.",
      },
      {
        number: "III",
        title: "Non-transfer",
        content:
          "Bars transfer to any recipient and any assistance to manufacture or acquire such agents or weapons.",
      },
      {
        number: "VI",
        title: "UNSC complaint mechanism",
        content:
          "Allows any party to lodge a complaint with the UN Security Council where another party is acting in breach of obligations, and obliges parties to cooperate with any investigation.",
      },
    ],
  },
  {
    slug: "ottawa-treaty",
    title:
      "Convention on the Prohibition of the Use, Stockpiling, Production and Transfer of Anti-Personnel Mines and on Their Destruction",
    shortName: "Ottawa Treaty (Mine Ban)",
    category: "arms_control",
    adoptionDate: "1997-09-18",
    entryIntoForce: "1999-03-01",
    depositary: "UN Secretary-General",
    summary:
      "Comprehensively prohibits anti-personnel mines. 164 parties; non-parties include US, RU, CN, IN, PK, IR, IL, KR. Several frontline states have suspended or considered withdrawal in 2024-2025 in light of Russia's war on Ukraine.",
    articles: [
      {
        number: "1",
        title: "General obligations",
        content:
          "Obliges parties never to use, develop, produce, otherwise acquire, stockpile, retain, or transfer anti-personnel mines, and never to assist anyone in such conduct, and to destroy existing stockpiles.",
      },
      {
        number: "5",
        title: "Mine clearance",
        content:
          "Obliges parties to destroy or ensure the destruction of all anti-personnel mines in mined areas under their jurisdiction or control as soon as possible, and not later than ten years after entry into force, with extension provisions.",
      },
    ],
  },
  {
    slug: "ccm",
    title: "Convention on Cluster Munitions",
    shortName: "CCM",
    category: "arms_control",
    adoptionDate: "2008-05-30",
    entryIntoForce: "2010-08-01",
    depositary: "UN Secretary-General",
    summary:
      "Bans cluster munitions and provides for clearance of remnants and victim assistance. Major non-parties include US, RU, CN, IN, PK, IL, KR. Lithuania withdrew effective 2024 (first state to denounce a humanitarian disarmament treaty).",
    articles: [
      {
        number: "1",
        title: "General obligations",
        content:
          "Obliges parties never to use, develop, produce, otherwise acquire, stockpile, retain, or transfer cluster munitions, and never to assist anyone in such conduct.",
      },
      {
        number: "2",
        title: "Definition with technical exclusions",
        content:
          "Defines cluster munitions while excluding from the ban munitions with fewer than ten submunitions, each weighing more than 4 kg, designed to detect and engage a single target with self-destruct and self-deactivation features.",
      },
    ],
  },
  {
    slug: "att",
    title: "Arms Trade Treaty",
    shortName: "ATT",
    category: "arms_control",
    adoptionDate: "2013-04-02",
    entryIntoForce: "2014-12-24",
    depositary: "UN Secretary-General",
    summary:
      "Regulates the international trade of conventional arms. Establishes prohibitions and risk-assessment criteria for export. The US signed in 2013 but has unsigned (2019).",
    articles: [
      {
        number: "6",
        title: "Prohibitions on transfer",
        content:
          "Prohibits transfer where the transfer would violate UNSC measures (such as arms embargoes), would violate other relevant international agreements, or where the state has knowledge the arms would be used in genocide, crimes against humanity, grave breaches of the Geneva Conventions, attacks on civilians, or other war crimes.",
      },
      {
        number: "7",
        title: "Export risk assessment",
        content:
          "Obliges exporting states to assess the potential that arms could be used to commit or facilitate serious violations of international humanitarian law or human rights law before authorizing export.",
      },
    ],
  },
  {
    slug: "ccw",
    title: "Convention on Certain Conventional Weapons",
    shortName: "CCW",
    category: "arms_control",
    adoptionDate: "1980-10-10",
    entryIntoForce: "1983-12-02",
    depositary: "UN Secretary-General",
    summary:
      "Umbrella framework with five protocols restricting or banning specific conventional weapons deemed excessively injurious or indiscriminate.",
    articles: [
      {
        number: "Protocol I",
        title: "Non-detectable fragments",
        content:
          "Prohibits weapons whose primary effect is to injure by fragments not detectable by X-ray.",
      },
      {
        number: "Protocol II (Amended 1996)",
        title: "Mines, booby-traps and other devices",
        content:
          "Restricts use of mines, booby-traps, and similar devices, including in non-international armed conflict.",
      },
      {
        number: "Protocol III",
        title: "Incendiary weapons",
        content:
          "Bans use of incendiary weapons against civilians and civilian objects, and restricts their use against military objectives located within concentrations of civilians.",
      },
      {
        number: "Protocol IV",
        title: "Blinding laser weapons",
        content:
          "Prohibits use of laser weapons specifically designed to cause permanent blindness to unenhanced vision and obliges parties to take precautions in the use of laser systems.",
      },
      {
        number: "Protocol V",
        title: "Explosive remnants of war",
        content:
          "Obliges parties to clear, remove, destroy, or maintain explosive remnants of war in affected territories under their control after the cessation of active hostilities.",
      },
    ],
  },
];
