module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        ["module-resolver", {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@shared": "./src/shared",
            "@assets": "./assets",
            "@hooks": "./src/shared/hooks",
            "@utils": "./src/shared/utils",
            "@services": "./src/shared/services",
            "@providers": "./src/shared/providers",
          }
        }]
      ]
    };
  };