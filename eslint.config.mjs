// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        basePath: "src",
        extends: [eslint.configs.recommended, tseslint.configs.recommended],
        languageOptions: {
            globals: {
                ARGV: "readonly",
                Debugger: "readonly",
                GIRepositoryGType: "readonly",
                globalThis: "readonly",
                imports: "readonly",
                Intl: "readonly",
                log: "readonly",
                logError: "readonly",
                pkg: "readonly",
                print: "readonly",
                printerr: "readonly",
                window: "readonly",
                TextEncoder: "readonly",
                TextDecoder: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly",
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
            },
        },
        rules: {
            // GJS Restrictions
            "no-restricted-globals": [
                "error",
                {
                    name: "Debugger",
                    message: "Internal use only",
                },
                {
                    name: "GIRepositoryGType",
                    message: "Internal use only",
                },
                {
                    name: "log",
                    message: "Use console.log()",
                },
                {
                    name: "logError",
                    message: "Use console.warn() or console.error()",
                },
            ],
            "no-restricted-properties": [
                "error",
                {
                    object: "imports",
                    property: "format",
                    message: "Use template strings",
                },
                {
                    object: "pkg",
                    property: "initFormat",
                    message: "Use template strings",
                },
                {
                    object: "Lang",
                    property: "copyProperties",
                    message: "Use Object.assign()",
                },
                {
                    object: "Lang",
                    property: "bind",
                    message: "Use arrow notation or Function.prototype.bind()",
                },
                {
                    object: "Lang",
                    property: "Class",
                    message: "Use ES6 classes",
                },
            ],
            "no-restricted-syntax": [
                "error",
                {
                    selector:
                        'MethodDefinition[key.name="_init"] CallExpression[arguments.length<=1][callee.object.type="Super"][callee.property.name="_init"]',
                    message: "Use constructor() and super()",
                },
            ],
        },
    },
]);
