// @ts-check

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.vsDark;

// No longer need remark-math and rehype-katex here

const config = async () => {
  /** @type {import('@docusaurus/types').Config} */
  return {
    markdown: {
      mermaid: true,
    },
    themes: [
      // No longer need @docusaurus/theme-mermaid
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        ({
          hashed: true,
          language: ["en"],
        }),
      ],
    ],
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
        ({
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
            // FIX: Require the plugins inline here
            // remarkPlugins: [require("remark-math")],
            // rehypePlugins: [require("rehype-katex")],
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl:
              "https://github.com/wadhah101/insat-gl-knowledge/edit/master",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // This is for the native mermaid support
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
          additionalLanguages: [
            "bash",
            "csharp",
            "java",
            "cshtml",
            "prolog",
            "hcl",
            "diff",
            "json"
          ],
        },
      }),
  };
};

module.exports = config;