class Bullet{
    constructor(x,y,side){
        this.x = x;
        this.y = y;
        this.speed = 8;
        this.side = side;
    }

    drawBullet(){
        game.context.beginPath();
        game.context.fillStyle = "#070808";
        game.context.arc(game.camera.offset[0] +this.x, game.camera.offset[1] +this.y, 2, 0, 2*Math.PI);
        game.context.fill();
        game.context.closePath();


    }


    updateBullet(){

        if (this.side == "right") {
            this.x =  this.x + this.speed;
        } else  this.x =  this.x - this.speed;
        

        if(game.camera.offset[0] +this.x < 0 || game.camera.offset[0] +this.x > game.canvas.width || game.camera.offset[1] +this.y < 0 || game.camera.offset[1] +this.y > game.canvas.height){
            return false
        } else return true;
    
    }

    
}