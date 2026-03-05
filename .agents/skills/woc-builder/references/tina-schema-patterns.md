# TinaCMS Schema Patterns

Reference for writing custom page collections in `tina/config.ts`.

---

## The Field-Sync Rule

Every field name must appear in **exactly three places** — and they must be identical:
1. TinaCMS schema field `name` in `tina/config.ts`
2. Page TSX reading from the query result (e.g. `data.home.headline`)
3. Content markdown frontmatter key (e.g. `headline: "..."`)

If they drift, TinaCMS silently returns `undefined`. Establish field names first, then write TSX and markdown that match them.

---

## Adding a Page Collection

Append to `tina/config.ts` in the `collections` array. Each page is its own collection.

```typescript
const homeCollection = {
  name: "home",
  label: "Home Page",
  path: "content/pages",
  format: "md",
  match: { include: "index" },    // matches content/pages/index.md
  ui: {
    router: () => "/",
    allowedActions: { create: false, delete: false },
  },
  fields: [
    // your custom fields here
  ],
};

// In defineConfig:
schema: {
  collections: [settingsCollection, homeCollection],
}
```

Match patterns per page:
- Home: `match: { include: "index" }` → `content/pages/index.md`
- About: `match: { include: "about" }` → `content/pages/about.md`
- Services: `match: { include: "services" }` → `content/pages/services.md`
- Contact: `match: { include: "contact" }` → `content/pages/contact.md`

Router functions:
- Home: `router: () => "/"`
- Other pages: `router: ({ document }) => \`/${document._sys.filename}\``

---

## Field Types Reference

### string — single line
```typescript
{ name: "headline", label: "Main Headline", type: "string", required: true }
```
Frontmatter: `headline: "Built for the Long Haul"`

### string — multiline (textarea)
```typescript
{ name: "subheadline", label: "Supporting Copy", type: "string", ui: { component: "textarea" } }
```
Frontmatter: `subheadline: "Supporting copy here"`

### image — file picker (returns URL string)
```typescript
{ name: "heroImage", label: "Hero Image", type: "image" }
```
Frontmatter: `heroImage: "https://source.unsplash.com/1600x900/?keywords"`
In TSX: `<img src={data.home.heroImage ?? ""} />`

### boolean
```typescript
{ name: "darkBackground", label: "Dark Background", type: "boolean" }
```
Frontmatter: `darkBackground: true`

### number
```typescript
{ name: "columns", label: "Number of Columns", type: "number" }
```
Frontmatter: `columns: 3`

### object — single nested object
```typescript
{
  name: "cta",
  label: "Call to Action",
  type: "object",
  fields: [
    { name: "label", label: "Button Label", type: "string" },
    { name: "href", label: "Button URL", type: "string" },
  ],
}
```
Frontmatter:
```yaml
cta:
  label: "Get Started"
  href: "/contact"
```
In TSX: `data.home.cta?.label`, `data.home.cta?.href`

### object list — repeating items
```typescript
{
  name: "services",
  label: "Services",
  type: "object",
  list: true,
  fields: [
    { name: "title", label: "Service Name", type: "string" },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    { name: "icon", label: "Lucide Icon Name", type: "string" },
  ],
}
```
Frontmatter:
```yaml
services:
  - title: "Structural Engineering"
    description: "From concept to construction documentation."
    icon: "Building2"
  - title: "Site Supervision"
    description: "On-site oversight from groundbreaking to handover."
    icon: "HardHat"
```
In TSX:
```tsx
{data.home.services?.map((service, i) => (
  <div key={i}>{service?.title}</div>
))}
```

### rich-text — block-level content (Markdown)
```typescript
{ name: "body", label: "Body Content", type: "rich-text" }
```
Frontmatter: uses YAML block scalar
```yaml
body: |
  First paragraph of content.

  Second paragraph with **bold** and *italic*.
```
In TSX: **requires TinaMarkdown renderer** — do not render as plain string:
```tsx
import { TinaMarkdown } from "tinacms/dist/rich-text";
// ...
<TinaMarkdown content={data.home.body} />
```

---

## Reading Data in Page TSX

Use `client.queries.[collectionName]` with `relativePath` matching the content file.

```typescript
// In page.tsx (server component)
import client from "../../tina/__generated__/client";

const res = await client.queries.home({ relativePath: "index.md" });
const data = res.data.home;
```

Collection name → query name mapping:
- Collection `name: "home"` → `client.queries.home(...)`
- Collection `name: "about"` → `client.queries.about(...)`
- Collection `name: "services"` → `client.queries.services(...)`
- Collection `name: "contact"` → `client.queries.contact(...)`

Always fetch settings separately:
```typescript
const settingsRes = await client.queries.settings({ relativePath: "global.json" });
```

---

## Content Markdown Format

```markdown
---
title: Home
headline: "Built for the Long Haul"
subheadline: "Supporting copy that earns the headline."
heroImage: "https://source.unsplash.com/1600x900/?keywords"
heroImageAlt: "Descriptive alt text"
ctaLabel: "Start a Project"
ctaLink: "/contact"
services:
  - title: "Structural Engineering"
    description: "From concept to documentation."
    icon: "Building2"
  - title: "Site Supervision"
    description: "On-site oversight from start to finish."
    icon: "HardHat"
stats:
  - value: "340+"
    label: "Projects Delivered"
  - value: "22"
    label: "Years in Operation"
---
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Field name in schema differs from TSX (e.g. `heroUrl` vs `heroImage`) | Define field names first, use exact name in all three places |
| `rich-text` field rendered as `{data.body}` | Must use `<TinaMarkdown content={data.body} />` |
| Missing `match: { include: "..." }` on collection | Without this, Tina scans the entire path — add it |
| Using `client.queries.page(...)` for a custom collection named `"home"` | Use the collection's `name` — `client.queries.home(...)` |
| Writing `relativePath: "pages/index.md"` | Path is relative to collection `path` — just `"index.md"` |
