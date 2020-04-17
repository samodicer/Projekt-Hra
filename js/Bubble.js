class Bubble {

    constructor(id){

        this.id = id;
        this.hidden = true;
        this.fired = false;

    }

    update(){
        // ak sa hrac dostane do urcitej pozicie nastav bubline premnnu hidden na false
        if(this.id == 1){ 

            if(game.player.x > 200 && game.player.y > 250 && this.fired == false) {

                this.hidden = false;
                this.fired = true;
                setTimeout(() => { this.hidden = true }, 4000);

            }
        }else if (this.id == 2){

            if(game.player.x > 1730 && game.player.y < 250 && this.fired == false) {

                this.hidden = false;
                this.fired = true;
                setTimeout(() => { this.hidden = true }, 3000);

            }
        }else if (this.id == 3){

            if(game.player.x > 3100 && game.player.y > 400 && this.fired == false) {

                this.hidden = false;
                this.fired = true;
                setTimeout(() => { this.hidden = true }, 3000);

            }
        }else if (this.id == 4){

            if(game.player.x > 4050 && game.player.y > 500 && this.fired == false && game.player.has_green_key == false && game.door2.open == false) {

                this.hidden = false;
                this.fired = true;
                setTimeout(() => { this.hidden = true }, 3000);

            }
        }else if (this.id == 5){

            if(game.player.x > 4190 && game.player.y > 500 && this.fired == false && game.player.has_green_key == false && game.door2.open == false) {

                this.hidden = false;
                this.fired = true;
                setTimeout(() => { this.hidden = true }, 3000);

            }
        }else if (this.id == 6){

            if(game.player.x > 5260 && game.player.y > 500 && this.fired == false && game.player.has_green_key == false && game.door2.open == false) {

                this.hidden = false;
                this.fired = true;
                setTimeout(() => { this.hidden = true }, 3000);

            }
        }
    }

    drawBubble(){
        //vykreslenie bublin polda viditelnosti a id
        if(this.hidden == false){

            var x = game.player.x + 70;
            var y = game.player.y - 50;

            if(this.id==1){

                game.context.drawImage(game.findImage("bubble1"), 0, 0, 200, 100, game.camera.offset[0] +x, game.camera.offset[1] +y, 150, 75);
            
            }

            if(this.id==2){

                game.context.drawImage(game.findImage("bubble2"), 0, 0, 200, 100, game.camera.offset[0] +x, game.camera.offset[1] +y, 150, 75);
            
            }

            if(this.id==3){

                game.context.drawImage(game.findImage("bubble3"), 0, 0, 200, 100, game.camera.offset[0] +x, game.camera.offset[1] +y, 150, 75);
            
            }

            if(this.id==4){

                game.context.drawImage(game.findImage("bubble4"), 0, 0, 200, 100, game.camera.offset[0] +x, game.camera.offset[1] +y, 150, 75);
            
            }

            if(this.id==5){

                game.context.drawImage(game.findImage("bubble5"), 0, 0, 200, 100, game.camera.offset[0] +x, game.camera.offset[1] +y, 150, 75);
            
            }

            if(this.id==6){

                game.context.drawImage(game.findImage("bubble6"), 0, 0, 200, 100, game.camera.offset[0] +x, game.camera.offset[1] +y, 150, 75);
            
            }

        }
    }
}