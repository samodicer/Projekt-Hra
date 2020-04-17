
class Game{
    
    constructor(){

        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.controller = new Controller();
        this.world = new World();
        this.camera = new Camera();
        this.player = new Player(100,500,100,100);
        this.story = new Story();
        this.gold_key = new Key(1800,210,12,32,"gold");
        this.green_key = new Key(4100,210,12,32,"green");
        this.red_key = new Key(4330,160,12,32,"red");
        this.door1 = new Door(1850,600,100,50);
        this.door2 = new Door(4150,600,100,50);
        this.door3 = new Door(4950,600,100,50);
        this.bubble1 = new Bubble(1);
        this.bubble2 = new Bubble(2);
        this.bubble3 = new Bubble(3);
        this.bubble4 = new Bubble(4);
        this.bubble5 = new Bubble(5);
        this.bubble6 = new Bubble(6);
        this.life1 = new Life(960,210,15,15);
        this.life2 = new Life(3000,400,15,15);
        this.life3 = new Life(4920,300,15,15);
        this.button1 = new Button(640,430,40,100,"Preskočiť",1);
        this.button2 = new Button(500,140,30,30,"x",2);
        this.button3 = new Button(550,90,30,30,"x",2);
        this.computer= new Computer (6050,34,166,170);
        this.window1 = new Window(1,200,300);
        this.window2 = new Window(2,300,400);
        this.enemies = [];
        this.obstacles = [];
        this.images = [];
        this.points = [];
        this.ended = false;

    }


    start(){
        // uloženie prezývky hráča 
        this.playername= document.getElementById('player_name').value;
        // vytovrenie sprite sheetov 
        game.createSprites();
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
        // vytvorenie prekážok
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

    // vytvorenie pola obrazkov 
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
            ["bubble1","./images/bubble1.png"],
            ["bubble2","./images/bubble2.png"],
            ["bubble3","./images/bubble3.png"],
            ["bubble4","./images/bubble4.png"],
            ["bubble5","./images/bubble5.png"],
            ["bubble6","./images/bubble6.png"]
        ]
        
        for(let i = 0; i < images.length ; i++) {
			let image = new Image();
			let imageName = images[i][0];
			image.src = images[i][1];
			var iamgesArray = [imageName, image];
			this.images.push(iamgesArray);

        }
    }

    // vrati obrazok podla nazvu z pola images
    findImage(name) {

		for(let i = 0; i < this.images.length; i++) {
			
			if(this.images[i][0] == name){
				return this.images[i][1];
			}

		}

    }

    // vytvori vsetky sprite sheety
    createSprites(){

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

    // nacita audio
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

    // vytvori nepriatelov podla zadanych parametrov a prida ich do pola
    createEnemy(name,x,y,height,width){

        if(name == "Ghost"){
            this.enemy = new Ghost(x,y,height,width);      
        }
        if(name == "Assassin"){
            this.enemy = new Assassin(x,y,height,width);      
        }
        if(name == "Attacker"){
            this.enemy = new Attacker(x,y,height,width);      
        }
        this.enemies.push(this.enemy);
    }

    // vytvori prekazky podla zadanych parametrov  a prida ich do pola
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

     // vytvori body a prida ich do pola
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


    // spusti hudbu
    playMusic() {
        game.music.volume = 0.03;
        game.music.play();    
    }


    //herna slucka
    loop(){
        // spusti hudbu
        game.playMusic();
        // update kamery
        game.camera.update(game.player.x + (game.player.width/2), game.player.y + (game.player.height/2));
        // vykreslenie sveta
        game.world.drawWorld();
        // vykreslenie klucov
        game.gold_key.drawKey();    
        game.green_key.drawKey();    
        game.red_key.drawKey();
        // update a vykreslenie pocitaca
        game.computer.drawComputer();
        game.computer.hit();
        game.computer.animation.updateExplosion();   
        // update a vykreslenie dveri
        game.door1.openDoor(game.gold_key,game.player);
        game.door1.drawDoor();
        game.door2.openDoor(game.green_key,game.player);
        game.door2.drawDoor();
        game.door3.openDoor(game.red_key,game.player);
        game.door3.drawDoor();
        // update a vykreslenie extra zivotov 
        game.life1.drawLife();
        game.life1.collectLife();
        game.life2.drawLife();
        game.life2.collectLife();
        game.life3.drawLife();
        game.life3.collectLife();
        // update a vykreslenie pola prekazok
        for (var i=0 ; i < game.obstacles.length ; i++){

            game.obstacles[i].drawObstacle(game.obstacles[i]);
            game.obstacles[i].hit(game.obstacles[i]);

            if (game.obstacles[i] instanceof MovingObstacle){

                game.obstacles[i].update();    

            }
            if (game.obstacles[i] instanceof DisappearingObstacle){

                game.obstacles[i].visibility();    

            }

        }
        // update a vykreslenie pola bodov
        for (var i=0 ; i < game.points.length ; i++){

            if(game.points[i].taken == false || game.points[i].showText == true){

                game.points[i].drawPoint();
                game.points[i].collectPoint();

            }

        }
        // update a vykreslenie pola nepriatelov
        for (var i=0 ; i < game.enemies.length ; i++){

            if (game.enemies[i].alive != true){

                game.enemies.splice(i,1);     

            }else {

                game.world.physics(game.enemies[i]);
                game.enemies[i].behavior();
                game.enemies[i].animation.update(game.enemies[i]);
                game.enemies[i].enemyCollision();  
                game.enemies[i].hit();
                game.enemies[i].drawEnemy();
                game.enemies[i].hit_animation.updateHitEnemy(game.enemies[i]);
                game.enemies[i].dead(game.enemies[i]);
                if (game.enemies[i] instanceof Ghost ||  game.enemies[i] instanceof Assassin) game.enemies[i].attack(game.enemies[i],game.player);

            }
        }
        // update a vykreslenie hraca
        if(game.player.alive == true){

            game.player.checkShooting();
            game.player.moveLeft();
            game.player.moveRight();
            game.player.jump();
            game.player.idle();
            game.player.animation.update(game.player);
            game.player.updateBullets();
            game.world.physics(game.player);
            game.player.playerCollision();
            game.player.bulletCollision();
            game.player.dead();
            game.player.drawPlayer();
            game.player.hit_animation.updateHitPlayer(game.player);
            game.player.stunned_animation.update(game.player);
            game.player.findKey(game.gold_key);
            game.player.findKey(game.green_key);
            game.player.findKey(game.red_key);

        } else {
            // ak hrac zomrie nech vyskoci okno
            game.window1.drawWindow();
            game.button2.click();

        }
        // update a vykreslenie bublin
        game.bubble1.update();
        game.bubble1.drawBubble();
        game.bubble2.update();
        game.bubble2.drawBubble();
        game.bubble3.update();
        game.bubble3.drawBubble();
        game.bubble4.update();
        game.bubble4.drawBubble();
        game.bubble5.update();
        game.bubble5.drawBubble();
        game.bubble6.update();
        game.bubble6.drawBubble();
        // vykreslenie Inforamcii
        game.world.drawInfo();
        // ak hra skonci nech vyskoci okno
        if(game.ended == true) {

            game.player.frozen = true;
            game.window2.drawWindow();
            game.button3.click();

        }

        // zabezpečuje update slučky
        window.requestAnimationFrame(game.loop);

    }

}


