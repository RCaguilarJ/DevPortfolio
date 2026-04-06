import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  plugins: [
    contentCollections(),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    viteReact(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: { dark: "github-dark", light: "github-light" },
            keepBackground: false,
          },
        ],
      ],
      providerImportSource: "@mdx-js/react",
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("maath")
          ) {
            return "three-vendor";
          }

          if (
            id.includes("gsap") ||
            id.includes("@gsap") ||
            id.includes("lenis")
          ) {
            return "motion-vendor";
          }

          if (
            id.includes("@mdx-js") ||
            id.includes("remark-") ||
            id.includes("rehype-") ||
            id.includes("content-collections")
          ) {
            return "content-vendor";
          }

          if (id.includes("@tanstack")) {
            return "tanstack-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("class-variance-authority") ||
            id.includes("clsx") ||
            id.includes("tailwind-merge") ||
            id.includes("lucide-react")
          ) {
            return "ui-vendor";
          }

          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("scheduler")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
