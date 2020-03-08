class Enemy{

    constructor(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation){
        this.x = x;
        this.y= y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.height = height;
        this.width = width;
        this.old_x = old_x;
        this.old_y = old_y;
        this.animation = animation;
        this.alive = true;
        this.frozen = false;
        this.hitted = false;
        this.hit_animation = new Animation();
        this.damage;
        this.player_change_position = true;
    }

    EnemyCollision(){
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
    }

    attack(enemy,player){
        if (enemy instanceof Ghost){
            if(player.overlapsObject(enemy) && enemy.alive == true && player.stunned == false && enemy.frozen == false && player.frozen == false){
                player.lives -= 1;
                player.stunned = true;
                player.hitted = true;
                game.hit.volume = 0.1;
                game.hit.play(); 
                setTimeout(() => { player.hitted = false }, 300);
                setTimeout(() => { player.stunned = false }, 3000);
            }  
        }  

        if (enemy instanceof Assassin){
            var enemy_tile_x = Math.floor((enemy.x + enemy.width * 0.5) / game.world.tile_size);
            var enemy_tile_y = Math.floor((enemy.y + enemy.height) / game.world.tile_size);
            var player_tile_x = Math.floor((player.x + enemy.width * 0.5) / game.world.tile_size);
            var player_tile_y = Math.floor((player.y + enemy.height * 0.5) / game.world.tile_size);
            var check_player_index = (player_tile_y * game.world.columns + player_tile_x);
            var check_enemy_left_index = (enemy_tile_y * game.world.columns + enemy_tile_x)-1;
            var check_enemy_right_index = (enemy_tile_y * game.world.columns + enemy_tile_x)+2;
            var random_hit = Math.random();

            if(random_hit > 0.95 && enemy.alive == true && enemy.frozen == false && player.frozen == false && player.alive == true && player.stunned == false){

                if(check_player_index == check_enemy_left_index && this.player_change_position == true ){
                    //enemy.x_velocity = 0;
                    enemy.attacking = true;
                    player.lives -= 1;
                    player.stunned = true;
                    player.hitted = true;
                    game.hit.volume = 0.1;
                    game.hit.play(); 
                    setTimeout(() => { player.hitted = false }, 300);
                    setTimeout(() => { player.stunned = false }, 3000);
                    setTimeout(() => { enemy.attacking  = false ; this.player_change_position = false }, 800);
                }
                if(check_player_index == check_enemy_right_index && this.player_change_position == true) {
                    this.player_change_position = false;
                    //enemy.x_velocity = 0;
                    enemy.attacking = true;
                    player.lives -= 1;
                    player.stunned = true;
                    player.hitted = true;
                    game.hit.volume = 0.1;
                    game.hit.play(); 
                    setTimeout(() => { player.hitted = false }, 300);
                    setTimeout(() => { player.stunned = false }, 3000);
                    setTimeout(() => { enemy.attacking  = false , this.player_change_position = false}, 800);
                }
                if(check_player_index != check_enemy_right_index || check_player_index != check_enemy_left_index) {
                    this.player_change_position = true;
                }
            }


        }
    }

    hit() {
        if (this.frozen == false && game.player.shooting == true){
            for (var i=0 ; i < game.player.bullets.length ; i++){
                if(game.player.bullets[i].x >= this.x && game.player.bullets[i].x <= this.x + this.width && game.player.bullets[i].y >= this.y && game.player.bullets[i].y <= this.y + this.height) {    
                    this.hitted = true
                    setTimeout(() => { this.hitted = false }, 300);
                    game.player.bullets.splice(i,1); 
                    game.hit.volume = 0.1;
                    game.hit.load();
                    game.hit.play();

                    if (this.lives != 0) this.lives-= this.damage;
                }
            }
        }
    }

    dead(enemy){
        if(this.lives == 0){
            this.frozen=true;
            setTimeout(() => { this.alive = false ;}, 4000);
            if (this.old_x < this.x )  {
                if (enemy instanceof Ghost){
                    this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[6], 4, 6);    
                }
                if (enemy instanceof Assassin){
                    this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[10], 4, 10);    
                }
            } else if (this.old_x > this.x ) {
                if (enemy instanceof Ghost){
                    this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7);    
                }
                if (enemy instanceof Assassin){
                    this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[11], 4, 11);    
                }
            } else  {
                this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7);
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[11], 4, 11);   
            }
        }
    }
}