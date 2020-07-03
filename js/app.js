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

    
    //* the collison function finds the centermost point of each object and returns true when the distance between the 2 centermost points of each image is less than the sum of the radius  of the two images

    collision = (obj) => {
        this.coordinate = this.makeCord(this.x + this.sizeWidth / 2, this.y + this.sizeWidth / 2);
        // let objCoordinate = (this.x + this.sizeWidth/2,this.y + this.sizeWidth/2)
        this.objCoordinate = this.makeCord(obj.x + obj.size / 2, obj.y + obj.size / 2)
        let thisRad = this.sizeWidth / 2
        let objRad = obj.size / 2
        let d = this.dist(this.coordinate, this.objCoordinate)
        return (d + 30 < (thisRad + objRad))
    }
}