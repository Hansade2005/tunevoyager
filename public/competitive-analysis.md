# Competitive Analysis — Infrastructure / "physical layer of AI" niche

Method: `scripts/yt-search.mjs` ran 10 core-niche queries through a YouTube search proxy →
134 videos across 117 channels. Raw data: `memory/research/competitor-search-2026-07-16.json`.
Batch date: **2026-07-16**. Re-run the script to refresh.

## Who owns the niche today

**Tier 1 — Big media documentary explainers** (highest reach, hardest to out-produce)
- **CNBC** — 4 hits. 12–22 min. "How A Million Miles Of Undersea Cables Power The Internet — And Now AI";
  "Why Amazon, Microsoft, Google And Meta Are Investing In Nuclear Power"; "How The Massive Power Draw
  Of Generative AI Is Overtaxing Our Grid." → Money + scale + Big-Tech names.
- **Bloomberg (Originals / Podcasts)** — 5 hits. The **"Primer"** branded series (~24 min): "How the
  Electrical Grid Is Being Rebuilt for AI", "How AI Is Pushing the Semiconductor Supply Chain to the Limit."

**Tier 2 — Solo authority explainers** (this is Neural Monolith's real competition & template)
- **Wendover Productions** — "How AI is Ruining the Electric Grid" (23 min), "How Electricity Gets to You."
  Strong POV, provocative verb ("Ruining"), classic explainer structure.
- **More Perfect Union** — **the standout framing**: "I Live 400 Yards From Mark Zuckerberg's Massive Data
  Center", "We Found the Hidden Cost of Data Centers. It's in Your Electric Bill." Personal stakes + local + "hidden cost."
- **Practical Engineering / Branch Education** — deep mechanism explainers ("How Does the Power Grid Work?",
  "How are Microchips Made?" 28 min). Authority through detail + animation.
- **Dr Ben Miles / Sabine Hossenfelder** — SMR/nuclear takes, often **contrarian pairs** ("Good News for Small
  Nuclear Reactors!" vs "Small Nuclear Reactors Have A Big Problem"). Debate framing drives clicks.
- **Leo Cui (finance)** — named-company deep dives: "Oklo Explained", "Nebius Explained." Investor curiosity.

**Tier 3 — Brand/OEM channels** — NVIDIA, Intel ("From Sand To Silicon", 2 min), Samsung Semiconductor,
a16z ("AI Hardware, Explained", "The Electric Grid, Explained"). Polished but corporate; low trust as "independent."

## Winning title patterns (copy these structures)
1. **"How [big thing] Powers/Is Ruining/Is Rebuilt [system]"** — CNBC/Wendover/Bloomberg staple.
2. **"Why [Amazon/Microsoft/Google/Meta] Is [surprising action]"** — Big-Tech name = built-in search + trust.
3. **Scale/shock adjectives**: Massive, World's Largest, Overtaxing, Hidden Cost, Truly Massive.
4. **Personal / local stakes**: "I Live 400 Yards From…", "It's in Your Electric Bill." ← most shareable, least crowded.
5. **Named-entity deep dive**: "[Oklo/Nebius/xAI Colossus] Explained." Rides existing curiosity.
6. **Contrarian pair**: publish the bull AND the bear ("A Big Problem" / "Good News"). Doubles the catalog, farms debate.

## Duration reality
- Long-form sweet spot: **12–24 min** (personal/relatable ones cluster ~13 min; documentary ~16–24 min).
- Almost **nothing under 5 min** in these results except OEM promos — the **Shorts lane is wide open** for this framing.

## Gaps = Neural Monolith's opening
1. **Shorts are basically absent.** Every serious player is long-form. A daily Shorts feed of visceral
   physical facts ("one anchor cuts 95% of world data") has almost no direct competition in this niche.
2. **"Hidden cost to YOU" angle** (More Perfect Union owns a sliver) is under-served and the most shareable —
   translate infrastructure into the viewer's electric bill / water / rent.
3. **Fragility / "one anchor away"** — sabotage, single points of failure, geopolitics of cables. Barely covered.
4. **A consistent branded series.** Bloomberg has "Primer," a16z has "Explained." Neural Monolith should own
   one name (e.g. **"Under the Floor"**) and stamp every video with it for bingeability.
5. **Named-company deep dives** (Oklo/Nebius-style) pull investor-adjacent viewers — high-intent, high-retention.

## Channel KEYWORDS — competitor scrape (2026-07-16, via `scripts/channel-keywords.mjs`)
YouTube channel keywords are embedded in each channel's page HTML (`<meta name="keywords">`). What our niche uses:
- **Practical Engineering** (closest analog, the gold standard): a DENSE ~40-term list — brand quoted (`"practical engineering"`) + creator name (`"grady hillhouse"`) + many SPECIFIC subject terms (concrete, dam, rebar, spillway, weir, hydrology, hydraulics, "water hammer", "public works", "thermal expansion", skyscraper…). Lesson: pack specific terms, not just broad ones.
- **Wendover Productions:** `education animated aviation wendover productions half as interesting` (brand + broad topic + sister channel).
- **Asianometry:** `Taiwan History China Semiconductors` (sparse topic terms).
- **Branch Education:** `Smartphone Engineering Education Technology Science` (broad category only).
- **More Perfect Union:** left the YouTube DEFAULT placeholder (`video, sharing, camera phone…`) — never set keywords. Common miss; easy edge for us.
- Takeaway → emulate Practical Engineering's density. **Our final 500-char string (486 chars, in `CHANNEL-SETUP.md`):** Neural Monolith, AI infrastructure, data centers, AI data center, undersea cables, submarine cables, nuclear power, small modular reactors, power grid, grid interconnection, electricity demand, semiconductors, chip manufacturing, lithography, hyperscale data center, server farm, transformer, substation, data center cooling, power plant, energy infrastructure, AI and energy, AI hardware, AI supply chain, how the internet works, engineering, technology, infrastructure, tech explained

## Direct takeaways for the sprint
- **Long-form (Mon/Wed/Fri):** 12–18 min, one branded series, titles built from patterns #1–#3 + a named Big-Tech hook.
- **Shorts (daily):** exploit the empty lane — pattern #4 (personal cost) and #6 (contrarian) compressed to <40s.
- **Don't try to out-produce CNBC/Bloomberg.** Win on POV, speed, and the "nobody shows you this" angle — the
  channel's existing tagline is already the correct wedge.
- **Steal the contrarian-pair tactic** to double output from single research passes.
