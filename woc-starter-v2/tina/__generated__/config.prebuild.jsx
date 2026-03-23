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
    { name: "logoText", label: "Logo Text", type: "string" },
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
    { name: "navCtaLabel", label: "Nav CTA Label", type: "string" },
    { name: "navCtaLink", label: "Nav CTA Link", type: "string" },
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
    { name: "googleFontsUrl", label: "Google Fonts URL", type: "string" },
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
var homeCollection = {
  name: "home",
  label: "Home Page",
  path: "content/pages",
  format: "md",
  match: { include: "index" },
  ui: {
    router: () => "/",
    allowedActions: { create: false, delete: false }
  },
  fields: [
    { name: "title", label: "Page Title", type: "string", isTitle: true, required: true },
    { name: "eyebrow", label: "Eyebrow", type: "string" },
    { name: "headline", label: "Headline", type: "string", required: true },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    { name: "primaryCtaLabel", label: "Primary CTA Label", type: "string" },
    { name: "primaryCtaLink", label: "Primary CTA Link", type: "string" },
    { name: "secondaryCtaLabel", label: "Secondary CTA Label", type: "string" },
    { name: "secondaryCtaLink", label: "Secondary CTA Link", type: "string" },
    { name: "sectionHeading", label: "Section Heading", type: "string" },
    { name: "sectionBody", label: "Section Body", type: "string", ui: { component: "textarea" } }
  ]
};
var aboutCollection = {
  name: "about",
  label: "About Page",
  path: "content/pages",
  format: "md",
  match: { include: "about" },
  ui: {
    router: () => "/about",
    allowedActions: { create: false, delete: false }
  },
  fields: [
    { name: "title", label: "Page Title", type: "string", isTitle: true, required: true },
    { name: "eyebrow", label: "Eyebrow", type: "string" },
    { name: "headline", label: "Headline", type: "string", required: true },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    { name: "sectionHeading", label: "Section Heading", type: "string" },
    { name: "sectionBody", label: "Section Body", type: "string", ui: { component: "textarea" } }
  ]
};
var servicesCollection = {
  name: "services",
  label: "Services Page",
  path: "content/pages",
  format: "md",
  match: { include: "services" },
  ui: {
    router: () => "/services",
    allowedActions: { create: false, delete: false }
  },
  fields: [
    { name: "title", label: "Page Title", type: "string", isTitle: true, required: true },
    { name: "eyebrow", label: "Eyebrow", type: "string" },
    { name: "headline", label: "Headline", type: "string", required: true },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    {
      name: "items",
      label: "Service Items",
      type: "object",
      list: true,
      fields: [
        { name: "title", label: "Title", type: "string" },
        { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
      ]
    },
    { name: "ctaLabel", label: "CTA Label", type: "string" },
    { name: "ctaLink", label: "CTA Link", type: "string" }
  ]
};
var contactCollection = {
  name: "contact",
  label: "Contact Page",
  path: "content/pages",
  format: "md",
  match: { include: "contact" },
  ui: {
    router: () => "/contact",
    allowedActions: { create: false, delete: false }
  },
  fields: [
    { name: "title", label: "Page Title", type: "string", isTitle: true, required: true },
    { name: "eyebrow", label: "Eyebrow", type: "string" },
    { name: "headline", label: "Headline", type: "string", required: true },
    { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
    { name: "email", label: "Email", type: "string" },
    { name: "phone", label: "Phone", type: "string" },
    { name: "address", label: "Address", type: "string", ui: { component: "textarea" } },
    { name: "ctaLabel", label: "CTA Label", type: "string" },
    { name: "ctaLink", label: "CTA Link", type: "string" }
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
      settingsCollection,
      homeCollection,
      aboutCollection,
      servicesCollection,
      contactCollection
    ]
  }
});
export {
  config_default as default
};
