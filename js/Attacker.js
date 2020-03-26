class Attacker extends Enemy{

    constructor(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation){

        super(x,y,x_velocity,y_velocity,height,width,old_x,old_y,animation);
        this.damage = 1;
        this.lives = 4;
        this.left = true;
        this.right = false;
        this.dead_animation = false;
        this.count=0;
        this.bullets= [];
        this.shooting = false;
        this.delay=0;

    }
    
    moveLeft(){

        if(this.alive == true && this.frozen == false) {

            this.x_velocity -= 0.2;

        }

    }

    moveRight(){

        if(this.alive == true && this.frozen == false) {

            this.x_velocity += 0.2;

        }

    }

    idle() {

        this.x_velocity = 0;  

    }

    behavior(){

        this.animation.updateExplosion();
        this.checkShooting();
        this.bulletCollision();
        this.updateBullets();
        this.bulletDamage()
        var enemy_tile_x = Math.floor((this.x + this.width * 0.5) / game.world.tile_size);
        var enemy_tile_y = Math.floor((this.y + this.height* 0.5) / game.world.tile_size);
        var check_left_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1];
        var check_right_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1];
        var check_left_down_index = game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)-1 + game.world.columns];
        var check_right_down_index= game.world.map[(enemy_tile_y * game.world.columns + enemy_tile_x)+1 + game.world.columns];
        var rounded_playerx = Math.round(game.player.x);
        var rounded_enemyx = Math.round(this.x);
        var rounded_player_y = Math.round(game.player.y + game.player.height);
        var rounded_enemy_y = Math.round(this.y +this.height);

        if(check_left_index == 6 && check_left_down_index != 6 && this.left == true) {

            this.moveLeft();

        }else {

            this.left = false;
            this.right = true;

        }
        if(check_right_index == 6 && check_right_down_index != 6 && this.right == true) {

            this.moveRight();

        }else {

            this.left = true;
            this.right = false;  

        } 

        if (rounded_player_y < rounded_enemy_y+50 && rounded_player_y > rounded_enemy_y-50){

            if(!(rounded_playerx < rounded_enemyx +10 && rounded_playerx > rounded_enemyx-10 )){

                let distance;
                if(Math.round(game.player.x) > Math.round(this.x)){

                    distance = game.player.x - this.x;

                } else if (Math.round(game.player.x) < Math.round(this.x)) {

                    distance = this.x - game.player.x;

                } else distance = 0;

                if ( distance > 50 &&  distance < 600){

                    this.shoot();   

                }
            }
        }

        if(this.dead_animation == true) {

            this.animation.changeFrame(game.explosion_sprite_sheet.frame_sets[0], 7, 0);  

        }
    }

    shoot(){

        this.delay++;

        if (this.alive == true && this.frozen == false && game.player.frozen == false && game.player.alive == true && this.delay > 50){

            var b = new Bullet (this.x+this.width/2+20,this.y+this.height-25,"right");
            this.bullets.push(b);
            var b = new Bullet (this.x+this.width/2-40,this.y+this.height-25,"left");
            this.bullets.push(b); 
            var b = new Bullet (this.x+this.width/2+20,this.y+this.height-45,"right");
            this.bullets.push(b);
            var b = new Bullet (this.x+this.width/2-40,this.y+this.height-45,"left");
            this.bullets.push(b);
            game.assassin_shot.volume = 0.05;
            game.assassin_shot.play();
            this.delay =0;

        }
    }

    bulletDamage(){

        if (game.player.frozen == false && this.shooting == true){

            for (var i=0 ; i < this.bullets.length ; i++){

                if(this.bullets[i].x >= game.player.x && this.bullets[i].x <= game.player.x + game.player.width && this.bullets[i].y >= game.player.y && this.bullets[i].y <= game.player.y + game.player.height) {    
                    
                    game.player.hitted = true
                    setTimeout(() => { game.player.hitted = false }, 300);
                    this.bullets.splice(i,1); 
                    game.hit.volume = 0.1;
                    game.hit.load();
                    game.hit.play();

                    if (game.player.lives != 0) game.player.lives-= 1;

                }
            }
        }
    }

    bulletCollision(){

        if(this.shooting == true) {

            var to_delete ;

            for (var i=0 ; i < this.bullets.length ; i++){

                var tile_x = Math.floor((this.bullets[i].x ) / game.world.tile_size);
                var tile_y = Math.floor((this.bullets[i].y) / game.world.tile_size);
                // get the value at the tile position in the map
                var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
                
                if (value_at_index != 6 ) {

                    to_delete = i;

                }    

            }

            if (typeof to_delete !== 'undefined'){

                this.bullets.splice(to_delete,1); 

            }
        
        }
    }

    updateBullets(){

        for (var i=0 ; i < this.bullets.length ; i++){

            this.bullets[i].updateBullet();
        }
    }

    checkShooting(){

        if (this.bullets.length == 0) this.shooting = false;
        else this.shooting = true;

    }


    drawEnemy(){

        game.context.fillStyle = "green";

        if(this.dead_animation == false){

            game.context.drawImage(game.findImage("attacker"), 0, 0 , 100, 100, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y, 80, 105);

        }else {

            this.count= this.count + 2;

            if (this.count <= 10 ){

                game.context.drawImage(game.findImage("attacker"), 0, 0 , 100, 100, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y+this.count, 80, 105); 

            } else game.context.drawImage(game.findImage("attacker"), 0, 0 , 100, 100, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y+10, 80, 105);

        }

        for (var i=0 ; i < this.bullets.length ; i++){

            this.bullets[i].drawBullet(this);

        }

        if(this.lives == 4){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+5,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "green";
            game.context.fillRect(game.camera.offset[0]+this.x+6,game.camera.offset[1]+this.y-9,38,2);

        }else if (this.lives == 3){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+5,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "yellow";
            game.context.fillRect(game.camera.offset[0]+this.x+6,game.camera.offset[1]+this.y-9,28,2);

        }else if (this.lives == 2){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+5,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "orange";
            game.context.fillRect(game.camera.offset[0]+this.x+6,game.camera.offset[1]+this.y-9,18,2);

        }else if (this.lives == 1){

            game.context.fillStyle = "black";
            game.context.fillRect(game.camera.offset[0]+this.x+5,game.camera.offset[1]+this.y-10,40,4);
            game.context.fillStyle = "red";
            game.context.fillRect(game.camera.offset[0]+this.x+6,game.camera.offset[1]+this.y-9,8,2);

        }

        if(this.hitted == true){

            this.hit_animation.changeFrame(game.hit_sprite_sheet.frame_sets[0], 3, 0);
            game.context.drawImage(game.hit_sprite_sheet.image, this.hit_animation.frame * 50, this.hit_animation.row * 50 , 50, 50, game.camera.offset[0] + this.x, game.camera.offset[1] + this.y+30, 50, 50);    
        
        }
 
        if(this.dead_animation == true){

            if(this.count < 50) game.context.drawImage(game.explosion_sprite_sheet.image, this.animation.frame * 55, this.animation.row * 52 , 55, 52, game.camera.offset[0] + this.x-15, game.camera.offset[1] + this.y+30, 75, 72);
        
        }
    }
}