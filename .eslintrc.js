/* eslint-disable no-undef */
module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "cypress/globals": true
    },
    "parser": "babel-eslint",
    "plugins": ["jest", "cypress"],
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "indent": [2, 4],
        "max-len": [1, 250],
        "no-return-assign": 0,
        "linebreak-style": 0,
        "semi": [2, "always"],
        "import/prefer-default-export": ["off"],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/assertion-before-screenshot": "warn",
        "cypress/no-force": "warn",
        "cypress/no-async-tests": "error"
    }
};
