class Computer {

    constructor(x,y,height,width){

        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.destroyed= false;
        this.lives = 20;
        this.explosion = false;
        this.animation = new Animation();

    }

    hit() {

        for (var i=0 ; i < game.player.bullets.length ; i++){ //prejdenie po poli nabojov hraca
            // ak naboj narazi na pocitac
            if(game.player.bullets[i].x >= this.x && game.player.bullets[i].x <= this.x + this.width && game.player.bullets[i].y >= this.y && game.player.bullets[i].y <= this.y + this.height) {    
                
                game.player.bullets.splice(i,1); //odstrani z pola
                game.hit.volume = 0.1;
                game.hit.load();
                game.hit.play();

                if (this.destroyed == false && this.lives > 0) this.lives-= 1; //poskodenie -1

                else if (this.destroyed == false){ //ak nieje zniceny 

                    this.explosion = true;
                    this.animation.changeFrame(game.explosion_sprite_sheet.frame_sets[0], 7, 0);//zmena animacie
                    this.destroyed = true ;
                    setTimeout(() => { this.explosion = false }, 600);
                    setTimeout(() => { game.ended = true }, 2000);

                } 
            }
        }

    }

    drawComputer(){  
        // vykreslenie pocitaca a explozii
        if(this.destroyed == true){

            game.context.drawImage(game.findImage("centralpc_destroyed"), 0, 0, 170, 166, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], 170, 166);

        } else game.context.drawImage(game.findImage("centralpc"), 0, 0, 170, 166, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], 170, 166);
        
        if (this.explosion == true){

            game.context.drawImage(game.explosion_sprite_sheet.image, this.animation.frame * 55, this.animation.row * 52 , 55, 52, game.camera.offset[0] + this.x+50, game.camera.offset[1] + this.y+50, 75, 72);
        
        } 
    }

    
}