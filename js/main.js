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
var player = new Ship(playerImage,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,3/Math.SQRT2,3/Math.SQRT2);

const playerBulletImg = new Image();
playerBulletImg.src= 'js/resources/proyectiles/bala-jugador.png';
playerBulletImg.onload = function(){};

// PROJECTILES
var playerBullets = new Array();

// ====================================================================== //
// ENEMIGOS
//======================================================================= //
// imagen de la nave enemiga
const basicEnemyImg = new Image();
basicEnemyImg.onload = function(){};
basicEnemyImg.src = 'js/resources/ships/Alien-Scout.png';
// imagen de las balas enemigas
const enemyBulletImg = new Image();
enemyBulletImg.onload = function(){};
enemyBulletImg.src = 'js/resources/proyectiles/bala-enemiga.png';

var enemies = new Array();

var enemiesBullets = new Array();

// Arreglo para guardar los temporizadores de disparo para cada enemigo  
var intervals = new Array(); 
function shootPlayer(enemy){
    intervals.push( setInterval( () => {
        const shootAngle= Math.atan2(player.y - enemy.y, player.x - enemy.x);
        const v = 3; // rapidez bala enemiga
        const vx = Math.cos(shootAngle)*v;
        const vy = Math.sin(shootAngle)*v;

        let bullet = new Projectile(enemyBulletImg,enemy.x,enemy.y,vx,vy);
        bullet.xFinal = player.x;
        bullet.yFinal = player.y;
        bullet.dps=1;
        // añadiendo imagen a la bala enemiga
        bullet.img = enemyBulletImg;

        // Agregando bala al array de las balas enemigas
        enemiesBullets.push(bullet);
    }, enemy.fireRate*1000)
    )
}

function playerWallCollision(x,y){

    let xPlayer = player.scale*player.img.width/2;
    let yPlayer = player.scale*player.img.width/2;

    if(x + xPlayer >= CANVAS_WIDTH){
        player.x =  CANVAS_WIDTH - xPlayer
    } if(x - xPlayer <=0){
        player.x = xPlayer;
    } if(y + yPlayer >= CANVAS_HEIGHT){
        player.y =  CANVAS_HEIGHT - yPlayer;
    } if(y - yPlayer  <=0){
        player.y = yPlayer;
    }
}

// Lógica de spawn de enemigos
var intervalEnemiesSpawn;
function spawnEnemies(){
    function generateRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
 
    let diff = 50; // tamaño de img de enemigo básico.
    let dw = 1/5*CANVAS_WIDTH;
    let dh = 1/5*CANVAS_HEIGHT;
    // Vector diferencia entre posición de disparo  y posición del mouse.
    
    let xf = generateRandom(dw,CANVAS_WIDTH - dw); 
    let yf = generateRandom(dh,CANVAS_HEIGHT - dh); 
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
    const v = 2/Math.SQRT2; // Rapidez en una dimensión
    const vx = x_dir*v;
    const vy = y_dir*v;

    let enemy = new EnemyShip(basicEnemyImg,x0,y0,vx,vy,xf,yf);
    
    enemies.push(enemy); // añadiendo enemigo al array de enemigos
    
    // añadiendo tiempo de disparo al array de intervalos
    shootPlayer(enemy);
}



// ============================================================================= //
// ============================= FUNCION PRINCIPAL ============================= //
// ============================================================================= //
function init () 
{   

    function update() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        ctx.resetTransform();
        //vanishBullets(playerBullets);
        //vanishBullets(enemiesBullets);
        collisionChecker(enemies,playerBullets,intervals);
        playerCollision(enemiesBullets, player);
        drawAll();
    }

    function drawAll() {

        // Dibujando nave del jugador
        if (mousePos){
            player.rotateShip(ctx,mousePos);
            ctx.resetTransform();

        }else{
            player.drawShip(ctx);
            ctx.resetTransform();
        }

        // Dibujando balas del jugador
        if (playerBullets){
            for (let i = 0; i < playerBullets.length; i++){
                let bullet = playerBullets[i];
                if (bullet.isAlive){
                    //ctx.setTransform(1,0,0,1,0,0);
                    ctx.globalCompositeOperation = 'destination-over';
                    bullet.drawBullet(ctx);
                    bullet.move();
                    ctx.resetTransform();
                }else{
                    playerBullets.splice(i,1)
                }
            }
        }

        //Dibujando enemigos
        if (enemies)
        {
            for (let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];
                target = {
                    x: player.x,
                    y: player.y,
                }
                enemy.rotateShip(ctx,target);
                enemy.move();

                ctx.resetTransform();
            }
        }

        // Dibujando balas enemigas

        if (enemiesBullets)
        {
            for (let i = 0; i < enemiesBullets.length; i++) {
                let bullet = enemiesBullets[i];
                if (bullet.isAlive){
                    ctx.globalCompositeOperation = 'destination-over';
                    bullet.drawBullet(ctx);
                    bullet.move();
                    ctx.resetTransform();
                } else{
                    enemiesBullets.splice(i,1)
                }
            }
        }
    }

    function animate(){
        animation = requestAnimationFrame(animate);
        update();
        movePlayer();
        playerWallCollision(player.x, player.y);
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

        const Y0 = player.y;
        const X0 = player.x;
        const shootAngle= Math.atan2(mousePos.y - Y0, mousePos.x - X0);
        const vx = Math.cos(shootAngle)*4;
        const vy= Math.sin(shootAngle)*4;

        let bullet = new Projectile(playerBulletImg,X0,Y0,vx,vy);
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

    playAgain.onclick = function(){
        loseWindow.style.display="none";
        menu.style.display="block";
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
        intervalEnemiesSpawn = setInterval( spawnEnemies, 2000);
        animate();
    }
}  
document.addEventListener('DOMContentLoaded', init);

