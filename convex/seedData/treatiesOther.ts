import type { TreatyDocument } from "./types";

export const treatiesOther: TreatyDocument[] = [
  {
    slug: "vcdr",
    title: "Vienna Convention on Diplomatic Relations",
    shortName: "VCDR",
    category: "diplomatic",
    adoptionDate: "1961-04-18",
    entryIntoForce: "1964-04-24",
    depositary: "UN Secretary-General",
    summary:
      "Codifies the framework of diplomatic relations including immunity of diplomatic agents and the inviolability of diplomatic premises, archives, and bags.",
    articles: [
      {
        number: "22",
        title: "Inviolability of premises",
        content:
          "Establishes that the premises of the mission are inviolable. Receiving state agents cannot enter without consent of the head of mission. The receiving state has a special duty to protect the premises against intrusion or damage and to prevent disturbance of the peace or impairment of dignity.",
      },
      {
        number: "27",
        title: "Free communication",
        content:
          "Guarantees free communication of the mission for all official purposes and the inviolability of the diplomatic bag.",
      },
      {
        number: "29",
        title: "Personal inviolability of diplomats",
        content:
          "Provides that the person of a diplomatic agent is inviolable. Diplomatic agents are not liable to any form of arrest or detention; the receiving state must treat them with due respect and prevent any attack on their person, freedom, or dignity.",
      },
      {
        number: "31",
        title: "Immunity from jurisdiction",
        content:
          "Grants diplomatic agents immunity from the criminal jurisdiction of the receiving state, and immunity from civil and administrative jurisdiction with limited exceptions.",
      },
      {
        number: "9",
        title: "Persona non grata",
        content:
          "Allows the receiving state at any time and without explanation to declare any member of the mission persona non grata, requiring the sending state to recall the person or terminate their functions.",
      },
    ],
  },
  {
    slug: "vclt",
    title: "Vienna Convention on the Law of Treaties",
    shortName: "VCLT",
    category: "diplomatic",
    adoptionDate: "1969-05-23",
    entryIntoForce: "1980-01-27",
    depositary: "UN Secretary-General",
    summary:
      "Codifies customary international law on the formation, interpretation, modification, and termination of treaties between states. Widely treated as reflecting customary law even by non-parties (notably the United States).",
    articles: [
      {
        number: "26",
        title: "Pacta sunt servanda",
        content:
          "States that every treaty in force is binding upon the parties to it and must be performed by them in good faith.",
      },
      {
        number: "27",
        title: "Internal law and observance",
        content:
          "Provides that a party may not invoke the provisions of its internal law as justification for failure to perform a treaty.",
      },
      {
        number: "31",
        title: "General rule of interpretation",
        content:
          "Requires treaties to be interpreted in good faith in accordance with the ordinary meaning to be given to the terms in their context and in the light of the treaty's object and purpose.",
      },
      {
        number: "53",
        title: "Peremptory norms (jus cogens)",
        content:
          "Voids any treaty that conflicts with a peremptory norm of general international law accepted and recognized by the international community as a whole as one from which no derogation is permitted.",
      },
      {
        number: "60",
        title: "Termination for material breach",
        content:
          "Allows a party to invoke a material breach of a bilateral treaty by the other party as a ground for terminating or suspending the treaty, with specific rules for multilateral treaties.",
      },
    ],
  },
  {
    slug: "unclos",
    title: "United Nations Convention on the Law of the Sea",
    shortName: "UNCLOS",
    category: "law_of_sea",
    adoptionDate: "1982-12-10",
    entryIntoForce: "1994-11-16",
    depositary: "UN Secretary-General",
    summary:
      "Comprehensive constitution for the oceans. Establishes maritime zones (territorial sea, contiguous zone, EEZ, continental shelf, high seas), navigational rights, and dispute settlement. The US has not ratified but treats most provisions as reflecting customary law.",
    articles: [
      {
        number: "3",
        title: "Territorial sea breadth",
        content:
          "Allows a coastal state to establish the breadth of its territorial sea up to a limit not exceeding 12 nautical miles, measured from baselines determined under the Convention.",
      },
      {
        number: "17-19",
        title: "Innocent passage",
        content:
          "Recognizes the right of ships of all states to innocent passage through the territorial sea. Defines passage as innocent so long as it is not prejudicial to the peace, good order, or security of the coastal state.",
      },
      {
        number: "33",
        title: "Contiguous zone",
        content:
          "Allows a coastal state, in a contiguous zone extending up to 24 nautical miles from baselines, to exercise control to prevent and punish infringement of customs, fiscal, immigration, or sanitary laws within its territory or territorial sea.",
      },
      {
        number: "55-58",
        title: "Exclusive Economic Zone",
        content:
          "Establishes a zone extending up to 200 nautical miles from baselines in which the coastal state has sovereign rights for exploring, exploiting, conserving, and managing natural resources, and jurisdiction over installations, marine scientific research, and protection of the marine environment. All states retain freedom of navigation, overflight, and laying of submarine cables.",
      },
      {
        number: "76",
        title: "Continental shelf",
        content:
          "Defines the continental shelf as the seabed and subsoil beyond the territorial sea throughout the natural prolongation of land territory to the outer edge of the continental margin, or to 200 nautical miles where the outer edge does not extend that far. Allows extension claims up to 350 nautical miles via the CLCS.",
      },
      {
        number: "87",
        title: "High seas freedoms",
        content:
          "Reserves the high seas for peaceful purposes and provides freedoms including navigation, overflight, laying of submarine cables and pipelines, construction of artificial islands, fishing, and scientific research, exercised with due regard for the interests of other states.",
      },
      {
        number: "121",
        title: "Regime of islands",
        content:
          "Provides that an island generates the same maritime zones as other land territory, but rocks which cannot sustain human habitation or economic life of their own do not generate an EEZ or continental shelf. Central to the 2016 South China Sea Arbitration award.",
      },
      {
        number: "287",
        title: "Choice of dispute settlement",
        content:
          "Allows parties to choose between the International Tribunal for the Law of the Sea (ITLOS), the ICJ, an arbitral tribunal under Annex VII, or a special arbitral tribunal under Annex VIII for compulsory dispute settlement.",
      },
    ],
  },
  {
    slug: "outer-space-treaty",
    title:
      "Treaty on Principles Governing the Activities of States in the Exploration and Use of Outer Space, Including the Moon and Other Celestial Bodies",
    shortName: "Outer Space Treaty",
    category: "space",
    adoptionDate: "1967-01-27",
    entryIntoForce: "1967-10-10",
    depositary: "UK, RU, US",
    summary:
      "Foundational treaty for international space law. Bars national appropriation of celestial bodies, restricts certain weapons in space, and assigns state responsibility for national space activities including private actors.",
    articles: [
      {
        number: "II",
        title: "Non-appropriation",
        content:
          "States that outer space, including the Moon and other celestial bodies, is not subject to national appropriation by claim of sovereignty, by means of use or occupation, or by any other means.",
      },
      {
        number: "IV",
        title: "Weapons in space",
        content:
          "Prohibits placing in orbit around the Earth any objects carrying nuclear weapons or any other kinds of weapons of mass destruction, installing such weapons on celestial bodies, and stationing them in outer space in any other manner. Reserves the Moon and other celestial bodies for peaceful purposes; bars military bases, weapons testing, and military maneuvers there.",
      },
      {
        number: "VI",
        title: "State responsibility for activities",
        content:
          "Makes states internationally responsible for national activities in outer space, whether carried on by governmental or non-governmental entities, and requires authorization and continuing supervision of non-governmental space activities.",
      },
      {
        number: "VII",
        title: "Liability for damage",
        content:
          "Establishes international liability for each state party that launches or procures the launching of an object into outer space, and from whose territory or facility an object is launched, for damage to another party.",
      },
    ],
  },
  {
    slug: "rome-statute-icc",
    title: "Rome Statute of the International Criminal Court",
    shortName: "Rome Statute (ICC)",
    category: "other",
    adoptionDate: "1998-07-17",
    entryIntoForce: "2002-07-01",
    depositary: "UN Secretary-General",
    summary:
      "Establishes the International Criminal Court (The Hague) with jurisdiction over genocide, crimes against humanity, war crimes, and the crime of aggression. Major non-parties include US, RU, CN, IN, IL.",
    articles: [
      {
        number: "5",
        title: "Crimes within ICC jurisdiction",
        content:
          "Confers jurisdiction over the most serious crimes of concern to the international community as a whole: genocide, crimes against humanity, war crimes, and the crime of aggression (jurisdiction over aggression activated 2018 with limitations).",
      },
      {
        number: "7",
        title: "Crimes against humanity",
        content:
          "Defines crimes against humanity as enumerated acts when committed as part of a widespread or systematic attack directed against any civilian population, with knowledge of the attack. Includes severe deprivation of physical liberty, persecution on protected grounds, enforced disappearance, and apartheid.",
      },
      {
        number: "8",
        title: "War crimes",
        content:
          "Defines war crimes including grave breaches of the Geneva Conventions, other serious violations of the laws and customs applicable in international armed conflict, and serious violations applicable in armed conflict not of an international character.",
      },
      {
        number: "8 bis",
        title: "Crime of aggression",
        content:
          "Defines the crime of aggression as the planning, preparation, initiation, or execution of an act of aggression which by its character, gravity, and scale constitutes a manifest violation of the UN Charter, by a person in a position effectively to exercise control over or direct the political or military action of a state.",
      },
      {
        number: "12-13",
        title: "Preconditions to jurisdiction",
        content:
          "Provides that the Court may exercise jurisdiction over Article 5 crimes when committed by a national of a state party, on the territory of a state party, or referred by the UN Security Council acting under Chapter VII. A non-party may accept jurisdiction by declaration.",
      },
      {
        number: "17",
        title: "Complementarity",
        content:
          "Renders cases inadmissible where they are being or have been genuinely investigated or prosecuted by a state with jurisdiction, unless the state is unwilling or unable to genuinely carry out the investigation or prosecution.",
      },
      {
        number: "27",
        title: "Irrelevance of official capacity",
        content:
          "Removes any immunity based on official capacity (head of state, government, parliament, government official) as a bar to the Court's jurisdiction.",
      },
    ],
  },
];
