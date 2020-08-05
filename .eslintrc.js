module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-param-reassign": ["error", { "props": false }],
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "object-shorthand": ["error", "never"],
        "linebreak-style": ["error", "windows"],
        "no-plusplus": "off",
        "max-classes-per-file": ["error", 5],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "always"
            }
         ]
    }
};