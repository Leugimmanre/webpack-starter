Videos 86 - 95
Webpack se utiliza para compilar módulos de JavaScript.

Instalación y configuración
1. tener instalado node
ver si tiene node:
node --version
instalar:
pkg install nodejs

2. tener instalado npm (node package manager)
ver si tiene npm:
npm --version
instalar:
npm install

3. generar archivo pakckage.json
npm init

packaje name: toma por defecto el nombre del archivo, se puede cambiar
version: enter
description: Descripción del proyecto
entry point (index.js): enter
test command: enter
git repository: enter
keywords: enter
author: Miguel
license: enter
is this ok?: y


{
  "name": "proyecto1",
  "version": "1.0.0",
  "description": "proyecto web",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Miguel Martinez",
  "license": "ISC"
}

4. Realizar prueba (Se puede saltar esta prueba)
-Crear archivo scr
-En scr crear index.html e index.js
-Usar plantilla-proyectos.js


5. instala webpack
npm install webpack webpack-cli --save-dev

* Se crea la carpeta node_modules
* Se agrega el uso de dependencias en package.json:
  "devDependencies": {
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2"
  }

6. Crear script "build": "webpack"
Para ejecutar el build : npm run build
-Se crea la carpeta dist y el archivo main.js dentro
- Es ese archivo el que se importa en index.html para acceder a los módulos
(<script src="../dist/main.js"></script>) y no importar cada archivo js individualmente.
Añadir a script de package.json:
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js" <<<<<<<<<<


7. Crear archivo webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",

    module: {
        rules: [
            {
                test: /\.html$/,       // Cuando ejecute el buil, busca todos los archivos html, si lo encuentra:
                loader: 'html-loader', // Cargar los archivos html encontrados
                options: {
                    sources: false     // Automatíza los cambios de ubicación
                }
            }
        ]
    },
    optimization:{},

    plugins: [
        new HtmlWebpackPlugin()             // Instancia
    ]

}


Este es el archivo de configuracion del webpack, como queremos que funcione.


7. Configurar cargador html (html-loader)
npm install --save-dev html-loader


8. HtmlWebpackPlugin
npm install --save-dev html-webpack-plugin


al archivo pakage.json se añadeen devDependencies:
  "devDependencies": {
    "html-loader": "^3.1.0",
    "html-webpack-plugin": "^5.5.0",


9. Configurar reglas en el archivo webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
     module: {
         rules: [
             {
                 test: /\.html$/,   // Cuando ejecute el buil, busca todos los archivos html, si lo encuentra:
                 loader: 'html-loader',       // Cargar los archivos html encontrados
                 options: {
                     sources: false
                 }
             }
         ]
     },
     optimization:{},

     plugins: [
         new HtmlWebpackPlugin()              // Instancia
     ]
}

Se crea el index.html en la carpeta de distribución (como una imagen del index.html original


Cuando quede configurado el plugins template, ya no es necesario importar el archivo
main.js al documento index.html de producció (<script src="../dist/main.js"></script>),
ya lo hace automáticamente, asi que lo borramos.


10. Intala servicion http server para que no cargue en file, sino en el servidor
httpcco localhost y ver en tiempo real los cambio que hacemos (como live server de VSC)

instalar webpack server
npm install webpack-dev-server --save-dev

11. Programar un modo de ejecutar el webpack server
Instalar webpack server
npm install webpack-dev-server --save-dev

Añadir a script de package.json:
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "start": "webpack serve --config webpack.config.js --open --port=5600"  <<<<<<<<<<<<

Para ejecutar: npm start


Generar archivos de estilo
Dentro de src, crear un arcvivo css y dentro component.css

En el archivo js donde se ejecuta el código a estilizar (ej. component.js)
import '../css/component.css';

12. Instalar css-loader cargar archivos html
npm install --save-dev css-loader

13. Instalar style-loader
npm install --save-dev style-loader

Ir a webpack.conf.js y configurar una nueva regla:

   rules: [
       {
           test: /\.html$/,
           loader: 'html-loader',
           options: {
               sources: false
           }
       }, <<<<<<<<<
       {
          test: /\.css$/,         // Cuando ejecute el buil, busca todos los archivos css, si lo encuentra:
          use: ['style-loader', 'css-loader']
       }
   ]

Bajar y subir el servidor (ctrl+c / npm start) para que surtan efectos los cambios.


14. Generar archivo de estilos generales en producción como index.html e index.js

-Crear el archivo style.css en src.

Agregar nueva regla a webpack.config.js
1. al inicio:
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

2. En rules:
       {
          test: /\.css$/,               // Cuando ejecute el buil, busca todos los archivos css, si lo encuentra:
          exclude: /style.css$/,       <<<<<<
          use: ['style-loader', 'css-loader']
       },
       {				<<<<<<
          test: /style.css$/,
          use: [ MiniCssExtract.loader, 'css-loader' ]
      },

3. En plugins:
         }),

         new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
[name] para que conserve el mismo nombre (main).
[fullhash] para obtener un hass del nombre del archivo no no se conserve en la memoria del pc.

4. Instalar el plugin
npm install --save-dev mini-css-extract-plugin

5. Ir al archivo de producción index.js y agregar en el encabezado:
import './style.css';

En dis se crea la carpeta main.css


15. Manejo de imágenes
Crear carpeta imgs/assets/src y colocar una imágen.,

En component.js importar
import webpacklogo from '../assets/imgs/webpack-logo.png';

Instalar:
npm install file-loader --save-dev


16. Cargar las imàgenes a dist para programarlas en el html global
<img src="assets/img/webpack-logo.png" alt="Webpack logo">

instalar el CopyWebpackPlugin
npm install copy-webpack-plugin --save-dev



17. Crear archivo de producción
1. copiar archivo webpack.config.js
2. pegarlo en el mismo directorio y cambiar el nombre a webpack.prod.js
3. Abrir el archivo y cambiar nombre del modo:
module.exports = {
    mode: "production", <<<<<<<<<

Mejoras
1. ofuscar archivos css de distribución:
en webpack.prod.js hashear
         new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
2. ofuscar archivos js de distribución:
en webpack.prod.js hashear
module.exports = {
    mode: "production",
    output: {
        clean: true,
        filename: 'main.[contenthash].js', <<<<<<<
    },


18. Ofuscar - minimizar archivos css de dist CssMinimizerWebpackPlugin
Instalar
npm install css-minimizer-webpack-plugin --save-dev


19. Ofuscar - minimizar archivos jsde dist TerserWebpackPlugin
Instalar
npm install terser-webpack-plugin --save-dev

En webpack.prod.js en el encabezado:
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

y ...
     optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },


19. Instalación de BABEL para traducir al ECMAS 5 (pera navegadores antiguos)

https://babeljs.io/setup/webpack/install
Instalar
npm install --save-dev babel-loader @babel/core


Instalar
npm install @babel/preset-env --save-dev

Crear archivo babel.config.json con la configuración:
{
  "presets": ["@babel/preset-env"]
}


RESUMEN
package.json

{
  "name": "webpack-initial",
  "version": "1.0.0",
  "description": "Plantilla webpack",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.js",
    "build:dev": "webpack --config webpack.config.js",
    "start": "webpack serve --config webpack.config.js --open --port=8080"
  },
  "author": "Miguel Martinez",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.5",
    "@babel/preset-env": "^7.16.11",
    "babel-loader": "^8.2.3",
    "copy-webpack-plugin": "^10.2.4",
    "css-loader": "^6.7.1",
    "css-minimizer-webpack-plugin": "^3.4.1",
    "file-loader": "^6.2.0",
    "html-loader": "^3.1.0",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.6.0",
    "style-loader": "^3.3.1",
    "terser-webpack-plugin": "^5.3.1",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}


webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    output: {
        clean: true
    },
     module: {
         rules: [
             {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                 }
             },
             {
                test: /\.css$/,
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
            }
         ]
     },
     optimization:{},

     plugins: [
         new HtmlWebpackPlugin({
            title: 'Webpack App',
            //filename: 'home.html'
            template: './src/index.html'
         }),

         new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
     ]
}


webpack.prod.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    output: {
        clean: true,
        filename: 'main.[contenthash].js',
    },
     module: {
         rules: [
             {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                 }
             },
             {
                test: /\.css$/,
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
         new HtmlWebpackPlugin({
            title: 'Webpack App',
            //filename: 'home.html'
            template: './src/index.html'
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


index.js (producción)

import { saludar } from './js/component';
import './style.css';

const nombre = 'Miguel';

saludar( nombre );

component.js

import '../css/component.css';


export const saludar = ( nombre = 'sin nombre' ) => {
    console.log('Creando etiqueta h1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre }`;

    document.body.append( h1 );

}


