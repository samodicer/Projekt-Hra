
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(100,500,0,0,100,100,false,false,true,100,500,new Animation());
        this.gold_key = new Key(1800,210,12,32,"gold");
        this.green_key = new Key(4100,210,12,32,"green");
        this.door = new Door(1850,600,100,50);
        this.controller = new Controller();
        this.enemies = [];
        this.obstacles = [];
        this.images = [];
        this.points = [];
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
        //vytvorenie prekážok
        game.createObstacles("default",3100,200,50,97,1,"ground","",0);
        game.createObstacles("default",3230,50,50,97,1,"ceiling","",0);
        game.createObstacles("default",700,650,50,97,1,"ground","",0);
        game.createObstacles("default",1400,500,50,97,1,"ceiling","",0);
        game.createObstacles("default",2300,50,50,97,1,"ceiling","",0);
        game.createObstacles("moving",3450,200,50,97,1,"ground","l",0);
        game.createObstacles("moving",3550,50,50,97,1,"ceiling","r",0);
        game.createObstacles("disappearing",2450,200,50,97,1,"ground","",1100);
        game.createObstacles("disappearing",2550,50,50,97,1,"ceiling","",1100);
        game.createObstacles("disappearing",2776,100,50,97,1,"ground","",2000);
        game.createObstacles("disappearing",3875,150,50,97,1,"ceiling","",2000);
        // vytvorenie bodov
        game.createPoints();
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
            ["point","./images/point.png"],
            ["avatar","./images/avatar.png"],
            ["avatar-dead","./images/avatar-dead.png"],
            ["green_light","./images/green_light.png"],
            ["red_light","./images/red_light.png"],
            ["obstacle_ground","./images/obstacle-ground.png"],
            ["obstacle_ceiling","./images/obstacle-ceiling.png"]
        ]

        for(let i = 0; i < images.length ; i++) {
			let image = new Image();
			let imageName = images[i][0];
			image.src = images[i][1];
			var iamgesArray = [imageName, image];
			this.images.push(iamgesArray);

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
        this.point = new Audio('./audio/point.wav');  
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

    createObstacles(type,x,y,height,width,damage,position,direction,time){
        if(type == "default"){
            this.obstacle = new Obstacle(x,y,height,width,damage,position);    
        }
        if(type == "moving"){
            this.obstacle = new MovingObstacle(x,y,height,width,damage,position,direction);
        }
        if(type == "disappearing"){
            this.obstacle = new DisappearingObstacle(x,y,height,width,damage,position,time);
        }
        this.obstacles.push(this.obstacle);
    }

    createPoints(){
        for (var i =0 ; i< game.world.map.length ; i++){
            if( game.world.map[i] == 2 ){
                if (game.world.map[i-game.world.columns] == 6){
                    var random = Math.random();
                    var y = (Math.trunc((i / game.world.columns)) * game.world.tile_size)-15 ;
                    var x = Math.round((i % game.world.columns) * game.world.tile_size+15);
                    if(random >0.6){
                        this.p = new Point(x,y,12,12);
                        this.points.push(this.p); 
                    }
                }
            }
        }
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

    drawGUI(){
        game.context.font = '20px Trebuchet MS';
        game.context.fillStyle = "red";
        game.context.fillText(game.playername, 50, 50); 
        game.context.fillStyle = "green";
        game.context.fillText(game.player.points+ " / " + game.points.length, 680, 50); 

        game.context.drawImage(game.findImage("point"), 0, 0, 12, 12, 658,  35, 18, 18);
        
        if(game.player.frozen == false){
          game.context.drawImage(game.findImage("avatar"), 0, 0, 38, 44, 10, 10, 38, 44); 
        } else game.context.drawImage(game.findImage("avatar-dead"), 0, 0, 38, 44, 10, 10, 38, 44);

        if(game.player.lives ==5){
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 10, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 30, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 50, 60, 20, 20);  
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 70, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 90, 60, 20, 20);
        }else if(game.player.lives ==4){
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 10, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 30, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 50, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 70, 60, 20, 20);
        }else if(game.player.lives ==3){
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 10, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 30, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 50, 60, 20, 20);
        }else if(game.player.lives ==2){
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 10, 60, 20, 20);
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 30, 60, 20, 20);
        }else if(game.player.lives ==1){
          game.context.drawImage(game.findImage("life"), 0, 0, 20, 20, 10, 60, 20, 20);
        }

        if(game.player.has_gold_key == true){
          game.context.drawImage(game.findImage("gold_key"), 0, 0, game.gold_key.width, game.gold_key.height, 15, 90, game.gold_key.width, game.gold_key.height);  
        }
        if(game.player.has_green_key == true){
          game.context.drawImage(game.findImage("green_key"), 0, 0, game.gold_key.width, game.gold_key.height, 15, 90, game.gold_key.width, game.gold_key.height);  
        }
    }

    loop(){
        //console.log("x "+game.player.x);
        //console.log("y "+game.player.y);

        game.playMusic();

        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));

        game.world.drawWorld();

        if(game.gold_key.taken == false){
            game.gold_key.drawKey();    
        }

        if(game.green_key.taken == false){
            game.green_key.drawKey();    
        }

        game.door.openDoor(game.gold_key,game.player);
        game.door.drawDoor();

        for (var i=0 ; i < game.obstacles.length ; i++){
            game.obstacles[i].drawObstacles(game.obstacles[i]);
            game.obstacles[i].hit(game.obstacles[i]);
            if (game.obstacles[i] instanceof MovingObstacle){
                game.obstacles[i].update();    
            }
            if (game.obstacles[i] instanceof DisappearingObstacle){
                game.obstacles[i].visibility();    
            }
        }

        for (var i=0 ; i < game.points.length ; i++){
            if(game.points[i].taken == false || game.points[i].showText == true){
                game.points[i].drawPoint();
                game.points[i].collectPoint();
            }
        }
        
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
            game.player.findKey(game.gold_key);
            game.player.findKey(game.green_key);
        } else {
            game.context.fillText("Game Over!",game.canvas.width/2,game.canvas.height/2);
        }

        game.drawGUI();

        window.requestAnimationFrame(game.loop);

    }

}


