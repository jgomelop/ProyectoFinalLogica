class Nave extends Punto
{
    constructor(x0,y0,vx,vy,angulo,PV)
    {
        super(x0,y0,vx,vy,angulo);
        this.angulo = angulo ||0;
        this.cadenciaDisparo = 1;
        this.puntosDeVida = PV || 20;
        this.viviendo = true;

    }

    // Accesores para la nave

    get cadenciaDisparo()
    {
        return this.cadenciaDisparo;
    }
    
    set cadenciaDisparo(value)
    {
        this.cadenciaDisparo = value;
    }   
    
    get viviendo ()
    {
        return this.viviendo;
    }

    // Acciones de la nave

    rotar(){}

    apuntar(){}

    disparar(){}

    explotar(){}

}