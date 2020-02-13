class Enemy{

    constructor(x,y,x_velocity,y_velocity,height,width,old_x,old_y){
        this.x = x;
        this.y= y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.height = height;
        this.width = width;
        this.old_x = old_x;
        this.old_y = old_y;
        this.health = 100;
    }

    moveLeft(){
        game.enemy.x_velocity -= 0.4;
    }

    moveRight(){
        game.enemy.x_velocity += 0.4;
    }

    behavior(){
        var random = Math.random();
        if(random > 0.55) this.moveLeft()
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
                game.player.bullets.splice(i,1); 
                if (game.enemy.health != 0) game.enemy.health-= 25;
            }
            //console.log(Math.round(game.player.bullets[i].x)+ "= bulletX") ;         
            //console.log(Math.round(game.enemy.x)+ "= enemyX") ;   
        }
    }

    drawEnemy(){
        game.context.fillStyle = "green";
        game.context.fillRect(game.camera.offset[0]+this.x,game.camera.offset[1]+this.y,this.width,this.height);
    }
}