import assert from "assert";
import { add } from "./mylib.mjs";

try {
  console.log("\nadd() should add two numbers ");
  assert.strictEqual(add(2, 5), 7);
  console.log("  ✅ passed");
} catch (error) {
  console.log("  🚫 fail");
  console.error(error);
}
