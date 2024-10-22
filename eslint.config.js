module.exports = {
    languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
            browser: true,
            es2021: true,
            node: true,
        },
    },
    plugins: {
        prettier: require('eslint-plugin-prettier'),
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
