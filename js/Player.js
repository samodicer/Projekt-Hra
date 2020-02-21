class Player{

    constructor(x,y,x_velocity,y_velocity,height,width,jumping,shooting,idling,old_x,old_y,animation){
        this.x = x;
        this.y= y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.height= height;
        this.width = width;
        this.jumping = jumping;
        this.shooting = shooting;
        this.idling= idling;
        this.old_x = old_x;
        this.old_y = old_y;
        this.animation = animation;
        this.bullets= [];
        this.stunned= false;
        this.lives = 3;
        this.alive = true;
        this.frozen = false;
        this.hitted = false;
        this.hit_animation = new Animation();
    }

   /* get bottom() { 
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
    }*/

    deleteBullets(){
        for (var i=0 ; i < this.bullets.length ; i++){
            if(!this.bullets[i].updateBullet()){
                this.bullets.splice(i,1);
            }
        }
    }

    checkShooting(){
        if (this.bullets.length == 0) this.shooting = false;
        else this.shooting = true;
    }

    PlayerCollision(){
        var tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        // get the value at the tile position in the map
        var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];

        if (value_at_index != 5 || 6 ) {

            // simply call one of the routing functions in the collision object and pass
            // in values for the collision tile's location in grid/map space
            game.world.collision(value_at_index,game.player, tile_y, tile_x);
    
        }
        
        tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
  
        if (value_at_index != 5 || 6 ) {
  
            game.world.collision(value_at_index,game.player, tile_y, tile_x);
  
        }   
        //console.log ( "tile_x: " + tile_x + "<br>tile_y: " + tile_y + "<br>map index: " + tile_y + " * " + game.world.columns + " + " + tile_x + " = " + String(tile_y * game.world.columns + tile_x) + "<br>tile value: " + game.world.map[tile_y * game.world.columns + tile_x] );
    }

    BulletCollision(){
        if(game.player.shooting == true) {

            var to_delete ;

            for (var i=0 ; i < game.player.bullets.length ; i++){
                var tile_x = Math.floor((game.player.bullets[i].x ) / game.world.tile_size);
                var tile_y = Math.floor((game.player.bullets[i].y) / game.world.tile_size);
                // get the value at the tile position in the map
                var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
                
                if (value_at_index != 6 ) {
                    to_delete = i;
                }                
            }

            if (typeof to_delete !== 'undefined'){
                game.player.bullets.splice(to_delete,1); 

            }
        
        }
    }

    /*collision(object){


        if ((game.player.top > object.bottom || game.player.right < object.left || game.player.bottom < object.top || game.player.left > object.right)) {
 
            return false;
      
        }
      
        else return true;
    }*/

    moveLeft(){

        if (game.controller.left && game.player.frozen == false && game.player.alive == true) {
            game.player.x_velocity -= 0.4;
            game.player.idling=false;

            if (game.player.jumping==false) {

                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[5], 7,5);
            }
        
        }
    }

    moveRight(){
        
        if (game.controller.right && game.player.frozen == false && game.player.alive == true) {    
            game.player.x_velocity += 0.4;
            game.player.idling=false;

            if (game.player.jumping==false) {

                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[4], 7,4);
            }
        }
    }

    jump(){

        if (game.controller.up && game.player.jumping == false && game.player.frozen == false && game.player.alive == true) {

            game.player.y_velocity -= 23;
            game.player.jumping = true;

            if (game.player.old_x < game.player.x && game.player.idling==false) {

                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7, 2);

            }else if (game.player.idling==true ) {

                if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7, 2);
                else game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3);

            }else if (game.player.old_x == game.player.x && game.player.idling==false){

                if (game.controller.right) game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7 , 2);
                else game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3);

            }else if ((game.player.old_x > game.player.x && game.player.idling==false)) {

                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3);

            }
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right && game.player.jumping==false && game.player.frozen == false && game.player.alive == true) {

            game.player.idling = true;

            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[0], 10, 0);          
            else game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[1], 10, 1);
      
        }
    }

    dead(){
        if(game.player.lives == 0){
            game.player.frozen = true;
            setTimeout(function(){ game.player.alive = false; }, 5000);
            if (game.player.old_x < game.player.x && game.player.idling == false)  {
                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6);
            } else if (game.player.old_x > game.player.x && game.player.idling == false) {
                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[7], 4, 7);
            } else if (game.player.idling == true){
                if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6);          
                else game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[7], 4, 7);  
            }
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

        //var rect = game.canvas.getBoundingClientRect();
       // var posX = this.x+this.width/2+game.camera.offset[0] - (game.controller.xtarget+6 - rect.left);//+6 -> pricitavam polovicu velkosti crosshairu
        //var posY = this.y+this.height/2+game.camera.offset[1] - (game.controller.ytarget+6 - rect.top);

        //let direction = Math.atan2(posX,posY);
        //let dirX = Math.sin(direction);
        //let dirY = Math.cos(direction);
        let side;
        if (game.player.animation.row == 0 || game.player.animation.row == 2 || game.player.animation.row == 4 || game.player.animation.row == 6 || game.player.animation.row == 8 || game.player.animation.row == 10) { 

             side = "right";

        } else side = "left";
        
        if (game.player.alive == true && game.player.stunned == false){

            if(side == "right") var b = new Bullet (this.x+this.width/2+30,this.y+this.height/2+5,side);
            else var b = new Bullet (this.x+this.width/2-30,this.y+this.height/2+5,side);
            this.bullets.push(b);

        }

        if (game.player.idling == true && game.player.frozen == false && game.player.alive == true && game.player.stunned == false) {

            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0]  ){

                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[10], 7, 10);

            } else  game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[11], 7, 11);

        } else if (game.player.idling == false && game.player.frozen == false && game.player.alive == true && game.player.stunned == false){

            if (game.controller.right){

                game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[8], 7, 8);

            } else  game.player.animation.changePlayerFrame(game.sprite_sheet.frame_sets[9], 7, 9);    
        }
    }

    hit(){
        if(game.player.overlapsEnemy() && game.enemy.alive == true && game.player.stunned == false && game.enemy.frozen == false && game.player.frozen == false){
            game.player.lives -= 1;
            game.player.stunned = true;
            game.player.hitted = true;
            setTimeout(function(){ game.player.hitted = false; }, 300);
            setTimeout(function(){ game.player.stunned = false; }, 3000);
        }
    }

    overlapsEnemy(){
        if (game.player.x <= game.enemy.x && game.enemy.x <= game.player.x + game.player.width-20 && game.player.y <= game.enemy.y+30 && game.player.y >= game.enemy.y-30) return true; 
        if (game.player.x+20 <= game.enemy.x + game.enemy.width  && game.enemy.x + game.enemy.width <= game.player.x + game.player.width && game.player.y <= game.enemy.y+30 && game.player.y >= game.enemy.y-30) return true; 
        if (game.enemy.x + game.enemy.width <  game.player.x && game.player.x+ + game.player.width   <  game.enemy.x + game.enemy.width && game.player.y <= game.enemy.y+30 && game.player.y >= game.enemy.y-30) return true; 
        return false;   
     }

    drawPlayer(){
        game.context.drawImage(game.sprite_sheet.image, game.player.animation.frame * 100, game.player.animation.row * 100 , 100, 100, game.camera.offset[0] + game.player.x, game.camera.offset[1] + game.player.y, 100, 100+10);
        
        
        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet();
        }

        if(game.player.hitted == true){
            game.player.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, game.player.hit_animation.frame * 50, game.player.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + game.player.x+30, game.camera.offset[1] + game.player.y+30, 50, 50);    
        }

        if(game.player.stunned == true){
            game.context.fillStyle = "#6da2f7";
            game.context.fillText("stunned", game.camera.offset[0] +game.player.x+15,game.camera.offset[1] +game.player.y-15); 
        }

    }

}