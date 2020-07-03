//* going to search entire html document and look for and html element called canvas
let canvas = document.querySelector('canvas')


//* sets the length and width of the entire canvas to the window length and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

//* class to be extended by all images class that need the collision method

class Img {

    //* class creates a coordinate object to be use by the collision function

    makeCord = (x, y) => {
        return {
            x: x,
            y: y
        }
    }
    //* Function to calculate the distance between 2 points
    dist = (cordinate1, cordinate2) => {
        let xVel = cordinate1.x - cordinate2.x
        let yVel = cordinate1.y - cordinate2.y

        //* pythagorean theorem
        return Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2));
    }
}