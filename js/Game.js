
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(100,500,0,0,100,100,false,false,true,100,500,new Animation());
        this.enemy = new Enemy(600,500,0,0,90,70,600,500,new Animation());
        this.controller = new Controller();
        this.images = [];

    }

    start(){
        game.loadImages();
        game.loadSprites();
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
            ["player_sprite","./images/player-sprite.png"],
            ["enemy1_sprite","./images/enemy1-sprite.png"],
            ["hit_sprite","./images/hit-sprite.png"],
            ["tile_sheet","./images/tile_sheet.png"],
            ["table","./images/table.png"],
            ["plant","./images/plant.png"],
            ["trashcan","./images/trashcan.png"],
            ["window","./images/window.png"],
            ["cardrepertory","./images/cardrepertory.png"],
            ["key","./images/key.png"],
            ["life","./images/life.png"],
            ["avatar","./images/avatar.png"],
            ["avatar-dead","./images/avatar-dead.png"],
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
    
    loadSprites(){
        this.sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7,8,9] , [0,1,2,3,4,5,6,7,8,9] , [0,1,2,3,4,5,6,7,8,9],
                                              [0,1,2,3,4,5,6,7,8,9] , [0,1,2,3,4,5,6,7] , [0,1,2,3,4,5,6,7], 
                                              [0,1,2,3,4,5,6,7,8,9] , [0,1,2,3,4,5,6,7,8,9] , [0,1,2,3,4,5,6,7],
                                              [0,1,2,3,4,5,6,7] , [0,1,2,3,4] , [0,1,2,3,4] , [9]] , this.findImage("player_sprite"),100);

        this.enemy_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5] , [0,1,2,3,4,5] , [0,1,2,3,4,5],
                                                    [0,1,2,3,4,5] , [0,1,2,3,4,5] , [0,1,2,3,4,5], 
                                                    [0,1,2,3,4,5] , [0,1,2,3,4,5]] , this.findImage("enemy1_sprite"),100);

        this.hit_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7,8,9]] , this.findImage("hit_sprite"),50);

        this.tile_sheet = new Tile_sheet(this.findImage("tile_sheet"),50,50,3);    
    }

    loop(){
        console.log("alive-"+game.player.alive);
        console.log("frozen-"+game.player.frozen);
        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));

        game.world.drawWorld();

        if(game.enemy.alive == true){
            game.enemy.y_velocity += 0.8;// gravity
            game.enemy.old_x = game.enemy.x;
            game.enemy.old_y = game.enemy.y;
            game.enemy.x += game.enemy.x_velocity;
            game.enemy.y += game.enemy.y_velocity;
            game.enemy.x_velocity *= 0.9;// friction
            game.enemy.y_velocity *= 0.9;// friction
            game.enemy.behavior();
            game.enemy.animation.update();
            game.enemy.EnemyCollision();  
            game.enemy.hit()
            game.enemy.drawEnemy();
            game.enemy.hit_animation.update();
            game.enemy.dead();
        } 

        if(game.player.alive == true){
            game.player.checkShooting();
            game.player.moveLeft();
            game.player.moveRight();
            game.player.jump();
            game.player.idle();
            game.player.animation.update();
            game.player.deleteBullets();
            game.player.y_velocity += 0.8;// gravity
            game.player.old_x = game.player.x;
            game.player.old_y = game.player.y;
            game.player.x += game.player.x_velocity;
            game.player.y += game.player.y_velocity;
            game.player.x_velocity *= 0.9;// friction
            game.player.y_velocity *= 0.9;// friction        
            game.player.PlayerCollision();
            game.player.BulletCollision();
            game.player.hit();
            game.player.dead();
            game.player.drawPlayer();
            game.player.hit_animation.update();
        } else {
            game.context.fillText("Game Over!",game.canvas.width/2,game.canvas.height/2);
        }





        window.requestAnimationFrame(game.loop);

    }

}


