class Point
{   
    #x;
    #y;
    #vx; 
    #vy;

    constructor(x,y,vx,vy) 
    {
        this.#x = x;
        this.#y = y;
        this.#vx = vx;
        this.#vy = vy;
    }

    /**
     * ACCESORES
     */
    get x (){
        return this.#x;
    }
    get y (){
        return this.#y;
    }
    get vx (){
        return this.#vx;
    }
    get vy (){
        return this.#vy;
    }

    set x (value){
        this.#x = value;
    }
    set y (value){
        this.#y = value;
    }
    set vx (value){
        this.#vx = value;
    }
    set vy (value){
        this.#vy = value;
    }

    /**
     * Métodos para desplazamiento del punto
     * Mueve de posición inicial (x,y) a una nueva
     * posición (x +vx, y) o (x,y + vy),
     * según sea el caso 
     */

    moveUp ()
    {
        this.#y -= this.#vy;
    }

    moveDown ()
    {
        this.#y += this.#vy;
    }
    moveLeft ()
    {
        this.#x -= this.#vx;
    }

    moveRight ()
    {
        this.#x += this.#vx;
    }
    
}