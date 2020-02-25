class Key {
    constructor(x,y,height,width){
        this.x =x;
        this.y=y;
        this.height = height;
        this.width = width;
        this.taken = false;
    }

    drawKey(){
        game.context.drawImage(game.findImage("key"), 0, 0, this.width, this.height, this.x+game.camera.offset[0],  this.y+game.camera.offset[1], this.width, this.height);
    }

}