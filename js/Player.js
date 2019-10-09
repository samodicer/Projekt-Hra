class Player{

    constructor(x,y,x_velocity,y_velocity,height,width,jumping,old_x,old_y,animation){
        this.x = x;
        this.y= y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.height= height;
        this.width = width;
        this.jumping = jumping;
        this.old_x = old_x;
        this.old_y = old_y;
        this.animation = animation;
        this.bullets= [];
    }

    get bottom() { 
        return this.y + this.height;
    }
    get left() { 
        return this.x;
    }
    get right() { 
        return this.x + this.width;
    }
    get top() { 
        return this.y;
    }

    update(){
        for (var i=0 ; i < this.bullets.length ; i++){
            if(!this.bullets[i].updateBullet()){
                this.bullets.splice(i,1);
            }
        }
    }

    collision(object){
        if ((game.player.top > object.bottom || game.player.right < object.left || game.player.bottom < object.top || game.player.left > object.right)) {
 
            return false;
      
        }
      
        else return true;
    }

    moveLeft(){

        if (game.controller.left) {
      
            game.player.x_velocity -= 0.3;
            game.player.animation.change(game.sprite_sheet.frame_sets[3], 7);
        
        }
    }

    moveRight(){
        
        if (game.controller.right) {
        
            game.player.x_velocity += 0.3;
            game.player.animation.change(game.sprite_sheet.frame_sets[2], 7);
        
        }
    }

    jump(){

        if (game.controller.up && game.player.jumping == false) {

            game.player.y_velocity -= 21;
            game.player.jumping = true;
        
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right) {
  
            if(game.controller.mousex > this.x+25+game.camera.offset[0] ) game.player.animation.change(game.sprite_sheet.frame_sets[0], 10);
            else game.player.animation.change(game.sprite_sheet.frame_sets[1], 10);
      
        }
    }


    offScreen(){
                
        if (game.player.x < 0) {

            game.player.x_velocity = 0;
            game.player.old_x = game.player.x = 0;
    
          } else if (game.player.x + game.player.width > game.context.canvas.width) {
    
            game.player.x_velocity = 0;
            game.player.old_x = game.player.x = game.context.canvas.width - game.player.width;
    
          }
    
          if (game.player.y < 0) {
    
            game.player.y_velocity = 0;
            game.player.old_y = game.player.y = 0;
    
          } else if (game.player.y + game.player.height > game.context.canvas.height) {
    
            game.player.y_velocity = 0;
            game.player.old_y = game.player.y = game.context.canvas.height - game.player.height;
    
          }
    }

    shoot(){

        var rect = game.canvas.getBoundingClientRect();
        var posX = this.x+25+game.camera.offset[0] - (game.controller.xtarget+6 - rect.left);//+6 -> pricitavam polovicu velkosti crosshairu
        var posY = this.y+25+game.camera.offset[1] - (game.controller.ytarget+6 - rect.top);

        let direction = Math.atan2(posX,posY);
        let dirX = Math.sin(direction);
        let dirY = Math.cos(direction);

        var b = new Bullet (this.x+25+game.camera.offset[0],this.y+25+game.camera.offset[1],dirX,dirY);

        this.bullets.push(b);
    }

    drawPlayer(){
        game.context.drawImage(game.sprite_sheet.image, game.player.animation.frame * 42, 0, 42, 42, Math.floor(game.camera.offset[0] + game.player.x), Math.floor(game.camera.offset[1] + game.player.y), 42+20, 42+20);
        game.context.drawImage(game.context.canvas, 0, 0, game.context.canvas.width, game.context.canvas.height, 0, 0, game.context.canvas.width, game.context.canvas.height);

        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet();
        }

    }

}