// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

// /** @type {import('@docusaurus/types').Config} */
const config = async () => {
  const mdxMermaid = await import("mdx-mermaid");

  /** @type {import('@docusaurus/types').Config} */
  return {
    // DEBT use docusaurus native mermaid supposrt
    // markdown: {
    //   mermaid: true,
    // },
    // themes: ["@docusaurus/theme-mermaid"],
    title: "INSAT GL knowledge",
    tagline:
      "My Guide on how to survive software engineering in INSAT. You will find tips, references,  projects & cheat sheets.",
    url: "https://wadhah101.github.io",
    baseUrl: "/insat-gl-knowledge/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "wadhah101", // Usually your GitHub org/user name.
    projectName: "insat-gl-knowledge", // Usually your repo name.

    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },

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
            remarkPlugins: [math, mdxMermaid.default],
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
        mermaid: {
          theme: { light: "neutral", dark: "forest" },
        },
        navbar: {
          title: "Home",
          logo: {
            alt: "My Site Logo",
            src: "img/logo.svg",
          },
          items: [
            {
              type: "doc",
              docId: "docusaurus",
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
                  to: "/docs/docusaurus",
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
          additionalLanguages: ["bash", "csharp", "java"],
        },
      }),
  };
};

module.exports = config;
