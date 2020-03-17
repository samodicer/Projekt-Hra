class Button {
    constructor(x,y,height,width,text,id){
        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.text = text;
        this.id = id;
        this.fired = false;
    }

    click() {
        if(this.fired == false){
            if (game.controller.xtarget > this.x && game.controller.xtarget < this.x+this.width){
                if (game.controller.ytarget > this.y && game.controller.ytarget < this.y+this.height){
                    if (this.id == 1){
                        this.fired=true;
                        game.count=0;
                        game.story=false;
                        game.intro.pause();
                        game.start();      
                    }
                    if (this.id == 2){
                        this.fired=true;
                        location.reload();
                    }
                }
            }  
        } 
    }

    drawButton(){
        game.context.fillStyle = "black";
        game.context.fillRect(this.x,this.y,this.width, this.height);
        game.context.fillStyle = "white";
        game.context.fillText(this.text, this.x+8, this.y+this.height/2+5); 
    }
}