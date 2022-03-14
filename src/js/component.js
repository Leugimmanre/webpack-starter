import '../css/component.css';
//import webpacklogo from '../assets/imgs/webpack-logo.png';


export const saludar = ( nombre = 'sin nombre' ) => {
    console.log('Creando etiqueta h1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre }`;

    document.body.append( h1 );


    // Img
    // const img = document.createElement('img');
    // img.src = webpacklogo;
    // document.body.append( img );
}