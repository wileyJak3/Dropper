//* going to search entire html document and look for and html element called canvas
let canvas = document.querySelector('canvas')

//* sets the length and width of the entire canvas to the window length and width
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
$(document).ready(function() {
    canvas.width = $(".gameScreen").width();
    canvas.height = $(".gameScreen").height();
  });
canvas.width = canvas.width
canvas.height = canvas.height
let context = canvas.getContext('2d');



//* class to be extended by all images class that need the collision method

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
    sizeMagIncrease(num) {
        this.sizeWidth = this.sizeWidth * num
    }

}
//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//
//
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

    //* function used to keep space ship from leaving page
    edgeBounce = () => {
        
        //* if (x > innerWidth) { // using the point at center half circle cut off on the edge (AKA bounce of side of screen)
        if ((this.x + 80) + this.size / 3 > canvas.width || (this.x + 80) - this.size / 3 < 0) { 
            
            //* switch value with contact at the edge of the circle
            this.xVel = -this.xVel * .7;
        }

        //* bounce off top
        if (this.y + this.size / 3 > canvas.height || this.y - this.size / 3 < 0) { 
            this.yVel = -this.yVel * .7;
        }

    }

}
//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//


// //* creates a space ship for the player to control
// playerShip = new Spaceship()




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

    checkPowerUp = () => {
        (this.powerUpNum == 0) ? this.radioactive++
            : (this.powerUpNum == 1) ? this.redCrystal++
            :this.blueCrystal++
    }
}

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//


//
//~ ───  SECTION KEY ASSIGNMENTS ────────────────────────────────────────────────────────────
//


// //* Create powerUp obj
// powerUpSpawn = new PowerUps()

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
        case 'ArrowRight':
            // right arrow
            playerShip.xVel = playerShip.xVel + 2.5
            break

        case 'ArrowLeft':
            // left arrow
            playerShip.xVel = playerShip.xVel - 2.5
            break;

        case 'w':
            alert("you pressed the w key (warp speed)")
            warpCounter = 0
            playerWarp = true
            break
        case 'a':
            alert("you pressed the a key (time/space generator)")
            timeCounter = 0
            timeFreeze = true
            break
        case 's':
            alert("you pressed the s key (shields)")
            shieldCounter = 0
            shieldOn = true
            break
        case ' ':
            if (gameTog == true) {
                gameTog = false
                gamePause = true
                alert("GAME PAUSED")
                break
            } else {
                gameTog = true
                gamePause = false
                animate()
                alert("resumed")
                break
            }



    }
};
//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//


//
//~ ─── SECTION FUNCTION CALLS AND GLOBALS  ─────────────────────────────────────────
//
//
//~ ─── ASTEROID ARRAY CREATION ────────────────────────────────────────────────────
//

//* Initializes empty array of asteroids
let asteroidArray = [];

//* loop to creates astroids and pushes them into array
for (let i = 0; i < 10; i++) {
    asteroidArray.push(new astroid())
}
let playerWarp;
let timeFreeze;
let gameTog = true
let gamePause = false
//* creates a space ship for the player to control
playerShip = new Spaceship()
//* Create powerUp obj
powerUpSpawn = new PowerUps()
let iterationCounter = 0
let warpCounter = 0
let timeCounter = 0
let shieldCounter = 0
let powerUpTimer = 100
let valueChange = false;
let shieldOn = false;


let animate = () => {

    //* the request animation frame function is basically creating a loop, It's basically cycling through over and over again until told to stop

    if (gamePause == false) {
        // myReq = 
        requestAnimationFrame(animate)
        //cancelAnimationFrame(myReq)
    }


    //* clear the screen so multiple circles don't just stack on each other and actually disappear when another appears to simulate animation.
    context.clearRect(0, 0, innerWidth, innerHeight)

    //

    //
    //? ─── PLAYER SCORE ───────────────────────────────────────────────────────────────
    //

    iterationCounter++
    while (iterationCounter % 100 == 0) {
        playerShip.shipScore += 10
        // alert(playerShip.shipScore)
        break
    }

    //? ─── SECTION WARP SPEED  ─────────────────────────────────────────────────────────
    //

    if (playerWarp == true) {
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagReduce(2)
            // warpCounter = 0
            valueChange = true

        }
        playerWarp = false
    }


    if (warpCounter == powerUpTimer && valueChange == true) {
        alert("exiting warp")
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagIncrease(2)
            valueChange = false

        }
    }

    console.log(warpCounter)
    warpCounter++

    //
    // ─── !SECTION ────────────────────────────────────────────────────────────────────
    //

    //? ───  SECTION TIME FREEZE  ─────────────────────────────────────────────────────────
    //



    if (timeFreeze == true) {
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagReduce(100)
            // warpCounter = 0
            valueChange = true

        }
        timeFreeze = false
    }


    if (timeCounter == powerUpTimer && valueChange == true) {
        alert("space/time generator failing")
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagIncrease(100)
            valueChange = false

        }
    }

    console.log(timeCounter)
    timeCounter++

    //
    //? ─── !SECTION ────────────────────────────────────────────────────────────────────
    //

    //
    //? ─── SHIELDS SECTION ────────────────────────────────────────────────────────────────────
    //
    if (shieldOn == true && powerUpTimer == shieldCounter) {
        shieldOn = false
        alert("shields have failed")
    }

    console.log(shieldCounter)
    shieldCounter++

    //
    //? ─── !SECTION ────────────────────────────────────────────────────────────────────
    //



    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].draw()
    }
    for (let i = 0; i < asteroidArray.length; i++) {
        // circleArray[i].checkOffPage()
        asteroidArray[i].checkOffPage()
    }
    powerUpSpawn.draw()
    powerUpSpawn.checkOffPage()

    playerShip.draw()

    //* Collision Detection for outside of warp/hyperspace

    if (valueChange == false && shieldOn == false) {
        for (let i = 0; i < asteroidArray.length; i++) {
            if (asteroidArray[i].collision(playerShip)) {
                console.log("collision")
                playerShip.dmgHull()
                alert("collision")
                asteroidArray[i] = new astroid()
            }
        }
    }
    //* Collision Detection for outside of warp/hyperspace and have shields
    else if (shieldOn) {
        for (let i = 0; i < asteroidArray.length; i++) {
            if (asteroidArray[i].collision(playerShip)) {
                console.log("collision")
                // playerShip.dmgHull()
                alert("collision, nuclear shield absorbs dmg")
                asteroidArray[i] = new astroid()
            }
        }
    }
    //* Collision Detection for inside of warp/hyperspace
    else if (valueChange && shieldOn) {
        for (let i = 0; i < asteroidArray.length; i++) {
            if (asteroidArray[i].collision(playerShip)) {
                console.log("collision")
                // playerShip.dmgHull()
                alert("collision")
                asteroidArray[i].y = -10
            }
        }
    }
     //* Collision Detection for inside of warp/hyperspace and have shields 
    else if (valueChange && !shieldOn) {
        for (let i = 0; i < asteroidArray.length; i++) {
            if (asteroidArray[i].collision(playerShip)) {
                console.log("collision")
                playerShip.dmgHull()
                alert("collision")
                asteroidArray[i].y = -10
            }
        }
    }


    //* Power Ups collision detection
    if (powerUpSpawn.collision(playerShip)) {
        //! cancelAnimationFrame(myReq); this is how I end game
        console.log("powerUp collision")
        powerUpSpawn.checkPowerUp()
        playerShip.shipScore += (Math.floor(Math.random() * 30)) + 10
        alert(`powerUP collision\n Score: ${playerShip.shipScore}`)



        powerUpSpawn = new PowerUps()
    }
}


animate()

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//