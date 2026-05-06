import type { HistoricalIncident } from "./types";

export const HISTORICAL_INCIDENTS: HistoricalIncident[] = [
  {
    slug: "cuban-missile-crisis",
    name: "Cuban Missile Crisis",
    startDate: "1962-10-16",
    endDate: "1962-10-28",
    region: "Caribbean / North America",
    type: "nuclear_crisis",
    primaryParties: ["US", "RU (USSR)", "CU"],
    summary:
      "13-day confrontation triggered by Soviet deployment of MRBMs and IRBMs to Cuba. Resolved through naval quarantine, secret negotiation, and reciprocal removal of US Jupiter missiles from Türkiye.",
    keyEvents: [
      "U-2 imagery confirms missile sites (October 14)",
      "ExComm convened (October 16)",
      "Naval quarantine announced (October 22)",
      "U-2 shot down over Cuba; Black Saturday (October 27)",
      "Khrushchev agrees to withdraw missiles (October 28)",
    ],
    outcome:
      "Soviet missiles withdrawn under verification; US publicly pledged not to invade Cuba and privately removed Jupiter MRBMs from Türkiye. Established the Hotline (1963) and accelerated PTBT/NPT negotiations.",
    lessons: [
      "Quarantine (vs. blockade) preserves diplomatic flexibility under international law",
      "Back-channel diplomacy can de-escalate when public positions become rigid",
      "Reciprocal concessions can be tacit and asymmetric",
      "ExComm-style structured deliberation reduces groupthink",
    ],
  },
  {
    slug: "yom-kippur-war",
    name: "Yom Kippur War",
    startDate: "1973-10-06",
    endDate: "1973-10-25",
    region: "Middle East",
    type: "interstate_war",
    primaryParties: ["IL", "EG", "SY"],
    summary:
      "Egyptian and Syrian surprise attacks on Yom Kippur, initially overrunning Israeli defenses. Israel rallied with US emergency resupply (Nickel Grass airlift) and counter-attacks crossing the Suez Canal.",
    keyEvents: [
      "Egyptian crossing of the Suez Canal (October 6)",
      "Syrian armored offensive on the Golan Heights",
      "US Nickel Grass airlift begins (October 14)",
      "Israeli encirclement of Egyptian Third Army",
      "UN Security Council Resolution 338 ceasefire (October 22)",
    ],
    outcome:
      "Tactical Israeli reversal; strategic shift opening path to Camp David Accords (1978) and Egypt-Israel peace (1979). Highlighted the role of strategic airlift in coalition warfare.",
    lessons: [
      "Intelligence warning failures are common when assumptions go unchecked",
      "Strategic airlift can decide modern conventional wars",
      "Battlefield reversal can create diplomatic opening",
      "Anti-tank guided missiles transformed the tactical balance",
    ],
  },
  {
    slug: "falklands-war",
    name: "Falklands War",
    startDate: "1982-04-02",
    endDate: "1982-06-14",
    region: "South Atlantic",
    type: "interstate_war",
    primaryParties: ["GB", "AR"],
    summary:
      "Argentine forces seized the Falkland Islands; UK assembled a task force and recovered the islands after sea, air, and land combat at extreme distance from home.",
    keyEvents: [
      "Argentine landing at Port Stanley (April 2)",
      "UNSC Resolution 502 demanding withdrawal (April 3)",
      "ARA General Belgrano sunk by HMS Conqueror (May 2)",
      "HMS Sheffield struck by Exocet (May 4)",
      "British landings at San Carlos (May 21)",
      "Argentine surrender at Stanley (June 14)",
    ],
    outcome:
      "British sovereignty restored; Argentine military government collapsed (1983). Demonstrated value of nuclear-powered submarines, sea-based airpower (Harrier), and global expeditionary logistics.",
    lessons: [
      "Long-distance expeditionary operations require sustained sealift and air-refueling",
      "Surface ships are vulnerable to subsonic anti-ship missiles without layered defense",
      "Submarine threat alone can dictate adversary fleet posture",
      "Political legitimacy (UNSC Resolution 502) matters for international support",
    ],
  },
  {
    slug: "operation-eldorado-canyon",
    name: "Operation El Dorado Canyon",
    startDate: "1986-04-15",
    endDate: "1986-04-15",
    region: "North Africa",
    type: "intervention",
    primaryParties: ["US", "LY"],
    summary:
      "US strikes against targets in Tripoli and Benghazi in retaliation for Libya's role in the West Berlin discotheque bombing. Mission required overflight refusals from France and Spain, forcing F-111 strike packages to fly extended routes from UK.",
    keyEvents: [
      "F-111Fs from RAF Lakenheath strike Tripoli targets",
      "A-6Es from USS America/Coral Sea strike Benghazi",
      "F-111F lost over Mediterranean",
    ],
    outcome:
      "Strikes signaled US willingness to use force against state sponsors of terror; demonstrated political costs of overflight denial within NATO.",
    lessons: [
      "Coalition fragility on contested missions affects mission planning",
      "Long-range air operations are feasible but degrade safety",
      "Targeted strikes can deter and signal without large-scale escalation",
    ],
  },
  {
    slug: "first-gulf-war",
    name: "Persian Gulf War (Operation Desert Storm)",
    startDate: "1991-01-17",
    endDate: "1991-02-28",
    region: "Middle East",
    type: "interstate_war",
    primaryParties: ["US", "GB", "FR", "SA", "KW", "IQ"],
    summary:
      "US-led 35-nation coalition expelled Iraqi forces from Kuwait under UNSC authorization. 39-day air campaign followed by 100-hour ground war.",
    keyEvents: [
      "UNSC Resolution 678 authorizes use of force (November 1990)",
      "Air campaign begins with F-117 stealth strikes on Baghdad (January 17)",
      "Scud attacks on Israel and Saudi Arabia",
      "Coalition ground offensive (February 24)",
      "Iraqi withdrawal and ceasefire (February 28)",
    ],
    outcome:
      "Kuwaiti sovereignty restored; UNSC sanctions and weapons-inspection regime imposed on Iraq. Validated AirLand Battle doctrine and PGM-heavy air campaign.",
    lessons: [
      "UNSC authorization legitimizes broad coalitions",
      "Information dominance + precision-guided munitions transform conventional warfare",
      "Strategic communications (CNN effect) shape political durability",
      "Logistics capacity is the decisive constraint on expeditionary scale",
    ],
  },
  {
    slug: "kosovo-1999",
    name: "NATO Kosovo Air Campaign (Operation Allied Force)",
    startDate: "1999-03-24",
    endDate: "1999-06-10",
    region: "Europe (Balkans)",
    type: "intervention",
    primaryParties: ["NATO", "RS (FRY)"],
    summary:
      "78-day NATO air campaign against Yugoslav forces and infrastructure, conducted without UNSC authorization, to halt ethnic cleansing in Kosovo.",
    keyEvents: [
      "Strikes commence after Rambouillet talks fail (March 24)",
      "F-117A shot down over Serbia (March 27)",
      "Chinese Embassy bombed in Belgrade (May 7)",
      "Russia mediates ceasefire; KFOR deployment (June 10)",
    ],
    outcome:
      "Yugoslav forces withdrew from Kosovo; UN Security Council Resolution 1244 authorized KFOR. Demonstrated NATO unity but also exposed targeting and air-defense limitations.",
    lessons: [
      "Coalition air operations without UNSC authorization carry political risk",
      "Sustained air pressure alone may not coerce committed adversaries quickly",
      "Strategic targeting requires excellent intelligence to avoid friendly civilian harm",
      "Stealth aircraft are not invulnerable",
    ],
  },
  {
    slug: "second-gulf-war",
    name: "Iraq War (Operation Iraqi Freedom)",
    startDate: "2003-03-20",
    endDate: "2011-12-15",
    region: "Middle East",
    type: "intervention",
    primaryParties: ["US", "GB", "AU", "PL", "IQ"],
    summary:
      "US-led coalition invasion of Iraq that toppled the Ba'athist regime, followed by an 8-year occupation, insurgency, and partial counterinsurgency recovery (Surge, 2007-08).",
    keyEvents: [
      "Coalition invasion begins (March 20)",
      "Fall of Baghdad (April 9)",
      "De-Ba'athification and dissolution of Iraqi Army (May)",
      "Sectarian civil war intensifies (2006-2007)",
      "Surge under General Petraeus (2007-2008)",
      "US withdrawal (December 2011)",
    ],
    outcome:
      "Saddam Hussein removed; Iraq unstable for over a decade. ISIS emergence (2013-14) traced partially to post-invasion power vacuum.",
    lessons: [
      "Regime change without occupation planning produces extended insurgency",
      "Disbanding host-state security apparatus accelerates instability",
      "Counterinsurgency requires political reconciliation, not only military pressure",
      "Coalition legitimacy decays without UNSC authorization or convincing casus belli",
    ],
  },
  {
    slug: "russia-georgia-2008",
    name: "Russia-Georgia War",
    startDate: "2008-08-07",
    endDate: "2008-08-12",
    region: "Caucasus",
    type: "interstate_war",
    primaryParties: ["RU", "GE"],
    summary:
      "Russian invasion of Georgia following Georgian operations in South Ossetia. Five-day war ended with Russian recognition of South Ossetia and Abkhazia.",
    keyEvents: [
      "Georgian operation in Tskhinvali (August 7-8)",
      "Russian armored thrust through Roki Tunnel (August 8)",
      "Russian capture of Gori; cyber and EW operations",
      "EU-mediated ceasefire (August 12)",
    ],
    outcome:
      "Russia recognized South Ossetia and Abkhazia; Georgia retained sovereignty over remainder. NATO PfP/MAP path frozen for both Georgia and Ukraine. Foreshadowed 2014 Crimea operation.",
    lessons: [
      "Cyber and information operations now precede kinetic operations",
      "NATO partner status without Article 5 protection is vulnerable to coercion",
      "Frozen conflicts can be unfrozen on short notice",
      "Russia is willing to use force to prevent NATO eastward enlargement",
    ],
  },
  {
    slug: "crimea-annexation-2014",
    name: "Russian Annexation of Crimea",
    startDate: "2014-02-20",
    endDate: "2014-03-18",
    region: "Europe",
    type: "annexation",
    primaryParties: ["RU", "UA"],
    summary:
      "Russian special-purpose forces in unmarked uniforms ('little green men') seized Crimean parliament, military bases, and airports. A subsequent referendum (declared illegitimate by UN GA) provided pretext for annexation.",
    keyEvents: [
      "Yanukovych flees Ukraine (February 21)",
      "Unmarked forces seize Simferopol Parliament (February 27)",
      "Crimean referendum (March 16)",
      "Russian Federal Council ratifies annexation treaty (March 21)",
      "UN General Assembly Resolution 68/262 declares the referendum invalid",
    ],
    outcome:
      "Russia controls Crimea; UN GA non-recognition; sectoral and individual sanctions imposed by US, EU, Canada, Japan, others. Onset of Donbas separatist conflict.",
    lessons: [
      "Hybrid warfare can present a fait accompli before international response",
      "Budapest Memorandum security assurances did not deter aggression",
      "Sanctions response was incremental and insufficient as deterrence",
      "Loss of strategic geography (Crimea) has decade-scale consequences",
    ],
  },
  {
    slug: "russia-ukraine-2022",
    name: "Russian Invasion of Ukraine",
    startDate: "2022-02-24",
    region: "Europe",
    type: "interstate_war",
    primaryParties: ["RU", "UA"],
    summary:
      "Full-scale Russian invasion of Ukraine on multiple axes (north toward Kyiv, east in Donbas, south through Crimea). Ukrainian defense halted the Kyiv axis; war became an attritional conflict in eastern and southern Ukraine.",
    keyEvents: [
      "Multi-axis invasion (February 24)",
      "Battle of Kyiv ends with Russian withdrawal (April)",
      "Liberation of Kharkiv Oblast (September 2022)",
      "Liberation of Kherson (November 2022)",
      "Wagner mutiny and march on Moscow (June 2023)",
      "Ukrainian incursion into Kursk Oblast (August 2024)",
    ],
    outcome:
      "Ongoing as of 2026. Major effects: NATO accession of FI/SE; Western sanctions regime; Russian economy on war footing; emergence of mass UAV warfare and naval-drone operations in the Black Sea.",
    lessons: [
      "Sanctions and export controls degrade adversary capabilities over years, not weeks",
      "Drone warfare at scale has transformed land combat",
      "Ammunition production capacity is the decisive industrial factor",
      "Allied unity requires political work and is vulnerable to wartime fatigue",
      "Information operations matter as much as kinetic outcomes",
    ],
  },
  {
    slug: "october-7-2023",
    name: "Hamas Attack on Israel and Subsequent Gaza Conflict",
    startDate: "2023-10-07",
    region: "Middle East",
    type: "interstate_war",
    primaryParties: ["IL", "PS"],
    summary:
      "Coordinated Hamas attack on Israeli border communities and military bases triggered war in Gaza. Subsequent regional escalation involved Hezbollah, Houthis, IRGC, and direct Iran-Israel exchanges in 2024.",
    keyEvents: [
      "Hamas attack on Israel (October 7, 2023)",
      "Israel ground operation into Gaza (late October 2023)",
      "Hezbollah-IDF cross-border exchanges escalate (2024)",
      "Iran-Israel direct missile/drone exchanges (April 2024, October 2024)",
      "Houthi anti-shipping campaign in Red Sea",
      "Operation Northern Arrows against Hezbollah (September 2024)",
    ],
    outcome:
      "Ongoing. Massive humanitarian crisis in Gaza; ICJ provisional measures; ICC arrest warrants. Regional integration of Israeli BMD with Western partners (Operation Prosperity Guardian, Iron Beam progress).",
    lessons: [
      "Layered air defense (Iron Dome, David's Sling, Arrow) requires deep magazine and replenishment",
      "Multifront attrition is sustainable only with strong allied logistic support",
      "Counter-tunnel operations remain operationally costly",
      "Information warfare and lawfare are integral to modern operations",
    ],
  },
  {
    slug: "houthi-red-sea-campaign",
    name: "Houthi Anti-Shipping Campaign / Operation Prosperity Guardian",
    startDate: "2023-11-19",
    region: "Middle East",
    type: "naval_incident",
    primaryParties: ["YE (Houthis)", "US", "GB", "FR", "various"],
    summary:
      "Houthi anti-ship missile and drone campaign in the southern Red Sea and Gulf of Aden, targeting commercial shipping in solidarity with Hamas. US-led Operation Prosperity Guardian (December 2023) and EU Operation Aspides (February 2024) established maritime defense.",
    keyEvents: [
      "Galaxy Leader hijacking (November 19, 2023)",
      "Operation Prosperity Guardian launched (December 2023)",
      "MV True Confidence struck (March 2024, first deaths)",
      "MV Tutor sunk (June 2024)",
      "Continued strikes 2024-present",
    ],
    outcome:
      "Roughly 70-80% of pre-conflict Suez transits diverted to Cape of Good Hope. Significant shipping insurance and logistics costs.",
    lessons: [
      "Cheap UAVs and anti-ship missiles asymmetrically threaten maritime trade",
      "Magazine depth on naval combatants is finite; need mix of high/low-cost interceptors",
      "Multinational maritime coalitions are operationally feasible at scale",
      "Strategic chokepoint denial has global economic effects",
    ],
  },
  {
    slug: "operation-rising-lion-iran",
    name: "Israel-Iran Direct Exchange",
    startDate: "2024-04-13",
    region: "Middle East",
    type: "air_incident",
    primaryParties: ["IR", "IL", "US", "GB", "FR", "JO"],
    summary:
      "Iranian retaliation for the strike on the Iranian consulate in Damascus involved over 300 drones, cruise missiles, and ballistic missiles launched at Israel, intercepted with US, UK, French, and Jordanian assistance. October 2024 Iranian missile salvo and Israeli precision response continued the cycle.",
    keyEvents: [
      "Damascus consulate strike (April 1, 2024)",
      "Iranian salvo (April 13-14): ~99% interception rate",
      "Israeli retaliatory strike on Isfahan air defenses",
      "October 1 Iranian ballistic missile salvo (~180 missiles)",
      "October 26 Israeli strike on Iranian air-defense and missile-production targets",
    ],
    outcome:
      "First direct Iran-Israel state-on-state exchanges. Demonstrated layered BMD effectiveness and importance of allied integration.",
    lessons: [
      "Layered BMD with allied integration can defeat large salvos",
      "Long-range strike credibility deters but doesn't eliminate escalation",
      "Allied airspace and territory access (Jordan) shape attack profiles",
    ],
  },
  {
    slug: "uss-mason-houthi",
    name: "USS Mason Engagements",
    startDate: "2016-10-09",
    region: "Middle East",
    type: "naval_incident",
    primaryParties: ["US", "YE (Houthis)"],
    summary:
      "Multiple anti-ship cruise missile attacks on USS Mason (DDG-87) off Yemen. Defeated with SM-2 and ESSM interceptors plus Nulka decoys.",
    keyEvents: [
      "Houthi C-802 launches at Mason (October 9, 12)",
      "US Tomahawk strikes on Yemeni radar sites (October 13)",
    ],
    outcome:
      "First peer-grade anti-ship cruise missile engagement of a US warship since 1991. Validated Aegis layered defense.",
    lessons: [
      "Even regional non-state actors can contest sea control with ASCMs",
      "Soft-kill (Nulka) and hard-kill (SM-2/ESSM) layers are mutually reinforcing",
      "Counter-strike (Tomahawk) is an integral part of escalation management",
    ],
  },
  {
    slug: "korean-war-armistice",
    name: "Korean War Armistice",
    startDate: "1953-07-27",
    endDate: "1953-07-27",
    region: "East Asia",
    type: "interstate_war",
    primaryParties: ["UN command (US-led)", "KP", "CN"],
    summary:
      "Armistice ended active hostilities on the Korean peninsula after three years of conflict. No peace treaty has ever been signed.",
    keyEvents: [
      "DPRK invasion (June 25, 1950)",
      "Inchon landings (September 1950)",
      "Chinese intervention (October 1950)",
      "Stalemate around the 38th parallel",
      "Armistice at Panmunjom (July 27, 1953)",
    ],
    outcome:
      "Korea remains divided along the DMZ; US-ROK Mutual Defense Treaty signed October 1, 1953. UN Command and Combined Forces Command structures persist.",
    lessons: [
      "Armistice without peace treaty creates 70+ year frozen conflict",
      "Coalition unity depends on shared political objectives, not just combat",
      "Forward US troop presence has been a stabilizing factor",
    ],
  },
  {
    slug: "vietnam-war",
    name: "Vietnam War (US engagement)",
    startDate: "1955-11-01",
    endDate: "1975-04-30",
    region: "Southeast Asia",
    type: "intervention",
    primaryParties: ["US", "VN (RVN)", "VN (DRV)"],
    summary:
      "Two-decade US intervention in Vietnamese conflict ended with North Vietnamese reunification. Defining experience for US strategy and civil-military relations through the 20th century.",
    keyEvents: [
      "Tonkin Gulf Resolution (August 1964)",
      "Tet Offensive (January-March 1968)",
      "Vietnamization announced (1969)",
      "Paris Peace Accords (January 1973)",
      "Fall of Saigon (April 30, 1975)",
    ],
    outcome:
      "US withdrawal and DRV victory; Vietnam reunified 1976. Long-running US strategic and political reckoning ('Vietnam Syndrome').",
    lessons: [
      "Counterinsurgency without political reconciliation cannot achieve durable victory",
      "Air power alone cannot compel a determined adversary",
      "Domestic political support is finite; long wars erode legitimacy",
    ],
  },
  {
    slug: "soviet-afghanistan",
    name: "Soviet War in Afghanistan",
    startDate: "1979-12-24",
    endDate: "1989-02-15",
    region: "Central Asia",
    type: "intervention",
    primaryParties: ["RU (USSR)", "AF (mujahideen)"],
    summary:
      "Decade-long Soviet intervention against US-, Saudi-, and Pakistani-backed mujahideen ended with Soviet withdrawal. CIA Operation Cyclone supplied Stinger MANPADS in 1986.",
    keyEvents: [
      "Soviet airborne operation seizes Kabul (December 1979)",
      "Stinger missiles deployed to mujahideen (1986)",
      "Geneva Accords (April 1988)",
      "Soviet withdrawal completed (February 15, 1989)",
    ],
    outcome:
      "Soviet defeat contributed to USSR collapse (1991); long-term blowback through Taliban emergence (1996) and Al-Qaeda safe haven.",
    lessons: [
      "MANPADS proliferation can decisively degrade air superiority",
      "Proxy warfare achieves strategic objectives at low direct cost",
      "Withdrawal without political settlement leaves unstable successor",
      "Today's allies in proxy wars can become tomorrow's adversaries",
    ],
  },
  {
    slug: "rwanda-genocide",
    name: "Rwandan Genocide",
    startDate: "1994-04-07",
    endDate: "1994-07-15",
    region: "Africa",
    type: "civil_war",
    primaryParties: ["RW"],
    summary:
      "Approximately 800,000 ethnic Tutsis and moderate Hutus were killed in 100 days. UN peacekeepers (UNAMIR) were unable to prevent the genocide; international failure to intervene became foundational to the Responsibility to Protect doctrine.",
    keyEvents: [
      "Habyarimana plane shot down (April 6, 1994)",
      "Genocide begins (April 7)",
      "Belgian peacekeepers killed; UN reduces UNAMIR (April)",
      "RPF forces capture Kigali (July 4)",
    ],
    outcome:
      "RPF victory; Hutu refugees flee to Zaire, contributing to First and Second Congo Wars. ICTR established 1994; R2P doctrine adopted at 2005 World Summit.",
    lessons: [
      "Inadequate mandates and rules of engagement can render peacekeeping ineffective",
      "Early warning without political will produces no protection",
      "International community's failure here shaped subsequent humanitarian doctrine",
    ],
  },
  {
    slug: "kargil-1999",
    name: "Kargil War",
    startDate: "1999-05-03",
    endDate: "1999-07-26",
    region: "South Asia",
    type: "interstate_war",
    primaryParties: ["IN", "PK"],
    summary:
      "Pakistani forces and irregulars infiltrated across the Line of Control in Kargil; Indian forces conducted high-altitude operations to recover the heights. Both nuclear-armed; first major conflict between nuclear-armed states.",
    keyEvents: [
      "Indian discovery of infiltration (May 3)",
      "Operation Vijay launched (May 26)",
      "G8 Declaration (Cologne, June 20)",
      "US pressure (Sharif-Clinton meeting, July 4)",
      "Indian recovery of Kargil heights (July 26)",
    ],
    outcome:
      "Status quo ante restored; Sharif government overthrown by Musharraf later that year. Established that nuclear deterrence does not eliminate limited conventional conflict.",
    lessons: [
      "Limited war is possible under nuclear overhang",
      "International (US) pressure can constrain escalation between nuclear states",
      "High-altitude operations are uniquely demanding",
    ],
  },
  {
    slug: "operation-neptune-spear",
    name: "Operation Neptune Spear",
    startDate: "2011-05-02",
    endDate: "2011-05-02",
    region: "South Asia",
    type: "covert_op",
    primaryParties: ["US", "PK"],
    summary:
      "DEVGRU raid on Osama bin Laden's compound in Abbottabad, Pakistan, conducted without Pakistani notification. Stealth UH-60s (with one crashed and destroyed in place) delivered SEALs from Bagram.",
    keyEvents: [
      "Long-running NSA/CIA tracking via courier",
      "Operation execution (May 2, 2011)",
      "Bin Laden killed; sensitive site exploitation",
      "Bin Laden's body buried at sea",
    ],
    outcome:
      "Strategic blow to Al-Qaeda Core; profound damage to US-Pakistan relations and revelation of Pakistani security vulnerabilities.",
    lessons: [
      "Stealth helicopter modifications enable deep-penetration raids",
      "Tier-1 SOF + persistent intelligence + national-level political authorization model",
      "Covert raids in partner territory carry severe diplomatic costs",
    ],
  },
  {
    slug: "stuxnet",
    name: "Stuxnet (Operation Olympic Games)",
    startDate: "2007-01-01",
    endDate: "2010-06-17",
    region: "Middle East / Cyber",
    type: "covert_op",
    primaryParties: ["US", "IL", "IR"],
    summary:
      "Highly sophisticated cyber-physical worm developed jointly by US (NSA) and Israel (Unit 8200) to sabotage centrifuges at Natanz. Discovered publicly in 2010 after spreading beyond air-gapped target.",
    keyEvents: [
      "Initial development under Bush administration (2007)",
      "Continued under Obama administration",
      "Centrifuge damage at Natanz (2009-2010)",
      "Public discovery via VirusBlokAda (June 2010)",
    ],
    outcome:
      "Set Iranian enrichment program back by 1-2 years; established cyber as a delivery vehicle for kinetic effects against industrial control systems.",
    lessons: [
      "Cyber operations can deliver kinetic-equivalent effects",
      "Air gaps are not absolute defenses against well-resourced adversaries",
      "Tool spread (escape from target environment) creates strategic blowback",
      "Establishes attribution norms in cyber operations",
    ],
  },
  {
    slug: "tanker-war-1980s",
    name: "Iran-Iraq Tanker War",
    startDate: "1984-04-01",
    endDate: "1988-08-20",
    region: "Middle East",
    type: "naval_incident",
    primaryParties: ["IR", "IQ", "US", "GB", "FR"],
    summary:
      "Both Iran and Iraq targeted neutral shipping in the Persian Gulf during the broader Iran-Iraq War. US Operation Earnest Will (1987) reflagged Kuwaiti tankers; USS Stark hit by Iraqi Exocet (1987); USS Vincennes shot down Iran Air Flight 655 (1988).",
    keyEvents: [
      "USS Stark struck by Iraqi Exocet (May 17, 1987)",
      "Operation Earnest Will reflagging begins (July 1987)",
      "Operation Praying Mantis (April 1988)",
      "USS Vincennes shootdown of IR655 (July 3, 1988)",
    ],
    outcome:
      "Established US/coalition role guaranteeing freedom of navigation in the Gulf; foundation for Combined Maritime Forces structure.",
    lessons: [
      "Civilian shipping is highly vulnerable to anti-ship missiles",
      "Reflagging and convoy operations have legal and operational costs",
      "Aegis system limitations exposed (USS Vincennes)",
      "Persistent regional naval presence requires multinational coordination",
    ],
  },
  {
    slug: "balkans-srebrenica",
    name: "Srebrenica Massacre",
    startDate: "1995-07-11",
    endDate: "1995-07-22",
    region: "Europe (Balkans)",
    type: "civil_war",
    primaryParties: ["BA", "RS"],
    summary:
      "Bosnian Serb forces under Ratko Mladić captured the UN-designated 'safe area' of Srebrenica and killed approximately 8,000 Bosniak men and boys. Largest mass atrocity in Europe since WWII.",
    keyEvents: [
      "VRS attack on Srebrenica enclave (July 6)",
      "Dutchbat fails to defend the enclave (July 11)",
      "Mass executions (July 13-22)",
    ],
    outcome:
      "Triggered NATO Operation Deliberate Force (August 1995) and Dayton Accords (December 1995). Genocide ruling by ICTY and ICJ.",
    lessons: [
      "Safe area designations without enforcement mechanisms invite atrocity",
      "Inadequate force levels and rules of engagement compound failure",
      "Genocidal violence can occur in modern Europe",
    ],
  },
  {
    slug: "south-china-sea-tribunal",
    name: "South China Sea Arbitration",
    startDate: "2013-01-22",
    endDate: "2016-07-12",
    region: "Indo-Pacific",
    type: "naval_incident",
    primaryParties: ["PH", "CN"],
    summary:
      "Philippines initiated arbitration under UNCLOS Annex VII against China's nine-dash-line claims. The Arbitral Tribunal (PCA-administered) ruled overwhelmingly in favor of the Philippines in 2016. China declined to participate or recognize the ruling.",
    keyEvents: [
      "Philippine submission (January 2013)",
      "Tribunal jurisdictional ruling (October 2015)",
      "Final award (July 12, 2016)",
    ],
    outcome:
      "Tribunal rejected China's historic-rights claim and ruled key Spratly features as rocks (no EEZ) under UNCLOS Article 121(3). China continues to operate inside disputed waters.",
    lessons: [
      "UNCLOS dispute settlement produces legally binding awards but limited enforcement",
      "Ruling provides legal-political ammunition for FONOPS and coalition operations",
      "Non-compliance imposes reputational rather than material costs in the short term",
    ],
  },
  {
    slug: "bosphorus-1936-precedent",
    name: "Montreux Convention Application 2022",
    startDate: "2022-02-28",
    region: "Europe",
    type: "blockade",
    primaryParties: ["TR", "RU", "UA"],
    summary:
      "On February 28, 2022, Türkiye invoked the 1936 Montreux Convention to declare a state of war existed in the Black Sea, closing the Turkish Straits to belligerent warships of any party.",
    keyEvents: [
      "Turkish declaration (February 28, 2022)",
      "Closure of Bosphorus and Dardanelles to RU/UA warships",
      "Turkish enforcement of tonnage limits on non-Black Sea littoral states",
    ],
    outcome:
      "Russian Black Sea Fleet unable to reinforce from Northern/Pacific Fleets via Mediterranean. Demonstrated continued vitality of Montreux Convention even in modern conflict.",
    lessons: [
      "Treaty regimes can yield decisive operational effects when invoked",
      "Geographic chokepoints have legal as well as physical dimensions",
      "Türkiye's neutrality framework provides leverage in regional crisis",
    ],
  },
];
