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
var backButton = document.getElementById("back")
var instructions = document.getElementById("instructions");
var pause = document.getElementById("pause");
var continueButton = document.getElementById("continue");
var gameInstructions = document.getElementById("gameinstructions");
gameInstructions.style.display="none";
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

function spawnBasicEnemies(){
    setInterval( () => {
        let x;
        let y;
        let diff = 128;
        let basicEnemy;
        let speed = 10;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - diff : CANVAS_WIDTH + diff;
            y = Math.random() * CANVAS_HEIGHT;
        } else {
            x = Math.random() * CANVAS_WIDTH;
            y = Math.random() < 0.5 ? 0 - diff : CANVAS_HEIGHT + diff;
        }

        basicEnemy = new Ship(basicEnemyImg,x,y,speed,speed);
        basicEnemy.xFinal = Math.random() * (CANVAS_WIDTH - 300) + 300;
        basicEnemy.yFinal = Math.random() * (CANVAS_HEIGHT - 300) + 300;

        enemies.push(basicEnemy)

    }, 3000)
}


// ============================================================================= //
// ============================= FUNCION PRINCIPAL ============================= //
// ============================================================================= //
function init () 
{   
    spawnBasicEnemies();
    
    function update() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.setTransform(1,0,0,1,0,0);
        drawAll();
    }

    function drawAll() {

        // Drawing Player Ship
        if (mousePos){
            player.rotateShip(ctx,mousePos);
            //ctx.setTransform(1,0,0,1,0,0);
        }else{
            player.drawShip(ctx);
            //ctx.setTransform(1,0,0,1,0,0);
        }

        // Drawing bullets
        if (playerBullets){
            for (let i = 0; i < playerBullets.length; i++){
                let bullet = playerBullets[i];
                if (bullet.isAlive){
                    ctx.setTransform(1,0,0,1,0,0);
                    //ctx.globalCompositeOperation = 'destination-over';
                    bullet.drawBullets(ctx);
                    bullet.move();
                }else{
                    playerBullets.splice(i,1)
                }
            }
        }

        //Drawing enemies
        let target = {
            x: player.x,
            y: player.y,
        }
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            enemy.rotateShip(ctx,target);
        }
    }

    function animate(){
        animation = requestAnimationFrame(animate);
        update();
        movePlayer();
    }

    // EVENT LISTENERS
    body.addEventListener('mousemove', mouseCoord);
    function mouseCoord(e){
        mousePos= {
            x: e.clientX - container.offsetLeft,
            y: e.clientY - container.offsetTop,
        }
        return mousePos;
    }

    body.addEventListener('click', playerShoot);
    function playerShoot(e){
        mousePos = mouseCoord(e);

        const SPEED = 10/Math.SQRT2; // Rapidez en una dimensión

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
    
    backButton.onclick = function(){
        gameInstructions.style.display="none";
        menu.style.display="block";
    }

    instructions.onclick = function(){
        gameInstructions.style.display="block";
        menu.style.display="none";
    }

    playButton.onclick = function(){
        menu.style.display="none";
        
        animate();
    }
}
document.addEventListener('DOMContentLoaded', init);

