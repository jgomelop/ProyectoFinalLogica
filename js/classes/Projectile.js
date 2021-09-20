class Projectile extends Point
{
    constructor (img,x,y,dx,dy) 
    {    
        super(x,y,dx,dy)
        this.xFinal = undefined;
        this.yFinal = undefined;
        this.img = img;
        this.scale = 1;
        this.isAlive = true;
    }


    drawBullets(ctx){
        const IMG_WIDTH = this.scale*this.img.width;
        const IMG_HEIGHT = this.scale*this.img.height;

        const drawX0 = this.x - IMG_WIDTH/2;
        const drawY0 = this.y - IMG_HEIGHT/2;

        ctx.drawImage(this.img, drawX0, drawY0,IMG_WIDTH,IMG_HEIGHT); 
    }

    move(mousePosition){

        this.xFinal = mousePosition.x;
        this.yFinal = mousePosition.y;

        const xDir = Math.sign(this.xFinal - this.x); // x sign direction
        const yDir = Math.sign(this.yFinal - this.y); // y sign direction

        this.x += xDir*this.dx;
        this.y += yDir*this.dy;
    }

    explode(canvasWidth, canvasHeight){
        if ((Math.abs(this.x - this.xFinal) == 0) && 
            (Math.abs(this.y - this.yFinal) == 0)){
            this.isAlive = false;
        } 
        else if ((this.x < 0 || this.x > canvasWidth) || (this.y < 0 || this.y > canvasHeight)){
            this.isAlive = false;
        }
    }
}