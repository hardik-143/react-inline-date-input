// eslint.config.js
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      // "@typescript-eslint/no-unused-vars": ["warn"],
      "no-unused-vars": "warn",
      // "react/react-in-jsx-scope": "off",
      // "react/prop-types": "off",
      // ...ts.configs.recommended.rules,
      // ...reactPlugin.configs.recommended.rules,
      // ...reactHooks.configs.recommended.rules,
    },
  },
];
