class Ship extends Point
{
    #angle; 
    #fireRate;
    #lifePoints;
    #isAlive;
    #img;
    #scale;
    #cannonPosition;

    constructor(img,x,y,vx,vy)
    {
        super(x,y,vx,vy);
        this.#angle = 0;
        this.#fireRate = 1;
        this.#lifePoints = 20;
        this.#isAlive = true;
        this.#img = img;
        this.#scale = .7;
        this.#cannonPosition = super.y - Math.round(135/2);//this.#img.height/2;
    }

    get img(){
        return this.#img;
    }

    get angle(){
        return this.#angle;
    }
    get fireRate(){
        return this.#fireRate;
    }
    get lifePoints(){
        return this.#lifePoints;
    }
    get isAlive(){
        return this.#isAlive;
    }
    get scale(){
        return this.#scale;
    }

    get cannonPosition(){
        return this.#cannonPosition;
    }

    set cannonPosition(value){
        this.#cannonPosition = value;
    }

    set angle(value){
        this.#angle = value;
    }
    set fireRate(value){
        this.#fireRate = value;
    }
    set lifePoints(value){
        this.#lifePoints = value;
    }
    set isAlive(value){
        this.#isAlive = value;
    }
    set scale(value){
        this.#scale = value;
    }
    
    drawShip(ctx){

        const IMG_WIDTH = this.#scale*this.#img.width;
        const IMG_HEIGHT = this.#scale*this.#img.height;

        const drawX0 = super.x - IMG_WIDTH/2;
        const drawY0 = super.y - IMG_HEIGHT/2;

        ctx.drawImage(this.#img, drawX0, drawY0,IMG_WIDTH,IMG_HEIGHT); 
    }

    rotateShip(ctx,mousePosition){
        const X0 = super.x;
        const Y0 = super.y;
        this.#angle = Math.atan2(mousePosition.y - Y0, mousePosition.x - X0);
        ctx.translate(X0, Y0);
        ctx.rotate(Math.PI/2 + this.#angle);
        ctx.translate(-X0, -Y0);
        this.drawShip(ctx);
    }
}