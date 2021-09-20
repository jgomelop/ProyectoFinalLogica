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
        let centerX = this.x - this.scale*this.img.width/2;
        let centerY = this.y - this.scale*this.img.height/2;

        const IMG_WIDTH = this.scale*this.img.width;
        const IMG_HEIGHT = this.scale*this.img.height;

        //ctx.setTransform(1,0,0,1,centerX,centerY);
        ctx.drawImage(this.img, centerX, centerY,IMG_WIDTH,IMG_HEIGHT); 
    }

    rotateShip(){}

    aim(){}

    shoot(){}

    explode(){}

}