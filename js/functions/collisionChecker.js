function isBulletOutsideCanvas(bullet,bulletRadius){
    let cond1 = bullet.x + bulletRadius >= CANVAS_WIDTH;
    let cond2 = bullet.x - bulletRadius <= 0;
    let cond3 = bullet.y + bulletRadius >= CANVAS_HEIGHT;
    let cond4 = bullet.y - bulletRadius <= 0;
    return cond1 || cond2 || cond3 || cond4;
}


function collisionChecker(ships, bullets,intervals){
    function distance(obj1,obj2){
        let dx = obj2.x - obj1.x;
        let dy = obj2.y - obj1.y;
        let dx2 = Math.pow(dx, 2);
        let dy2 = Math.pow(dy, 2);
        let d = Math.sqrt(dx2 + dy2);
        return d;
    }

    for(let i=0; i < ships.length; i++){
        let ship = ships[i];
        let shipRadius = ship.scale*Math.min(ship.img.width, ship.img.height) / 2;

        for(let j=0; j < bullets.length; j++){
            let bullet = bullets[j];
            let bulletRadius = bullet.scale*bullet.img.width/2;
            let sumRadius = shipRadius + bulletRadius;

            // Colision con la nave
            if(distance(ship,bullet) < sumRadius){
                ship.lifePoints -= bullet.dps;
                bullets.splice(j,1);
                if(ship.lifePoints <= 0){
                    ships.splice(i,1);
                    clearInterval(intervals[i]);
                    intervals.splice(i,1);
                } 
                
            } else if(isBulletOutsideCanvas(bullet,bulletRadius)){
                bullets.splice(j,1);
            }
        }
    }
}

function playerCollision(bullets, player){

    var playerRadius = player.scale*Math.min(player.img.width, player.img.height) / 2 

    function distance(obj1,obj2){
        let dx = obj2.x - obj1.x;
        let dy = obj2.y - obj1.y;
        let dx2 = Math.pow(dx, 2);
        let dy2 = Math.pow(dy, 2);
        let d = Math.sqrt(dx2 + dy2);
        return d;
    }

    for(let i=0; i < bullets.length; i++){
        
        let bullet = bullets[i];
        let bulletRadius = bullet.scale*bullet.img.width/2;
        let sumRadius = playerRadius + bulletRadius;

        if(distance(player,bullet) < sumRadius){
            player.lifePoints -= bullet.dps;
            health.value -= bullet.dps;
            bullets.splice(i,1);
        } else if (isBulletOutsideCanvas(bullet,bulletRadius)){
            bullets.splice(i,1);
        }
    }

}

