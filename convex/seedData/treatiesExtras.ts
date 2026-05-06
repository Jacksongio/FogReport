import type { TreatyDocument } from "./types";

export const treatiesExtras: TreatyDocument[] = [
  {
    slug: "helsinki-final-act",
    title:
      "Helsinki Final Act (Conference on Security and Co-operation in Europe)",
    shortName: "Helsinki Final Act",
    category: "diplomatic",
    adoptionDate: "1975-08-01",
    summary:
      "Politically binding declaration adopted by 35 states at the Conference on Security and Co-operation in Europe. Established the Decalogue of ten guiding principles and confidence-building measures across three 'baskets' (security, economic, humanitarian). Foundation for the OSCE.",
    articles: [
      {
        number: "Decalogue I",
        title: "Sovereign equality",
        content:
          "Provides that participating states will respect each other's sovereign equality and individuality, including the right to juridical equality, territorial integrity, and freedom and political independence.",
      },
      {
        number: "Decalogue II",
        title: "Refraining from threat or use of force",
        content:
          "Obliges participating states to refrain from any use or threat of force against another state, and from any related action inconsistent with the UN Charter, regardless of any other considerations.",
      },
      {
        number: "Decalogue III",
        title: "Inviolability of frontiers",
        content:
          "Obliges participating states to regard one another's frontiers as inviolable and to refrain from assaulting them, including any demand for or act of seizure and usurpation of part or all of another state's territory.",
      },
      {
        number: "Decalogue IV",
        title: "Territorial integrity of states",
        content:
          "Obliges participating states to respect the territorial integrity of one another, including refraining from action inconsistent with the UN Charter against territorial integrity, political independence, or unity of any participating state.",
      },
      {
        number: "Decalogue VI",
        title: "Non-intervention",
        content:
          "Obliges participating states to refrain from any intervention, direct or indirect, in the internal or external affairs of another state, regardless of their mutual relations.",
      },
      {
        number: "Decalogue X",
        title: "Fulfilment in good faith",
        content:
          "Obliges participating states to fulfil in good faith their obligations under international law, including those arising from generally recognized principles, treaties, and other agreements they have concluded.",
      },
    ],
  },
  {
    slug: "new-start",
    title:
      "Treaty between the United States of America and the Russian Federation on Measures for the Further Reduction and Limitation of Strategic Offensive Arms",
    shortName: "New START",
    category: "arms_control",
    adoptionDate: "2010-04-08",
    entryIntoForce: "2011-02-05",
    summary:
      "Bilateral US-Russia treaty limiting deployed strategic warheads, deployed delivery vehicles, and deployed plus non-deployed launchers. Extended to February 2026. Russia announced 'suspension' of participation in February 2023, halting on-site inspections.",
    articles: [
      {
        number: "II",
        title: "Numerical limits",
        content:
          "Limits each party to 1,550 deployed strategic warheads, 700 deployed ICBMs, SLBMs, and heavy bombers, and 800 deployed and non-deployed ICBM, SLBM, and heavy bomber launchers.",
      },
      {
        number: "VI",
        title: "Conversion or elimination",
        content:
          "Provides procedures for conversion or elimination of strategic offensive arms; warheads count one each except heavy bombers count as one warhead.",
      },
      {
        number: "X",
        title: "Telemetry exchange",
        content:
          "Requires exchange of telemetric information on launches of ICBMs and SLBMs, with limited exceptions.",
      },
      {
        number: "XI",
        title: "On-site inspections",
        content:
          "Authorizes up to 18 on-site inspections per year, including Type One inspections at deployed ICBM and SLBM bases, and Type Two inspections at non-deployed and elimination facilities. Russia suspended these inspections in February 2023.",
      },
      {
        number: "XIV",
        title: "Duration and extension",
        content:
          "Sets the treaty's duration at ten years with an option of extending for up to five additional years. Extended on February 3, 2021 through February 5, 2026.",
      },
    ],
  },
  {
    slug: "inf-treaty",
    title:
      "Treaty on the Elimination of Intermediate-Range and Shorter-Range Missiles",
    shortName: "INF Treaty (defunct)",
    category: "arms_control",
    adoptionDate: "1987-12-08",
    entryIntoForce: "1988-06-01",
    summary:
      "Bilateral US-Soviet treaty banning ground-launched ballistic and cruise missiles of 500-5500 km range. The United States withdrew on August 2, 2019, citing Russian violation via the 9M729 / SSC-8 missile. The treaty is no longer in force.",
    articles: [
      {
        number: "I",
        title: "Elimination obligation",
        content:
          "Obliged each party to eliminate intermediate-range missiles (1,000-5,500 km range) and shorter-range missiles (500-1,000 km range), their launchers, and associated support equipment.",
      },
      {
        number: "VI",
        title: "Verification",
        content:
          "Provided a robust verification regime including baseline inspections, on-site inspections, and continuous monitoring at portal sites.",
      },
      {
        number: "XV",
        title: "Withdrawal",
        content:
          "Allowed a party to withdraw from the treaty if it decided that extraordinary events related to the subject matter had jeopardized its supreme interests, with six months' notice. The US invoked this provision on February 2, 2019.",
      },
    ],
  },
  {
    slug: "open-skies-treaty",
    title: "Treaty on Open Skies",
    shortName: "Open Skies (defunct for major parties)",
    category: "arms_control",
    adoptionDate: "1992-03-24",
    entryIntoForce: "2002-01-01",
    summary:
      "Established a regime of unarmed aerial observation flights over the territories of states parties to enhance mutual understanding and confidence. The United States withdrew November 22, 2020. Russia withdrew December 18, 2021. Remaining 32 parties continue operations.",
    articles: [
      {
        number: "I",
        title: "Object and scope",
        content:
          "Established a regime of unarmed aerial observation flights, conducted using prescribed sensor equipment, to provide territorial transparency.",
      },
      {
        number: "III",
        title: "Active and passive quotas",
        content:
          "Allocated each party a quota of observation flights it may conduct over other parties (active) and that it must accept over its territory (passive).",
      },
      {
        number: "IX",
        title: "Sensor categories",
        content:
          "Authorized four sensor categories: optical panoramic and framing cameras, video cameras with real-time display, infrared line-scanning devices, and sideways-looking synthetic aperture radar.",
      },
      {
        number: "XV",
        title: "Withdrawal",
        content:
          "Allowed any state party to withdraw with six months' notice. The United States and Russia have both invoked this clause.",
      },
    ],
  },
  {
    slug: "budapest-memorandum",
    title: "Budapest Memorandum on Security Assurances",
    shortName: "Budapest Memorandum",
    category: "arms_control",
    adoptionDate: "1994-12-05",
    summary:
      "Politically binding diplomatic instrument signed by the United States, United Kingdom, and Russian Federation providing security assurances to Ukraine, Belarus, and Kazakhstan in exchange for those three states acceding to the NPT as non-nuclear-weapon states and transferring their inherited Soviet nuclear arsenals to Russia. Russia's 2014 annexation of Crimea and 2022 invasion of Ukraine have been characterized by other parties as breaches of these assurances.",
    articles: [
      {
        number: "1",
        title: "Respect for territorial integrity",
        content:
          "Reaffirms commitment to respect the independence and sovereignty and existing borders of Ukraine.",
      },
      {
        number: "2",
        title: "Refraining from threat or use of force",
        content:
          "Reaffirms obligation to refrain from the threat or use of force against the territorial integrity or political independence of Ukraine, and that none of their weapons will ever be used against Ukraine except in self-defense or otherwise in accordance with the UN Charter.",
      },
      {
        number: "3",
        title: "Refraining from economic coercion",
        content:
          "Reaffirms commitment to refrain from economic coercion designed to subordinate to the parties' own interest the exercise by Ukraine of the rights inherent in its sovereignty.",
      },
      {
        number: "4",
        title: "UNSC action in event of nuclear aggression",
        content:
          "Provides commitment to seek immediate UN Security Council action to provide assistance to Ukraine if Ukraine should become a victim of an act of aggression or an object of a threat of aggression in which nuclear weapons are used.",
      },
      {
        number: "6",
        title: "Consultation",
        content:
          "Commits parties to consult in the event a situation arises which raises a question concerning these commitments.",
      },
    ],
  },
  {
    slug: "wassenaar-arrangement",
    title:
      "Wassenaar Arrangement on Export Controls for Conventional Arms and Dual-Use Goods and Technologies",
    shortName: "Wassenaar Arrangement",
    category: "arms_control",
    adoptionDate: "1996-07-12",
    summary:
      "Multilateral export control regime succeeding COCOM. Coordinates national export controls on conventional arms and dual-use goods/technologies. 42 participating states. Russia remains a participating state but has been substantively isolated since 2022.",
    articles: [
      {
        number: "Initial Elements",
        title: "Purpose",
        content:
          "Established the regime to contribute to regional and international security and stability by promoting transparency and greater responsibility in transfers of conventional arms and dual-use goods and technologies, and to prevent destabilizing accumulations.",
      },
      {
        number: "Munitions List",
        title: "Controlled items",
        content:
          "Maintains the Munitions List (military items) and the List of Dual-Use Goods and Technologies. Participating states use these lists in their national export control regimes.",
      },
      {
        number: "Information exchange",
        title: "Transparency on transfers",
        content:
          "Requires exchange of general and specific information on arms transfers and denials, including notifications on transfers of items on the lists.",
      },
    ],
  },
  {
    slug: "mtcr",
    title: "Missile Technology Control Regime",
    shortName: "MTCR",
    category: "arms_control",
    adoptionDate: "1987-04-01",
    summary:
      "Informal political understanding among 35 partner states to limit the proliferation of missiles and missile technology capable of delivering weapons of mass destruction (>500 kg payload to >300 km range).",
    articles: [
      {
        number: "Annex I",
        title: "Category I items",
        content:
          "Establishes a strong presumption of denial for transfers of complete rocket systems and unmanned air vehicles capable of delivering at least a 500 kg payload to a range of at least 300 km.",
      },
      {
        number: "Annex II",
        title: "Category II items",
        content:
          "Subjects to careful national export controls a range of dual-use missile-related components, materials, and technology, including propulsion components, navigation, and structural materials.",
      },
    ],
  },
  {
    slug: "oas-charter",
    title: "Charter of the Organization of American States",
    shortName: "OAS Charter",
    category: "alliance",
    adoptionDate: "1948-04-30",
    entryIntoForce: "1951-12-13",
    summary:
      "Founding instrument of the Organization of American States. Establishes principles for hemispheric cooperation, peaceful settlement of disputes, and collective action. Complements the Inter-American Treaty of Reciprocal Assistance (Rio Treaty) on collective defense.",
    articles: [
      {
        number: "1",
        title: "Establishment",
        content:
          "Establishes the Organization of American States as a regional organization within the United Nations.",
      },
      {
        number: "3",
        title: "Principles",
        content:
          "Reaffirms principles including international law, good faith, regional solidarity, sovereign equality, condemnation of war of aggression, and that an act of aggression against one American State is an act of aggression against all the other American States.",
      },
      {
        number: "19",
        title: "Non-intervention",
        content:
          "Provides that no state or group of states has the right to intervene, directly or indirectly, for any reason whatever, in the internal or external affairs of any other state.",
      },
      {
        number: "21",
        title: "Inviolability of territory",
        content:
          "Establishes that the territory of a state is inviolable; it may not be the object of military occupation or of other measures of force taken by another state, directly or indirectly, on any grounds whatever.",
      },
      {
        number: "28",
        title: "Collective security",
        content:
          "Provides that every act of aggression by a state against the territorial integrity or political independence of any American state shall be considered an act of aggression against the other American states.",
      },
    ],
  },
  {
    slug: "eu-treaty-42-7",
    title: "Treaty on European Union (Article 42.7)",
    shortName: "EU Treaty Article 42.7",
    category: "alliance",
    adoptionDate: "2007-12-13",
    entryIntoForce: "2009-12-01",
    summary:
      "Mutual defense clause of the consolidated Treaty on European Union (Lisbon Treaty). Obliges EU member states to provide aid and assistance by all means in their power to a fellow member that is the victim of armed aggression on its territory. France invoked Article 42.7 after the November 2015 Paris attacks.",
    articles: [
      {
        number: "42(7)",
        title: "Mutual assistance clause",
        content:
          "If a Member State is the victim of armed aggression on its territory, the other Member States shall have towards it an obligation of aid and assistance by all the means in their power, in accordance with Article 51 of the United Nations Charter. This shall not prejudice the specific character of the security and defence policy of certain Member States. Commitments and cooperation in this area shall be consistent with commitments under the North Atlantic Treaty Organisation, which, for those States which are members of it, remains the foundation of their collective defence and the forum for its implementation.",
      },
      {
        number: "42(2)",
        title: "Common defence policy",
        content:
          "Provides that the common security and defence policy shall include the progressive framing of a common Union defence policy, leading to a common defence when the European Council, acting unanimously, so decides.",
      },
      {
        number: "222",
        title: "Solidarity clause (TFEU)",
        content:
          "Treaty on the Functioning of the European Union solidarity clause requires Member States to act jointly if a Member State is the object of a terrorist attack or the victim of a natural or man-made disaster. Distinct from but complementary to Article 42(7).",
      },
    ],
  },
  {
    slug: "convention-against-torture",
    title:
      "Convention against Torture and Other Cruel, Inhuman or Degrading Treatment or Punishment",
    shortName: "CAT",
    category: "humanitarian",
    adoptionDate: "1984-12-10",
    entryIntoForce: "1987-06-26",
    depositary: "UN Secretary-General",
    summary:
      "UN convention prohibiting torture by state actors and obliging parties to prevent and punish such acts within their jurisdiction. Establishes universal jurisdiction for torture as a treaty crime and the Committee against Torture (CAT) as the monitoring body.",
    articles: [
      {
        number: "1",
        title: "Definition",
        content:
          "Defines torture as severe physical or mental suffering intentionally inflicted on a person by or with the consent or acquiescence of a public official for purposes such as obtaining information, punishment, intimidation, or discrimination.",
      },
      {
        number: "2",
        title: "Absolute prohibition",
        content:
          "Obliges parties to take effective measures to prevent torture in territory under their jurisdiction. Provides that no exceptional circumstances whatsoever, whether a state of war or threat of war, internal political instability, or any other public emergency, may be invoked as a justification for torture.",
      },
      {
        number: "3",
        title: "Non-refoulement",
        content:
          "Prohibits parties from expelling, returning, or extraditing a person to another State where there are substantial grounds for believing that the person would be in danger of being subjected to torture.",
      },
      {
        number: "5-7",
        title: "Universal jurisdiction",
        content:
          "Obliges parties to establish jurisdiction over torture offences when committed in territory under their jurisdiction, by their nationals, against their nationals, or when the alleged offender is present in territory under their jurisdiction (extradite or prosecute).",
      },
      {
        number: "16",
        title: "Cruel, inhuman, or degrading treatment",
        content:
          "Extends parties' obligations to prevent acts of cruel, inhuman, or degrading treatment or punishment which do not amount to torture as defined in Article 1 when committed by or with the consent or acquiescence of a public official.",
      },
    ],
  },
];
