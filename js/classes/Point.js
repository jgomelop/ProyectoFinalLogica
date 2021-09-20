class Point
{   
    constructor (x,y,vx,vy) 
    {
        this.x = x || 500;
        this.y = y || 250;
        this.vx = vx || 20;
        this.vy = vy || 20;
    }

    
    /**
     * Métodos para desplazamiento del punto
     * Mueve de posición inicial (x,y) a una nueva
     * posición (x +dx, y) o (x,y + dy),
     * según sea el caso 
     */
    moveUp ()
    {
        this.y += -this.vy;
    }

    moveDown ()
    {
        this.y += this.vy;
    }
    moveLeft ()
    {
        this.x += -this.vx;
    }

    moveRight ()
    {
        this.x += this.vx;
    }
    
}