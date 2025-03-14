module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./"],
                alias: {
                    "@assets": "./src/assets",
                    "@components": "./src/components",
                    "@constants": "./src/constants",
                    "@context": "./src/context",
                    "@hooks": "./src/hooks",
                    "@custom-types": "./src/types",
                    "@utils": "./src/utils",
                }
            }
        ]
    ]
};
