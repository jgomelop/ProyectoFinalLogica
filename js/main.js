var body = document.getElementById('body');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.save();
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;
var animation;


const playerImage = new Image();
playerImage.src = 'js/resources/ships/player_ship.png';
var IMAGE_WIDTH = 50;
var IMAGE_HEIGHT = 50;
var player = new Ship(CANVAS_WIDTH/2-IMAGE_WIDTH/2,CANVAS_HEIGHT/2-IMAGE_HEIGHT/2,10,10,0,50);
var mousePos= null;


const playerProjectile = new Image();
playerProjectile.src= 'js/resources/proyectiles/bala-jugador.png';


function init () 
{   function update()
    {

        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.save();
        rotateShip();
        draw();
        
        //ctx.restore();
    }

    function draw() {
        //ctx.translate(CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
        //ctx.rotate(-player.angle);
        //ctx.save();
        //ctx.translate(player.x, player.y);
        //ctx.rotate(player.angle);
        ctx.drawImage(playerImage, player.x, player.y, IMAGE_WIDTH, IMAGE_HEIGHT);
       // rotateShip();
        //ctx.restore();
        //ctx.setTransform(1,0,0,1,0,0)
    }

    function rotateShip(){
        if(mousePos){
            player.angle = Math.atan2(mousePos.y -(CANVAS_HEIGHT/2), mousePos.x -(CANVAS_WIDTH/2));
            ctx.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
            ctx.rotate(Math.PI/2+player.angle);
            ctx.translate(-(CANVAS_WIDTH/2), -(CANVAS_HEIGHT/2));    
        }
    }


    body.addEventListener('mousemove', mouseCoord);
    function mouseCoord(e){
        mousePos= {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop,
        }
    }

    /*body.addEventListener('click',shoot);
    function shoot(e){
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        //let playerShoot = new Projectile(e.clientX, e.clientY, 0, 0, 0);
        ctx.drawImage(playerProjectile, e.clientX, e.clientY);
    }*/
    
    body.addEventListener("keydown", movePlayer);
    function movePlayer(e)
    {
        //ctx.clearRect(0,0,w,h);
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

    function animate()
    {
        animation = requestAnimationFrame(animate);
        update();
        ctx.restore();
    }
    animate();

}
document.addEventListener('DOMContentLoaded', init);

