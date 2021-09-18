class Proyectil extends Punto
{
    constructor (x0,y0,vx,vy,angulo) 
    {
        super(x0,y0,vx,vy,angulo);
        this.xFinal = undefined;
        this.yFinal = undefined;
    }

    calcularPuntoFinale(){}

    impactar(){}

    explotar(){}
}