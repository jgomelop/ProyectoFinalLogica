class EnemyShip extends Point
{   
    #xFinal;
    #yFinal;
    #angle;
    #fireRate;
    #lifePoints;
    #isAlive;
    #scale;
    #img;
    #dps;
    
    constructor(img,x,y,vx,vy,xFinal,yFinal)
    {
        super(x,y,vx,vy);
        this.#xFinal = xFinal;
        this.#yFinal = yFinal;
        this.#angle = 0;
        this.#fireRate = 1;
        this.#dps = 1;
        this.#lifePoints = 2;
        this.#isAlive = true;
        this.#img = img;
        this.#scale = .5;
    }

    get xFinal()
    {
        return this.#xFinal;
    }
    get yFinal()
    {
        return this.#yFinal;
    }

    set xFinal(value)
    {
        this.#xFinal = value;
    }
    set yFinal(value)
    {
        this.#yFinal = value;
    }

    get angle(){
        return this.#angle;
    }
    get fireRate(){
        return this.#fireRate;
    }
    get lifePoints(){
        return this.#lifePoints;
    }
    get isAlive(){
        return this.#isAlive;
    }
    get scale(){
        return this.#scale;
    }
    get img (){
        return this.#img;
    }

    set angle(value){
        this.#angle = value;
    }
    set fireRate(value){
        this.#fireRate = value;
    }
    set lifePoints(value){
        this.#lifePoints = value;
    }
    set isAlive(value){
        this.#isAlive = value;
    }
    set scale(value){
        this.#scale = value;
    }


    move()
    {
        let xDistance = Math.abs(super.x - this.#xFinal);
        let yDistance = Math.abs(super.y - this.#yFinal);
        let distanceToFinalPoint = Math.sqrt(xDistance*xDistance + yDistance*yDistance)
        const DIFF_ERROR_RADIOUS = 10;

        if (distanceToFinalPoint > DIFF_ERROR_RADIOUS) {
            super.x += super.vx;
            super.y += super.vy;
        }

    }

    drawShip(ctx){

        const IMG_WIDTH = this.#scale*this.#img.width;
        const IMG_HEIGHT = this.#scale*this.#img.height;

        const drawX0 = super.x - IMG_WIDTH/2;
        const drawY0 = super.y - IMG_HEIGHT/2;

        ctx.drawImage(this.#img, drawX0, drawY0,IMG_WIDTH,IMG_HEIGHT); 
    }

    rotateShip(ctx,mousePosition){
        const X0 = super.x;
        const Y0 = super.y;
        this.#angle = Math.atan2(mousePosition.y - Y0, mousePosition.x - X0);
        ctx.translate(X0, Y0);
        ctx.rotate(Math.PI/2 + this.#angle);
        ctx.translate(-X0, -Y0);
        this.drawShip(ctx);
        ctx.resetTransform();
    }

    shootPlayer(enemyBulletImg,player,enemiesBullets)
    {
        const shootAngle= Math.atan2(player.y - super.y, player.x - super.x);
        const v = 4; // rapidez bala enemiga
        const vx = Math.cos(shootAngle)*v;
        const vy = Math.sin(shootAngle)*v;

        let bullet = new Projectile(enemyBulletImg,super.x,super.y,vx,vy);
        bullet.xFinal = player.x;
        bullet.yFinal = player.y;
        // añadiendo imagen a la bala enemiga
        bullet.img = enemyBulletImg;

        // Agregando bala al array de las balas enemigas
        enemiesBullets.push(bullet);
    }
}