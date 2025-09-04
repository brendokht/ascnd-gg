import { config } from "@ascnd-gg/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ["./generated/**"],
  },
];
