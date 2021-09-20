class Projectile
{
    #x0;
    #y0;
    #vx;
    #vy;
    #angle;
    #xFinal;
    #yFinal;
    #img;
    
    constructor (x0,y0,vx,vy,angle) 
    {       
        this.#x0 = x0 || 500;
        this.#y0 = y0 || 250;
        this.#vx = vx || 20;
        this.#vy = vy || 20;
        this.#angle = angle || 0;
        this.#xFinal = undefined;
        this.#yFinal = undefined;
        this.#img = undefined;
    }

    // getters y setters de la posición
    get x ()
    {
        return this.#x0;
    }

    get y ()
    {
        return this.#y0;
    }

    set x (xValue)
    {
        this.#x0 = xValue;
    }

    set y (yValue)
    {
        this.#y0 = yValue;
    }

    // getters y setters de la velocidad
    get vx ()
    {
        return this.#vx;
    }

    get vy ()
    {
        return this.#vy;
    }

    set vx (vxValue)
    {
        this.#vx = vxValue;
    }

    set vy (vyValue)
    {
        this.#vy = vyValue;
    }
    
    get angle()
    {
        return this.#angle;
    }

    set angle(value)
    {
        this.#angle = value;
    }


    get xFinal ()
    {
        return this.#xFinal;
    }

    get yFinal ()
    {
        return this.#yFinal;
    }

    set xFinal (value)
    {
        this.#xFinal = value;
    }

    set yFinal (value)
    {
        this.#yFinal = value;
    }
    
    get img ()
    {
        return this.#img;
    }

    set img (value)
    {
        this.#img = value;
    }

    draw(ctx){
        ctx.drawImage(this.#img, this.#x0,this.#y0);
    }

    computeFinalPoint(){}

    impact(){}

    explode(){}
}