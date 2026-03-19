// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var isSelfHostedTinaAuth = process.env.TINA_SELF_HOSTED_AUTH === "true";
var tinaClientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim() || process.env.TINA_CLIENT_ID?.trim() || "";
var settingsCollection = {
  name: "settings",
  label: "Site Settings",
  path: "content/settings",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    global: true
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
        { name: "href", label: "URL", type: "string", required: true }
      ]
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
        { name: "href", label: "URL", type: "string" }
      ]
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
          options: ["linkedin", "instagram", "facebook", "twitter", "youtube", "github"]
        },
        { name: "url", label: "URL", type: "string" }
      ]
    }
  ]
};
var config_default = defineConfig({
  branch,
  clientId: tinaClientId,
  token: process.env.TINA_TOKEN ?? "",
  contentApiUrlOverride: isSelfHostedTinaAuth ? "/api/tina/gql" : void 0,
  admin: isSelfHostedTinaAuth ? {
    auth: {
      useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === "true"
    }
  } : void 0,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      settingsCollection
      // Agent appends page collections here
    ]
  }
});
export {
  config_default as default
};
