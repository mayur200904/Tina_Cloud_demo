# WoC Prompt Templates

Templates for the human builder to invoke the agent workflow. Three tiers of control, depending on how much design direction you want to provide.

---

## Template MASTER — One Prompt Autonomous Orchestration (Recommended)

Use this when you want **one single prompt** to run the full pipeline with minimal back-and-forth:
- `high-end-woc-infrastructure` (governance + gates)
- `woc-design` (creative direction)
- `woc-builder` (implementation)

```
/website-master

Run mode: autonomous-one-prompt
Project target: woc-starter-v2

Objective:
- Create a high-end, client-specific website in minutes.
- Keep all runtime business content Tina-editable.
- Ensure TinaCloud admin login can publish changes to GitHub.

Execution routing contract:
1) Load and enforce `high-end-woc-infrastructure` skill first.
2) Load and apply `frontend-design` during design decisions.
3) Run design phase (`woc-design`) and output a Design Spec.
4) Load and apply `vercel-react-best-practices` during implementation.
5) Run implementation phase (`woc-builder`) from that Design Spec.
4) Run gates and report pass/fail evidence.

Client brief:
- Business name: [name]
- Niche/industry: [one sentence]
- Target audience: [who exactly]
- Region: [city/country]
- Services/offers:
  1) [service]
  2) [service]
  3) [service]
- Differentiators: [years, proof, certifications]
- Testimonials/stats: [real numbers/quotes]
- CTA: [book / quote / call]
- Contact: [email, phone, address]
- Brand inputs: [logo, colors, preferred visual direction]
- My qualitative read: [2–4 sentences]

CMS/Auth:
- Tina mode: hosted
- Required env: TINA_CLIENT_ID, TINA_TOKEN
- Branch target: main

Hard constraints:
- Schema-first: define `tina/config.ts` fields before TSX/content.
- High-end design only: no generic/template layout or copy patterns.
- Enforce first-3-second hero impact, clear typography hierarchy, and alternating section rhythm.
- Motion must be purposeful and restrained.
- Responsive/mobile readability and CTA clarity are mandatory.
- Enforce visual editing contract on each editable route:
  - server passes `query`, `variables`, `data`
  - client uses `useTina({ query, variables, data })`
  - render from `useTina` data
  - use `experimental___selectFormByFormId()` when multiple forms/hooks exist
- No hardcoded business-facing copy in TSX.
- Empty Tina sidebar = failure.

Required sign-off output (pass/fail with evidence):
1) `npm run verify:visual-editing`
2) `npm run mode:check`
3) `npx tinacms build`
4) `npm run build`
5) publish proof plan (remote hash before/after Tina admin publish)
6) design quality rubric score (>= 22/30)
7) React/Next best-practice summary (waterfalls/bundle/client-server boundaries)

Return format:
- Phase A: Design Spec
- Phase B: Files changed + schema keys
- Phase C: Validation outputs (pass/fail)
- Phase D: Risks/blockers + exact next action
```

---

## Template 0 — Tina CMS Rapid Build (Minutes)

Use when speed matters and you want a full Tina-editable site from one prompt.

```
/woc-builder

Build in: woc-starter-v2/

Website brief:
- Business name: [name]
- Website type: [e.g., dental clinic / law firm / manufacturer]
- What we do: [2-5 lines]
- Target customer: [who exactly]
- Services/offers:
  1) [service]
  2) [service]
  3) [service]
- Differentiators: [years, certifications, strong proof]
- CTA: [book call / request quote / whatsapp]
- Contact details: [email, phone, address]

CMS/Auth mode:
- Tina mode: [hosted | self-hosted-tinacloud-auth]
- If hosted: use TINA_CLIENT_ID + TINA_TOKEN
- If self-hosted-tinacloud-auth: use NEXT_PUBLIC_TINA_CLIENT_ID + TINA_PUBLIC_IS_LOCAL + backend route wiring

Output requirements:
- Create/Update Tina schema first, then TSX, then markdown content.
- Ensure every displayed value is editable in Tina.
- For each editable page route, enforce server + client visual-editing contract:
  - server fetch returns `query`, `variables`, `data`
  - client page uses `useTina({ query, variables, data })`
  - rendered UI reads from `useTina` data
  - when multiple forms/hooks exist, set `experimental___selectFormByFormId()` to page form ID
- Treat empty Tina sidebar as a hard failure (do not declare done).
- Ensure /admin/index.html is functional.
- Do not edit tina/__generated__ manually.
- Run build-safe implementation only.
```

---

## Template A — Full Workflow (Best Quality)

Use when you have time for both design and build phases. Maximum quality, maximum steerability.

**Step 1 — Run woc-design:**
```
/woc-design

Client:
- Business name: [name]
- Niche / industry: [what they do — one sentence]
- Target customer: [who, with specifics — "SME manufacturers in Tamil Nadu" not "businesses"]
- City / region: [location]
- Services:
  1. [service name] — [short description]
  2. [service name] — [short description]
  3. [service name] — [short description]
  (add up to 6)

Differentiators:
- [years in business, certifications, awards, notable clients]
- [any specific competitive edge they mentioned]

Stats (if any):
- [number] [what it represents]
- [number] [what it represents]

Testimonials:
- "[verbatim quote]" — [Name, Company/Role]
- "[verbatim quote]" — [Name, Company/Role]

Contact:
- Email: [email]
- Phone: [phone]
- Address: [if brick-and-mortar]

Site setup:
- Logo: [have it / text only]
- Brand colors: [hex values / "none — derive from niche"]
- Own photography: [yes / no]
- Primary CTA: [call / book a consultation / request a quote / WhatsApp]
- Domain: [if known]

My read on them (first impressions from the coffee chat):
[2–4 sentences: what's the vibe? What stood out? What adjectives came to mind?
This is your qualitative read — be specific. "They're very no-nonsense,
family business, blue-collar pride" is more useful than "professional and friendly."]
```

**After woc-design outputs the Design Spec, review it. Then:**

```
/woc-builder

[Paste the Design Spec]

[Paste the client brief again for reference]

Build the full site. Implement the Surprise Element exactly as described.
```

---

## Template B — Quick Build (Direct)

Use when you're moving fast and have a clear idea of what you want. Runs woc-builder directly with design direction baked in.

```
/woc-builder

Client:
- Business name: [name]
- Niche / industry: [one sentence]
- Target customer: [who]
- City / region: [location]
- Services:
  1. [service] — [description]
  2. [service] — [description]
  3. [service] — [description]

Differentiators: [years, certs, notable clients]
Stats: [list any real numbers]
Testimonials: [paste verbatim if available]
Contact: [email, phone]
Logo: [have it / text only]
Brand colors: [hex / "none"]
Photography: [yes / no]
Primary CTA: [call / book / quote]

Design direction:
- Tone: [bold / refined / warm / technical]
- Feel: [1–2 sentences describing what the site should feel like to visit]
- Profile: [Corporate Professional / Friendly SMB / Industrial / Modern Startup / Premium Services]
  or: [describe it — "like a Friendly SMB but more credible, slightly more serious"]

Build the full 4-page site.
```

---

## Template C — Directed Build (Aesthetic-Led)

Use when the builder has a specific aesthetic in mind — a reference site, a mood, a specific visual treatment. Best for when you already know what you want creatively.

```
/woc-builder

[Standard client brief — business name, niche, services, contact, etc.]

Design north star:
[Describe the aesthetic in 2–4 sentences. Be specific. Reference real sites or brands if helpful.
Examples:
- "Think Linear.app's precision and dark confidence, but applied to a family-run accounting firm. The site should feel like it was built for serious people who are tired of generic."
- "Warm and human, like Aesop but for a dental clinic. Editorial restraint — not clinical, not corporate. Serif headings, cream background, a real team photo in the about page."
- "Industrial weight — Caterpillar.com's confidence. The hero is a wide-angle facility shot. Stats are front and centre. No fluff."
]

One thing it must have: [specific element — layout, copy treatment, visual detail]
One thing to avoid: [specific element or feeling to stay away from]

Build the full site.
```

---

## Template D — Revision (Client Feedback)

Use after delivery when the client wants changes. Keeps design decisions stable — only touches what's asked for.

```
/woc-builder

The client has feedback on the site built for [Business Name].

Client's exact words: "[what they said]"

Interpretation of what they want:
[Your read on the actual change needed — be specific about which files and which sections]

Specifically:
- Change: [what needs to change and where]
- Keep the same: [what must not be touched]
- Pages affected: [list]

Only modify the affected content files. Do not change design tokens unless the change explicitly requires it. Do not redesign sections that weren't mentioned.
```

---

## Template E — Layout-Only Change

Use when the client wants a structural change (different hero layout, different section order, different column count) without changing the design direction.

```
/woc-builder

Layout change request for [Business Name] site.

Current: [describe current layout — "the home page hero is full-bleed"]
Requested: [describe what they want — "change to image-right split, keep all copy"]

Affected file: [e.g. content/pages/index.md, hero block only]

Make only this change. Do not modify copy, tokens, or other blocks.
```

---

## Tips for Better Prompt Results

**The "My read on them" section is the most important part of Template A.**
The agent's design quality rises dramatically when you give it a genuine qualitative impression — not categories, but observations. "They've been at the same workshop for 27 years and they're proud of it" produces better output than "professional and experienced."

**Be specific about what to avoid.**
"Avoid it feeling like a template" is vague. "Avoid rounded pill buttons and teal color — they're B2B, not a wellness brand" is actionable.

**Reference real sites when you have them.**
If the client showed you a site they liked during the coffee chat, put it in the brief:
> "The client mentioned they like how [competitor site] looks — they want something in that register but more modern."

**Paste verbatim testimonials.**
A real quote from a real customer is almost always the strongest copy on the site. Don't summarize — paste the actual words and let the agent use them.

**Review the Design Spec before running woc-builder.**
In Template A, the Design Spec is a natural review checkpoint. Take 2 minutes to read it. If something feels wrong, fix it with a short message before running the build:
> "Update the Surprise Element — the client actually has a manufacturing facility photo, so the image should be their own, not stock. And the tone is more refined than the spec suggests — they're boutique, not mass manufacturing."
