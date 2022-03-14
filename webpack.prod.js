const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    output: {
        clean: true,                          // Limpia la carpeta dist de archivos innecesarios
        filename: 'main.[contenthash].js',
    },
     module: {
         rules: [
             {
                test: /\.html$/,               // Cuando ejecute el buil, busca todos los archivos html, si lo encuentra:
                loader: 'html-loader',         // Cargar los archivos html encontrados
                options: {
                    sources: false
                 }
             },
             {
                test: /\.css$/,               // Cuando ejecute el buil, busca todos los archivos css, si lo encuentra:
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
             },
             {
                test: /style.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
         ]
     },
     optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

     plugins: [
         new HtmlWebpackPlugin({                // Instancia
            title: 'Webpack App',
            //filename: 'home.html'             // Puedo cambiar el nombre del archivo index.html
            template: './src/index.html'        // Actualiza los cambio de  index.html de desarroll a index.html de distribución.
         }),

         new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
     ]
}
