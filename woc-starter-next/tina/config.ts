import { defineConfig } from "tinacms";

// ---------------------------------------------------------------------------
// TinaCMS Configuration
// ---------------------------------------------------------------------------
// clientId and branch are set via environment variables for TinaCloud.
// For local development without TinaCloud, these can remain empty.
// Required env vars: TINA_CLIENT_ID, TINA_TOKEN (from TinaCloud dashboard)
// ---------------------------------------------------------------------------

const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";

export default defineConfig({
    branch,
    clientId: process.env.TINA_CLIENT_ID || "",
    token: process.env.TINA_TOKEN || "",

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
            // -----------------------------------------------------------------------
            // PAGES COLLECTION
            // Each page is a markdown file in content/pages/.
            // Pages are composed of "blocks" - drag-and-droppable sections.
            // -----------------------------------------------------------------------
            {
                name: "page",
                label: "Pages",
                path: "content/pages",
                format: "md",
                ui: {
                    router: ({ document }) => {
                        if (document._sys.filename === "index") return "/";
                        return `/${document._sys.filename}`;
                    },
                },
                fields: [
                    {
                        name: "title",
                        label: "Page Title",
                        type: "string",
                        isTitle: true,
                        required: true,
                    },
                    {
                        name: "seoDescription",
                        label: "SEO Meta Description",
                        type: "string",
                        ui: { component: "textarea" },
                    },
                    // -------------------------------------------------------------------
                    // BLOCKS — The heart of the page builder
                    // -------------------------------------------------------------------
                    {
                        name: "blocks",
                        label: "Page Sections",
                        type: "object",
                        list: true,
                        ui: {
                            visualSelector: true,
                        },
                        templates: [

                            // 1. HERO BLOCK
                            {
                                name: "hero",
                                label: "Hero — Full-width Header",
                                ui: { defaultItem: { _template: "hero" } },
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text (small label above headline)", type: "string" },
                                    { name: "headline", label: "Main Headline (H1)", type: "string", required: true },
                                    { name: "subheadline", label: "Supporting Description", type: "string", ui: { component: "textarea" } },
                                    { name: "primaryCtaLabel", label: "Primary CTA Button Label", type: "string" },
                                    { name: "primaryCtaLink", label: "Primary CTA Button URL", type: "string" },
                                    { name: "secondaryCtaLabel", label: "Secondary CTA Label (optional)", type: "string" },
                                    { name: "secondaryCtaLink", label: "Secondary CTA URL (optional)", type: "string" },
                                    { name: "imageUrl", label: "Hero Image URL", type: "image" },
                                    { name: "imageAlt", label: "Hero Image Alt Text", type: "string" },
                                    {
                                        name: "layout",
                                        label: "Layout Variant",
                                        type: "string",
                                        options: ["image-right", "image-left", "centered", "full-bleed", "type-only"],
                                        ui: { defaultValue: "image-right" },
                                    },
                                ],
                            },

                            // 2. SERVICE GRID BLOCK
                            {
                                name: "serviceGrid",
                                label: "Service Grid — Cards Grid",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    { name: "subheading", label: "Section Subheading", type: "string" },
                                    {
                                        name: "variant",
                                        label: "Layout Variant",
                                        type: "string",
                                        options: ["grid", "alternating"],
                                        ui: { defaultValue: "grid" },
                                    },
                                    {
                                        name: "services",
                                        label: "Services",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "title", label: "Service Title", type: "string" },
                                            { name: "description", label: "Service Description", type: "string", ui: { component: "textarea" } },
                                            { name: "icon", label: "Icon (emoji or SVG path)", type: "string" },
                                            { name: "imageUrl", label: "Service Image (alternating variant only)", type: "image" },
                                            { name: "imageAlt", label: "Image Alt Text", type: "string" },
                                        ],
                                    },
                                    {
                                        name: "columns",
                                        label: "Columns (2, 3, or 4) — grid variant only",
                                        type: "number",
                                        ui: { defaultValue: 3 },
                                    },
                                ],
                            },

                            // 3. CONTENT SPLIT BLOCK
                            {
                                name: "contentSplit",
                                label: "Content Split — Text + Image Side by Side",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    { name: "body", label: "Body Copy", type: "string", ui: { component: "textarea" } },
                                    { name: "ctaLabel", label: "CTA Label (optional)", type: "string" },
                                    { name: "ctaLink", label: "CTA URL (optional)", type: "string" },
                                    { name: "imageUrl", label: "Image", type: "image" },
                                    { name: "imageAlt", label: "Image Alt Text", type: "string" },
                                    {
                                        name: "imagePosition",
                                        label: "Image Position",
                                        type: "string",
                                        options: ["left", "right"],
                                        ui: { defaultValue: "right" },
                                    },
                                ],
                            },

                            // 4. STATS BAR BLOCK
                            {
                                name: "statsBar",
                                label: "Stats Bar — Key Numbers Strip",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text (optional)", type: "string" },
                                    { name: "heading", label: "Section Heading (optional)", type: "string" },
                                    {
                                        name: "stats",
                                        label: "Statistics",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "value", label: "Number/Value (e.g. '25+')", type: "string" },
                                            { name: "label", label: "Label (e.g. 'Years Experience')", type: "string" },
                                            { name: "prefix", label: "Prefix (e.g. '$')", type: "string" },
                                        ],
                                    },
                                ],
                            },

                            // 5. TESTIMONIALS BLOCK
                            {
                                name: "testimonialCarousel",
                                label: "Testimonials — Client Quotes",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    {
                                        name: "variant",
                                        label: "Layout Variant",
                                        type: "string",
                                        options: ["carousel", "featured"],
                                        ui: { defaultValue: "carousel" },
                                    },
                                    {
                                        name: "testimonials",
                                        label: "Testimonials",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "quote", label: "Quote", type: "string", ui: { component: "textarea" } },
                                            { name: "authorName", label: "Author Name", type: "string" },
                                            { name: "authorTitle", label: "Author Title / Company", type: "string" },
                                            { name: "avatarUrl", label: "Author Avatar (optional)", type: "image" },
                                        ],
                                    },
                                ],
                            },

                            // 6. LOGO CLOUD BLOCK
                            {
                                name: "logoCloud",
                                label: "Logo Cloud — Partners / Clients Strip",
                                fields: [
                                    { name: "label", label: "Label Text (e.g. 'Trusted by leading companies')", type: "string" },
                                    {
                                        name: "logos",
                                        label: "Logos",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "name", label: "Company Name", type: "string" },
                                            { name: "imageUrl", label: "Logo Image", type: "image" },
                                        ],
                                    },
                                ],
                            },

                            // 7. FAQ BLOCK
                            {
                                name: "faq",
                                label: "FAQ — Accordion",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    { name: "subheading", label: "Section Subheading (optional)", type: "string" },
                                    {
                                        name: "items",
                                        label: "FAQ Items",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "question", label: "Question", type: "string" },
                                            { name: "answer", label: "Answer", type: "string", ui: { component: "textarea" } },
                                        ],
                                    },
                                ],
                            },

                            // 9. PROCESS BLOCK
                            {
                                name: "process",
                                label: "Process — Numbered Steps / Workflow",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    { name: "subheading", label: "Section Subheading (optional)", type: "string" },
                                    {
                                        name: "variant",
                                        label: "Layout Variant",
                                        type: "string",
                                        options: ["steps", "timeline"],
                                        ui: { defaultValue: "steps" },
                                    },
                                    {
                                        name: "steps",
                                        label: "Steps",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "number", label: "Step Number (optional override, e.g. '01')", type: "string" },
                                            { name: "title", label: "Step Title", type: "string" },
                                            { name: "description", label: "Step Description", type: "string", ui: { component: "textarea" } },
                                            { name: "icon", label: "Icon (emoji, replaces number if set)", type: "string" },
                                        ],
                                    },
                                ],
                            },

                            // 10. TEAM BLOCK
                            {
                                name: "team",
                                label: "Team — Member Grid",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    {
                                        name: "columns",
                                        label: "Columns (2, 3, or 4)",
                                        type: "number",
                                        ui: { defaultValue: 3 },
                                    },
                                    {
                                        name: "members",
                                        label: "Team Members",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "name", label: "Full Name", type: "string" },
                                            { name: "role", label: "Role / Title", type: "string" },
                                            { name: "bio", label: "Short Bio (optional)", type: "string", ui: { component: "textarea" } },
                                            { name: "imageUrl", label: "Photo", type: "image" },
                                            { name: "imageAlt", label: "Photo Alt Text", type: "string" },
                                        ],
                                    },
                                ],
                            },

                            // 11. FULL-WIDTH IMAGE BLOCK
                            {
                                name: "fullWidthImage",
                                label: "Full-Width Image — Atmospheric Divider",
                                fields: [
                                    { name: "imageUrl", label: "Image", type: "image" },
                                    { name: "imageAlt", label: "Image Alt Text", type: "string" },
                                    { name: "overlayText", label: "Overlay Text (optional)", type: "string", ui: { component: "textarea" } },
                                    {
                                        name: "overlayPosition",
                                        label: "Text Position",
                                        type: "string",
                                        options: ["center", "left", "bottom-left"],
                                        ui: { defaultValue: "center" },
                                    },
                                    {
                                        name: "height",
                                        label: "Image Height",
                                        type: "string",
                                        options: ["short", "medium", "tall"],
                                        ui: { defaultValue: "medium" },
                                    },
                                ],
                            },

                            // 12. PULL QUOTE BLOCK
                            {
                                name: "pullQuote",
                                label: "Pull Quote — Typographic Statement",
                                fields: [
                                    { name: "quote", label: "Quote / Statement", type: "string", ui: { component: "textarea" } },
                                    { name: "attribution", label: "Attribution (optional, e.g. 'Founder, Acme Co')", type: "string" },
                                    { name: "dark", label: "Dark Background", type: "boolean" },
                                    {
                                        name: "size",
                                        label: "Text Size",
                                        type: "string",
                                        options: ["normal", "large"],
                                        ui: { defaultValue: "normal" },
                                    },
                                ],
                            },

                            // 8. CONTACT FORM BLOCK
                            {
                                name: "contactForm",
                                label: "Contact Form — Lead Capture",
                                fields: [
                                    { name: "eyebrow", label: "Eyebrow Text", type: "string" },
                                    { name: "heading", label: "Section Heading", type: "string" },
                                    { name: "subheading", label: "Section Subheading", type: "string" },
                                    { name: "formspreeId", label: "Formspree Form ID (from formspree.io)", type: "string" },
                                    { name: "successMessage", label: "Success Message", type: "string", ui: { defaultValue: "Thank you! We'll be in touch soon." } },
                                    {
                                        name: "fields",
                                        label: "Form Fields (optional: override defaults)",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            { name: "label", label: "Field Label", type: "string" },
                                            { name: "name", label: "Field Name (for form submission)", type: "string" },
                                            { name: "type", label: "Field Type", type: "string", options: ["text", "email", "tel", "textarea", "select"] },
                                            { name: "required", label: "Required", type: "boolean" },
                                            { name: "placeholder", label: "Placeholder", type: "string" },
                                        ],
                                    },
                                    {
                                        name: "showAddress",
                                        label: "Show Address / Contact Info Sidebar",
                                        type: "boolean",
                                    },
                                    { name: "phone", label: "Phone Number (sidebar)", type: "string" },
                                    { name: "email", label: "Email Address (sidebar)", type: "string" },
                                    { name: "address", label: "Physical Address (sidebar)", type: "string", ui: { component: "textarea" } },
                                ],
                            },

                        ],
                    },
                ],
            },

            // -----------------------------------------------------------------------
            // SITE SETTINGS — Global site config (name, nav, footer)
            // -----------------------------------------------------------------------
            {
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
                            { name: "platform", label: "Platform", type: "string", options: ["linkedin", "instagram", "facebook", "twitter", "youtube", "github"] },
                            { name: "url", label: "URL", type: "string" },
                        ],
                    },
                ],
            },
        ],
    },
});
