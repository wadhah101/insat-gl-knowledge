// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");
const math = require("remark-math");
const katex = require("rehype-katex");

const config = async () => {
  /** @type {import('@docusaurus/types').Config} */
  return {
    markdown: {
      mermaid: true,
    },
    themes: ["@docusaurus/theme-mermaid", "docusaurus-theme-search-typesense"],
    title: "INSAT GL knowledge",
    tagline:
      "A Guide on how to survive software engineering in INSAT. You will find tips, references,  projects & cheat sheets.",
    url: "https://wadhah101.github.io",
    baseUrl: process.env.BASE_URL ?? "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "wadhah101",
    projectName: "insat-gl-knowledge",

    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },

    plugins: [
      async function myPlugin(context, options) {
        return {
          name: "docusaurus-tailwindcss",
          configurePostCss(postcssOptions) {
            // Appends TailwindCSS and AutoPrefixer.
            postcssOptions.plugins.push(require("tailwindcss"));
            postcssOptions.plugins.push(require("autoprefixer"));
            return postcssOptions;
          },
        };
      },
    ],

    stylesheets: [
      {
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
        type: "text/css",
        integrity:
          "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
        crossorigin: "anonymous",
      },
    ],

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        {
          sitemap: {
            changefreq: "weekly",
            priority: 0.5,
            filename: "sitemap.xml",
          },
          googleAnalytics: {
            trackingID: "G-XR2Q0GYH0M",
            anonymizeIP: true,
          },
          docs: {
            // DEBT use docusaurus native mermaid supposrt
            remarkPlugins: [math],
            rehypePlugins: [katex],
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl:
              "https://github.com/wadhah101/insat-gl-knowledge/edit/master",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        typesense: {
          typesenseCollectionName: "prod_gl_knowledge", // Replace with your own doc site's name. Should match the collection name in the scraper settings.

          typesenseServerConfig: {
            nodes: [
              {
                host: process.env.TYPESENSE_HOST ?? "",
                port: process.env.TYPESENSE_PORT ?? "",
                protocol: process.env.TYPESENSE_PROTOCOL ?? "http",
              },
            ],
            apiKey: process.env.TYPESENSE_SEARCH_API_KEY || "",
          },

          // Optional: Typesense search parameters: https://typesense.org/docs/0.21.0/api/search.md#search-parameters
          typesenseSearchParameters: {},

          // Optional
          contextualSearch: true,
        },
        mermaid: {
          theme: { light: "default", dark: "dark" },
        },
        navbar: {
          title: "Home",
          logo: {
            alt: "My Site Logo",
            src: "img/logo.svg",
            srcDark: "img/logo-dark.svg",
          },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Docs",
            },
            {
              href: "https://github.com/wadhah101/insat-gl-knowledge",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Docs",
              items: [
                {
                  label: "Tutorial",
                  to: "/docs/intro",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/wadhah101/insat-gl-knowledge",
                },
              ],
            },
          ],
          copyright: `Licensed under GPL v3.0`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ["bash", "csharp", "java", "cshtml", "prolog"],
        },
      }),
  };
};

module.exports = config;
