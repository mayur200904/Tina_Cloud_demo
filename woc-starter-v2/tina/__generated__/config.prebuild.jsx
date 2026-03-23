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
    { name: "heroEyebrow", label: "Hero Eyebrow", type: "string" },
    { name: "heroHeadline", label: "Hero Headline", type: "string", required: true },
    { name: "heroDescription", label: "Hero Description", type: "string", ui: { component: "textarea" } },
    { name: "heroImage", label: "Hero Image", type: "image" },
    { name: "heroImageAlt", label: "Hero Image Alt", type: "string" },
    { name: "primaryCtaLabel", label: "Primary CTA Label", type: "string" },
    { name: "primaryCtaLink", label: "Primary CTA Link", type: "string" },
    { name: "secondaryCtaLabel", label: "Secondary CTA Label", type: "string" },
    { name: "secondaryCtaLink", label: "Secondary CTA Link", type: "string" },
    {
      name: "heroStats",
      label: "Hero Stats",
      type: "object",
      list: true,
      fields: [
        { name: "value", label: "Value", type: "string" },
        { name: "label", label: "Label", type: "string" }
      ]
    },
    { name: "capabilityEyebrow", label: "Capabilities Eyebrow", type: "string" },
    { name: "capabilityHeadline", label: "Capabilities Headline", type: "string" },
    {
      name: "capabilities",
      label: "Capabilities",
      type: "object",
      list: true,
      fields: [
        { name: "title", label: "Title", type: "string" },
        { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
        { name: "spec", label: "Spec", type: "string" }
      ]
    },
    { name: "qualityEyebrow", label: "Quality Eyebrow", type: "string" },
    { name: "qualityHeadline", label: "Quality Headline", type: "string" },
    { name: "qualityDescription", label: "Quality Description", type: "string", ui: { component: "textarea" } },
    {
      name: "qualityPoints",
      label: "Quality Points",
      type: "object",
      list: true,
      fields: [
        { name: "label", label: "Label", type: "string" },
        { name: "value", label: "Value", type: "string" }
      ]
    },
    { name: "proofEyebrow", label: "Proof Eyebrow", type: "string" },
    { name: "proofHeadline", label: "Proof Headline", type: "string" },
    {
      name: "testimonials",
      label: "Testimonials",
      type: "object",
      list: true,
      fields: [
        { name: "quote", label: "Quote", type: "string", ui: { component: "textarea" } },
        { name: "author", label: "Author", type: "string" },
        { name: "role", label: "Role", type: "string" }
      ]
    },
    { name: "proofCtaLabel", label: "Proof CTA Label", type: "string" },
    { name: "proofCtaLink", label: "Proof CTA Link", type: "string" }
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
    { name: "heroEyebrow", label: "Hero Eyebrow", type: "string" },
    { name: "heroHeadline", label: "Hero Headline", type: "string", required: true },
    { name: "heroDescription", label: "Hero Description", type: "string", ui: { component: "textarea" } },
    { name: "timelineEyebrow", label: "Timeline Eyebrow", type: "string" },
    { name: "timelineHeadline", label: "Timeline Headline", type: "string" },
    {
      name: "milestones",
      label: "Milestones",
      type: "object",
      list: true,
      fields: [
        { name: "year", label: "Year", type: "string" },
        { name: "title", label: "Title", type: "string" },
        { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
      ]
    },
    { name: "certificationsEyebrow", label: "Certifications Eyebrow", type: "string" },
    { name: "certificationsHeadline", label: "Certifications Headline", type: "string" },
    {
      name: "certifications",
      label: "Certifications",
      type: "object",
      list: true,
      fields: [
        { name: "name", label: "Name", type: "string" },
        { name: "details", label: "Details", type: "string" }
      ]
    },
    { name: "footprintEyebrow", label: "Footprint Eyebrow", type: "string" },
    { name: "footprintHeadline", label: "Footprint Headline", type: "string" },
    { name: "footprintDescription", label: "Footprint Description", type: "string", ui: { component: "textarea" } },
    {
      name: "footprintStats",
      label: "Footprint Stats",
      type: "object",
      list: true,
      fields: [
        { name: "value", label: "Value", type: "string" },
        { name: "label", label: "Label", type: "string" }
      ]
    },
    { name: "ctaLabel", label: "CTA Label", type: "string" },
    { name: "ctaLink", label: "CTA Link", type: "string" }
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
    { name: "heroEyebrow", label: "Hero Eyebrow", type: "string" },
    { name: "heroHeadline", label: "Hero Headline", type: "string", required: true },
    { name: "heroDescription", label: "Hero Description", type: "string", ui: { component: "textarea" } },
    {
      name: "serviceCards",
      label: "Service Cards",
      type: "object",
      list: true,
      fields: [
        { name: "name", label: "Name", type: "string" },
        { name: "description", label: "Description", type: "string", ui: { component: "textarea" } },
        { name: "tolerance", label: "Tolerance", type: "string" },
        { name: "materials", label: "Materials", type: "string" }
      ]
    },
    { name: "processEyebrow", label: "Process Eyebrow", type: "string" },
    { name: "processHeadline", label: "Process Headline", type: "string" },
    {
      name: "processSteps",
      label: "Process Steps",
      type: "object",
      list: true,
      fields: [
        { name: "step", label: "Step", type: "string" },
        { name: "title", label: "Title", type: "string" },
        { name: "description", label: "Description", type: "string", ui: { component: "textarea" } }
      ]
    },
    { name: "ctaHeading", label: "CTA Heading", type: "string" },
    { name: "ctaDescription", label: "CTA Description", type: "string", ui: { component: "textarea" } },
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
    { name: "heroEyebrow", label: "Hero Eyebrow", type: "string" },
    { name: "heroHeadline", label: "Hero Headline", type: "string", required: true },
    { name: "heroDescription", label: "Hero Description", type: "string", ui: { component: "textarea" } },
    { name: "formHeading", label: "Form Heading", type: "string" },
    { name: "formDescription", label: "Form Description", type: "string", ui: { component: "textarea" } },
    { name: "uploadHint", label: "Upload Hint", type: "string" },
    { name: "emailLabel", label: "Email Label", type: "string" },
    { name: "emailValue", label: "Email Value", type: "string" },
    { name: "phoneLabel", label: "Phone Label", type: "string" },
    { name: "phoneValue", label: "Phone Value", type: "string" },
    { name: "addressLabel", label: "Address Label", type: "string" },
    { name: "addressValue", label: "Address Value", type: "string", ui: { component: "textarea" } },
    { name: "hoursLabel", label: "Hours Label", type: "string" },
    { name: "hoursValue", label: "Hours Value", type: "string" },
    { name: "responseLabel", label: "Response Label", type: "string" },
    { name: "responseValue", label: "Response Value", type: "string" },
    { name: "testimonialQuote", label: "Testimonial Quote", type: "string", ui: { component: "textarea" } },
    { name: "testimonialAuthor", label: "Testimonial Author", type: "string" },
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
