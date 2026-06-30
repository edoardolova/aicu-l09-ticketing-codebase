import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const distPath = path.join(projectRoot, "dist");

await fs.mkdir(distPath, { recursive: true });

await Promise.all([
  fs.copyFile(path.join(projectRoot, "index.html"), path.join(distPath, "index.html")),
  fs.copyFile(path.join(projectRoot, "src", "styles.css"), path.join(distPath, "styles.css")),
  fs.copyFile(path.join(projectRoot, "src", "runtime-app.js"), path.join(distPath, "runtime-app.js"))
]);

console.log("Static build ready in dist/");
