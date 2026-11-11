import { registerHooks } from "node:module";
import { readFileSync } from "node:fs";

// Match the JSON imports supported by Astro and the Pages bundler when tests
// run directly in Node. Production does not depend on this test-only loader.
registerHooks({
  load(url, context, nextLoad) {
    if (url.startsWith("file:") && url.endsWith(".json")) {
      const data = JSON.parse(readFileSync(new URL(url), "utf8"));
      return {
        format: "module",
        source: `export default ${JSON.stringify(data)};`,
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});
