var body = document.getElementById('body');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;
var animation;


const playerImage = new Image();
playerImage.src = 'js/resources/ships/player_ship.png';
var player = new Ship(CANVAS_WIDTH/2,CANVAS_HEIGHT/2,10,10,0,50);
player.img = playerImage;


function init () 
{   function update()
    {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.drawImage(player.img,player.x,player.y);
    }


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
        update();
        animation = requestAnimationFrame(animate);
    }
    animate();

}
document.addEventListener('DOMContentLoaded', init);

