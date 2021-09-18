class Punto
{
    constructor (x0,y0,vx,vy,angulo) 
    {
        this.x = x0 || 50;
        this.y = y0 || 50;
        this.vx = vx || 2;
        this.vy = vy || 2;
        this.angulo = angulo || 0;
    }

    // getters y setters de la posición
    get x ()
    {
        return this.x;
    }

    get y ()
    {
        return this.y;
    }

    set x (xValue)
    {
        this.x = xValue;
    }

    set y (yValue)
    {
        this.y = yValue;
    }

    // getters y setters de la velocidad
    get vx ()
    {
        return this.vx;
    }

    get vy ()
    {
        return this.vy;
    }

    set vx (vxValue)
    {
        this.x = vxValue;
    }

    set vy (vyValue)
    {
        this.y = vyValue;
    }
    
    /**
     * Métodos para desplazamiento del punto
     * Mueve de posición inicial (x,y) a una nueva
     * posición (x +dx, y) o (x,y + dy),
     * según sea el caso 
     */
    moverArriba ()
    {
        this.y += -vy;
    }

    moverAbajo ()
    {
        this.y += vy;
    }
    moverIzquierda ()
    {
        this.x += -vx;
    }

    moverDerecha ()
    {
        this.x += vx;
    }
    
}