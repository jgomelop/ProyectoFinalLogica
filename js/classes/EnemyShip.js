class EnemyShip extends Ship
{   
    #xFinal;
    #yFinal;
    constructor(img,x,y,vx,vy,xFinal,yFinal,angle,fireRate,lifePoints,isAlive,scale)
    {
        super(img,x,y,vx,vy,angle,fireRate,lifePoints,isAlive,scale);
        this.#xFinal = xFinal;
        this.#yFinal = yFinal;
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

    aimPlayer(ctx,player)
    {
        super.rotateShip(ctx,player)
    }
}