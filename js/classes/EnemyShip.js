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
    
    constructor(img,x,y,vx,vy,xFinal,yFinal)
    {
        super(x,y,vx,vy);
        this.#xFinal = xFinal;
        this.#yFinal = yFinal;
        this.#angle = 0;
        this.#fireRate = 1;
        this.#lifePoints = 20;
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
        const DIFF_ERROR_RADIOUS = 5;

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
        ctx.setTransform(1,0,0,1,0,0);
    }

    aimPlayer(ctx,player)
    {
        this.rotateShip(ctx,player)
    }
}