class Barbs{
    constructor(x,y,height,width,damage,type){
        this.x =x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.damage= damage;
        this.type= type;
    }

    hit(barb){
        var player_tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        var player_tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        var barb_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        if (barb.type == "ground"){
            var barb_tile_y = Math.floor((this.y + this.height* 0.5) / game.world.tile_size);
        }
        if (barb.type == "ceiling"){
            var barb_tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        }
        var player_check_index = (player_tile_y * game.world.columns + player_tile_x);
        var barb_check_index = (barb_tile_y * game.world.columns + barb_tile_x);

        if (game.player.frozen == false && game.player.alive == true && game.player.stunned == false){
            if(player_check_index == barb_check_index || player_check_index == barb_check_index+1){
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

    drawBarbs(){
        if(this.type == "ground"){
            game.context.drawImage(game.findImage("barbs_ground"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
        }
        if(this.type == "ceiling"){
            game.context.drawImage(game.findImage("barbs_ceiling"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
        }
    }
}