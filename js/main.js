"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'js/recursos/naves/nave-jugador.png'


function init () 
{

    function animate()
    {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.drawImage(playerImage,50,50);
        requestAnimationFrame(animate);
    }
    animate();

}
document.addEventListener('DOMContentLoaded', init);

