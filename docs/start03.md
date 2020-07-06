---
id: start03
title: ESLint & Prettierrc
sidebar_label: ESLint & Prettierrc
---

[ES Lint plugin](https://eslint.org) - write your code more clean, tells where you are making mistakes, and generally it’s good practice to work in a team so that everyone has everything one style - ES Lint will tell you which variables you don’t use, where and which components you don’t use, it shows syntax errors and where you don't put spaces correctly, where do you put semicolons, etc. That is, this is already a standard defect that you need to use in writing your code and this plugin will save you from many silly mistakes that you make when developing your application.

[Prettierrc](https://prettier.io/) - Code formatting tool with support for many languages, a minimum of configuration and a maximum of imposed rules.

![Step01](/img/steps/01.png)

## Install dependencies

```bash
 yarn add eslint eslint-config-airbnb babel-preset-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-watch babel-core babel-eslint babel-preset-react-native pre-commit prettier prettier-eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-native eslint-plugin-react-hooks --dev
```

![Step02](/img/steps/02.png)

## Eslint Rules

Add rules to .eslintrc.js

```jsx
module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-native', 'jsx-a11y', 'import', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    'react-native/react-native': true
  },
  rules: {
    'no-param-reassign': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': ['off'],
    'react/jsx-one-expression-per-line': 0,
    'linebreak-style': ['off'],
    'implicit-arrow-linebreak': 0,
    'no-undef': ['error'],
    'react/sort-comp': ['off'],
    'react/prefer-stateless-function': ['off'],
    'react/destructuring-assignment': 1,
    'function-paren-newline': 0,
    semi: ['error', 'never'],
    'spaced-comment': 0,
    'comma-dangle': ['error', 'never'],
    'react/prop-types': 0,
    'no-extra-boolean-cast': 0,
    'quote-props': 0,
    'object-curly-spacing': ['error', 'always'],
    camelcase: 0,
    'no-nested-ternary': 0,
    'react/jsx-wrap-multilines': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'no-unused-expressions': 0,
    'global-require': 0,
    'max-len': 0,
    'import/no-cycle': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 0,
    'import/prefer-default-export': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'no-console': 'error',
    'arrow-parens': 0,
    'eol-last': 0,
    'react/destructuring-assignment': 0,
    'react-native/no-unused-styles': 0,
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'consistent-return': 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ios.js', '.android.js']
      }
    }
  }
}
```

![Step03](/img/steps/03.png)

## Prettierrc Rules

Add rules to .prettierrc.js

```jsx
module.exports = {
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'none',
  bracketSpacing: true,
  semi: false,
  useTabs: false,
  jsxBracketSameLine: false
}
```

![Step04](/img/steps/04.png)

## Editing package.json

Where to add the scripts:

- Simulator. For me, this is iPhone SE since its screen size is the minimum layout requirement (iPhone 3.4 is already all)
- Linter, which will forbid you to push until all errors in the code are fixed
- Install Pods

```jsx
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios --simulator='iPhone SE'",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "postinstall":"cd ./ios && pod install && cd .."
  },
 "precommit": "lint",
```

![Step05](/img/steps/05.png)

## Transferring App.js

Create the `src` folder and transfer the App.js file there, renaming it `src/index.js`

![Step06](/img/steps/06.png)

## Launch the application

`yarn start-ios` or `yarn start-android`

## Done ✅

[![Become a Patron!](/img/logo/patreon.png)](https://www.patreon.com/bePatron?u=34467235)
