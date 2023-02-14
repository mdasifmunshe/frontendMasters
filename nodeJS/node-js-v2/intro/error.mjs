import { readFile } from "fs/promises";
const metaUrl = import.meta.url;

process.on("uncaughtException", (error) => {
  console.log(error);
});

/* ./app.mjs */
try {
  const result = await readFile(new URL("./app.mj", metaUrl), "utf-8");
  console.log(result);
} catch (error) {
  // throw error;
  console.error(error);
  console.log("\n'Hello after error'");
}
