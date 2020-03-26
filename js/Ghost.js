class Ghost extends Enemy{

    constructor(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation){

        super(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation);
        this.damage = 1;
        this.lives = 4;

    }

    moveLeft(){

        if(this.alive == true && this.frozen == false) {

            this.x_velocity -= 0.1;
            this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[3], 10, 3);

        }
    }

    moveRight(){

        if(this.alive == true && this.frozen == false) {

            this.x_velocity += 0.1;
            this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[2], 10, 2);

        }
    }

    idle() {

        if (this.old_x < this.x) this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[0], 10, 0);
        else this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[1], 10, 1);  

    }

    behavior(){

        var enemy_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var enemy_tile_y = Math.floor((this.y + this.height* 0.5) / game.world.tile_size);
        var check_left_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1];
        var check_right_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1];
        var check_left_down_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1 + game.world.columns];
        var check_right_down_index= game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1 + game.world.columns];
        var rounded_playerx = Math.round(game.player.x);
        var rounded_enemyx = Math.round(this.x);

        if(rounded_playerx < rounded_enemyx+10 && rounded_playerx > rounded_enemyx-10 && this.frozen == false){

            this.idle();

        }else{

            if(rounded_playerx < rounded_enemyx && this.frozen == false) {

                if(check_left_index == 6 && check_left_down_index != 6) this.moveLeft();
                else this.idle();

            }else if(rounded_playerx > rounded_enemyx && this.frozen == false) {
                
                if(check_right_index == 6 && check_right_down_index != 6) this.moveRight();
                else this.idle();

            }else if (rounded_playerx == rounded_enemyx && this.frozen == false){

                this.idle();
                
            }
        }
    }

    

    drawEnemy(){

        game.context.fillStyle = "green";
        game.context.drawImage(game.enemy_sprite_sheet.image, this.animation.frame * 100, this.animation.row * 100 , 100, 100, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y, 100, 105);

        if(this.lives == 4){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "green";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,38,2);

        }else if (this.lives == 3){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "yellow";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,28,2);

        }else if (this.lives == 2){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "orange";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,18,2);

        }else if (this.lives == 1){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "red";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,8,2);

        }

        if(this.hitted == true){

            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x, game.camera.offset[1] + this.y+30, 50, 50);    
        
        }
    }

}