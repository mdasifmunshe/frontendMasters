import { readFile, writeFile } from "fs/promises";
const metaUrl = import.meta.url;

let template = await readFile(new URL("./template.html", metaUrl), "utf-8");

const data = {
  header: "My new file",
  body: "I wrote this file to disk using node",
};

for (const [key, val] of Object.entries(data)) {
  template = template.replace(`{${key}}`, val);
}

await writeFile(new URL("./index.html", metaUrl), template);
