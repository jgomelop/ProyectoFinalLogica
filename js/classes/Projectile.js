class Projectile extends Point
{   
    #xFinal;
    #yFinal;
    #img;
    #scale;
    #isAlive;
    constructor (img,x,y,vx,vy) 
    {    
        super(x,y,vx,vy)
        this.#xFinal = undefined;
        this.#yFinal = undefined;
        this.#img = img;
        this.#scale = 1;
        this.#isAlive = true;
    }

    drawBullets(ctx){
        const IMG_WIDTH = this.#scale*this.#img.width;
        const IMG_HEIGHT = this.#scale*this.#img.height;

        const drawX0 = super.x - IMG_WIDTH/2;
        const drawY0 = super.y - IMG_HEIGHT/2;

        ctx.drawImage(this.#img, drawX0, drawY0,IMG_WIDTH,IMG_HEIGHT); 
    }

    move(){

        const xDir = Math.sign(this.#xFinal - super.x); // x sign direction
        const yDir = Math.sign(this.#yFinal - super.y); // y sign direction

        let xDistance = Math.abs(super.x - this.#xFinal);
        let yDistance = Math.abs(super.y - this.#yFinal);
        let distanceToFinalPoint = Math.SQRT2(xDistance*xDistance + yDistance*yDistance)
        const DIFF_ERROR_RADIOUS = 10;

        while (distanceToFinalPoint > DIFF_ERROR_RADIOUS) {
            super.x += xDir*super.vx;
            super.y += yDir*super.vy;
        }
        
    }

    explode(canvasWidth, canvasHeight){
        if ((Math.abs(super.x - this.#xFinal) == 0) && 
            (Math.abs(super.y - this.#yFinal) == 0)){
            this.#isAlive = false;
        } 
        else if ((super.x < 0 || super.x > canvasWidth) || (super.y < 0 || super.y > canvasHeight)){
            this.#isAlive = false;
        }
    }
}