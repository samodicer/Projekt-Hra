
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(100,400,0,0,57,57,true,false,100,300,new Animation());
        this.controller = new Controller();
        this.images = [];

    }

    start(){
        game.loadImages();
        this.sprite_sheet = new Sprite_sheet([[0, 1, 2, 3], [4, 5, 6, 7] , [8, 9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22, 23]],this.findImage("player_sprite"),42);
        this.tile_sheet = new Tile_sheet(this.findImage("tile_sheet"),40,40,3);
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
            ["crosshair","./images/crosshair.png"],
            ["tile_sheet","./images/tile_sheet.png"],
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
        game.player.checkShooting();
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
        game.player.animation.update();

        game.world.drawWorld();
        game.player.drawPlayer();
        game.player.PlayerCollision();
        game.player.BulletCollision();
        
        window.requestAnimationFrame(game.loop);

    }

}


