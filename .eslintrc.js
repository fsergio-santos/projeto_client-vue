module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
         $: true,
         jQuery: true
    },
    "plugins": [
        "vue",
    ],
    "rules": {
    }
};