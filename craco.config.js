const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const addPath = (dir) => path.join(__dirname, dir);

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(
                __dirname,
                "./node_modules/libpag/lib/libpag.wasm"
              ),
              to: "./static/js/",
            },
          ],
        })
      );
      return config;
    },
    alias: {
      "@": addPath("src"),
    },
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
