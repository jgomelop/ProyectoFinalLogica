class Ship extends Point
{
    //#angle;
    #fireRate
    #lifePoints;
    #isAlive;
    #img;

    constructor(x0,y0,vx,vy,angle,HP)
    {
        super(x0,y0,vx,vy,angle);
        //this.#angle = angle ||0;
        this.#fireRate = 1;
        this.#lifePoints = HP || 20;
        this.#isAlive = true;
        this.#img = undefined;

    }

    get fireRate()
    {
        return this.#fireRate;
    }
    
    set fireRate(value)
    {
        this.#fireRate = value;
    }   

    get lifePoints()
    {
        return this.#lifePoints;
    }
    
    set lifePoints(value)
    {
        this.#lifePoints = value;
    }   
    
    
    get isAlive ()
    {
        return this.#isAlive;
    }

    get img ()
    {
        return this.#img;
    }

    set img (newImg)
    {
        this.#img = newImg;
    }



    rotate(){}

    aim(){}

    shoot(){}

    explode(){}

}