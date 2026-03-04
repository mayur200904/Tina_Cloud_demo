# Aesthetic Vocabulary

A reference for recognizing and describing aesthetic directions that don't fit neatly into one of the five niche profiles. Use this when:
- A client's character suggests a hybrid or non-standard aesthetic
- The builder provides a specific reference site or mood descriptor
- The visual concept you wrote has a quality that doesn't have a profile equivalent

Each entry describes the aesthetic in visual terms that activate strong associations, lists its token signals, and maps to the closest base profile to start from.

---

## Quiet Authority
*The business that has nothing to prove.*

**What it looks like:** Generous whitespace. Typography does the work of imagery. One color, used precisely. No motion for motion's sake — if something animates, there's a reason. Copy is short and confident, like a single sentence on a billboard. If there are images, they're editorial, not promotional. Nothing explains itself twice.

**Visual signals:** High-contrast type on white or warm cream. Serif or geometric sans. Large H1, small supporting text. Muted secondary colors. No badges, banners, or callouts.

**When to use it:** The established firm that doesn't feel the need to sell hard. Long-term clients already know them. The website is for the occasional new lead who Googles them.

**Token direction:** Corporate Professional tokens with reduced animation, larger type scale, hero layout = `centered` (not full-bleed — they don't need cinematic; they need clarity).

---

## Earned Confidence
*Knows it's the best option. Doesn't need to tell you.*

**What it looks like:** Direct headlines, no hedging. Numbers and facts front and centre. Photography is real — their own facility, team, product — not stock. The design is clean but not minimal: dense information, just well-organized. Bold type, high contrast. The overall feeling is: "if you know, you know."

**Visual signals:** Stats section is prominent and early. Hero headline is a declarative statement, not a question or an invitation. Service descriptions are specific, not generic. Dark sections feel heavy and grounded.

**When to use it:** Industrial clients with strong proof points. Specialists in their field. Businesses that compete on results, not relationship.

**Token direction:** Industrial profile, strong stats section, hero = `full-bleed` with factory/environment photography. Eyebrows are numbers or certifications, not category names.

---

## Warm Expertise
*The trusted advisor who also happens to be warm.*

**What it looks like:** Serif headings with warm sans body. Cream or warm white backgrounds. Professional enough to signal competence, warm enough to signal approachability. Testimonials with real names and faces. Copy uses "we" and "you" — it's a conversation. Photos show people, not just environments.

**Visual signals:** The contrast between credibility signals (certifications, years, case results) and warm visual treatment (rounded cards, warm photography, approachable copy).

**When to use it:** SMB professional services where personal relationship is the differentiator. Accountants who aren't trying to be a big four firm. Physiotherapists, family lawyers, family doctors.

**Token direction:** Friendly SMB tokens with slightly reduced radius (8px instead of 16px), darker primary to signal professionalism. Hero = `image-right` with a genuine team/environment photo.

---

## Considered Craft
*Every element earns its place. Nothing is decorative.*

**What it looks like:** Extremely controlled layout. One accent color used in exactly one place. Type scale is precise — one size for headings, one for body, nothing in between. Plenty of air. Images are large and show texture, material, or process — not people smiling. Copy is short and precise: one sentence where others write a paragraph.

**Visual signals:** Minimal block count. No stats section (unless numbers tell a craft story). No logo cloud. Maybe one contentSplit that shows the work. The absence of elements is as deliberate as their presence.

**When to use it:** Premium Services clients. Architects. Single-product artisan businesses. Boutique advisory firms. Anyone whose work speaks for itself.

**Token direction:** Premium Services profile, reduced block count, hero = `centered` (editorial typography), no animation except the single scroll reveal. Cormorant Garamond at very large sizes.

---

## Functional Precision
*The tool that does exactly what it says.*

**What it looks like:** Clean grid. Monospace or geometric sans throughout. Data-dense sections. Icon-led service cards. High contrast — dark on white or light on dark. Very clear hierarchy. No atmospheric imagery — screenshots, diagrams, or abstract textures instead. Copy is direct and technical, no marketing softness.

**Visual signals:** Developer tools aesthetic. Tight spacing. Small type in key places. Code-style UI elements (borders, monospace labels). The color is functional — one signal color that marks CTAs and interactive states, nothing decorative.

**When to use it:** SaaS tools, developer products, enterprise software, technical consulting.

**Token direction:** Modern Startup tokens with reduced animation, sharper radius (4px instead of 12px), hero = `centered` or `image-right` with a product screenshot. Replace violet with a functional color: electric blue (#0EA5E9) or clean green (#22C55E).

---

## Human Scale
*Big enough to deliver. Small enough to care.*

**What it looks like:** Family business energy with professional execution. Real photos of real people — not posed, not stock. Specific details that signal long history (founding year, family name in the business name, photos over time). Copy uses real language, not corporate-speak. The design is clean and professional but has warmth and personality in specific details.

**Visual signals:** contentSplit with a real team or founder photo. Stats section that includes years and relationships, not just volume. Testimonials from people who've been with them for years. Footer copy that sounds like something a real person wrote.

**When to use it:** Second or third generation family businesses. Long-established SMBs. Any business where the human story is a differentiator.

**Token direction:** Friendly SMB or Corporate Professional depending on niche. Key change: the Surprise Element must be rooted in their specific history — founding year, family name, a specific milestone. This profile lives or dies by specificity.

---

## Raw Authority
*Doesn't care if you like them. Knows you need them.*

**What it looks like:** Maximum contrast. Large, aggressive type. Minimal copy. Almost no imagery — type and color do everything. Very dark or very stark background. One accent color, used hard. The vibe is: we move 50,000 tons a year and we don't have time to convince you.

**Visual signals:** Near-black background throughout. Orange or red accent. Stats section is the hero of the page. Condensed or extended type at very large sizes. No testimonials section (they don't need social proof at this scale).

**When to use it:** Large industrial firms that sell to procurement managers. Commodity businesses that compete on capacity and reliability. Transport, heavy manufacturing, infrastructure.

**Token direction:** Industrial profile, all sections dark or near-dark, hero = `full-bleed` with an aerial or wide-shot facility image. Stats come before services. Drop testimonials unless they're from named enterprises.

---

## Fresh Professional
*Young firm with mature thinking.*

**What it looks like:** Clean, contemporary, all-sans throughout. Light backgrounds with a strong brand color accent. Modern layout — maybe an asymmetric contentSplit or a feature section with icons. Motion is present but restrained. Copy is confident without being heavy. Photography is contemporary — not stock, but also not cinematic.

**Visual signals:** Geometric sans headings and body. Tight, modern spacing. Brand color shows up in specific places only. No gold, no deep navy, no serif — too traditional for this register.

**When to use it:** Newly established professional services firms wanting to signal "fresh perspective" without sacrificing credibility. Young consultants, new-model accounting firms, modern HR/people practices.

**Token direction:** Corporate Professional tokens with: replace Playfair Display → `'Inter', sans-serif` (all-sans), replace navy with brand color, increase `--radius-button` to 6–8px. The result is contemporary corporate.

---

## Using This Reference

When the builder gives you an aesthetic reference (a site URL description, a brand name, a mood word), find the closest entry above and use it to:
1. Confirm or adjust the visual concept you wrote in Step 3
2. Select the base profile to start from
3. Identify the specific token overrides required
4. Calibrate the Surprise Element to fit the aesthetic register

When a builder says "I want it to feel like [brand]" — describe why that brand has the aesthetic it does, then apply that reasoning to this specific client's situation.
