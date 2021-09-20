class Point
{   
    constructor (x,y,dx,dy) 
    {
        this.x = x || 500;
        this.y = y || 250;
        this.dx = dx || 20;
        this.dy = dy || 20;
    }

    
    /**
     * Métodos para desplazamiento del punto
     * Mueve de posición inicial (x,y) a una nueva
     * posición (x +dx, y) o (x,y + dy),
     * según sea el caso 
     */
    moveUp ()
    {
        this.y += -this.dy;
    }

    moveDown ()
    {
        this.y += this.dy;
    }
    moveLeft ()
    {
        this.x += -this.dx;
    }

    moveRight ()
    {
        this.x += this.dx;
    }
    
}