class Point
{   
    #x;
    #y;
    #vx;
    #vy;
    #angle;

    constructor (x0,y0,vx,vy,angle) 
    {
        this.#x = x0 || 500;
        this.#y = y0 || 250;
        this.#vx = vx || 20;
        this.#vy = vy || 20;
        this.#angle = angle || 0;
    }

    // getters y setters de la posición
    get x ()
    {
        return this.#x;
    }

    get y ()
    {
        return this.#y;
    }

    set x (xValue)
    {
        this.#x = xValue;
    }

    set y (yValue)
    {
        this.#y = yValue;
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
    /**
     * Métodos para desplazamiento del punto
     * Mueve de posición inicial (x,y) a una nueva
     * posición (x +dx, y) o (x,y + dy),
     * según sea el caso 
     */
    moveUp ()
    {
        this.#y += -this.#vy;
    }

    moveDown ()
    {
        this.#y += this.#vy;
    }
    moveLeft ()
    {
        this.#x += -this.#vx;
    }

    moveRight ()
    {
        this.#x += this.#vx;
    }
    
}