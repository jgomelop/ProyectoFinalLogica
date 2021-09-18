"use strict";

var canvas = undefined;
var ctx = undefined;

function start () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
mainLoop();
}
document.addEventListener('DOMContentLoaded', start);

function update () {
}

function draw () {
}

function mainLoop () {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    window.setTimeout(mainLoop, 1000 / 60);
}