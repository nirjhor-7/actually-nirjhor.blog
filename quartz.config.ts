import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "<i>nirjhor.flow</i>",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "actually-nirjhor.blog",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Space Grotesk",
        body: "Space Grotesk",
        code: "Space Grotesk",
      },
      colors: {
        lightMode: {
          light: "#EFECE3",       // Your Cozy Background
          lightgray: "#D4D1C8",   // Subtle borders (Derived from BG)
          gray: "#4A70A9",        // Meta text (Your Dark Blue)
          darkgray: "#000000",    // Body text (Black)
          dark: "#000000",        // Headers (Black)
          secondary: "#4A70A9",   // Links (Your Dark Blue)
          tertiary: "#8FABD4",    // Accents (Your Light Blue)
          highlight: "rgba(143, 171, 212, 0.15)", // Soft Blue Highlight
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0a0a0a",       // Deep Space Black
          lightgray: "#1f1f1f",   // Dark borders
          gray: "#8FABD4",        // Meta text (Your Light Blue)
          darkgray: "#EFECE3",    // Body text (Your Beige - High Contrast)
          dark: "#ffffff",        // Headers (White)
          secondary: "#8FABD4",   // Links (Your Light Blue)
          tertiary: "#4A70A9",    // Accents (Your Dark Blue)
          highlight: "rgba(143, 171, 212, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config