function collisionChecker(ships, bullets,bulletIntervals){
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
        let shipRadius = Math.min(ship.img.width, ship.img.height) / 2;

        for(let j=0; j < bullets.length; j++){
            let bullet = bullets[j];
            let bulletRadius = bullet.img.width+1;
            let sumRadius = shipRadius + bulletRadius;

            if(distance(ship,bullet) < sumRadius){
                //clearInterval(intervalEnemiesSpawn);
                ships.splice(i,1);
                clearInterval(intervals[i]);
                intervals.splice(i,1);
                bullets.splice(j,1);
                //intervalEnemiesSpawn = setInterval(spawnEnemies, 1000);
            }
        }
    }
 }