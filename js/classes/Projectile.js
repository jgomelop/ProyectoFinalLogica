class Projectile extends Point
{
    #xFinal;
    #yFinal;
    
    constructor (x0,y0,vx,vy,angulo) 
    {
        super(x0,y0,vx,vy,angulo);
        this.xFinal = undefined;
        this.yFinal = undefined;
    }

    get xFinal ()
    {
        return this.#xFinal;
    }

    get yFinal ()
    {
        return this.#yFinal;
    }


    computeFinalPoint(){}

    impact(){}

    explode(){}
}