class Door {
    constructor(x,y,height,width){
        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.open = false;
        this.count = height;
    }

    openDoor(key,player){
        var door_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var door_tile_y = Math.floor((this.y + this.height* 0.5) / game.world.tile_size);
        var door_left_index = (door_tile_y * game.world.columns + door_tile_x)-1;
        var door_index = (door_tile_y * game.world.columns + door_tile_x);
        var player_tile_x = Math.floor((player.x + player.width * 0.5) / game.world.tile_size);
        var player_tile_y = Math.floor((player.y + player.height) / game.world.tile_size);
        var player_check_index = (player_tile_y * game.world.columns + player_tile_x);
        if (key.taken == true && player_check_index == door_left_index){
            if(player.has_gold_key || player.has_green_key || player.has_red_key) {
                game.door_open.volume = 0.1;  
                game.door_open.play();
                this.open = true;
                if(key.color == "gold"){
                    player.has_gold_key = false;    
                }
                if(key.color == "green"){
                    player.has_green_key = false;   
                }
                if(key.color == "red"){
                    player.has_red_key = false;   
                }
                game.world.map[door_index] = 6;
                game.world.map[door_index - game.world.columns] = 6;
            }
        }
    }

    drawDoor(){        
        if(this.open == false){
            game.context.fillStyle = "#545454";
            game.context.fillRect(game.camera.offset[0]+this.x,game.camera.offset[1]+this.y,this.width, this.height);
            game.context.drawImage(game.findImage("red_light"), 0, 0, 30, 30, this.x+game.camera.offset[0]-15,  this.y+game.camera.offset[1]-15, 15, 15);      
        } else {
            game.context.fillStyle = "#545454";
            game.context.drawImage(game.findImage("green_light"), 0, 0, 30, 30, this.x+game.camera.offset[0]-15,  this.y+game.camera.offset[1]-15, 15, 15);  
            game.context.fillRect(game.camera.offset[0]+this.x,game.camera.offset[1]+this.y,this.width, this.count);    
            if(this.count != 0){
                this.count--;
            }
        }  
    }

}