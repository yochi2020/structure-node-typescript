// eslint-disable-next-line no-undef
module.exports={
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "max-len": ["error", { code: 180 }],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always",
        ],
        "no-console": 1,    //เตือน warning เมื่อมีconsole
        "@typescript-eslint/no-unused-vars": ["error"], //เตือนerror เมื่อมีการสร้างตัวแปรไม่ได้ใช้
        "@typescript-eslint/no-explicit-any": "off", //ปิดคำเตือน warning เมื่อใช้ type any
    },
    "ignorePatterns": ["dist"]
};
