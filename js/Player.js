class Player{

    constructor(x,y,height,width){

        this.x = x;
        this.y= y;
        this.old_x = x;
        this.old_y = y;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.height= height;
        this.width = width;
        this.bullets= [];
        this.lives = 5;
        this.points = 0;
        this.jumping = false;
        this.shooting = false;
        this.idling= true;
        this.stunned= false;
        this.alive = true;
        this.frozen = false;
        this.hitted = false;
        this.has_gold_key = false;
        this.has_green_key = false;
        this.has_red_key = false;
        this.animation = new Animation();
        this.hit_animation = new Animation();
        this.stunned_animation = new Animation();
        
    }

    updateBullets(){

        for (var i=0 ; i < this.bullets.length ; i++){ //prejdenie po poli bullets

            this.bullets[i].updateBullet(); // update nabojov
            
        }

    }

    checkShooting(){

        if (this.bullets.length == 0) this.shooting = false; //ak existuje nejaky naboj
        else this.shooting = true;

    }

    playerCollision(){

        var tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        // hodnota indexu na ktorom je hrac
        var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];

        if (value_at_index != 5 || 6 ) {

            // ak narazi na blok, vola sa funkcia kolizie
            game.world.collision(value_at_index,this, tile_y, tile_x);
    
        }
        
        tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
  
        if (value_at_index != 5 || 6 ) {
  
            game.world.collision(value_at_index,this, tile_y, tile_x);
  
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


    moveLeft(){

        if (game.controller.left && this.frozen == false && this.alive == true) {

            this.x_velocity -= 0.4; //pohyb dolava
            this.idling=false;

            if (this.jumping==false) {

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[5], 7,5); // zmena animacie
                game.step.volume = 0.05;
                game.step.play();

            }
        
        }
    }

    moveRight(){
        
        if (game.controller.right && this.frozen == false && this.alive == true) {    

            this.x_velocity += 0.4; //pohyb dolava
            this.idling=false;

            if (this.jumping==false) {

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[4], 7,4); // zmena animacie
                game.step.volume = 0.05;
                game.step.play();

            }
        }
    }

    jump(){

        if (game.controller.up && this.jumping == false && this.frozen == false && this.alive == true) {

            this.y_velocity -= 27; //skok
            this.jumping = true;
            game.jump.volume = 0.04;
            game.jump.play();

            if (this.old_x < this.x && this.idling==false) { //ak sa pohybuje doprava

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7, 2); // zmena animacie

            }else if (this.idling==true ) { //ak stoji

                if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7, 2);// zmena animacie
                else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3); // zmena animacie

            }else if (this.old_x == this.x && this.idling==false){ 

                if (game.controller.right) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[2], 7 , 2); // zmena animacie
                else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3); // zmena animacie

            }else if ((this.old_x > this.x && this.idling==false)) { //ak sa pohybuje dolava

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[3], 7, 3); // zmena animacie

            }
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right && this.jumping==false && this.frozen == false && this.alive == true) {

            this.idling = true;

            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0] ) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[0], 10, 0); //zmena animacie         
            else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[1], 10, 1);
      
        }
    }

    dead(){

        if(this.lives == 0){ // ak nema zivoty

            this.frozen = true;
            setTimeout(() => { this.alive = false }, 4000);

            if (this.old_x < this.x && this.idling == false)  { //ak sa pohybuje doprava

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6); //zmena animacie

            } else if (this.old_x > this.x && this.idling == false) { //ak sa pohybuje dolava

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[7], 4, 7);//zmena animacie

            } else if (this.idling == true){ //ak stoji

                if (this.animation.row == 0 || this.animation.row == 6 ) this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[6], 4, 6);  //zmena animacie       
                else this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[7], 4, 7);  

            }  
        }
    }


    shoot(){

        let side;
        // urcenie strany ktorou je hrac otoceny
        if (this.animation.row == 0 || this.animation.row == 2 || this.animation.row == 4 || this.animation.row == 6 || this.animation.row == 8 || this.animation.row == 10) { 

             side = "right";

        } else side = "left";
        
        if (this.alive == true && this.stunned == false && this.frozen == false){

            if(side == "right") var b = new Bullet (this.x+this.width/2+30,this.y+this.height/2+5,side); //vytvorenie naboja
            else var b = new Bullet (this.x+this.width/2-30,this.y+this.height/2+5,side);

            this.bullets.push(b); //pridanie naboja do pola
            game.shot.volume = 0.05;
            game.shot.load();
            game.shot.play();  

        }

        if (this.idling == true && this.frozen == false && this.alive == true && this.stunned == false) {

            if (game.controller.mousex > this.x+this.width/2+game.camera.offset[0]  ){ //ak je kurzor na pravej strane canvasu

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[10], 7, 10); //zmena animacie

            } else  this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[11], 7, 11); //ak je kurzor na lavej strane canvasu , zmena animacie

        } else if (this.idling == false && this.frozen == false && this.alive == true && this.stunned == false){

            if (game.controller.right){ // ak je stlacena klavesa doprava

                this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[8], 7, 8); //zmena animacie

            } else  this.animation.changePlayerFrame(game.sprite_sheet.frame_sets[9], 7, 9);   // ak je stlacena klavesa dolava, zmena animacie

        }
    }


    overlapsObject(object){

        var player_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var player_tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        var object_tile_x = Math.floor((object.x + object.width * 0.5) / game.world.tile_size);
        var object_tile_y = Math.floor((object.y + object.height) / game.world.tile_size);
        var player_check_index = (player_tile_y * game.world.columns + player_tile_x);
        var object_check_index = (object_tile_y * game.world.columns + object_tile_x);

        if (player_check_index == object_check_index){ //porovnava indexi na ktorych sa objekt a hrac nachadza

            return true; 

        } else return false;

    }

    findKey(object){

        if (this.overlapsObject(object) && object.taken == false){ // ak prejde cez kluc

            if(object.color == "gold"){

                this.has_gold_key = true;

            }
            if(object.color == "green"){

                this.has_green_key = true;

            }
            if(object.color == "red"){

                this.has_red_key = true;

            }

            object.taken = true;
            game.success.volume = 0.07;
            game.success.play(); 

        }
    }

    drawPlayer(){
        //vykreslenie hraca
        if(this.stunned == true && this.frozen == false){

            this.stunned_animation.changeFrame(game.stunned_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.stunned_sprite_sheet.image, this.stunned_animation.frame * 50, this.stunned_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+40, game.camera.offset[1] + this.y-15, 20, 20);
        
        }

        game.context.drawImage(game.sprite_sheet.image, this.animation.frame * 100, this.animation.row * 100 , 100, 100, game.camera.offset[0] +this.x, game.camera.offset[1] + this.y, 100, 100+10);
        
        
        for (var i=0 ; i < this.bullets.length ; i++){

            this.bullets[i].drawBullet(this);

        }

        if(this.hitted == true){

            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x+30, game.camera.offset[1] + this.y+30, 50, 50);    
        
        }

    }

}