import type { TreatyDocument } from "./types";

export const treatiesUN: TreatyDocument[] = [
  {
    slug: "un-charter",
    title: "Charter of the United Nations",
    shortName: "UN Charter",
    category: "un_system",
    adoptionDate: "1945-06-26",
    entryIntoForce: "1945-10-24",
    depositary: "United States",
    summary:
      "Founding instrument of the United Nations. Establishes purposes (international peace and security), principles (sovereign equality, peaceful settlement, prohibition on use of force), and the UN's principal organs. Articles 2(4), 39-51 form the core jus ad bellum framework.",
    fullTextUrl: "https://www.un.org/en/about-us/un-charter/full-text",
    articles: [
      {
        number: "2(3)",
        title: "Peaceful settlement of disputes",
        content:
          "Obliges all UN members to settle international disputes by peaceful means so as not to endanger international peace, security, or justice.",
      },
      {
        number: "2(4)",
        title: "Prohibition on use of force",
        content:
          "Bans the threat or use of force by states against the territorial integrity or political independence of another state. The cornerstone of jus ad bellum and the foundation for treating cross-border armed action as an internationally wrongful act absent UNSC authorization or self-defence.",
      },
      {
        number: "2(7)",
        title: "Domestic jurisdiction reservation",
        content:
          "Bars UN intervention in matters essentially within a state's domestic jurisdiction, but expressly does not prejudice Chapter VII enforcement measures authorized by the Security Council.",
      },
      {
        number: "39",
        title: "UNSC determination of threats",
        content:
          "Empowers the Security Council to determine the existence of a threat to the peace, breach of the peace, or act of aggression, and to decide measures under Articles 41 or 42 to maintain or restore international peace and security.",
      },
      {
        number: "41",
        title: "Non-forcible UNSC measures",
        content:
          "Authorizes the Security Council to impose measures short of armed force, including economic sanctions, severance of communications and transport links, and breaking of diplomatic relations.",
      },
      {
        number: "42",
        title: "UNSC authorization of force",
        content:
          "Allows the Security Council, when Article 41 measures are inadequate, to authorize action by air, sea, or land forces of UN members. Has been used to authorize Korea (1950), Gulf (1990), and Libya (2011) operations among others.",
      },
      {
        number: "51",
        title: "Inherent right of self-defence",
        content:
          "Preserves the inherent right of individual or collective self-defence if an armed attack occurs against a UN member, until the Security Council acts. Measures must be reported to the Security Council. Forms the legal basis for NATO Article 5, US-Japan, US-ROK and other collective defence treaties.",
      },
      {
        number: "103",
        title: "Charter supremacy",
        content:
          "Provides that obligations under the UN Charter prevail over conflicting obligations under any other international agreement.",
      },
    ],
  },
  {
    slug: "genocide-convention",
    title: "Convention on the Prevention and Punishment of the Crime of Genocide",
    shortName: "Genocide Convention",
    category: "un_system",
    adoptionDate: "1948-12-09",
    entryIntoForce: "1951-01-12",
    depositary: "UN Secretary-General",
    summary:
      "Codifies genocide as an international crime in peace or wartime. Defines the prohibited acts and the special intent ('dolus specialis') required, obliges states to prevent and punish, and removes any official-capacity immunity.",
    articles: [
      {
        number: "I",
        title: "Genocide as international crime",
        content:
          "Affirms genocide is a crime under international law, in peace or war, that all parties undertake to prevent and punish.",
      },
      {
        number: "II",
        title: "Definition and enumerated acts",
        content:
          "Defines genocide as specified acts committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group as such. The enumerated acts cover serious physical and psychological harm, conditions calculated to cause group destruction, prevention of births, and forcible transfer of children.",
      },
      {
        number: "III",
        title: "Punishable inchoate offences",
        content:
          "Extends criminal liability to conspiracy, direct and public incitement, attempt, and complicity in genocide.",
      },
      {
        number: "IV",
        title: "No official-capacity immunity",
        content:
          "Removes immunity for genocide for constitutional rulers, public officials, and private individuals alike.",
      },
      {
        number: "VIII",
        title: "Recourse to UN organs",
        content:
          "Allows any party to call on competent UN organs to take Charter-based action to prevent or suppress genocide.",
      },
      {
        number: "IX",
        title: "ICJ jurisdiction",
        content:
          "Confers jurisdiction on the International Court of Justice over disputes regarding interpretation, application, or fulfilment of the Convention. Forms the basis for ICJ cases such as Bosnia v. Serbia and The Gambia v. Myanmar.",
      },
    ],
  },
  {
    slug: "refugee-convention",
    title: "Convention Relating to the Status of Refugees (1951) and 1967 Protocol",
    shortName: "Refugee Convention",
    category: "un_system",
    adoptionDate: "1951-07-28",
    entryIntoForce: "1954-04-22",
    depositary: "UN Secretary-General",
    summary:
      "Defines the international legal concept of refugee and the rights/obligations attached. Article 33's non-refoulement principle is regarded as customary international law and binds even non-parties.",
    articles: [
      {
        number: "1A(2)",
        title: "Refugee definition",
        content:
          "Defines a refugee as someone outside their country of nationality with a well-founded fear of persecution on grounds of race, religion, nationality, membership of a particular social group, or political opinion, and unable or unwilling to seek protection from that country.",
      },
      {
        number: "33",
        title: "Non-refoulement",
        content:
          "Prohibits states from returning a refugee to territories where their life or freedom would be threatened on protected grounds. The exception applies where there are reasonable grounds to regard the refugee as a danger to the security of the host country.",
      },
      {
        number: "1967 Protocol",
        title: "Universal scope",
        content:
          "Removes the original 1951 geographic and temporal limitations, making the Convention apply universally to all refugees.",
      },
    ],
  },
  {
    slug: "hague-1907-iv",
    title: "Hague Convention IV: Respecting the Laws and Customs of War on Land",
    shortName: "Hague IV (1907)",
    category: "law_of_war",
    adoptionDate: "1907-10-18",
    entryIntoForce: "1910-01-26",
    summary:
      "Codifies the laws and customs of land warfare. Annexed Hague Regulations restrict means of warfare, protect non-combatants, and govern belligerent occupation. The Martens Clause preserves customary protection where treaty does not apply.",
    articles: [
      {
        number: "Preamble (Martens Clause)",
        title: "Martens Clause",
        content:
          "Provides that in cases not covered by the Regulations, inhabitants and belligerents remain under customary protection derived from the principles of the law of nations, the laws of humanity, and dictates of public conscience.",
      },
      {
        number: "Annex Art. 22",
        title: "Limited means of warfare",
        content:
          "Establishes that the right of belligerents to adopt means of injuring the enemy is not unlimited, anchoring the principle of limitation in IHL.",
      },
      {
        number: "Annex Art. 23",
        title: "Prohibited means and methods",
        content:
          "Forbids the use of poison or poisoned weapons, treacherous killing or wounding of enemy nationals, weapons calculated to cause superfluous suffering, and destruction or seizure of enemy property unless imperatively required by military necessity.",
      },
      {
        number: "Annex Art. 25",
        title: "Bombardment of undefended places",
        content:
          "Prohibits attack or bombardment by any means of undefended towns, villages, dwellings, or buildings.",
      },
      {
        number: "Annex Art. 42-43",
        title: "Belligerent occupation",
        content:
          "Defines occupation as territory placed under the authority of a hostile army, and obliges the occupant to restore and ensure public order while respecting the laws in force unless absolutely prevented.",
      },
    ],
  },
];
