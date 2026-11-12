import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".wix/**",
      ".wrangler/**",
      "node_modules/**",
      "coverage/**",
      "src/wix/**",
      "skills/wix-headless-kit/**",
      "skills/wix-docs/**",
      "skills/wix-manage/**",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-recommended"],

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
    },
  },

  {
    files: ["src/components/**", "src/layouts/**", "src/pages/**"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#(?:[0-9a-fA-F]{3,4}){1,2}/]",
          message:
            "Hand-written color. Use a token from src/styles/global.css.",
        },
      ],
    },
  },

  {
    files: [
      "scripts/**/*.mjs",
      "skills/**/*.mjs",
      "*.config.{js,mjs,ts}",
      "tests/**/*.ts",
    ],
    languageOptions: { globals: globals.node },
    rules: { "no-console": "off" },
  },
]
