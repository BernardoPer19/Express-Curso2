import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config'} */
export default {
  languageOptions: {
    globals: globals.node, // Cambiado a node en lugar de browser
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["eslint:recommended"], // Usa las reglas recomendadas de ESLint
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};
