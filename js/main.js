var body = document.getElementById('body');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

var animation;
var mousePos;

/**
 * PLAYER DATA
 */
const playerImage = new Image();
playerImage.onload = function(){};
playerImage.src = 'js/resources/ships/player_ship.png';

var player = new Ship(playerImage,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,10,10);
const playerBulletImg = new Image();
playerBulletImg.onload = function(){};
playerBulletImg.src= 'js/resources/proyectiles/bala-jugador.png';


// PROJECTILES
var playerBullets = new Array();

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
            ctx.setTransform(1,0,0,1,0,0);
        }else{
            player.drawShip(ctx);
        }

        // Drawing player bullets
        if (playerBullets){
            for (let i = 0; i < playerBullets.length; i++){
                let bullet = playerBullets[i];
                if (bullet.isAlive){
                    bullet.drawBullets(ctx);
                    bullet.move();
                }  
            }
        }
    }

    function animate(){
        animation = requestAnimationFrame(animate);
        update();
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

    body.addEventListener("keydown", movePlayer);
    function movePlayer(e){
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
    }
}
document.addEventListener('DOMContentLoaded', init);

