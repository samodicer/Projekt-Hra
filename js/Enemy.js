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
    }

    moveLeft(){
        if(game.enemy.alive == true && game.enemy.frozen == false) {
            game.enemy.x_velocity -= 0.4;
            game.enemy.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[3], 10, 3);
        }
    }

    moveRight(){
        if(game.enemy.alive == true && game.enemy.frozen == false) {
            game.enemy.x_velocity += 0.4;
            game.enemy.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[2], 10, 2);
        }
    }

    behavior(){
        var random = Math.random();
        if(random > 1) this.moveLeft()
        else this.moveRight();
    }

    EnemyCollision(){
        var tile_x = Math.floor((game.enemy.x + game.enemy.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((game.enemy.y + game.enemy.height) / game.world.tile_size);
        // get the value at the tile position in the map
        var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];

        if (value_at_index != 5 || 6 ) {

            // simply call one of the routing functions in the collision object and pass
            // in values for the collision tile's location in grid/map space
            game.world.collision(value_at_index,game.enemy, tile_y, tile_x);
    
        }
        
        tile_x = Math.floor((game.enemy.x + game.enemy.width * 0.5) / game.world.tile_size);
        tile_y = Math.floor((game.enemy.y + game.enemy.height) / game.world.tile_size);
        value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
  
        if (value_at_index != 5 || 6 ) {
  
            game.world.collision(value_at_index,game.enemy, tile_y, tile_x);
  
        }
    }

    hit() {
        for (var i=0 ; i < game.player.bullets.length ; i++){
            if(game.player.bullets[i].x >= game.enemy.x && game.player.bullets[i].x <= game.enemy.x + game.enemy.width && game.player.bullets[i].y >= game.enemy.y && game.player.bullets[i].y <= game.enemy.y + game.enemy.height) {    
                game.enemy.hitted = true
                setTimeout(function(){ 
                    game.enemy.hitted = false; 
                    }, 500);
                game.player.bullets.splice(i,1); 
                if (game.enemy.lives != 0) game.enemy.lives-= 1;
            }
        }
    }

    dead(){
        if(game.enemy.lives == 0){
            game.enemy.frozen=true;
            setTimeout(function(){ 
                    game.enemy.alive = false; 
                    }, 280);
            if (game.enemy.old_x < game.enemy.x )  {
                game.enemy.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[6], 4, 6);
            } else if (game.player.old_x > game.player.x ) {
                game.enemy.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7);
            } else  game.enemy.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7);
        }
    }

    drawEnemy(){
        game.context.fillStyle = "green";
        game.context.drawImage(game.enemy_sprite_sheet.image, game.enemy.animation.frame * 100, game.enemy.animation.row * 100 , 100, 100, game.camera.offset[0] + game.enemy.x, game.camera.offset[1] + game.enemy.y, 100, 105);

        if(game.enemy.lives == 4){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "green";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,38,2);
        }else if (game.enemy.lives == 3){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "yellow";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,28,2);
        }else if (game.enemy.lives == 2){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "orange";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,18,2);
        }else if (game.enemy.lives == 1){
            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+15,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "red";
            game.context.fillRect(game.camera.offset[0]+this.x+16,game.camera.offset[1]+this.y-9,8,2);
        }

        if(game.enemy.hitted == true){;
            game.enemy.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, game.enemy.hit_animation.frame * 50, game.enemy.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + game.enemy.x+30, game.camera.offset[1] + game.enemy.y+30, 50, 50);    
        }
    }
}