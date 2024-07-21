import { defineConfig, loadEnv } from "vite";
import { basename, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderName = basename(__dirname);

/**
 * @param {Object} _
 * @param {string} _.mode
 */
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const base =
    mode === "development" ? "/" : `/wp-content/themes/${folderName}/dist`;

  console.log(`base path used: ${base}`);

  return defineConfig({
    root: "./src",
    base,
    build: {
      outDir: "../assets",
      manifest: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "images/[name]-[hash][extname]";
            }

            if (/\.css$/.test(name ?? "")) {
              return "css/[name]-[hash][extname]";
            }

            // default value
            // ref: https://rollupjs.org/guide/en/#outputassetfilenames
            return "[name]-[hash][extname]";
          },
        },
      },
    },
  });
};
