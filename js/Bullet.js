class Bullet{
    constructor(x,y,side){
        this.x = x;
        this.y = y;
        this.speed = 8;
        this.side = side;
    }

    drawBullet(object){
        if(object instanceof Player){
            game.context.drawImage(game.findImage("bullet"), 0, 0 , 100, 81, game.camera.offset[0] +this.x, game.camera.offset[1] +this.y, 10, 7);
        } 
        if (object instanceof Assassin){
            game.context.drawImage(game.findImage("bullet_assassin"), 0, 0 , 100, 81, game.camera.offset[0] +this.x, game.camera.offset[1] +this.y, 20, 15);
        }
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