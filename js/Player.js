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
        this.has_key = false;
        this.hit_animation = new Animation();
        this.stunned_animation = new Animation();
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
        var tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        // get the value at the tile position in the map
        var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];

        if (value_at_index != 5 || 6 ) {

            // simply call one of the routing functions in the collision object and pass
            // in values for the collision tile's location in grid/map space
            game.world.collision(value_at_index,this, tile_y, tile_x);
    
        }
        
        tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
  
        if (value_at_index != 5 || 6 ) {
  
            game.world.collision(value_at_index,this, tile_y, tile_x);
  
        }   
        //console.log ( "tile_x: " + tile_x + "<br>tile_y: " + tile_y + "<br>map index: " + tile_y + " * " + game.world.columns + " + " + tile_x + " = " + String(tile_y * game.world.columns + tile_x) + "<br>tile value: " + game.world.map[tile_y * game.world.columns + tile_x] );
    }

    BulletCollision(){
        if(this.shooting == true) {

            var to_delete ;

            for (var i=0 ; i < this.bullets.length ; i++){
                var tile_x = Math.floor((this.bullets[i].x ) / game.world.tile_size);
                var tile_y = Math.floor((this.bullets[i].y) / game.world.tile_size);
                // get the value at the tile position in the map
                var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
                
                if (value_at_index != 6 ) {
                    to_delete = i;
                }                
            }

            if (typeof to_delete !== 'undefined'){
                this.bullets.splice(to_delete,1); 

            }
        
        }
    }

    /*collision(object){


        if ((this.top > object.bottom || this.right < object.left || this.bottom < object.top || this.left > object.right)) {
 
            return false;
      
        }
      
        else return true;
    }*/

    moveLeft(){

        if (game.controller.left && this.frozen == false && this.alive == true) {
            this.x_velocity -= 0.4;
            this.idling=false;

            if (this.jumping==false) {

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[5], 7,5);
                game.step.volume = 0.05;
                game.step.play();

            }
        
        }
    }

    moveRight(){
        
        if (game.controller.right && this.frozen == false && this.alive == true) {    
            this.x_velocity += 0.4;
            this.idling=false;

            if (this.jumping==false) {

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[4], 7,4);
                game.step.volume = 0.05;
                game.step.play();

            }
        }
    }

    jump(){

        if (game.controller.up && this.jumping == false && this.frozen == false && this.alive == true) {

            this.y_velocity -= 27;
            this.jumping = true;
            game.jump.volume = 0.04;
            game.jump.play();

            if (this.old_x < this.x && this.idling==false) {

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7, 2);

            }else if (this.idling==true ) {

                if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7, 2);
                else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3);

            }else if (this.old_x == this.x && this.idling==false){

                if (game.controller.right) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7 , 2);
                else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3);

            }else if ((this.old_x > this.x && this.idling==false)) {

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3);

            }
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right && this.jumping==false && this.frozen == false && this.alive == true) {

            this.idling = true;

            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[0], 10, 0);          
            else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[1], 10, 1);
      
        }
    }

    dead(){
        if(this.lives == 0){
            this.frozen = true;
            setTimeout(() => { this.alive = false }, 4000);
            if (this.old_x < this.x && this.idling == false)  {
                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6);
            } else if (this.old_x > this.x && this.idling == false) {
                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[7], 4, 7);
            } else if (this.idling == true){
                if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6);          
                else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[7], 4, 7);  
            } else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6); 
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
        if (this.animation.row == 0 || this.animation.row == 2 || this.animation.row == 4 || this.animation.row == 6 || this.animation.row == 8 || this.animation.row == 10) { 

             side = "right";

        } else side = "left";
        
        if (this.alive == true && this.stunned == false && this.frozen == false){

            if(side == "right") var b = new Bullet (this.x+this.width/2+30,this.y+this.height/2+5,side);
            else var b = new Bullet (this.x+this.width/2-30,this.y+this.height/2+5,side);
            this.bullets.push(b);
            game.shot.volume = 0.05;
            game.shot.load();
            game.shot.play();  

        }

        if (this.idling == true && this.frozen == false && this.alive == true && this.stunned == false) {

            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0]  ){

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[10], 7, 10);

            } else  this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[11], 7, 11);

        } else if (this.idling == false && this.frozen == false && this.alive == true && this.stunned == false){

            if (game.controller.right){

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[8], 7, 8);

            } else  this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[9], 7, 9);    
        }
    }


    overlapsObject(object){
        var player_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var player_tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        var object_tile_x = Math.floor((object.x + object.width * 0.5) / game.world.tile_size);
        var object_tile_y = Math.floor((object.y + object.height) / game.world.tile_size);
        var player_check_index = (player_tile_y * game.world.columns + player_tile_x);
        var object_check_index = (object_tile_y * game.world.columns + object_tile_x);
        if (player_check_index == object_check_index){
            return true;
        } else return false;

    }

    findKey(object){
        if (this.overlapsObject(object) && object.taken == false){
            this.has_key = true;
            object.taken = true;
            game.success.volume = 0.07;
            game.success.play(); 
        }
    }

    drawPlayer(){
        if(this.stunned == true && this.frozen == false){
            this.stunned_animation.changeFrame(game.stunned_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.stunned_sprite_sheet.image, this.stunned_animation.frame * 50, this.stunned_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+40, game.camera.offset[1] + this.y-15, 20, 20);
        }

        game.context.drawImage(game.sprite_sheet.image, this.animation.frame * 100, this.animation.row * 100 , 100, 100, game.camera.offset[0] +this.x, game.camera.offset[1] + this.y, 100, 100+10);
        
        
        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet(this);
        }

        if(this.hitted == true){
            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+30, game.camera.offset[1] + this.y+30, 50, 50);    
        }

    }

}