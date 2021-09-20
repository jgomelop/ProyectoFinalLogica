class Ship extends Point
{

    constructor(img,x,y,dx,dy)
    {
        super(x,y,dx,dy);
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

    rotateShip(ctx,mousePosition){
        const X0 = this.x;
        const Y0 = this.y;
        this.angle = Math.atan2(mousePosition.y - Y0, mousePosition.x - X0);
        ctx.translate(X0, Y0);
        ctx.rotate(Math.PI/2 + this.angle);
        ctx.translate(-X0, -Y0);
    }
}