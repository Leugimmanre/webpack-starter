const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    clean: true, // Limpia la carpeta dist de archivos innecesarios
  },
  module: {
    rules: [
      {
        test: /\.html$/i, // Cuando ejecute el buil, busca todos los archivos html, si lo encuentra:
        loader: "html-loader", // Cargar los archivos html encontrados
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/, // Cuando ejecute el buil, busca todos los archivos css, si lo encuentra:
        exclude: /style.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /style.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
    ],
  },
  optimization: {},

  plugins: [
    new HtmlWebpackPlugin({
      // Instancia
      title: "Webpack App",
      //filename: 'home.html'             // Puedo cambiar el nombre del archivo index.html
      template: "./src/index.html", // Actualiza los cambio de  index.html de desarroll a index.html de distribución.
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
  ],
};
