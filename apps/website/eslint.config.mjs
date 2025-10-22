import { nextJsConfig } from "@ascnd-gg/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    ignores: ["next-env.d.ts", ".next"],
  },
];
