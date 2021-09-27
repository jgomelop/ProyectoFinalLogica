class Projectile extends Point
{   
    #xFinal;
    #yFinal;
    #img;
    #scale;
    #isAlive;
    #dps
    constructor (img,x,y,vx,vy) 
    {    
        super(x,y,vx,vy)
        this.#xFinal = undefined;
        this.#yFinal = undefined;
        this.#img = img;
        this.#scale = 1;
        this.#isAlive = true;
        this.#dps = 1;
    }

    get dps(){
        return this.#dps;
    }
    get xFinal(){
        return this.#xFinal;
    }
    get yFinal(){
        return this.#yFinal;
    }
    get scale(){
        return this.#scale;
    }
    get isAlive(){
        return this.#isAlive;
    }

    get dps (){
        return this.#dps;
    }

    set dps(value){
        this.#dps = value;
    }

    set xFinal(value){
        this.#xFinal = value;
    }
    set yFinal(value){
        this.#yFinal = value;
    }
    set scale(value){
        this.#scale = value;
    }
    set isAlive(value){
        this.#isAlive = value;
    }

    drawBullet(ctx){
        const IMG_WIDTH = this.#scale*this.#img.width;
        const IMG_HEIGHT = this.#scale*this.#img.height;

        const drawX0 = super.x - IMG_WIDTH/2;
        const drawY0 = super.y - IMG_HEIGHT/2;

        ctx.drawImage(this.#img, drawX0, drawY0,IMG_WIDTH,IMG_HEIGHT); 
    }

    move(){
        super.x = super.x + super.vx;
        super.y = super.y + super.vy;
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