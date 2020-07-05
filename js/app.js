//* going to search entire html document and look for and html element called canvas
let canvas = document.querySelector('canvas')


//* sets the length and width of the entire canvas to the window length and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

//* class to be extended by all images class that need the collision method

//
//~ ───  SECTION IMG CLASS  ──────────────────────────────────────────────────────────────────
//

class Img {

    //* class creates a coordinate object to be use by the collision function

    makeCord = (x, y) => {
        return {
            x: x,
            y: y
        }
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

    //* Function to calculate the distance between 2 points
    dist = (cordinate1, cordinate2) => {
        let xVel = cordinate1.x - cordinate2.x
        let yVel = cordinate1.y - cordinate2.y

        //* pythagorean theorem
        return Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2));
    }

    speedMagReduce(num) {
        this.xVel = this.xVel / num
        this.yVel = this.yVel / num
    }

    speedMagIncrease(num) {
        this.xVel = this.xVel * num
        this.yVel = this.yVel * num
    }

}

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────

//
//~ ─── SECTION ASTROID CLASS  ──────────────────────────────────────────────────────
//

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

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────

//~ ─── SECTION SPACESHIP CLASS  ────────────────────────────────────────────────────
//

//* Space ship image class that creates the moving spaceship image

class Spaceship extends Img {

    constructor() {
        super()
        this.blueCrystal = 0
        this.redCrystal = 0
        this.radioactive = 0
        this.x = canvas.width / 2
        this.y = canvas.height - 90
        this.xVel = 0
        this.yVel = 0
        this.size = 100
        this.hull = 100
        this.shipScore = 0
    }

    //* references the html image and draws it onto the canvas
    draw = () => {
        let img = document.getElementById("spaceship");
        context.drawImage(img, this.x, this.y, this.size, this.size);


        this.x = this.x + this.xVel // X velocity ( rate at which something moves in each direction)
        this.y = this.y + this.yVel

    }

    dmgHull = () => {
        let randDmgVal = (Math.random() * 10) + 10
        let tempDmgVal = this.hull - randDmgVal
        alert(`${this.hull} - ${randDmgVal} = ${tempDmgVal}`)
        this.hull = tempDmgVal

    }


    //* this method checks to see if the spaceship has flow off the page
    checkOffPage = () => {
        if (this.y < 0 || this.y > canvas.height) {
            this.y = 0
            this.x = Math.random() * canvas.width
        }
        if (this.x < -80 || this.x > canvas.width + 20) {
            this.y = 0
            this.x = Math.random() * canvas.width
        }

        // console.log("working")
    }
}

    //
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//

//* creates a space ship for the player to control
playerShip = new Spaceship()

//
//~ ─── SECTION POWERUPS CLASS  ─────────────────────────────────────────────────────
//


class PowerUps extends Spaceship {

    constructor() {
        super()
        this.x = Math.random() * canvas.width
        this.y = 0
        this.xVel = (Math.random() - 0.6) * 2
        this.yVel = (Math.random()) * 2
        this.powerUpNum = Math.floor(Math.random() * 3)
        this.sizeWidth = Math.random() * 90 + 10
        this.powerUpArr = [document.getElementById("radioactive"), document.getElementById("redCrystal"), document.getElementById("blueCrystal")]
    }
    draw = () => {

        let img = this.powerUpArr[this.powerUpNum]
        context.drawImage(img, this.x, this.y, this.sizeWidth, this.sizeWidth);
        this.x += this.xVel // X velocity ( rate at which something moves in each direction)
        this.y += this.yVel
    }
    checkOffPage = () => {
        if (this.y < 0 || this.y > canvas.height) {
            this.y = 0
            this.x = Math.random() * canvas.width
            this.yVel = this.yVel * -1
        }
        if (this.x < -80 || this.x > canvas.width + 20) {
            //this.y = 0
            //this.x = Math.random() * canvas.width
            this.xVel = this.xVel * -1
        }

        console.log("working")
    }

}



//* checks the arrow key presses to control the spaceship
document.onkeydown = function (event) {
    switch (event.key) {
        case 'ArrowUp':
            // up arrow
            playerShip.yVel = playerShip.yVel - 1.5
            break;
        case 'ArrowDown':
            // down arrow
            playerShip.yVel = playerShip.yVel + 1.5
            break;
        case 'ArrowLeft':
            // left arrow
            playerShip.xVel = playerShip.xVel - 2.5
            break;
        case 'ArrowRight':
            // right arrow
            playerShip.xVel = playerShip.xVel + 2.5
    }
};


let animate = () => {

    //* the request animation frame function is basically creating a loop, It's basically cycling through over and over again until told to stop
    requestAnimationFrame(animate)

    //* clear the screen so multiple circles don't just stack on each other and actually disappear when another appears to simulate animation.
    context.clearRect(0, 0, innerWidth, innerHeight)

    //* draws the asteroids stored in the asteroid array onto the canvas
    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].draw()
    }

    for (let i = 0; i < asteroidArray.length; i++) {
        // circleArray[i].checkOffPage()
        asteroidArray[i].checkOffPage()
    }

    //* draws the player ship onto the canvas
    playerShip.draw()

    //* checks for a collision between player ship and the asteroids
    for (let i = 0; i < asteroidArray.length; i++) {
        if (asteroidArray[i].collision(playerShip)) {
            console.log("collision")
            alert("collision")
        }
    }

}
animate()