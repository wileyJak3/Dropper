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

//* astroid image class that creates the moving astroid images

class astroid extends Img {

    constructor() {
        super()
        this.x = Math.random() * canvas.width
        this.y = 0
        this.xVel = (Math.random() - 0.6) * 2
        this.yVel = (Math.random()) * 2
        this.sizeWidth = Math.random() * 90 + 10
    }

    draw = () => {
        let img = document.getElementById("astroid");
        context.drawImage(img, this.x, this.y, this.sizeWidth, this.sizeWidth);
        this.x += this.xVel // X velocity ( rate at which something moves in each direction)
        this.y += this.yVel
    }

    checkOffPage = () => {
        if (this.y < 0 || this.y > canvas.height) {
            this.y = 0
            this.x = Math.random() * canvas.width
        }
        if (this.x < -80 || this.x > canvas.width + 20) {
            this.y = 0
            this.x = Math.random() * canvas.width
        }

        console.log("working")
    }
}

//* Intializes empty array of astroids
let asteroidArray = [];

//* loop to creates astroids and pushes them into array
for (let i = 0; i < 50; i++) {
    asteroidArray.push(new astroid())
}


//* Space ship image class that creates the moving spaceship image

class Spaceship extends Img {

    constructor() {
        super()
        this.x = canvas.width / 2
        this.y = canvas.height - 90
        this.xVel = 0
        this.yVel = 0
        this.size = 100
    }

    //* references the html image and draws it onto the canvas
    draw = () => {
        let img = document.getElementById("spaceship");
        context.drawImage(img, this.x, this.y, this.size, this.size);


        this.x = this.x + this.xVel // X velocity ( rate at which something moves in each direction)
        this.y = this.y + this.yVel

    }
}
