class Enemy{

    constructor(x,y,height,width){

        this.x = x;
        this.y= y;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.height = height;
        this.width = width;
        this.old_x = x;
        this.old_y = y;
        this.animation = new Animation();;
        this.alive = true;
        this.frozen = false;
        this.hitted = false;
        this.hit_animation = new Animation();
        this.damage;
        this.player_change_position = true;

    }

    enemyCollision(){

        var tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((this.y + this.height) / game.world.tile_size);
        // hodnota indexu na ktorom je nepriatel
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


    hit() {

        if (this.frozen == false && game.player.shooting == true){

            for (var i=0 ; i < game.player.bullets.length ; i++){ // prejdeneie po poli nabojov hraca
                //ak naboj narazi do nepriatela
                if(game.player.bullets[i].x >= this.x && game.player.bullets[i].x <= this.x + this.width && game.player.bullets[i].y >= this.y && game.player.bullets[i].y <= this.y + this.height) { 

                    this.hitted = true
                    setTimeout(() => { this.hitted = false }, 300);
                    game.player.bullets.splice(i,1); //odstranenie z pola
                    game.hit.volume = 0.1;
                    game.hit.load();
                    game.hit.play();

                    if (this.lives != 0) this.lives-= this.damage; //-1 zivot

                }
            }
        }
    }

    dead(enemy){

        if(this.lives == 0){ // ak nema zivoty

            this.frozen=true;
            setTimeout(() => { this.alive = false ;}, 4000);

            /*if (this.old_x < this.x )  {

                if (enemy instanceof Ghost){

                    this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[6], 4, 6);  //zmena animacie

                }

                if (enemy instanceof Assassin){

                    this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[10], 4, 10);  //zmena animacie

                }

                if (enemy instanceof Attacker){

                    enemy.dead_animation = true;  

                }

            } else if (this.old_x > this.x ) {

                if (enemy instanceof Ghost){

                    this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7);   //zmena animacie
                }

                if (enemy instanceof Assassin){

                    this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[11], 4, 11);  //zmena animacie 
                }

                if (enemy instanceof Attacker){

                    enemy.dead_animation = true;     
                }

            } else  {

                this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7);//zmena animacie
                this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[11], 4, 11);  //zmena animacie
                enemy.dead_animation = true;  
                
            }*/

            if (enemy instanceof Ghost){
                if(this.animation.row == 0 ||this.animation.row == 2){
                    this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[6], 4, 6);//zmena animacie
                }
                if(this.animation.row == 1 ||this.animation.row == 3){
                    this.animation.changeFrame(game.enemy_sprite_sheet.frame_sets[7], 4, 7); //zmena animacie
                }
            }

            if (enemy instanceof Assassin){
                if(this.animation.row == 0 ||this.animation.row == 2 ||this.animation.row == 4 ||this.animation.row == 6 ||this.animation.row == 8){
                    this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[10], 4, 10);  //zmena animacie
                }
                if(this.animation.row == 1 ||this.animation.row == 3 || this.animation.row == 5 ||this.animation.row == 7 || this.animation.row == 9){
                    this.animation.changeFrame(game.assassin_sprite_sheet.frame_sets[11], 4, 11);  //zmena animacie  
                }
            }

            if (enemy instanceof Attacker){

                enemy.dead_animation = true;  

            }
        }
    }
}