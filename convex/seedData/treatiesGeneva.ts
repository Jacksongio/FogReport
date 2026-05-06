import type { TreatyDocument } from "./types";

export const treatiesGeneva: TreatyDocument[] = [
  {
    slug: "geneva-i-1949",
    title:
      "Geneva Convention I for the Amelioration of the Condition of the Wounded and Sick in Armed Forces in the Field",
    shortName: "Geneva I",
    category: "humanitarian",
    adoptionDate: "1949-08-12",
    entryIntoForce: "1950-10-21",
    depositary: "Switzerland",
    summary:
      "Provides protection for wounded and sick members of armed forces on land, and for medical and religious personnel, units, and transports. Common Article 3 sets a baseline standard of humane treatment in non-international armed conflict.",
    articles: [
      {
        number: "Common 2",
        title: "Scope of application",
        content:
          "Applies the Conventions to all cases of declared war or any other armed conflict between two or more parties, even if a state of war is not recognized by one of them, and to occupation even if unopposed.",
      },
      {
        number: "Common 3",
        title: "Minimum humane treatment in non-international conflict",
        content:
          "Sets a minimum baseline applicable in armed conflicts not of an international character. Protects persons taking no active part in hostilities, including those who have laid down arms or are out of action, and obliges humane treatment without adverse distinction. Considered customary IHL applicable to all armed conflicts.",
      },
      {
        number: "12",
        title: "Protection of the wounded and sick",
        content:
          "Obliges parties to respect, protect, and care for wounded and sick members of armed forces without adverse distinction. Bars attacks and ill-treatment.",
      },
      {
        number: "19-23",
        title: "Medical units and zones",
        content:
          "Protects fixed medical establishments and mobile medical units from attack. Authorizes the establishment of hospital zones and localities to shelter the wounded and sick.",
      },
      {
        number: "38-39",
        title: "Distinctive emblems",
        content:
          "Recognizes the red cross, red crescent, and (via Additional Protocol III) the red crystal as protective emblems for medical services.",
      },
    ],
  },
  {
    slug: "geneva-ii-1949",
    title:
      "Geneva Convention II for the Amelioration of the Condition of Wounded, Sick and Shipwrecked Members of Armed Forces at Sea",
    shortName: "Geneva II",
    category: "humanitarian",
    adoptionDate: "1949-08-12",
    entryIntoForce: "1950-10-21",
    depositary: "Switzerland",
    summary:
      "Extends Geneva I-style protections to wounded, sick, and shipwrecked members of armed forces at sea. Protects hospital ships, coastal rescue craft, and naval medical personnel.",
    articles: [
      {
        number: "12",
        title: "Protection at sea",
        content:
          "Obliges parties to respect, protect, and care for wounded, sick, and shipwrecked members of armed forces at sea without adverse distinction.",
      },
      {
        number: "22-35",
        title: "Hospital ships",
        content:
          "Protects hospital ships from attack provided their names and characteristics have been notified to the parties. Requires ships to bear the distinctive emblem and not be used for any military purpose.",
      },
      {
        number: "36-37",
        title: "Medical personnel and chaplains",
        content:
          "Protects religious, medical, and hospital personnel of hospital ships and their crews from attack and capture while engaged in their duties.",
      },
    ],
  },
  {
    slug: "geneva-iii-1949",
    title: "Geneva Convention III Relative to the Treatment of Prisoners of War",
    shortName: "Geneva III",
    category: "humanitarian",
    adoptionDate: "1949-08-12",
    entryIntoForce: "1950-10-21",
    depositary: "Switzerland",
    summary:
      "Defines who qualifies as a prisoner of war and the standards for their humane treatment. Governs capture, internment conditions, labour, discipline, and repatriation.",
    articles: [
      {
        number: "4",
        title: "POW status",
        content:
          "Defines categories of persons entitled to POW status on capture, including members of regular armed forces, militias and volunteer corps meeting the four-criteria test (responsible command, distinctive sign, open carry of arms, conduct in accordance with laws of war), levée en masse, and others.",
      },
      {
        number: "5",
        title: "Doubt as to status",
        content:
          "Provides that where doubt arises as to whether a captured person qualifies as a POW, that person enjoys the Convention's protection until status is determined by a competent tribunal.",
      },
      {
        number: "13",
        title: "Humane treatment",
        content:
          "Requires POWs to be treated humanely at all times. Forbids acts or omissions causing death or seriously endangering health, including biological experiments. Prohibits acts of violence, intimidation, insults, and public curiosity.",
      },
      {
        number: "17",
        title: "Questioning of POWs",
        content:
          "Limits required disclosures by POWs to surname, first names, rank, date of birth, and serial number. Prohibits physical or mental coercion to obtain any other information; non-disclosure cannot be a basis for adverse treatment.",
      },
      {
        number: "118",
        title: "Repatriation after hostilities",
        content:
          "Obliges release and repatriation of POWs without delay after the cessation of active hostilities.",
      },
      {
        number: "130",
        title: "Grave breaches",
        content:
          "Lists grave breaches against POWs that trigger universal jurisdiction and individual criminal responsibility, including wilful killing, torture, biological experiments, and unjust deprivation of fair-trial rights.",
      },
    ],
  },
  {
    slug: "geneva-iv-1949",
    title:
      "Geneva Convention IV Relative to the Protection of Civilian Persons in Time of War",
    shortName: "Geneva IV",
    category: "humanitarian",
    adoptionDate: "1949-08-12",
    entryIntoForce: "1950-10-21",
    depositary: "Switzerland",
    summary:
      "Protects civilians in the hands of a party to the conflict or occupying power of which they are not nationals. Governs occupation of territory, treatment of internees, and obligations to the civilian population.",
    articles: [
      {
        number: "4",
        title: "Protected persons",
        content:
          "Defines protected persons as those who, at a given moment and in any manner, find themselves in the hands of a party to the conflict or occupying power of which they are not nationals.",
      },
      {
        number: "27",
        title: "General humane treatment",
        content:
          "Obliges respect for the persons, honour, family rights, religious convictions, and customs of protected persons. Requires humane treatment at all times and protection from acts of violence, threats, insults, and public curiosity.",
      },
      {
        number: "33",
        title: "No collective punishment",
        content:
          "Prohibits punishment of protected persons for offences they have not personally committed. Bars all collective penalties, intimidation, terror measures, and reprisals against protected persons or their property.",
      },
      {
        number: "47",
        title: "Inalienability of rights under occupation",
        content:
          "Provides that protected persons in occupied territory cannot be deprived of the Convention's benefits by any change in the institutions or government of the territory, by agreement, or by annexation.",
      },
      {
        number: "49",
        title: "Transfers and deportations",
        content:
          "Prohibits individual or mass forcible transfers and deportations of protected persons from occupied territory, regardless of motive. Bars an occupying power from transferring its own civilian population into the territory it occupies.",
      },
      {
        number: "53",
        title: "Destruction of property",
        content:
          "Prohibits destruction by the occupying power of real or personal property belonging to private persons, the state, or other public authorities, except where rendered absolutely necessary by military operations.",
      },
      {
        number: "55",
        title: "Food and medical supplies",
        content:
          "Obliges the occupying power to ensure the food and medical supplies of the population to the fullest extent of the means available, in particular bringing in necessary supplies if resources are inadequate.",
      },
      {
        number: "78",
        title: "Security internment",
        content:
          "Permits assigned residence or internment only for imperative reasons of security. Decisions must be made according to a regular procedure with right of appeal and periodic review by a competent body.",
      },
      {
        number: "147",
        title: "Grave breaches",
        content:
          "Lists grave breaches against protected persons triggering universal jurisdiction, including wilful killing, torture, unlawful deportation or transfer, taking of hostages, and extensive destruction of property not justified by military necessity.",
      },
    ],
  },
  {
    slug: "additional-protocol-i-1977",
    title:
      "Protocol Additional to the Geneva Conventions of 12 August 1949, and Relating to the Protection of Victims of International Armed Conflicts (Protocol I)",
    shortName: "Additional Protocol I",
    category: "humanitarian",
    adoptionDate: "1977-06-08",
    entryIntoForce: "1978-12-07",
    depositary: "Switzerland",
    summary:
      "Updates and develops IHL applicable to international armed conflicts. Codifies the principles of distinction, proportionality, and precaution in attack, restricts means and methods of warfare, and protects civilian objects.",
    articles: [
      {
        number: "35",
        title: "Basic rules on means and methods",
        content:
          "Limits parties' choice of means and methods of warfare. Prohibits weapons or methods of warfare of a nature to cause superfluous injury, and methods or means intended or expected to cause widespread, long-term, and severe damage to the natural environment.",
      },
      {
        number: "36",
        title: "Review of new weapons",
        content:
          "Obliges parties to determine in the study, development, acquisition, or adoption of any new weapon, means, or method of warfare whether its employment would be prohibited by international law.",
      },
      {
        number: "48",
        title: "Distinction",
        content:
          "Codifies the basic rule of distinction: parties must at all times distinguish between civilian population and combatants and between civilian objects and military objectives, and direct operations only against military objectives.",
      },
      {
        number: "51",
        title: "Protection of the civilian population",
        content:
          "Bans attacks directed against the civilian population. Prohibits indiscriminate attacks, including those that strike military objectives and civilians without distinction, and attacks expected to cause incidental civilian harm excessive in relation to concrete and direct military advantage anticipated.",
      },
      {
        number: "52",
        title: "Definition of military objective",
        content:
          "Defines civilian objects as those that are not military objectives. Limits military objectives to objects which by their nature, location, purpose, or use make an effective contribution to military action and whose destruction offers a definite military advantage.",
      },
      {
        number: "54",
        title: "Objects indispensable to civilian survival",
        content:
          "Prohibits attack, destruction, removal, or rendering useless of objects indispensable to the survival of the civilian population, such as food, crops, drinking water installations and supplies, and irrigation works.",
      },
      {
        number: "56",
        title: "Works and installations containing dangerous forces",
        content:
          "Provides special protection for dams, dykes, and nuclear electrical generating stations, even where they are military objectives, if attack may cause severe losses among the civilian population.",
      },
      {
        number: "57",
        title: "Precautions in attack",
        content:
          "Requires constant care to spare the civilian population, civilians, and civilian objects. Mandates verification of objectives, choice of means and methods to minimize incidental civilian harm, cancellation of attacks expected to cause excessive incidental harm, and effective advance warning where circumstances permit.",
      },
    ],
  },
  {
    slug: "additional-protocol-ii-1977",
    title:
      "Protocol Additional to the Geneva Conventions of 12 August 1949, and Relating to the Protection of Victims of Non-International Armed Conflicts (Protocol II)",
    shortName: "Additional Protocol II",
    category: "humanitarian",
    adoptionDate: "1977-06-08",
    entryIntoForce: "1978-12-07",
    depositary: "Switzerland",
    summary:
      "Develops Common Article 3 standards for non-international armed conflicts of a certain intensity (organized armed groups, sustained operations, territorial control). Provides fundamental guarantees and protections to civilian population and persons not taking active part in hostilities.",
    articles: [
      {
        number: "1",
        title: "Material field of application",
        content:
          "Applies to non-international armed conflicts on the territory of a state party between its armed forces and dissident armed forces or other organized armed groups under responsible command exercising control over a part of its territory enabling sustained military operations. Does not apply to internal disturbances and tensions.",
      },
      {
        number: "4",
        title: "Fundamental guarantees",
        content:
          "Protects all persons not taking direct part in hostilities. Prohibits violence to life, health, and physical or mental well-being; collective punishments; taking of hostages; acts of terrorism; outrages upon personal dignity; and threats to commit these acts.",
      },
      {
        number: "13",
        title: "Protection of the civilian population",
        content:
          "Bars making the civilian population, individual civilians, or acts intended primarily to spread terror among them the object of attack.",
      },
      {
        number: "14",
        title: "Objects indispensable to survival",
        content:
          "Prohibits as a method of combat the starvation of civilians, and bars attack, destruction, removal, or rendering useless of objects indispensable to civilian survival.",
      },
      {
        number: "17",
        title: "Forced displacement",
        content:
          "Bars the displacement of the civilian population for reasons related to the conflict unless required by the security of the civilians involved or imperative military reasons.",
      },
    ],
  },
];
