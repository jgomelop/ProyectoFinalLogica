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

function spawnEnemies(){
    setInterval( () => {
        let x;
        let y;
        let diff = 128; // tamaño de img de enemigo básico.
        let basicEnemy;
        let speed = 10/Math.SQRT2;

        let xFinal = Math.random() * (CANVAS_WIDTH  - 200) + 200;
        let yFinal = Math.random() * (CANVAS_HEIGHT - 200) + 200;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - diff : CANVAS_WIDTH + diff;
            y = Math.random() * CANVAS_HEIGHT;
        } else {
            x = Math.random() * CANVAS_WIDTH;
            y = Math.random() < 0.5 ? 0 - diff : CANVAS_HEIGHT + diff;
        }

        basicEnemy = new EnemyShip(basicEnemyImg,x,y,speed,speed,xFinal,yFinal);
        enemies.push(basicEnemy)

    }, 2000)
}


// ============================================================================= //
// ============================= FUNCION PRINCIPAL ============================= //
// ============================================================================= //
function init () 
{   

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
        if (enemies)
        {
            for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];
                let epsilon = 5; // radio de error para la resta
                let diffs = (Math.abs(enemy.x - enemy.xFinal) > epsilon) && 
                            (Math.abs(enemy.y - enemy.yFinal) > epsilon);
                ctx.setTransform(1,0,0,1,0,0);
                enemy.rotateShip(ctx,target);

                if (diffs)
                {
                    enemy.move();
                }
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

