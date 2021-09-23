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


/**
 * PLAYER DATA
 */
const playerImage = new Image();
playerImage.onload = function(){};
playerImage.src = 'js/resources/ships/player_ship.png';
var IMAGE_WIDTH = 50;
var IMAGE_HEIGHT = 50;

var player = new Ship(playerImage,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,10,10);
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
    }

    function update() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.setTransform(1,0,0,1,0,0);
        ctx.save();

        if (mousePos){
            player.rotateShip(ctx,mousePos);
        }

        draw();
    }


    function draw() {

        //ctx.drawImage(playerImage, player.x, player.y, IMAGE_WIDTH, IMAGE_HEIGHT);
        player.drawShip(ctx);

        
        
        // Drawing bullets
        if (playerBullets){
            for (let i = 0; i < playerBullets.length; i++){
                let bullet = playerBullets[i];
                bullet.drawBullets(ctx);
                //ctx.drawImage(playerBulletImg, CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
            }
        }
    }

    function animate(){
        animation = requestAnimationFrame(animate);
        update();
        ctx.restore();
    }
    animate();

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
        const xCenter = CANVAS_WIDTH/2;
        const yCenter =  CANVAS_HEIGHT/2;

        const xDirection = Math.sign(mousePos.x);
        const yDirection = Math.sign(mousePos.y);

        let bullet = new Projectile(playerBulletImg,xCenter,yCenter,xDirection*10,yDirection*10);
        bullet.xFinal = mousePos.x;
        bullet.yFinal = mousePos.y;

        // adding img to bullet
        bullet.img = playerBulletImg;

        // pushing bullet to playerBullets array
        playerBullets.push(bullet);
        console.log(playerBullets.length);
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
        update();           
    }
}
document.addEventListener('DOMContentLoaded', init);

