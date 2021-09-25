// Canvas Data
var body = document.getElementById('body');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

// Definiciones para los menús
var container = document.getElementById("container");
var playButton = document.getElementById("play");
var menu = document.getElementById("menu");
var backButton1 = document.getElementById("back1")
var backButton2 = document.getElementById("back2");
var playAgain = document.getElementById("again"); //NO USE
var winButton = document.getElementById("back3"); //NO USE 
var controls = document.getElementById("controls");
var references = document.getElementById("references");
var continueButton = document.getElementById("continue");
var winWindow = document.getElementById("win"); //NO USE 
var loseWindow = document.getElementById("lose"); //NO USE 
var pause = document.getElementById("pause");
var gameReferences = document.getElementById("gamereferences");
var gameControls = document.getElementById("gamecontrols");

//HIDE DIVS
winWindow.style.display="none";
loseWindow.style.display="none";
gameControls.style.display="none";
gameReferences.style.display="none";
pause.style.display="none";


var animation;
var mousePos;
var keys = new Array(); // Array para las teclas.

// ===================================================================== //
/**
 * PLAYER DATA
 */
const playerImage = new Image();
playerImage.src = 'js/resources/ships/player_ship.png';
playerImage.onload = function(){};
var player = new Ship(playerImage,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,5,5);

const playerBulletImg = new Image();
playerBulletImg.src= 'js/resources/proyectiles/bala-jugador.png';
playerBulletImg.onload = function(){};

// PROJECTILES
var playerBullets = new Array();

// ====================================================================== //
// ENEMIGOS
//======================================================================= //
var enemies = new Array();
// Naves básicas
const basicEnemyImg = new Image();
basicEnemyImg.onload = function(){};
basicEnemyImg.src = 'js/resources/ships/Alien-Scout.png';

function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnEnemies(){
    setInterval( () => {
        let diff = 50; // tamaño de img de enemigo básico.
        let basicEnemy;
        let dw = 1/3*CANVAS_WIDTH;
        let dh = 1/3*CANVAS_HEIGHT;

        const speed = 3/Math.SQRT2; // Rapidez en una dimensión
        // Vector diferencia entre posición de disparo  y posición del mouse.
        
        let xf = CANVAS_WIDTH/2; 
        let yf = CANVAS_HEIGHT/2;
        let x0;
        let y0;

        if (Math.random() < 0.5) {
            x0 = Math.random() < 0.5 ? 0 - diff : CANVAS_WIDTH + diff;
            y0 = Math.random() * CANVAS_HEIGHT;
        } else {
            x0 = Math.random() * CANVAS_WIDTH;
            y0 = Math.random() < 0.5 ? 0 - diff : CANVAS_HEIGHT + diff;
        }

        const x_diff = xf - x0;
        const y_diff = yf - y0 ;
        const r_magnitude= Math.sqrt(x_diff*x_diff + y_diff*y_diff);
        const x_dir = x_diff/r_magnitude;
        const y_dir = y_diff/r_magnitude;
        const vx = x_dir*speed;
        const vy = y_dir*speed;

        enemy = new EnemyShip (basicEnemyImg,x0,y0,
                                    vx,vy,
                                    CANVAS_WIDTH,CANVAS_HEIGHT);
        enemies.push(enemy);

    }, 2000)
}


// ============================================================================= //
// ============================= FUNCION PRINCIPAL ============================= //
// ============================================================================= //
function init () 
{   

    function update() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.resetTransform();
        //ctx.setTransform(1,0,0,1,0,0);
        drawAll();
    }

    function drawAll() {

        // Drawing Player Ship
        if (mousePos){
            player.rotateShip(ctx,mousePos);
            ctx.resetTransform();

        }else{
            player.drawShip(ctx);
            ctx.resetTransform();
        }

        // Drawing bullets
        if (playerBullets){
            for (let i = 0; i < playerBullets.length; i++){
                let bullet = playerBullets[i];
                if (bullet.isAlive){
                    //ctx.setTransform(1,0,0,1,0,0);
                    //ctx.globalCompositeOperation = 'destination-over';
                    bullet.drawBullets(ctx);
                    bullet.move();
                    ctx.resetTransform();
                }else{
                    playerBullets.splice(i,1)
                }
            }
        }

        //Drawing enemies
        if (enemies)
        {
            for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];
                target = {
                    x: player.x,
                    y: player.y,
                }
                //enemy.rotateShip(ctx,target);
                //enemy.move();
                enemy.drawShip(ctx);
                enemy.move();

                ctx.resetTransform();

            }
        }
        
    }

    function animate(){
        animation = requestAnimationFrame(animate);
        update();
        movePlayer();
    }
    animate();
    // EVENT LISTENERS
    body.addEventListener('mousemove', mouseCoord);
    function mouseCoord(e){
        mousePos= {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop,
        }
        return mousePos;
    }

    body.addEventListener('click', playerShoot);
    function playerShoot(e){
        mousePos = mouseCoord(e);

        const SPEED = 3/Math.SQRT2; // Rapidez en una dimensión

        // Vector diferencia entre posición de disparo  y posición del mouse.
        const X_DIFF = mousePos.x - player.x;
        const Y_DIFF = mousePos.y - player.y;
        const R_MAGNITUDE = Math.sqrt(X_DIFF*X_DIFF + Y_DIFF*Y_DIFF);
        const X_DIRECTION = X_DIFF/R_MAGNITUDE;
        const Y_DIRECTION = Y_DIFF/R_MAGNITUDE;

        let bullet = new Projectile(playerBulletImg,player.x,player.y,X_DIRECTION*SPEED,Y_DIRECTION*SPEED);
        bullet.xFinal = mousePos.x;
        bullet.yFinal = mousePos.y;

        // adding img to bullet
        bullet.img = playerBulletImg;

        // pushing bullet to playerBullets array
        playerBullets.push(bullet);
    }
 
    body.addEventListener("keydown", pressKey);
    function pressKey(e){
        keys[e.keyCode]=true;
    }

    body.addEventListener("keyup", releaseKey);
    function releaseKey(e){
        delete keys[e.keyCode];
    }

    function movePlayer(){
        if(keys[87]){
            player.moveUp();
        }
        if(keys[83]){
            player.moveDown();
        }
        if(keys[65]){
            player.moveLeft();
        }
        if(keys[68]){
            player.moveRight();
        }
        
    }

    body.onkeydown = function(e){
        if (e.keyCode===80 && pause.style.display=="none"){

            pause.style.display="block";
        } else if(e.keyCode===80 && pause.style.display=="block"){
            pause.style.display="none";
        }
    }

    continueButton.onclick = function(){
        pause.style.display="none";
    }
    
    backButton1.onclick = function(){
        gameControls.style.display="none";
        menu.style.display="block";
    }

    backButton2.onclick = function(){
        gameReferences.style.display ="none";
        menu.style.display="block";
    }

    controls.onclick = function(){
        gameControls.style.display="block";
        menu.style.display="none";
    }

    references.onclick = function(){
        gameReferences.style.display="block";
        menu.style.display="none";
    }

    playButton.onclick = function(){
        menu.style.display="none";
        spawnEnemies();
        animate();
    }
}  
document.addEventListener('DOMContentLoaded', init);

