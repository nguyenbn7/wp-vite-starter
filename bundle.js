import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { join, dirname, basename } from "path";
import archiver from "archiver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dest = join(__dirname, "..", `${basename(__dirname)}.zip`);

const output = createWriteStream(dest);
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

console.log("Bundling....");

archive.pipe(output);

archive.glob("**/*", {
  dot: true,
  ignore: [
    ".git/**",
    "node_modules/**",
    "src/**",
    ".env",
    ".env.example",
    ".gitignore",
    ".prettierignore",
    ".prettierrc",
    "bundle.js",
    "eslint.config.js",
    ".DS_Store",
    "jsconfig.json",
    ".github/**",
    ".gitattributes",
    "package-lock.json",
    "package.json",
    "README.md",
    ".vscode/**",
    "vite.config.js",
    "readme.txt",
    "LICENSE",
    "postcss.config.js",
    "tailwind.config.js",
    "assets/index.html",
  ],
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    // log warning
    console.log(err);
  } else {
    // throw error
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

archive.on("close", () => {
  console.log(`Bundle at location ${dest}`);
});

archive.finalize();
