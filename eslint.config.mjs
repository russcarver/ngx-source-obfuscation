// ESLint Flat Config migrated from .eslintrc.json per ESLint v9 guide
// Skips automatic migration; mirrors previous settings for TypeScript files.

import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import noNullPlugin from "eslint-plugin-no-null";
import preferArrowPlugin from "eslint-plugin-prefer-arrow";
import stylisticPlugin from "@stylistic/eslint-plugin";
import unicornPlugin from "eslint-plugin-unicorn";

export default [
  // Ignore patterns migrated from .eslintignore and previous config
  {
    ignores: ["dist", "**/node_modules", "**/*.js"],
  },

  // Apply ESLint recommended rules to TS files (was "eslint:recommended")
  {
    ...js.configs.recommended,
    files: ["**/*.ts"],
  },

  // Note: Skipping direct include of @typescript-eslint's recommended flat config
  // because some variants may rely on eslintrc-style "extends". Custom rules below
  // preserve the previous behavior from .eslintrc.json.

  // TypeScript files configuration and custom rules
  {
    files: ["**/*.ts"],

    // Use TypeScript parser with project config
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
        createDefaultProgram: true,
      },
    },

    // Load plugins referenced by rules
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      jsdoc: jsdocPlugin,
      "no-null": noNullPlugin,
      "prefer-arrow": preferArrowPlugin,
      "@stylistic": stylisticPlugin,
      unicorn: unicornPlugin,
    },

    rules: {
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: false,
          },
        },
      ],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/semi": ["error"],
      "@stylistic/type-annotation-spacing": "error",

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          minimumDescriptionLength: 3,
          "ts-expect-error": "allow-with-description",
          "ts-check": false,
          "ts-ignore": "allow-with-description",
          "ts-nocheck": "allow-with-description",
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            accessors: "explicit",
            constructors: "explicit",
            parameterProperties: "explicit",
          },
        },
      ],
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "signature",
              "public-field",
              "protected-field",
              "private-field",
              "constructor",
              "method",
            ],
          },
          interfaces: {
            memberTypes: ["signature", "field", "constructor", "method"],
            order: "alphabetically-case-insensitive",
          },
        },
      ],
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: ["enumMember"], format: ["StrictPascalCase"] },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
      ],
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-shadow": ["error", { hoist: "all" }],
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/triple-slash-reference": [
        "error",
        { path: "always", types: "prefer-import", lib: "always" },
      ],
      "@typescript-eslint/typedef": [
        "error",
        {
          arrowParameter: true,
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
        },
      ],
      "@typescript-eslint/unified-signatures": "error",

      "arrow-body-style": ["error", "as-needed"],
      "arrow-parens": ["error", "always"],
      "brace-style": ["error", "1tbs"],
      "comma-dangle": "error",
      "complexity": "off",
      "constructor-super": "error",
      curly: "error",
      "default-case": "error",
      "eol-last": "error",
      eqeqeq: ["error", "always"],
      "guard-for-in": "error",
      // id-blacklist was deprecated; use id-denylist instead
      "id-denylist": [
        "error",
        "any",
        "Number",
        "number",
        "String",
        "string",
        "Boolean",
        "boolean",
        "Undefined",
        "undefined",
      ],
      "id-match": "error",
      "import/no-default-export": "off",
      "import/no-deprecated": "warn",
      "jsdoc/check-alignment": "error",
      "jsdoc/no-types": "error",
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
      "max-classes-per-file": ["error", 1],
      "max-len": ["error", { code: 120 }],
      "max-lines": ["warn", 700],
      "new-parens": "error",
      "no-bitwise": "error",
      "no-caller": "error",
      "no-case-declarations": "off",
      "no-cond-assign": "error",
      "no-console": ["error", { allow: [""] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-eval": "error",
      "no-fallthrough": "error",
      "no-floating-decimal": "error",
      "no-irregular-whitespace": "error",
      "no-invalid-this": "error",
      "no-multiple-empty-lines": ["error", { max: 2 }],
      "no-new-wrappers": "error",
      "no-null/no-null": "error",
      "no-redeclare": "error",
      "no-restricted-imports": [
        "error",
        { name: "rxjs/Rx", message: "Please import directly from 'rxjs' instead" },
      ],
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-undef-init": "error",
      "no-underscore-dangle": ["error", { allowAfterThis: true }],
      "no-unsafe-finally": "error",
      "no-unused-labels": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "one-var": ["error", "never"],
      "padding-line-between-statements": [
        "off",
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "prefer-arrow/prefer-arrow-functions": "off",
      "prefer-const": "error",
      "prefer-template": "error",
      "quote-props": ["error", "as-needed"],
      quotes: "off",
      radix: "error",
      semi: "off",
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: false,
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
      "sort-keys": ["error", "asc", { caseSensitive: false }],
      "sort-vars": "error",
      "space-before-function-paren": [
        "error",
        { anonymous: "never", asyncArrow: "always", named: "never" },
      ],
      "space-in-parens": ["error", "never"],
      "use-isnan": "error",
      "unicode-bom": ["error", "never"],
      "unicorn/prefer-switch": "error",
      "valid-typeof": "off",
      yoda: "error",
    },
  },
];
