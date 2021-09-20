class Ship extends Point
{

    constructor(img,x,y,vx,vy)
    {
        super(x,y,vx,vy);
        this.angle = 0;
        this.fireRate = 1;
        this.lifePoints = 20;
        this.isAlive = true;
        this.img = img;
        this.scale = .7;
    }

    drawShip(ctx){

        const IMG_WIDTH = this.scale*this.img.width;
        const IMG_HEIGHT = this.scale*this.img.height;

        const drawX0 = this.x - IMG_WIDTH/2;
        const drawY0 = this.y - IMG_HEIGHT/2;

        //ctx.setTransform(1,0,0,1,centerX,centerY);
        ctx.drawImage(this.img, drawX0, drawY0,IMG_WIDTH,IMG_HEIGHT); 
    }

    rotateShip(ctx,mousePos){
        const X0 = this.x;
        const Y0 = this.y;
        this.angle = Math.atan2(mousePos.y - Y0, mousePos.x - X0);
        ctx.translate(X0, Y0);
        ctx.rotate(Math.PI/2 + this.angle);
        ctx.translate(-X0, -Y0);
    }

    aim(){}

    shoot(){}

    explode(){}

}