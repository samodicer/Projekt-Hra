class Bullet{
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 8;
    }

    drawBullet(){
        game.context.beginPath();
        game.context.fillStyle = "#070808";
        game.context.arc(game.camera.offset[0] +this.x, game.camera.offset[1] +this.y, 2, 0, 2*Math.PI);
        game.context.fill();
        game.context.closePath();


    }


    updateBullet(){
        this.x -=  this.dx * this.speed;
        this.y -= this.dy * this.speed;

        if(game.camera.offset[0] +this.x < 0 || game.camera.offset[0] +this.x > game.canvas.width || game.camera.offset[1] +this.y < 0 || game.camera.offset[1] +this.y > game.canvas.height){
            return false
        } else return true;
    
    }
}