class Assassin extends Enemy{
   constructor(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation){
        super(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation);
        this.damage = 0.5;
        this.jumping = false;
        this.left = true;
        this.right = false;
   } 
   
   moveLeft(){
    if(this.alive == true && this.frozen == false && this.jumping == false) {

        this.x_velocity -= 0.2;
        this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[3], 5, 3);

    }
}

    moveRight(){
        if(this.alive == true && this.frozen == false && this.jumping == false) {

            this.x_velocity += 0.2;
            this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[2], 5, 2);

        }
    }

    jump(){

        if (this.jumping == false && this.frozen == false && this.alive == true) {

            this.jumping = true;

            if (this.old_x < this.x ) {

                this.y_velocity -= 35;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[4], 5, 4);

            } else if (this.old_x > this.x ) {

                this.y_velocity -= 35;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[5], 5, 5);

            }
        }
    }

    idle(){

        if (this.jumping == false && this.frozen == false && this.alive == true) {

            if (this.old_x < this.x ) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[0], 10, 0);
            else this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[1], 10, 1);    

        }
    }



    behavior(){

        var enemy_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var enemy_tile_y = Math.floor((this.y + this.height* 0.7) / game.world.tile_size);
        var check_left_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1];
        var check_right_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1];
        var check_left_up_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1 - game.world.columns];
        var check_right_up_index= game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1 - game.world.columns];
        var check_left_down_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1 + (game.world.columns*2)];
        var check_right_down_index= game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1 + (game.world.columns*2)];
        var rounded_playerx = Math.round(game.player.x + game.player.width * 0.5 );
        var rounded_enemyx = Math.round(this.x + this.width * 0.5);

       /* if(rounded_playerx < rounded_enemyx +10 && rounded_playerx > rounded_enemyx-10 && this.frozen == false && this.jumping == false){

            this.idle();

        }else{

            if(rounded_playerx < rounded_enemyx && this.frozen == false && this.jumping == false) {

                if(check_left_index == 6 && check_left_up_index == 6 && check_left_down_index != 6) this.moveLeft();
                else this.idle();

            }else if(rounded_playerx > rounded_enemyx && this.frozen == false && this.jumping == false) {

                if(check_right_index == 6 && check_right_up_index == 6 && check_right_down_index != 6) this.moveRight();
                else this.idle();

            }else if (rounded_playerx == rounded_enemyx && this.frozen == false && this.jumping == false){

                this.idle();

            }
        }*/
        
        var rounded_player_y = Math.round(game.player.y + game.player.height);
        var rounded_enemy_y = Math.round(this.y +this.height);
        var random_jump = Math.random();

        if (rounded_player_y < rounded_enemy_y+200 && rounded_player_y > rounded_enemy_y-200){

            if(rounded_playerx < rounded_enemyx +10 && rounded_playerx > rounded_enemyx-10 && this.frozen == false && this.jumping == false){

                this.idle();
    
            }else{
    
                if(rounded_playerx < rounded_enemyx && this.frozen == false && this.jumping == false) {
    
                    if(check_left_index == 6 && check_left_up_index == 6 && check_left_down_index != 6) this.moveLeft();
                    else this.idle();
    
                }else if(rounded_playerx > rounded_enemyx && this.frozen == false && this.jumping == false) {
    
                    if(check_right_index == 6 && check_right_up_index == 6 && check_right_down_index != 6) this.moveRight();
                    else this.idle();
    
                }else if (rounded_playerx == rounded_enemyx && this.frozen == false && this.jumping == false){
    
                    this.idle();
    
                }
            }

            if(random_jump > 0.8 && game.player.shooting == true) this.jump();

            if(this.jumping == true){

                if (this.old_x < this.x ) {

                    this.x_velocity += 0.3;

                }else if ( this.old_x > this.x) {

                    this.x_velocity -= 0.3;

                }
            }

        } else {

            if(check_left_index == 6 && check_left_up_index == 6 && check_left_down_index != 6 && this.left == true) {
                this.moveLeft();
            }else {
                this.left = false;
                this.right = true;
            }
            if(check_right_index == 6 && check_right_up_index == 6 && check_right_down_index != 6 && this.right == true) {
                this.moveRight();
            }else {
                this.left = true;
                this.right = false;  
            } 

        }
    }

    drawEnemy(){
        game.context.fillStyle = "green";
        game.context.drawImage(game.assassin_sprite_sheet.image, this.animation.frame * 200, this.animation.row * 200 , 200, 200, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y-3, 200, 205);

        if(Math.round(this.lives) == 4){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+40,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "green";
            game.context.fillRect(game.camera.offset[0]+this.x+41,game.camera.offset[1]+this.y,38,2);
        }else if (Math.round(this.lives) == 3){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+40,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "yellow";
            game.context.fillRect(game.camera.offset[0]+this.x+41,game.camera.offset[1]+this.y,28,2);
        }else if (Math.round(this.lives) == 2){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+40,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "orange";
            game.context.fillRect(game.camera.offset[0]+this.x+41,game.camera.offset[1]+this.y,18,2);
        }else if (Math.round(this.lives) == 1){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+40,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "red";
            game.context.fillRect(game.camera.offset[0]+this.x+41,game.camera.offset[1]+this.y,8,2);
        }

        if(this.hitted == true){
            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+this.width/2, game.camera.offset[1] + this.y+this.height/3, 80, 80);    
        }
    }
}