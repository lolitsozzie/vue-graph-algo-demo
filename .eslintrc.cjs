/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-strongly-recommended',
        '@vue/eslint-config-typescript',
        'eslint:recommended',
    ],
    rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-spacing': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        'curly': ['error', 'multi-line', 'consistent'],
        'eol-last': ['error', 'always'],
        'indent': ['error', 4],
        'key-spacing': ['error'],
        'linebreak-style': ['error', 'unix', 0],
        'max-len': ['warn', {
            code: 120,
            ignoreUrls: true,
            ignoreRegExpLiterals: true,
        }],
        'new-parens': 'error',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-duplicate-imports': 'error',
        'no-trailing-spaces': ['error', {
            skipBlankLines: true,
        }],
        'no-redeclare': 'off',
        'no-unused-vars': ['warn'],
        'no-var': ['error'],
        'object-curly-spacing': ['error', 'always', {
            objectsInObjects: false,
        }],
        'prefer-const': ['warn', {
            destructuring: 'all',
        }],
        'quotes': ['error', 'single'],
        'require-await': ['warn'],
        'semi': ['error', 'always'],
        'sort-imports': ['error', {
            ignoreCase: true,
        }],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
        'vue/arrow-spacing': ['error'],
        'vue/html-button-has-type': 'error',
        'vue/html-indent': ['error', 4, {
            baseIndent: 1,
        }],
        'vue/key-spacing': ['error'],
        'vue/max-attributes-per-line': ['error', {
            singleline: Infinity,
            multiline: 1,
        }],
        'vue/max-len': ['warn', {
            code: 130,
            ignoreUrls: true,
            ignoreRegExpLiterals: true,
        }],
        'vue/object-curly-spacing': ['error', 'always', {
            objectsInObjects: false,
        }],
        'vue/order-in-components': 'error',
        'vue/require-v-for-key': 'warn',
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
        }],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                'indent': 'off', // vue/html-indent & vue/script-indent handle this instead
                'max-len': 'off', // vue/max-len handles this instead
                'vue/html-button-has-type': 'off',
            },
        },
    ],
    env: {
        'vue/setup-compiler-macros': true,
    },
    parserOptions: {
        'ecmaVersion': 'latest',
    },
};
