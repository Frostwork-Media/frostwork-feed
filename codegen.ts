import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://metaforecast.org/api/graphql",
  generates: {
    "./lib/metaforecast-types.ts": {
      plugins: ["typescript"],
    },
  },
};
export default config;
