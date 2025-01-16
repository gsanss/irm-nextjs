import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import { fixupPluginRules } from "@eslint/compat"
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  js.configs.recommended,
  prettierConfig, // disable conflicting rules from Eslint
  {
    plugins: {
      react,
      jest,
      "testing-library": fixupPluginRules(testingLibrary),
      "jsx-a11y": fixupPluginRules(jsxA11y),
      prettier: prettierPlugin,
    },
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...jest.environments.globals.globals,
      },
      parser: babelParser,
      ecmaVersion: 11,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error", // Treat Prettier violations as ESLint errors
      "react/prop-types": 0,
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "no-case-declarations": "off",
      "testing-library/await-async-query": "error",
      "testing-library/no-await-sync-query": "error",
      "testing-library/no-debugging-utils": "off",
      "testing-library/no-dom-import": "off",
      "testing-library/render-result-naming-convention": "off",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/autocomplete-valid": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/img-redundant-alt": "error"
    }
  }
];

export default eslintConfig;
