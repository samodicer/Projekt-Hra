class Assassin extends Enemy{
   constructor(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation){
        super(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation);
        this.damage = 0.5;
        this.lives = 4;
        this.jumping = false;
        this.idling = false;
        this.left = true;
        this.right = false;
        this.bullets= [];
        this.shooting = false;
        this.shooting_animation = false;
        this.attacking = false;
   } 
   
   moveLeft(){
    if(this.alive == true && this.frozen == false && this.jumping == false && this.attacking == false) {
        this.idling = false;
        this.x_velocity -= 0.2;
        this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[3], 5, 3);

    }
}

    moveRight(){
        if(this.alive == true && this.frozen == false && this.jumping == false && this.attacking == false) {
            this.idling = false;
            this.x_velocity += 0.2;
            this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[2], 5, 2);

        }
    }

    jump(){

        if (this.jumping == false && this.frozen == false && this.alive == true && this.attacking == false) {

            this.jumping = true;
            this.idling = false;

            if (this.old_x < this.x ) {

                this.y_velocity -= 25;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[4], 5, 4);

            } else if (this.old_x > this.x ) {

                this.y_velocity -= 25;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[5], 5, 5);

            }
        }
    }

    idle(){

        if (this.jumping == false && this.frozen == false && this.alive == true && this.attacking == false) {
            this.idling = true;
            if (this.old_x < this.x ) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[0], 10, 0);
            else this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[1], 10, 1);    

        }
    }



    behavior(){
        this.checkShooting();
        this.BulletCollision();
        this.deleteBullets();
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
        var rounded_player_y = Math.round(game.player.y + game.player.height);
        var rounded_enemy_y = Math.round(this.y +this.height);
        var random_jump = Math.random();
        var random_shoot = Math.random();

        if (rounded_player_y < rounded_enemy_y+200 && rounded_player_y > rounded_enemy_y-200){

            if(rounded_playerx < rounded_enemyx +10 && rounded_playerx > rounded_enemyx-10 &&  this.shooting_animation == false){

                this.idle();
    
            }else{
    
                if(rounded_playerx < rounded_enemyx &&   this.shooting_animation == false) {
    
                    if(check_left_index == 6 && check_left_up_index == 6 && check_left_down_index != 6) this.moveLeft();
                    else this.idle();
    
                }else if(rounded_playerx > rounded_enemyx &&  this.shooting_animation == false) {
    
                    if(check_right_index == 6 && check_right_up_index == 6 && check_right_down_index != 6) this.moveRight();
                    else this.idle();
    
                }else if (rounded_playerx == rounded_enemyx  &&  this.shooting_animation == false){
    
                    this.idle();
    
                }
            }

            if(random_jump > 0.8 && game.player.shooting == true &&  this.shooting_animation == false) {
                this.jump();   
            }
            
            let distance = Math.round(game.player.x - this.x)
            console.log(distance);

            if(this.shooting == false && random_shoot > 0.8 && random_jump > 0.9 && this.idling == false && this.jumping ==false &&  this.shooting_animation == false ){
;
                if ( ( distance > 120 && distance  < -120 ) || ( distance < 400 && distance > -400 ) ){
                    this.shoot();   
                }
            } 

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
    shoot(){
        let side;
        if (this.animation.row == 0 || this.animation.row == 2 || this.animation.row == 4 || this.animation.row == 6 || this.animation.row == 8 || this.animation.row == 10) { 

             side = "right";

        } else side = "left";
        
        if (this.alive == true && this.frozen == false && this.attacking == false){

            if(side == "right") var b = new Bullet (this.x+this.width/2+40,this.y+this.height/3+20,side);
            else var b = new Bullet (this.x+this.width/2-40,this.y+this.height/3+20,side);
            setTimeout(() => { 

                this.bullets.push(b); 
                game.assassin_shot.volume = 0.05;
                game.assassin_shot.load();
                game.assassin_shot.play();

            } , 300);
  
            this.shooting_animation = true;

            if (this.x < game.player.x && this.shooting_animation == true ) {

                this.x_velocity = 0;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[8], 4, 8);
                setTimeout(() => { this.shooting_animation = false }, 900);

            } else {

                this.x_velocity -= 0;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[9], 4, 9);
                setTimeout(() => { this.shooting_animation = false }, 900);

            }

        }
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

    drawEnemy(){
        game.context.fillStyle = "green";
        game.context.drawImage(game.assassin_sprite_sheet.image, this.animation.frame * 200, this.animation.row * 200 , 200, 200, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y-3, 200, 205);

        if(Math.round(this.lives) == 4){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "green";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,38,2);
        }else if (Math.round(this.lives) == 3){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "yellow";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,28,2);
        }else if (Math.round(this.lives) == 2){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "orange";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,18,2);
        }else if (Math.round(this.lives) == 1){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "red";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,8,2);
        }

        if(this.hitted == true){
            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+this.width/2, game.camera.offset[1] + this.y+this.height/3, 80, 80);    
        }

        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet(this);
        }
        
        if(this.attacking == true){
            if (this.old_x < this.x) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[6], 5, 6);
            if (this.old_x > this.x) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[7], 5, 7);
            if (this.old_x == this.x) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[7], 5, 7);
        }
    }
}