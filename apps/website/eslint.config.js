import { nextJsConfig } from "@ascnd-gg/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    // TODO: Remove when issue with ESLint and Next.js is fixed.
    ignores: ["next-env.d.ts", ".next"],
  },
];
