
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(2500,500,0,0,100,100,false,false,true,100,500,new Animation());
        this.key = new Key(1800,210,12,32,"gold");
        this.key = new Key(3600,210,12,32,"green");
        this.door = new Door(1850,600,100,50);
        this.controller = new Controller();
        this.enemies = [];
        this.images = [];
    }

    start(){
        // načítanie obrázkov,audia
        game.loadImages();
        game.loadSprites();
        game.loadAudio();
        // skrytie menu a zobrazenie canvasu
        document.getElementById('menu').style.display="none";
        document.getElementById('canvas').style.display="block";
        // pridanie listenerov
        window.addEventListener("keydown", game.controller.keyListener);
        window.addEventListener("keyup", game.controller.keyListener);
        game.canvas.addEventListener("click", game.controller.clickListener);
        game.canvas.addEventListener("mousemove", game.controller.mousemoveListener);
        // uloženie prezývky hráča 
        this.playername= document.getElementById('player_name').value;
        // vytvorenie nepriateľov
        game.createEnemy("Ghost",100,100,90,70);
        game.createEnemy("Ghost",600,500,90,70);
        game.createEnemy("Ghost",1100,200,90,70);
        game.createEnemy("Assassin",3200,100,170,150);
        // spustenie hernej slučky
        window.requestAnimationFrame(game.loop);
    }

    loadImages(){
        let images = [
            ["player_sprite","./images/player-sprite.png"],
            ["enemy1_sprite","./images/enemy1-sprite.png"],
            ["assassin_sprite","./images/assassin-sprite.png"],
            ["hit_sprite","./images/hit-sprite.png"],
            ["stunned_sprite","./images/stunned-sprite.png"],
            ["tile_sheet","./images/tile_sheet.png"],
            ["bullet","./images/bullet.png"],
            ["bullet_assassin","./images/assassin-bullet.png"],
            ["table","./images/table.png"],
            ["plant","./images/plant.png"],
            ["trashcan","./images/trashcan.png"],
            ["window","./images/window.png"],
            ["cardrepertory","./images/cardrepertory.png"],
            ["gold_key","./images/gold-key.png"],
            ["green_key","./images/green-key.png"],
            ["life","./images/life.png"],
            ["avatar","./images/avatar.png"],
            ["avatar-dead","./images/avatar-dead.png"],
            ["green_light","./images/green_light.png"],
            ["red_light","./images/red_light.png"],
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

        this.assassin_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7] , [0,1,2,3,4,5,6,7] , [0,1,2,3,4,5,6,7,8,9,10,11],
                                                       [0,1,2,3,4,5,6,7,8,9,10,11] , [0,1,2,3,4,5,6,7] , [0,1,2,3,4,5,6,7] ,
                                                       [0,1,2,3,4,5,6,7,8,9] , [0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9,10,11] , 
                                                       [0,1,2,3,4,5,6,7,8,9,10,11] , [0,1,2,3,4,5,6,7,8,9,10,11] , [0,1,2,3,4,5,6,7,8,9,10,11]] , this.findImage("assassin_sprite"),200);

        this.hit_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7,8,9]] , this.findImage("hit_sprite"),50);

        this.stunned_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]] , this.findImage("stunned_sprite"),50);

        this.tile_sheet = new Tile_sheet(this.findImage("tile_sheet"),50,50,3);    
    }

    loadAudio(){
        this.music = new Audio('./audio/music.wav');
        this.shot = new Audio('./audio/shot.wav');
        this.assassin_shot = new Audio('./audio/assassin_shot.wav');  
        this.hit = new Audio('./audio/hit.mp3');
        this.step = new Audio('./audio/step.wav');
        this.jump = new Audio('./audio/jump.wav');
        this.success = new Audio('./audio/success.wav');
        this.door_open = new Audio('./audio/door_open.wav');    
    }

    createEnemy(name,x,y,height,width){
        if(name == "Ghost"){
            this.enemy = new Ghost(x,y,0,0,height,width,x,y,new Animation());      
        }
        if(name == "Assassin"){
            this.enemy = new Assassin(x,y,0,0,height,width,x,y,new Animation());      
        }
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
        game.music.volume = 0.00;
        game.music.play();    
    }

    loop(){
        //console.log("x "+game.player.x);
        //console.log("y "+game.player.y);
        game.playMusic();

        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));

        game.world.drawWorld();

        if(game.key.taken == false){
            game.key.drawKey();    
        }

        game.door.openDoor(game.key,game.player);
        game.door.drawDoor();
        
        for (var i=0 ; i < game.enemies.length ; i++){
            if (game.enemies[i].alive != true){
                game.enemies.splice(i,1);     
            }else {
                game.physics(game.enemies[i]);
                game.enemies[i].behavior();
                game.enemies[i].animation.update(game.enemies[i]);
                game.enemies[i].EnemyCollision();  
                game.enemies[i].hit();
                game.enemies[i].drawEnemy();
                game.enemies[i].hit_animation.updateHitEnemy(game.enemies[i]);
                game.enemies[i].dead(game.enemies[i]);
                game.enemies[i].attack(game.enemies[i],game.player);
            }
        }


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


