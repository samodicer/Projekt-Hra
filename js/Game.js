
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(100,300,0,0,62,62,false,100,300,new Animation());
        this.controller = new Controller();
        this.images = [];

    }

    start(){
        game.loadImages();
        this.sprite_sheet = new Sprite_sheet([[0, 1, 2, 3], [4, 5, 6, 7] , [8, 9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22, 23]],this.findImage("player_sprite"),42);
        document.getElementById('menu').style.display="none";
        document.getElementById('canvas').style.display="block";
        window.addEventListener("keydown", game.controller.keyListener);
        window.addEventListener("keyup", game.controller.keyListener);
        game.canvas.addEventListener("click", game.controller.clickListener);
        game.canvas.addEventListener("mousemove", game.controller.mousemoveListener);
        window.requestAnimationFrame(game.loop);// Start the game loop.
        this.playername= document.getElementById('player_name').value;
    }

    loadImages(){
        let images = [
            ["player_sprite","./images/sprite.png"],
            ["crosshair","./images/crosshair.png"]
        ]

        for(let i = 0; i < images.length ; i++) {
			let img = new Image();
			let imgName = images[i][0];
			img.src = images[i][1];
			var imgArray = [imgName, img];
			this.images.push(imgArray);

        }


    }

    findImage(name) {

		// vrati obrazok (typ Image) podla nazvu z pola images
		for(let i = 0; i < this.images.length; i++) {
			
			if(this.images[i][0] == name){
				return this.images[i][1];
			}

		}

	}

    loop(){
        game.player.moveLeft();
        game.player.moveRight();
        game.player.jump();
        game.player.idle();
        game.player.update();

        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));
        
        game.player.y_velocity += 0.8;// gravity
        game.player.old_x = game.player.x;
        game.player.old_y = game.player.y;
        game.player.x += game.player.x_velocity;
        game.player.y += game.player.y_velocity;
        game.player.x_velocity *= 0.9;// friction
        game.player.y_velocity *= 0.9;// friction

        //game.player.offScreen();
       
        game.player.animation.update();

        game.world.drawWorld();
        game.player.drawPlayer();


        var tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        // get the value at the tile position in the map
        var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];

        if (value_at_index != 0) {

            // simply call one of the routing functions in the collision object and pass
            // in values for the collision tile's location in grid/map space
            game.world.collision(value_at_index,game.player, tile_y, tile_x);
    
        }
        
        tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
  
        if (value_at_index != 0) {
  
            game.world.collision(value_at_index,game.player, tile_y, tile_x);
  
        }

        //console.log ( "tile_x: " + tile_x + "<br>tile_y: " + tile_y + "<br>map index: " + tile_y + " * " + game.world.columns + " + " + tile_x + " = " + String(tile_y * game.world.columns + tile_x) + "<br>tile value: " + game.world.map[tile_y * game.world.columns + tile_x] );
        window.requestAnimationFrame(game.loop);

    }

}


