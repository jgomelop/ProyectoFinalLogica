class Nave extends Punto
{
    //#angulo;
    #cadenciaDisparo
    #puntosVida;
    #viviendo;
    #img;

    constructor(x0,y0,vx,vy,angulo,PV)
    {
        super(x0,y0,vx,vy,angulo);
        //this.#angulo = angulo ||0;
        this.#cadenciaDisparo = 1;
        this.#puntosVida = PV || 20;
        this.#viviendo = true;
        this.#img = undefined;

    }

    // Accesores para la nave

    get cadenciaDisparo()
    {
        return this.#cadenciaDisparo;
    }
    
    set cadenciaDisparo(value)
    {
        this.#cadenciaDisparo = value;
    }   

    get puntosVida()
    {
        return this.#puntosVida;
    }
    
    set puntosVida(value)
    {
        this.#puntosVida = value;
    }   
    
    
    get viviendo ()
    {
        return this.#viviendo;
    }

    get img ()
    {
        return this.#img;
    }

    set img (newImg)
    {
        this.#img = newImg;
    }

    // Acciones de la nave

    rotar(){}

    apuntar(){}

    disparar(){}

    explotar(){}

}