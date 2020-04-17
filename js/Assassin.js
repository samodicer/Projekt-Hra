class Assassin extends Enemy{

   constructor(x,y,height,width){

        super(x,y,height,width);
        this.damage = 0.25;
        this.lives = 4;
        this.jumping = false;
        this.idling = false;
        this.left = true;
        this.right = false;
        this.bullets= [];
        this.shooting = false;
        this.shooting_animation = false;
        this.attacking = false;

   } 
   
   moveLeft(){

    if(this.alive == true && this.frozen == false && this.jumping == false && this.attacking == false) {

        this.idling = false;
        this.x_velocity -= 0.2; //pohyb dolava
        this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[3], 5, 3); //zmena animacie

    }
}

    moveRight(){

        if(this.alive == true && this.frozen == false && this.jumping == false && this.attacking == false) {

            this.idling = false;
            this.x_velocity += 0.2; //pohyb doprava
            this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[2], 5, 2); //zmena animacie

        }
    }

    jump(){

        if (this.jumping == false && this.frozen == false && this.alive == true && this.attacking == false) {

            this.jumping = true;
            this.idling = false;

            if (this.old_x < this.x ) {

                this.y_velocity -= 25; //skok
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[4], 5, 4); //zmena animacie

            } else if (this.old_x > this.x ) {

                this.y_velocity -= 25; //skok
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[5], 5, 5); //zmena animacie

            }
        }
    }

    idle(){

        if (this.jumping == false && this.frozen == false && this.alive == true && this.attacking == false) {

            if(this.idling == false){

                if (this.old_x < this.x ) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[0], 10, 0); //zmena animacie
                else this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[1], 10, 1); 
            
            }
            
            this.idling = true;

        }
    }



    behavior(){

        this.checkShooting();
        this.bulletCollision();
        this.updateBullets();
        this.bulletDamage();

        var enemy_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var enemy_tile_y = Math.floor((this.y + this.height* 0.7) / game.world.tile_size);
        var check_left_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1];
        var check_right_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1];
        var check_left_up_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1 - game.world.columns];
        var check_right_up_index= game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1 - game.world.columns];
        var check_left_down_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1 + (game.world.columns*2)];
        var check_right_down_index= game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1 + (game.world.columns*2)];
        var rounded_playerx = Math.round(game.player.x + game.player.width * 0.5 );
        var rounded_enemyx = Math.round(this.x + this.width * 0.5);
        var rounded_player_y = Math.round(game.player.y + game.player.height);
        var rounded_enemy_y = Math.round(this.y +this.height);
        var random_jump = Math.random();
        var random_shoot = Math.random();

        if (rounded_player_y < rounded_enemy_y+200 && rounded_player_y > rounded_enemy_y-200){ // ak je y suradnica hraca a nepriatela v tomto intervale

            if(rounded_playerx < rounded_enemyx +10 && rounded_playerx > rounded_enemyx-10 &&  this.shooting_animation == false){ //ak je hrac blizko nepraiatela

                this.idle();
    
            }else{ // ak nie
    
                if(rounded_playerx < rounded_enemyx &&   this.shooting_animation == false) { //ak je hrac nalavo
    
                    if(check_left_index == 6 && check_left_up_index == 6 && check_left_down_index != 6) this.moveLeft(); //pohyb vlavo
                    else this.idle();
    
                }else if(rounded_playerx > rounded_enemyx &&  this.shooting_animation == false) { // ak je hrac napravo
    
                    if(check_right_index == 6 && check_right_up_index == 6 && check_right_down_index != 6) this.moveRight(); //pohyb vpravo
                    else this.idle();
    
                }else if (rounded_playerx == rounded_enemyx  &&  this.shooting_animation == false){ //ak su x-ove suradnice rovnake
    
                    this.idle();
    
                }
            }

            if(random_jump > 0.98 && game.player.shooting == true &&  this.shooting_animation == false) { //ak hrac striela - nahodny skok
                this.jump();   
            }          

            if(this.shooting == false && random_shoot > 0.8 && random_jump > 0.9 && this.idling == false && this.jumping ==false &&  this.shooting_animation == false ){
                let distance;

                if(Math.round(game.player.x) > Math.round(this.x)){

                    distance = game.player.x - this.x;

                } else if (Math.round(game.player.x) < Math.round(this.x)) {

                    distance = this.x - game.player.x;

                } else distance = 0;

                if ( distance > 200 &&  distance < 400){ // ak je hrac v urcitej blizkosti , nepriatel vystreli

                    this.shoot();   

                }
            } 

            if(this.jumping == true){ //zrychlenie pri skoku

                if (this.old_x < this.x ) {

                    this.x_velocity += 0.2;

                }else if ( this.old_x > this.x) {

                    this.x_velocity -= 0.2;

                }
            }

        } else { // ak je hrac vzdialeny , nepriatel sa prechadza 

            if(check_left_index == 6 && check_left_up_index == 6 && check_left_down_index != 6 && this.left == true) { //ak nieje pred nepriatelom stena 

                this.moveLeft();//pohyb dolava

            }else { // ak narazi na stenu

                this.left = false; //zmeni smer
                this.right = true;

            }
            if(check_right_index == 6 && check_right_up_index == 6 && check_right_down_index != 6 && this.right == true) {  //ak nieje pred nepriatelom stena 

                this.moveRight();//pohyb doprava

            }else { // ak narazi na stenu

                this.left = true; //zmeni smer
                this.right = false;  

            } 

        }
    }

    attack(enemy,player){

        var enemy_tile_x = Math.floor((enemy.x + enemy.width * 0.5) / game.world.tile_size);
        var enemy_tile_y = Math.floor((enemy.y + enemy.height) / game.world.tile_size);
        var player_tile_x = Math.floor((player.x + enemy.width * 0.5) / game.world.tile_size);
        var player_tile_y = Math.floor((player.y + enemy.height * 0.5) / game.world.tile_size);
        var check_player_index = (player_tile_y * game.world.columns + player_tile_x);
        var check_enemy_left_index = (enemy_tile_y * game.world.columns + enemy_tile_x)-1;
        var check_enemy_right_index = (enemy_tile_y * game.world.columns + enemy_tile_x)+2;
        var random_hit = Math.random();

        if(random_hit > 0.95 && enemy.alive == true && enemy.frozen == false && player.frozen == false && player.alive == true && player.stunned == false){// nahodny utok

            if(check_player_index == check_enemy_left_index && this.player_change_position == true ){ // ak je hrac na spravnej pozicii
                
                enemy.attacking = true;
                player.lives -= 1; // - 1 zivot 
                player.stunned = true;
                player.hitted = true;
                game.hit.volume = 0.1;
                game.hit.play(); 
                setTimeout(() => { player.hitted = false }, 300);
                setTimeout(() => { player.stunned = false }, 3000);
                setTimeout(() => { enemy.attacking  = false ; this.player_change_position = false }, 800);
            }
            if(check_player_index == check_enemy_right_index && this.player_change_position == true) {// ak je hrac na spravnej pozicii

                enemy.attacking = true;
                player.lives -= 1; // - 1 zivot
                player.stunned = true;
                player.hitted = true;
                game.hit.volume = 0.1;
                game.hit.play(); 
                setTimeout(() => { player.hitted = false }, 300);
                setTimeout(() => { player.stunned = false }, 3000);
                setTimeout(() => { enemy.attacking  = false , this.player_change_position = false}, 800);
            }
            if(check_player_index != check_enemy_right_index || check_player_index != check_enemy_left_index) {
 
                this.player_change_position = true;

            }
        }

    }

    shoot(){

        let side;
        //ak je hrac vpravo od nepriatela
        if (this.animation.row == 0 || this.animation.row == 2 || this.animation.row == 4 || this.animation.row == 6 || this.animation.row == 8 || this.animation.row == 10) { 

             side = "right";

        } else side = "left"; //ak je hrac vlavo od nepriatela
        
        if (this.alive == true && this.frozen == false && this.attacking == false && game.player.frozen == false && game.player.alive == true){

            if(side == "right") var b = new Bullet (this.x+this.width/2+40,this.y+this.height/3+20,side); //vytvorenie naboja
            else var b = new Bullet (this.x+this.width/2-40,this.y+this.height/3+20,side);

            setTimeout(() => { 

                this.bullets.push(b); 
                game.assassin_shot.volume = 0.05;
                game.assassin_shot.load();
                game.assassin_shot.play();

            } , 300);
  
            this.shooting_animation = true;

            if (this.x < game.player.x && this.shooting_animation == true ) {

                this.x_velocity = 0;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[8], 4, 8); //zmena animacie
                setTimeout(() => { this.shooting_animation = false }, 900);

            } else {

                this.x_velocity -= 0;
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[9], 4, 9); //zmena animacie
                setTimeout(() => { this.shooting_animation = false }, 900);

            }

        }
    }

    bulletDamage(){

        if (game.player.frozen == false && this.shooting == true){

            for (var i=0 ; i < this.bullets.length ; i++){ // prejdenie po poli bullets
                //ak naboj zasiahol hraca
                if(this.bullets[i].x >= game.player.x && this.bullets[i].x <= game.player.x + game.player.width && this.bullets[i].y >= game.player.y && this.bullets[i].y <= game.player.y + game.player.height) {    
                    
                    game.player.hitted = true
                    setTimeout(() => { game.player.hitted = false }, 300);
                    this.bullets.splice(i,1); // vyhodime naboj z pola
                    game.hit.volume = 0.1;
                    game.hit.load();
                    game.hit.play();

                    if (game.player.lives != 0) game.player.lives-= 1; // -1 zivot
                }
            }
        }
    }

    bulletCollision(){

        if(this.shooting == true) {

            var to_delete ;

            for (var i=0 ; i < this.bullets.length ; i++){ // prejdenie po poli bullets

                var tile_x = Math.floor((this.bullets[i].x ) / game.world.tile_size);
                var tile_y = Math.floor((this.bullets[i].y) / game.world.tile_size);
                //hodnota na ktorej sa naboj nachadza
                var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
                
                if (value_at_index != 6 ) {//ak narazi na stenu

                    to_delete = i;

                }                
            }

            if (typeof to_delete !== 'undefined'){

                this.bullets.splice(to_delete,1); //vyhodenie z pola

            }
        
        }
    }

    updateBullets(){

        for (var i=0 ; i < this.bullets.length ; i++){// prejdenie po poli bullets

            this.bullets[i].updateBullet();//update nabojov

        }
    }

    checkShooting(){

        if (this.bullets.length == 0) this.shooting = false; //ak existuju naboje
        else this.shooting = true;

    }

    drawEnemy(){
        //vykreslenie grafiky nepriatela
        game.context.fillStyle = "green";
        game.context.drawImage(game.assassin_sprite_sheet.image, this.animation.frame * 200, this.animation.row * 200 , 200, 200, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y-3, 200, 205);

        if(this.lives > 3.0){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "green";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,38,2);

        }else if (this.lives > 2.0){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "yellow";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,28,2);

        }else if (this.lives > 1.0){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "orange";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,18,2);

        }else if (this.lives > 0){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+this.width/2,game.camera.offset[1]+this.y-1,40,4);
            game.context.fillStyle = "red";
            game.context.fillRect(game.camera.offset[0]+(this.x+this.width/2)+1,game.camera.offset[1]+this.y,8,2);

        }

        if(this.hitted == true){

            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+this.width/2, game.camera.offset[1] + this.y+this.height/3, 80, 80);    
        
        }

        for (var i=0 ; i < this.bullets.length ; i++){

            this.bullets[i].drawBullet(this);
        
        }
        
        if(this.attacking == true){

            if (this.animation.row == 2 || this.animation.row == 6) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[6], 5, 6);
            if (this.animation.row == 3 || this.animation.row == 7) this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[7], 5, 7);
        
        }
    }
}