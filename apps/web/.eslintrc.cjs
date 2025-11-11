/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    settings: {
        react: { version: "detect" },
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: [
        "react",
        "react-hooks",
        "import",
        "simple-import-sort",
        "unused-imports",
        "@typescript-eslint",
        "prettier",
        "jsx-a11y",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    ],
    rules: {
        // 🔧 Import & organização
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/order": "off",
        "import/no-unresolved": "off",

        // ⚠️ Remover imports não usados
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],

        // 🧠 Typescript
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-ts-comment": "off",

        // 💅 Prettier integration
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                semi: true,
                singleQuote: false,
                trailingComma: "es5",
                printWidth: 100,
            },
        ],

        // 🧱 React & JSX
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
    },
};
