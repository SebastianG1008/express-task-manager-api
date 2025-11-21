const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  // Reglas para el código de la app (src)
  {
    files: ["src/**/*.ts"],
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-floating-promises": "off",

      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
    },
  },

  // Reglas específicas para los tests (tests)
  {
    files: ["tests/**/*.ts"],
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        // Globals de Jest
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        jest: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // En tests permitimos any y no queremos pelear con mocks
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Y por seguridad, apagamos no-undef aquí también
      "no-undef": "off",
    },
  },
];
