
class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(5750,500,0,0,100,100,false,false,true,100,500,new Animation());
        this.gold_key = new Key(1800,210,12,32,"gold");
        this.green_key = new Key(4100,210,12,32,"green");
        this.red_key = new Key(4330,160,12,32,"red");
        this.door = new Door(1850,600,100,50);
        this.door2 = new Door(4150,600,100,50);
        this.door3 = new Door(4950,600,100,50);
        this.infobox1= new Infobox (1);
        this.infobox2= new Infobox (2);
        this.infobox3= new Infobox (3);
        this.infobox4= new Infobox (4);
        this.infobox5= new Infobox (5);
        this.infobox6= new Infobox (6);
        this.life1 = new Life(960,210,15,15);
        this.life2 = new Life(3000,400,15,15);
        this.life3 = new Life(4920,300,15,15);
        this.button1= new Button (640,430,40,100,"Preskočiť",1);
        this.button2= new Button (500,140,30,30,"x",2);
        this.button3= new Button (550,90,30,30,"x",2);
        this.computer= new Computer (6050,34,166,170);
        this.window1 = new Window(1,200,300);
        this.window2 = new Window(2,300,400);
        this.controller = new Controller();
        this.enemies = [];
        this.obstacles = [];
        this.images = [];
        this.points = [];
        this.count =0;
        this.story=true;
        this.ended = false;
    }

    introStory(){
        // skrytie menu a zobrazenie canvasu
        document.getElementById('menu').style.display="none";
        document.getElementById('canvas').style.display="block";
        // pridanie listenerov
        window.addEventListener("keydown", game.controller.keyListener);
        window.addEventListener("keyup", game.controller.keyListener);
        game.canvas.addEventListener("click", game.controller.clickListener);
        game.canvas.addEventListener("mousemove", game.controller.mousemoveListener);

        game.context.font = '20px Trebuchet MS';
        game.intro.volume= 0.2;
        game.intro.play();

        var story1 = setInterval(() => { 
            game.context.clearRect(0, 0, canvas.width, canvas.height);
            this.count+=0.5;
            game.context.fillStyle = "black";
            game.context.drawImage(this.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
            game.context.drawImage(this.findImage("story1_human"), 0, 0 , 192 , 256 , 0+this.count , 0 , 192, 256);
            game.context.drawImage(this.findImage("story1_robot"), 0, 0 , 192 , 256 , 575-this.count , 0 , 192, 256);
            game.context.fillText("Vitaj v roku 2077. Vo svete vyspelých technológií.", 170, 300); 
            game.context.fillText("Roboti sú už bežnou súčasťou každodenného života.", 160, 325); 
            game.context.fillText("Využívajú sa hlavne ako pomocníci v domácnostiach.", 160, 350); 
            game.button1.drawButton();
            game.button1.click();
            if(game.story == false) clearInterval(story1);

            if(Math.round(this.count) == 200){

                clearInterval(story1);
                this.count=0;

                var story2 = setInterval(() => { 
                    game.context.clearRect(0, 0, canvas.width, canvas.height);
                    this.count+=0.1;
                    game.context.fillStyle = "black";
                    game.context.drawImage(this.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                    game.context.drawImage(this.findImage("story2_assassin"), 0, 0 , 700 , 706 , -100+this.count , 0+this.count , 600+this.count, 606+this.count);
                    game.context.drawImage(this.findImage("story2_ghost"), 0, 0 , 150 , 220 , 500+this.count , 330-this.count , 150, 223);
                    game.context.fillText("Avšak náš technologický pokrok", 400, 200);
                    game.context.fillText("má aj svoju temnú stránku.", 400, 225);
                    game.context.fillText("Na tajnej základni začali", 400, 250);
                    game.context.fillText("testovať robtov na armádne účely.", 400, 275);
                    game.button1.drawButton();
                    game.button1.click();
                    if(game.story == false) clearInterval(story2);

                    if(Math.round(this.count) == 20){

                        clearInterval(story2);
                        this.count=0;

                        var story3 = setInterval(() => { 
                            game.context.clearRect(0, 0, canvas.width, canvas.height);
                            this.count+=0.1;
                            game.context.fillStyle = "black";
                            game.context.drawImage(this.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                            game.context.drawImage(this.findImage("story3_assassin"), 0, 0 , 700 , 706 , -80+this.count , 20+this.count , 620+this.count, 626+this.count);
                            game.context.drawImage(this.findImage("story3_ghost"), 0, 0 , 150 , 220 , 520+this.count , 310-this.count , 150, 223);
                            game.context.fillText("Všetky tieto stroje", 450, 100);
                            game.context.fillText("riadi centrálny počítač", 450, 125);
                            game.context.fillText("ktorý bol napadnutý", 450, 150);
                            game.context.fillText("vírusom a zmenil robotov", 450, 175);
                            game.context.fillText("na nebezpečných protivníkov.", 450, 200);
                            game.button1.drawButton();
                            game.button1.click();
                            if(game.story == false) clearInterval(story3);

                            if(Math.round(this.count) == 20){

                                clearInterval(story3);
                                this.count=0;

                                var story4 = setInterval(() => { 
                                    game.context.clearRect(0, 0, canvas.width, canvas.height);
                                    this.count+=0.1;
                                    game.context.fillStyle = "black";
                                    game.context.drawImage(this.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                                    game.context.drawImage(this.findImage("story4_robot"), 0, 0 , 567 , 556 , -100+this.count , 0+this.count/2 , 567, 556);
                                    game.context.fillText("Posledná nádej sa vkladá do bojového robota", 310, 300);
                                    game.context.fillText("najnovšej technológie. Bol vyrobený iba jeden", 310, 325);
                                    game.context.fillText("za účelom chrániť ľudstvo.", 310, 350);
                                    game.button1.drawButton();
                                    game.button1.click();
                                    if(game.story == false) clearInterval(story4);

                                    if(Math.round(this.count) == 20){

                                        clearInterval(story4);
                                        this.count=0;

                                        var story5 = setInterval(() => { 
                                            game.context.clearRect(0, 0, canvas.width, canvas.height);
                                            this.count+=0.1;
                                            game.context.fillStyle = "black";
                                            game.context.drawImage(this.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                                            game.context.drawImage(this.findImage("story5_centralpc"), 0, 0 , 294 , 287 , 235 , 230-this.count , 294 , 287);
                                            game.context.fillText("Úlohou je nájsť a zničiť", 270, 100);
                                            game.context.fillText("centrálny počítač napadnutý vírusom.", 220, 125);
                                            game.button1.drawButton();
                                            game.button1.click();
                                            if(game.story == false) clearInterval(story5);

                                            if(Math.round(this.count) == 20){
                                                clearInterval(story5);
                                                this.count=0;
                                                this.story=false;
                                                game.intro.pause();
                                                this.start();
                                            }
                                        }, 50);
                                    }
                                }, 50); 
                            }
                        }, 50); 
                    }
                }, 50); 

            }
         }, 20);
    }

    start(){
        // uloženie prezývky hráča 
        this.playername= document.getElementById('player_name').value;
        // vytvorenie nepriateľov
        game.createEnemy("Ghost",100,100,90,70);
        game.createEnemy("Ghost",600,500,90,70);
        game.createEnemy("Ghost",1100,200,90,70);
        game.createEnemy("Ghost",4700,150,90,70);
        game.createEnemy("Ghost",5100,550,90,70);
        game.createEnemy("Assassin",3200,100,170,150);
        game.createEnemy("Ghost",4800,300,90,70);
        game.createEnemy("Attacker",5700,500,100,80);
        game.createEnemy("Attacker",5700,400,100,80);
        game.createEnemy("Attacker",5100,200,100,80);
        //vytvorenie prekážok
        game.createObstacles("default",3100,200,50,97,1,"ground","",0);
        game.createObstacles("default",3230,50,50,97,1,"ceiling","",0);
        game.createObstacles("default",700,650,50,97,1,"ground","",0);
        game.createObstacles("default",1400,500,50,97,1,"ceiling","",0);
        game.createObstacles("default",2300,50,50,97,1,"ceiling","",0);
        game.createObstacles("default",4450,650,50,97,1,"ground","",0);
        game.createObstacles("default",4550,650,50,97,1,"ground","",0);
        game.createObstacles("default",4650,650,50,97,1,"ground","",0);
        game.createObstacles("default",4750,650,50,97,1,"ground","",0);
        game.createObstacles("default",5100,0,50,97,1,"ceiling","",0);
        game.createObstacles("disappearing",4350,650,50,97,1,"ground","",2500);
        game.createObstacles("moving",3450,200,50,97,1,"ground","l",0);
        game.createObstacles("moving",3550,50,50,97,1,"ceiling","r",0);
        game.createObstacles("moving",4500,300,50,97,1,"ceiling","r",0);
        game.createObstacles("moving",4650,200,50,97,1,"ground","l",0);
        game.createObstacles("moving",5550,150,50,97,1,"ground","l",0);
        game.createObstacles("disappearing",2450,200,50,97,1,"ground","",1100);
        game.createObstacles("disappearing",2550,50,50,97,1,"ceiling","",1100);
        game.createObstacles("disappearing",2776,100,50,97,1,"ground","",2000);
        game.createObstacles("disappearing",3875,150,50,97,1,"ceiling","",2000);
        game.createObstacles("disappearing",5500,0,50,97,1,"ceiling","",1200);
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
            ["attacker","./images/attacker.png"],
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
            ["red_key","./images/red-key.png"],
            ["life","./images/life.png"],
            ["point","./images/point.png"],
            ["avatar","./images/avatar.png"],
            ["avatar-dead","./images/avatar-dead.png"],
            ["green_light","./images/green_light.png"],
            ["red_light","./images/red_light.png"],
            ["obstacle_ground","./images/obstacle-ground.png"],
            ["obstacle_ceiling","./images/obstacle-ceiling.png"],
            ["centralpc","./images/centralpc.png"],
            ["centralpc_destroyed","./images/centralpc-destroyed.png"],
            ["story1_human","./images/story/story1-human.png"],
            ["story1_robot","./images/story/story1-robot.png"],
            ["story2_assassin","./images/story/story2-assassin.png"],
            ["story2_ghost","./images/story/story2-ghost.png"],
            ["story3_assassin","./images/story/story3-assassin.png"],
            ["story3_ghost","./images/story/story3-ghost.png"],
            ["story4_robot","./images/story/story4-robot.png"],
            ["story5_centralpc","./images/story/story5-centralpc.png"],
            ["story_bg","./images/story/story-bg.png"],
            ["explosion_sprite","./images/explosion-sprite.png"],
            ["star","./images/star.png"],
            ["star_empty","./images/star-empty.png"],
            ["infobox1","./images/infobox1.png"],
            ["infobox2","./images/infobox2.png"],
            ["infobox3","./images/infobox3.png"],
            ["infobox4","./images/infobox4.png"],
            ["infobox5","./images/infobox5.png"],
            ["infobox6","./images/infobox6.png"]
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

        this.explosion_sprite_sheet = new Sprite_sheet([[0,1,2,3,4,5]] , this.findImage("explosion_sprite"),55);

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
        this.intro = new Audio('./audio/intro-story.wav');  
    }


    createEnemy(name,x,y,height,width){
        if(name == "Ghost"){
            this.enemy = new Ghost(x,y,0,0,height,width,x,y,new Animation());      
        }
        if(name == "Assassin"){
            this.enemy = new Assassin(x,y,0,0,height,width,x,y,new Animation());      
        }
        if(name == "Attacker"){
            this.enemy = new Attacker(x,y,0,0,height,width,x,y,new Animation());      
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
        if(game.player.has_red_key == true){
            game.context.drawImage(game.findImage("red_key"), 0, 0, game.gold_key.width, game.gold_key.height, 15, 90, game.gold_key.width, game.gold_key.height);  
          }
    }

    loop(){
        console.log("x "+game.player.x);
        console.log("y "+game.player.y);

        game.playMusic();

        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));

        game.world.drawWorld();

        if(game.gold_key.taken == false){
            game.gold_key.drawKey();    
        }

        if(game.green_key.taken == false){
            game.green_key.drawKey();    
        }

        if(game.red_key.taken == false){
            game.red_key.drawKey();    
        }

        game.computer.drawComputer();
        game.computer.hit();
        game.computer.animation.updateExplosion();   


        game.door.openDoor(game.gold_key,game.player);
        game.door.drawDoor();

        game.door2.openDoor(game.green_key,game.player);
        game.door2.drawDoor();

        
        game.door3.openDoor(game.red_key,game.player);
        game.door3.drawDoor();

        game.life1.drawLife();
        game.life1.collectLife();
        game.life2.drawLife();
        game.life2.collectLife();
        game.life3.drawLife();
        game.life3.collectLife();

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
            game.player.updateBullets();
            game.physics(game.player);
            game.player.PlayerCollision();
            game.player.BulletCollision();
            game.player.dead();
            game.player.drawPlayer();
            game.player.hit_animation.updateHitPlayer(game.player);
            game.player.stunned_animation.update(game.player);
            game.player.findKey(game.gold_key);
            game.player.findKey(game.green_key);
            game.player.findKey(game.red_key);
        } else {
            game.window1.drawWindow();
            game.button2.click();
        }

        game.infobox1.update();
        game.infobox1.drawInfobox();
        game.infobox2.update();
        game.infobox2.drawInfobox();
        game.infobox3.update();
        game.infobox3.drawInfobox();
        game.infobox4.update();
        game.infobox4.drawInfobox();
        game.infobox5.update();
        game.infobox5.drawInfobox();
        game.infobox6.update();
        game.infobox6.drawInfobox();

        game.drawGUI();

        if(game.ended == true) {
            game.player.frozen = true;
            game.window2.drawWindow();
            game.button3.click();
        }

        window.requestAnimationFrame(game.loop);

    }

}


