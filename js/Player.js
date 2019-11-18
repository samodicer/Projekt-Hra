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

        if (game.controller.left) {
      
            game.player.x_velocity -= 0.4;
            game.player.idling=false;
            if (game.player.jumping==false) {
                game.player.animation.change(game.sprite_sheet.frame_sets[5], 7,5);
            }
        
        }
    }

    moveRight(){
        
        if (game.controller.right) {
        
            game.player.x_velocity += 0.4;
            game.player.idling=false;
            if (game.player.jumping==false) {
                game.player.animation.change(game.sprite_sheet.frame_sets[4], 7,4);
            }
        }
    }

    jump(){

        if (game.controller.up && game.player.jumping == false) {

            game.player.y_velocity -= 23;
            game.player.jumping = true;

            if (game.player.old_x < game.player.x && game.player.idling==false) {

                game.player.animation.change(game.sprite_sheet.frame_sets[2], 7, 2);

            }else if (game.player.idling==true ) {

                if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) game.player.animation.change(game.sprite_sheet.frame_sets[2], 7, 2);
                else game.player.animation.change(game.sprite_sheet.frame_sets[3], 7, 3);

            }else if (game.player.old_x == game.player.x && game.player.idling==false){

                if (game.controller.right) game.player.animation.change(game.sprite_sheet.frame_sets[2], 7 , 2);
                else game.player.animation.change(game.sprite_sheet.frame_sets[3], 7, 3);

            }else if ((game.player.old_x > game.player.x && game.player.idling==false)) {

                game.player.animation.change(game.sprite_sheet.frame_sets[3], 7, 3);

            }
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right && game.player.jumping==false) {
            game.player.idling = true;
            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) game.player.animation.change(game.sprite_sheet.frame_sets[0], 10, 0);
            else game.player.animation.change(game.sprite_sheet.frame_sets[1], 10, 1);
      
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
        if (game.player.animation.column == 0 || game.player.animation.column == 2 || game.player.animation.column == 4 ) { 
             side = "right";
        } else side = "left";
        
        var b = new Bullet (this.x+this.width/2,this.y+this.height/2,side);
        this.bullets.push(b);

       /* if (game.player.idling == true) {
            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ){
                game.player.animation.change(game.sprite_sheet.frame_sets[10], 7, 10);
            } else  game.player.animation.change(game.sprite_sheet.frame_sets[11], 7, 11);
        } else if (game.player.idling == false){
            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ){
                game.player.animation.change(game.sprite_sheet.frame_sets[8], 7, 8);
            } else  game.player.animation.change(game.sprite_sheet.frame_sets[9], 7, 9);    
        }*/
    }



    drawPlayer(){
        game.context.drawImage(game.sprite_sheet.image, game.player.animation.frame * 100, game.player.animation.column * 100 , 100, 100, game.camera.offset[0] + game.player.x, game.camera.offset[1] + game.player.y, 100+20, 100+20);
        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet();
        }

    }

}