class Button {
    constructor(x,y,height,width,name){
        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.name = name
        this.fired = false;
    }

    click() {
        if(this.fired == false){
            if (game.controller.xtarget > this.x && game.controller.xtarget < this.x+this.width){
                if (game.controller.ytarget > this.y && game.controller.ytarget < this.y+this.height){
                    this.fired=true;
                    game.count=0;
                    game.story=false;
                    game.intro.pause();
                    game.start();      
                }
            }  
        } 
    }

    drawButton(){
        game.context.fillStyle = "black";
        game.context.fillRect(game.camera.offset[0]+this.x,game.camera.offset[1]+this.y,this.width, this.height);
        game.context.fillStyle = "white";
        game.context.fillText(this.name, this.x+7.5, this.y+this.height/2+5); 
    }
}