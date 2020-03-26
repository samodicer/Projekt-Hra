class Obstacle{

    constructor(x,y,height,width,damage,position){

        this.x =x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.damage= damage;
        this.position= position;

    }

    hit(obstacle){

        if(obstacle instanceof DisappearingObstacle){

            if(obstacle.visible == false) return;

        }

        var player_tile_x = Math.floor((game.player.x + game.player.width * 0.6) / game.world.tile_size);
        var player_tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        var obstacle_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);

        if (obstacle.position == "ground"){

            var obstacle_tile_y = Math.floor((this.y + this.height* 0.5) / game.world.tile_size);

        }
        if (obstacle.position == "ceiling"){

            var obstacle_tile_y = Math.floor((this.y + this.height) / game.world.tile_size);

        }
        var player_check_index = (player_tile_y * game.world.columns + player_tile_x);
        var obstacle_check_index = (obstacle_tile_y * game.world.columns + obstacle_tile_x);

        if (game.player.frozen == false && game.player.alive == true && game.player.stunned == false){

            if(player_check_index == obstacle_check_index || player_check_index == obstacle_check_index+1){

                game.player.lives -= this.damage;
                game.player.stunned = true;
                game.player.hitted = true;
                game.hit.volume = 0.1;
                game.hit.play(); 
                setTimeout(() => { game.player.hitted = false }, 300);
                setTimeout(() => { game.player.stunned = false }, 3000);

            }
        }
    }

    drawObstacles(obstacle){

        if(obstacle instanceof DisappearingObstacle){

            if(obstacle.visible == false) return;

        }
        if(this.position == "ground"){

            game.context.drawImage(game.findImage("obstacle_ground"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
        
        }
        if(this.position == "ceiling"){

            game.context.drawImage(game.findImage("obstacle_ceiling"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
        
        }
    }
}