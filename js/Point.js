class Point {

    constructor(x,y,height,width){

        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.taken = false;
        this.showText = false;
        this.count = 0;

    }

    collectPoint(){

        if (game.player.overlapsObject(this) && this.taken == false){ //ak prejde cez bod

            this.taken = true;
            this.showText = true;
            game.player.points += 1; //prida hracovi bod
            game.point.volume = 0.1;
            game.point.load();
            game.point.play();  
            setTimeout(() => { this.showText = false }, 900);

        }
    }

    drawPoint(){
        //vykreslenie bodov
        if(this.taken == false){   

            game.context.drawImage(game.findImage("point"), 0, 0, 12, 12, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], 12, 12);

        }
        if (this.taken == true && this.showText == true){

            game.context.fillStyle = "#25cc51";
            this.count++;
            game.context.fillText("+1",this.x+game.camera.offset[0],this.y+game.camera.offset[1]-this.count);
            
        } else this.count = 0; 
    }


}