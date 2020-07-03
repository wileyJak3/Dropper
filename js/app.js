//* going to search entire html document and look for and html element called canvas
let canvas = document.querySelector('canvas')


//* sets the length and width of the entire canvas to the window length and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');