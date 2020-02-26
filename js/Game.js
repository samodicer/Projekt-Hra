
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(100,500,0,0,100,100,false,false,true,100,500,new Animation());
        this.key = new Key(1800,210,12,32);
        this.controller = new Controller();
        this.enemies = [];
        this.images = [];
        this.music = new Audio('./audio/music.wav');
        this.shot = new Audio('./audio/shot.wav');
        this.hit = new Audio('./audio/hit.mp3');
        this.step = new Audio('./audio/step.wav');
        this.jump = new Audio('./audio/jump.wav');
        this.success = new Audio('./audio/success.wav');
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
        this.playername= document.getElementById('player_name').value;
        game.createEnemy(100,100,90,70);
        game.createEnemy(600,500,90,70);
        game.createEnemy(1100,200,90,70);
        window.requestAnimationFrame(game.loop);// Start the game loop.
    }

    loadImages(){
        let images = [
            ["player_sprite","./images/player-sprite.png"],
            ["enemy1_sprite","./images/enemy1-sprite.png"],
            ["hit_sprite","./images/hit-sprite.png"],
            ["stunned_sprite","./images/stunned-sprite.png"],
            ["tile_sheet","./images/tile_sheet.png"],
            ["bullet","./images/bullet.png"],
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
                                              [0,1,2,3,4,5,6,7] , [0,1,2,3,4] , [0,1,2,3,4] ] , this.findImage("player_sprite"),100);

        this.enemy_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5] , [0,1,2,3,4,5] , [0,1,2,3,4,5],
                                                    [0,1,2,3,4,5] , [0,1,2,3,4,5] , [0,1,2,3,4,5], 
                                                    [0,1,2,3,4,5] , [0,1,2,3,4,5]] , this.findImage("enemy1_sprite"),100);

        this.hit_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7,8,9]] , this.findImage("hit_sprite"),50);
        this.stunned_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]] , this.findImage("stunned_sprite"),50);

        this.tile_sheet = new Tile_sheet(this.findImage("tile_sheet"),50,50,3);    
    }

    createEnemy(x,y,height,width){
        this.enemy = new Enemy(x,y,0,0,height,width,x,y,new Animation());   
        this.enemies.push(this.enemy);
    }

    physics(object){
        object.y_velocity += 0.8;// gravity
        object.old_x = object.x;
        object.old_y = object.y;
        object.x += object.x_velocity;
        object.y += object.y_velocity;
        object.x_velocity *= 0.9;// friction
        object.y_velocity *= 0.9;// friction    
    }

    playMusic() {
        game.music.volume = 0.03;
        game.music.play();    
    }

    loop(){
        game.playMusic();

        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));

        game.world.drawWorld();

        if(game.key.taken == false){
            game.key.drawKey();    
        }
        
        for (var i=0 ; i < game.enemies.length ; i++){
            if (game.enemies[i].alive == true){
                game.physics(game.enemies[i]);
                game.enemies[i].behavior();
                game.enemies[i].animation.update(game.enemies[i]);
                game.enemies[i].EnemyCollision();  
                game.enemies[i].hit();
                game.enemies[i].drawEnemy();
                game.enemies[i].hit_animation.updateHitEnemy(game.enemies[i]);
                game.enemies[i].dead(i);
                if(game.player.alive == true){
                    game.player.hit(game.enemies[i]); 
                }  
            }else game.enemies.splice(i,1); 
        }

       /* if(game.enemy.alive == true){
            game.physics(game.enemy);
            game.enemy.behavior();
            game.enemy.animation.update(game.enemy);
            game.enemy.EnemyCollision();  
            game.enemy.hit();
            game.enemy.drawEnemy();
            game.enemy.hit_animation.updateHit(game.enemy,game.player);
            game.enemy.dead();
        } 
        if(game.enemy2.alive == true){
            game.physics(game.enemy2);
            game.enemy2.behavior();
            game.enemy2.animation.update(game.enemy2);
            game.enemy2.EnemyCollision();  
            game.enemy2.hit();
            game.enemy2.drawEnemy();
            game.enemy2.hit_animation.updateHit(game.enemy2,game.player);
            game.enemy2.dead();
        } */

        if(game.player.alive == true){
            game.player.checkShooting();
            game.player.moveLeft();
            game.player.moveRight();
            game.player.jump();
            game.player.idle();
            game.player.animation.update(game.player);
            game.player.deleteBullets();
            game.physics(game.player);
            game.player.PlayerCollision();
            game.player.BulletCollision();
            game.player.dead();
            game.player.drawPlayer();
            game.player.hit_animation.updateHitPlayer(game.player);
            game.player.stunned_animation.update(game.player);
            game.player.findKey(game.key);
        } else {
            game.context.fillText("Game Over!",game.canvas.width/2,game.canvas.height/2);
        }





        window.requestAnimationFrame(game.loop);

    }

}


