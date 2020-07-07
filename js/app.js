//* going to search entire html document and look for and html element called canvas
let canvas = document.querySelector('canvas')

//* sets the length and width of the entire canvas to the window length and width
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
$(document).ready(function () {
    canvas.width = $(".gameScreen").width();
    canvas.height = $(".gameScreen").height();
});
canvas.width = canvas.width
canvas.height = canvas.height
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
        this.x = Math.random() * (canvas.width)
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
        this.y = canvas.height + 200
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

    // this message subtracts the damage taken from ship hull
    dmgHull = () => {
        let randDmgVal = (Math.random() * 10) + 10
        let tempDmgVal = this.hull - randDmgVal
        //alert(`${this.hull} - ${randDmgVal} = ${tempDmgVal}`)
        this.hull = Math.round(tempDmgVal).toFixed(0)

        if (this.hull > 0) {
            document.getElementById('healthNum').textContent = this.hull;
        } else {
            document.getElementById('healthNum').textContent = 0;
        }

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


    //* function will be used to keep space ship from leaving page
    edgeBounce = () => {

        //* bounce off side of screen
        if ((this.x + 80) + this.size / 3 > canvas.width || (this.x + 80) - this.size / 3 < 0) { 
            this.xVel = -this.xVel * .7;
        }

        //* bounce off top
        if (this.y + this.size / 3 > canvas.height || this.y - this.size / 3 < 0) { 
            this.yVel = -this.yVel * .7;
        }

    }
    // resetShip = () =>{
    //     this.blueCrystal = 0
    //     this.redCrystal = 0
    //     this.radioactive = 0
    //     this.x = canvas.width / 2
    //     this.y = canvas.height + 200
    //     this.xVel = 0
    //     this.yVel = 0
    //     this.size = 100
    //     this.hull = 100
    //     this.shipScore = 0
    // }

}
//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//

// //* creates a space ship for the player to control
// playerShip = new Spaceship()

//
//~ ─── SECTION POWERUPS CLASS  ─────────────────────────────────────────────────────

//*  Creates a randomly selected power up to be generated and drawn o the canvas
// ────────────────────────────────────────────────────────────────────────────────


class PowerUps extends Spaceship {

    constructor() {
        super()
        this.x = Math.random() * canvas.width
        this.y = 0
        this.xVel = (Math.random() - 0.6) * 2
        this.yVel = (Math.random()) * 2
        this.powerUpNum = Math.floor(Math.random() * 3)
        this.sizeWidth = Math.random() * 90 + 10

        //* powerUp array
        this.powerUpArr = [document.getElementById("radioactive"), document.getElementById("redCrystal"), document.getElementById("blueCrystal")]
    }



    //* draw method draws the randomly selected power up on canvas
    draw = () => {
        let img = this.powerUpArr[this.powerUpNum]
        context.drawImage(img, this.x, this.y, this.sizeWidth, this.sizeWidth);
        this.x += this.xVel // X velocity ( rate at which something moves in each direction)
        this.y += this.yVel
    }


//* method changes velocity to negative if power up goes off page
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

    //* checks what power up has been generated and assigns it to the respective player variables 
    checkPowerUp = (shipObj) => {
        if (this.powerUpNum == 0) {
            shipObj.radioactive++
            document.getElementById('shieldNum').textContent = shipObj.radioactive;
        } else if (this.powerUpNum == 1) {
            shipObj.redCrystal++
            document.getElementById('warpNum').textContent = shipObj.redCrystal;

        } else if (this.powerUpNum == 2) {
            shipObj.blueCrystal++
            document.getElementById('timeNum').textContent = shipObj.blueCrystal;
        }

    }

}

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//


//
//~ ─── SECTION PLAY AGAIN FUNCTIONS ────────────────────────────────────────────────
//
 



// let newPlayerArray = [];
// //* loop to creates astroids and pushes them into array
// for (let i = 0; i < 1; i++) {
//     newPlayerArray.push(new Spaceship())
// }


//* Resets the game vaules to the initial state
let resetVal = () => {
    let newPlayerArray = [];
//* loop to creates astroids and pushes them into array
for (let i = 0; i < 1; i++) {
    newPlayerArray.push(new Spaceship())
}

    //* Initializes empty array of asteroids
    asteroidArray = [];

    //* Initializes empty array of asteroids
    asteroidArray = [];
    initAstroidNum = 15
    //* loop to creates astroids and pushes them into array
    for (let i = 0; i < initAstroidNum; i++) {
        asteroidArray.push(new astroid())
    }
    
    playerWarp;
    timeFreeze;
    gameTog = true
    gamePause = false
    //* creates a space ship for the player to control
    // playerShip = newPlayerArray[0]

    //* reset values and display them on the dom
    playerShip.hull = 100
    document.getElementById('healthNum').textContent = playerShip.hull;
    playerShip.shipScore = 0
    document.getElementById('scoreNum').textContent = playerShip.shipScore;
    playerShip.radioactive = 0
    document.getElementById('shieldNum').textContent = playerShip.radioactive;
    playerShip.redCrystal = 0
    document.getElementById('warpNum').textContent = playerShip.redCrystal;
    playerShip.blueCrystal = 0
    document.getElementById('timeNum').textContent = playerShip.blueCrystal;
    playerShip.x = canvas.width/3
    playerShip.y = canvas.height/3
    playerShip.xVel = 0
    playerShip.yVel = 0

    //* Create powerUp obj
    powerUpSpawn = new PowerUps()
    iterationCounter = 0
    warpCounter = 0
    timeCounter = 0
    shieldCounter = 0
    powerUpTimer = 100
    valueChange = false;
    shieldOn = false;
    endGame = false
    myReq;
    outcomeVar = 0
    stage = 0
    document.getElementById('levelNum').textContent = stage;
    previousVal = 0
    
}

//* restarts the game
playAgain = () => {
    $(".hiddenScreen").hide();
    resetVal()
    animate()
}

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//

//
//~ ─── SECTION DIFFICULTY BOOST ────────────────────────────────────────────────────
//

// Ways to increase difficulty:
// Rocks move faster 
// Rocks increase in size
// rocks increase in number

let difficultyBoost = (obj) => {
    stage++
    document.getElementById('levelNum').textContent = stage;

    let difficultyNum = Math.ceil(Math.random() * 3)

    if (difficultyNum == 1) {
        for (let i = 0; i < initAstroidNum; i++) {
            asteroidArray[i].speedMagIncrease(1.2)
        }
        //alert(`Stage ${stage}:The asteroids are moving faster`)

    } else if (difficultyNum == 2) {
        //alert(`Stage ${stage}:The asteroids are getting larger`)
        for (let i = 0; i < initAstroidNum; i++) {
            asteroidArray[i].sizeMagIncrease(1.2)
        }
    } else if (difficultyNum == 3) {
        for (asteroidsNum = 0; asteroidsNum < Math.floor(Math.random * 10) + 2; asteroidsNum++) {
            asteroidArray.push(new astroid())
        }
        //alert(`Stage ${stage}:The asteroids field is getting denser`)
    }

}

let raiseDifficulty = () => {
    let randModNum = Math.floor(Math.random() * 200) + 100
    if ((playerShip.shipScore - previousVal) > randModNum) {
        previousVal = playerShip.shipScore
        difficultyBoost(asteroidArray)
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
            playerShip.yVel = playerShip.yVel - 1.2
            break;
        case 'ArrowDown':
            // down arrow
            playerShip.yVel = playerShip.yVel + 1.2
            break;
        case 'ArrowRight':
            // right arrow
            playerShip.xVel = playerShip.xVel + 2.0
            break

        case 'ArrowLeft':
            // left arrow
            playerShip.xVel = playerShip.xVel - 2.0
            break;

        case 'w':
            //alert("you pressed the w key (warp speed)")
            warpCounter = 0
            playerWarp = true
            break
        case 'a':
            //alert("you pressed the a key (time/space generator)")
            timeCounter = 0
            timeFreeze = true

            break
        case 's':
            //alert("you pressed the s key (shields)")
            shieldCounter = 0
            shieldOn = true

            break
        case 'e':
            if (gamePause == true) {
                endGame = true
                $(".pause").show();
                //alert("GAME ENDED")
                if (endGame == true) {
                    cancelAnimationFrame(myReq)
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    outcomeVar = 1
                    $(".pause").hide();
                    $(".startGame").show();
                }
                //alert(`${outcomeVar} we are out of animate`)
                // playAgain() //! play again works
                break
            }
            break
        case ' ':
            if (gameTog == true) {
                gameTog = false
                gamePause = true
                $(".pause").show();
                // alert("GAME PAUSED")
                break
            } else if (gameTog == false && endGame == false) {
                $(".pause").hide();
                gameTog = true
                gamePause = false
                animate()
                // alert("resumed")
                break
            }

    }
};

//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//


//~ ─── SECTION FUNCTION CALLS AND GLOBALS  ─────────────────────────────────────────
//
//
//~ ─── ASTEROID ARRAY CREATION ────────────────────────────────────────────────────
//

//* Initializes empty array of asteroids
let asteroidArray = [];
let initAstroidNum = 15
//* loop to creates astroids and pushes them into array
for (let i = 0; i < initAstroidNum; i++) {
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
let endGame = false
let myReq;
let outcomeVar = 0
let stage = 0
let previousVal = 0


//
//~ ─── SECTION ANIMATE FUNCTION ───────────────────────────────────────────────────
//


let animate = () => {
    $(".startGame").hide();

    //* the request animation frame function is basically creating a loop, It's basically cycling through over and over again until told to stop

    if (gamePause == false) {
        // myReq = 
        myReq = requestAnimationFrame(animate)
        //cancelAnimationFrame(myReq)
    }

    // if(endGame  == true){
    // cancelAnimationFrame(myReq)
    // context.clearRect(0, 0, innerWidth, innerHeight)
    //  return 1
    // }

    //* clear the screen so multiple circles don't just stack on each other and actually disappear when another appears to simulate animation.
    context.clearRect(0, 0, canvas.width, canvas.height)


    //? ─── CHECK PLAYER DEAD ───────────────────────────────────────────────────────────────

    if (playerShip.hull <= 0) {
        //!call end game function
        endGame = true
        // alert("GAME ENDED")
        
        cancelAnimationFrame(myReq)
       // $(".hiddenScreen").show();
        context.clearRect(0, 0, canvas.width, canvas.height)
        outcomeVar = 2 //! Player has died
        // alert(`${outcomeVar} we are out of animate`)
        $(".hiddenScreen").show();
        
        return 2

    }

    //? ─── DIFFICULTY RAISED ───────────────────────────────────────────────────────────────
    raiseDifficulty()


    //
    //? ─── PLAYER SCORE ───────────────────────────────────────────────────────────────
    //
    iterationCounter++
    while (iterationCounter % 100 == 0) {
        playerShip.shipScore += 10
        // alert(playerShip.shipScore)
        document.getElementById('scoreNum').textContent = playerShip.shipScore;
        break
    }

    //? ─── SECTION WARP SPEED  ─────────────────────────────────────────────────────────
    //

    if (playerWarp == true && playerShip.redCrystal > 0) {
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagReduce(2)
            // warpCounter = 0
            valueChange = true

        }
        playerWarp = false
        playerShip.redCrystal -= 1
        document.getElementById('warpNum').textContent = playerShip.redCrystal;
        $(('#powerUp')).text('Warp');
    }

    if (warpCounter == powerUpTimer && valueChange == true) {
        //alert("exiting warp")
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagIncrease(2)
            valueChange = false

        }
        $(('#powerUp')).text('none');
    }

    console.log(warpCounter)
    warpCounter++

    //
    //~ ─── !SECTION ────────────────────────────────────────────────────────────────────
    //

    //? ───  SECTION TIME FREEZE  ─────────────────────────────────────────────────────────
    //



    if (timeFreeze == true && playerShip.blueCrystal > 0) {
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagReduce(100)
            // warpCounter = 0
            valueChange = true

        }
        timeFreeze = false
        playerShip.blueCrystal -= 1
        document.getElementById('timeNum').textContent = playerShip.blueCrystal;
        document.getElementById('powerUp').textContent = `Time Freeze`;
        
        
    }


    if (timeCounter == powerUpTimer && valueChange == true) {
        //alert("space/time generator failing")
        for (let i = 0; i < asteroidArray.length; i++) {
            asteroidArray[i].speedMagIncrease(100)
            valueChange = false
            

        }
        $(('#powerUp')).text('none');
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
        playerShip.radioactive -= 1
        document.getElementById('shieldNum').textContent = playerShip.radioactive;
        $(('#powerUp')).text('none');
         shieldOn = false
        //alert("shields have failed")
    }
    if (shieldOn == true) {
        console.log(shieldCounter)
        document.getElementById('powerUp').textContent = `Shields`;
        shieldCounter++
    }

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
    playerShip.edgeBounce()

    //* Collision Detection for outside of warp/hyperspace

    if (valueChange == false && shieldOn == false) {
        for (let i = 0; i < asteroidArray.length; i++) {
            if (asteroidArray[i].collision(playerShip)) {
                console.log("collision")
                playerShip.dmgHull()
                //alert("collision")
                asteroidArray[i] = new astroid()
            }
        }
    }
    //* Collision Detection for outside of warp/hyperspace and have shields
    else if (shieldOn && playerShip.radioactive > 0) {
        for (let i = 0; i < asteroidArray.length; i++) {
            if (asteroidArray[i].collision(playerShip)) {
                console.log("collision")
                // playerShip.dmgHull()
                //alert("collision, nuclear shield absorbs dmg")
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
                //alert("collision")
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
                //alert("collision")
                asteroidArray[i].y = -10
            }
        }
    }


    //* Power Ups collision detection
    if (powerUpSpawn.collision(playerShip)) {
        //! cancelAnimationFrame(myReq); this is how I end game
        console.log("powerUp collision")
        powerUpSpawn.checkPowerUp(playerShip)
        // alert(playerShip.blueCrystal)
        // alert(powerUpSpawn.radioactive)
        // alert(playerShip.redCrystal)
        playerShip.shipScore += (Math.floor(Math.random() * 30)) + 10
        //alert(`powerUP collision\n Score: ${playerShip.shipScore}`)
        document.getElementById('scoreNum').textContent = playerShip.shipScore;



        powerUpSpawn = new PowerUps()
    }
}
$(".pause").hide();
$(".hiddenScreen").hide();
document.getElementById("spaceshipRestart").addEventListener("click",playAgain);
document.getElementById("spaceshipStart").addEventListener("click", playAgain);
//animate()

// alert(outcomeVar)
// alert(outcomeVar)


//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────
//
//~ ─── !SECTION ───────────────────────────────────────────────────────────────────