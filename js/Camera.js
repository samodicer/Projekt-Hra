class Camera{

    constructor(){

        this.screen= [760,480];
        this.startTile= [0,0];
        this.endTile= [0,0];
        this.offset= [0,0];

    }

    update(px,py){

        this.offset[0] = Math.floor((this.screen[0]/2) - px);
        this.offset[1] = Math.floor((this.screen[1]/2) - py);
        
        var tile = [ Math.floor(px/game.world.tile_size), Math.floor(py/game.world.tile_size) ]; 

        this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / game.world.tile_size); //vypocet pozicie prveho vykresleneho bloku
        this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / game.world.tile_size);
        
        if(this.startTile[0] < 0) { this.startTile[0] = 0; } // ak je na konci mapy
        if(this.startTile[1] < 0) { this.startTile[1] = 0; }

        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / game.world.tile_size); //vypocet pozicie posledneho vykresleneho bloku
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / game.world.tile_size);

		if(this.endTile[0] >= game.world.columns) { this.endTile[0] = game.world.columns; } // ak je na konci mapy
		if(this.endTile[1] >= game.world.rows) { this.endTile[1] = game.world.rows; }

    }
}