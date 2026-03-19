import { defineConfig } from "tinacms";

// ---------------------------------------------------------------------------
// TinaCMS Configuration — WoC Starter v2
// ---------------------------------------------------------------------------
// This file ships with ONLY the global settings collection.
// The agent appends a custom page collection per client project.
//
// Required env vars for TinaCloud:
//   TINA_CLIENT_ID  — from TinaCloud dashboard
//   TINA_TOKEN      — from TinaCloud dashboard
//
// For local development these can remain empty — TinaCMS works locally
// without cloud credentials (edits save to local files only).
// ---------------------------------------------------------------------------

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isSelfHostedTinaAuth = process.env.TINA_SELF_HOSTED_AUTH === "true";
const tinaClientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim() ||
  process.env.TINA_CLIENT_ID?.trim() ||
  "";

// ---------------------------------------------------------------------------
// SETTINGS COLLECTION — global.json (nav, footer, fonts, contact)
// This collection is fixed — agent never modifies it, only writes the JSON.
// ---------------------------------------------------------------------------
const settingsCollection: any = {
  name: "settings",
  label: "Site Settings",
  path: "content/settings",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    global: true,
  },
  match: { include: "global" },
  fields: [
    { name: "siteName", label: "Site Name", type: "string", required: true },
    { name: "siteTagline", label: "Site Tagline", type: "string" },
    { name: "logoText", label: "Logo Text (if no image logo)", type: "string" },
    { name: "logoImage", label: "Logo Image (optional)", type: "image" },
    {
      name: "navLinks",
      label: "Navigation Links",
      type: "object",
      list: true,
      fields: [
        { name: "label", label: "Label", type: "string", required: true },
        { name: "href", label: "URL", type: "string", required: true },
      ],
    },
    { name: "navCtaLabel", label: "Nav CTA Button Label (optional)", type: "string" },
    { name: "navCtaLink", label: "Nav CTA Button URL (optional)", type: "string" },
    { name: "footerTagline", label: "Footer Tagline", type: "string" },
    {
      name: "footerLinks",
      label: "Footer Links",
      type: "object",
      list: true,
      fields: [
        { name: "label", label: "Label", type: "string" },
        { name: "href", label: "URL", type: "string" },
      ],
    },
    { name: "copyrightText", label: "Copyright Text", type: "string" },
    { name: "googleFontsUrl", label: "Google Fonts URL (set by builder)", type: "string" },
    {
      name: "socialLinks",
      label: "Social Links",
      type: "object",
      list: true,
      fields: [
        {
          name: "platform",
          label: "Platform",
          type: "string",
          options: ["linkedin", "instagram", "facebook", "twitter", "youtube", "github"],
        },
        { name: "url", label: "URL", type: "string" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// AGENT: Append your page collection below this comment.
//
// Pattern:
//
//   const homeCollection = {
//     name: "home",
//     label: "Home Page",
//     path: "content/pages",
//     format: "md",
//     match: { include: "index" },
//     ui: { router: () => "/" },
//     fields: [
//       { name: "title", label: "Page Title", type: "string", isTitle: true, required: true },
//       // ... your custom fields
//     ],
//   };
//
// Then add it to the collections array below:
//   collections: [settingsCollection, homeCollection, aboutCollection, ...]
//
// See references/tina-schema-patterns.md for full field type reference.
// ---------------------------------------------------------------------------

export default defineConfig({
  branch,
  clientId: tinaClientId,
  token: process.env.TINA_TOKEN ?? "",
  contentApiUrlOverride: isSelfHostedTinaAuth ? "/api/tina/gql" : undefined,

  admin: isSelfHostedTinaAuth
    ? ({
        auth: {
          useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === "true",
        },
      } as any)
    : undefined,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      settingsCollection,
      // Agent appends page collections here
    ],
  },
});
