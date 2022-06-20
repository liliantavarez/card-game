module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ["airbnb-base", "eslint:recommended"],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        quotes: ["error", "double"],
        "no-unused-vars": "off",
        "no-console": "off",
        "arrow-parens": "off",
        eqeqeq: "error",
        "function-paren-newline": "off",
        indent: ["error", 4],
        "linebreak-style": [2, "unix"],
        "no-duplicate-imports": "error",
        "no-extra-parens": "error",
        "no-return-await": "error",
        "no-shadow": [
            "error",
            {
                builtinGlobals: false,
                hoist: "functions",
                allow: [],
            },
        ],
        "operator-linebreak": [2, "before", { overrides: { "?": "after" } }],
        "import/prefer-default-export": "off",
    },
};
