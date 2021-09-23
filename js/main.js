var body = document.getElementById('body');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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


ctx.save();
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

var animation;
var mousePos;

var keys = new Array();


/**
 * PLAYER DATA
 */
const playerImage = new Image();
playerImage.onload = function(){};
playerImage.src = 'js/resources/ships/player_ship.png';

var player = new Ship(playerImage,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,5,5);
const playerBulletImg = new Image();
playerBulletImg.onload = function(){};
playerBulletImg.src= 'js/resources/proyectiles/bala-jugador.png';


// PROJECTILES
var playerBullets = new Array();

function init () 
{   
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

    function update() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.setTransform(1,0,0,1,0,0);
        drawAll();
    }

    function drawAll() {

        // Drawing Player Ship
        if (mousePos){
            player.rotateShip(ctx,mousePos);
            ctx.setTransform(1,0,0,1,0,0);
        }else{
            player.drawShip(ctx);
        }

        ctx.globalCompositeOperation = 'destination-over';
        // Drawing bullets
        if (playerBullets){
            for (let i = 0; i < playerBullets.length; i++){
                let bullet = playerBullets[i];
                if (bullet.isAlive){
                    bullet.drawBullets(ctx);
                    bullet.move();
                }else{
                    playerBullets.splice(i,1)
                }
            }
        }
    }


    function animate(){
        animation = requestAnimationFrame(animate);
        update();
        //ctx.restore();
        movePlayer();
    }
    //animate();

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

        const SPEED = 8/Math.SQRT2; // Rapidez en una dimensión

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
    /*function movePlayer(e){
        switch (e.key)
        {
            case "w" : 
                player.moveUp();           
                break;

            case "s" : 
                player.moveDown();           
                break;         

            case "a" :
                player.moveLeft();           
                break;

            case "d" :
                player.moveRight();           
                break;
            
        }
        update();           
    }*/
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

}
document.addEventListener('DOMContentLoaded', init);

