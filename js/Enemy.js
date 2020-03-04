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
        this.lives = 4;
        this.animation = animation;
        this.alive = true;
        this.frozen = false;
        this.hitted = false;
        this.hit_animation = new Animation();
        this.damage;
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

    hit() {
        if (this.frozen == false){
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