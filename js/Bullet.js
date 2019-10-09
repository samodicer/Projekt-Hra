class Bullet{
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 10;
    }

    drawBullet(){
        game.context.beginPath();
        game.context.fillStyle = "red";
        game.context.arc(this.x, this.y, 3, 0, 2*Math.PI);
        game.context.fill();
        game.context.closePath();
    }

    updateBullet(){
        this.x -=  this.dx * this.speed;
        this.y -= this.dy * this.speed;

        if(this.x < 0 || this.x > game.canvas.width || this.y < 0 || this.y > game.canvas.height){
            return false
        } else return true;
    
    }
}