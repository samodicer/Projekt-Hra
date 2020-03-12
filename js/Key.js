class Key {
    constructor(x,y,height,width,color){
        this.x =x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.taken = false;
        this.color = color;
    }

    drawKey(){
        if (this.color == "gold") game.context.drawImage(game.findImage("gold_key"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
        if (this.color == "green") game.context.drawImage(game.findImage("green_key"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
        if (this.color == "red") game.context.drawImage(game.findImage("red_key"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
    }

}