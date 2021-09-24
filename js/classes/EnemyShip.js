class EnemyShip extends Ship
{   
    #xFinal;
    #yFinal;
    constructor(img,x,y,vx,vy,xFinal,yFinal,fireRate,lifePoints,isAlive,scale)
    {
        super(img,x,y,vx,vy,fireRate,lifePoints,isAlive,scale);
        this.#xFinal = xFinal;
        this.#yFinal = yFinal;

        let xSign = Math.sign(this.#xFinal - super.x);
        let ySign = Math.sign(this.#yFinal - super.y);

        super.vx = xSign*vx/Math.SQRT2;
        super.vy = ySign*vy/Math.SQRT2;
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
        super.x += super.vx;
        super.y += super.vy;
    }

    aimPlayer(ctx,player)
    {
        super.rotateShip(ctx,player)
    }
}