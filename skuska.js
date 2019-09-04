let img1 = new Image();
img1.src = "sprite.png";


class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.buffer = document.createElement("canvas").getContext("2d");
        this.display = document.createElement("canvas").getContext("2d");
        this.player = new Player(100,100,0,0,62,62,false,new Animation());
        this.sprite_sheet = new Sprite_sheet([[0, 1, 2, 3], [4, 5, 6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17, 18, 19]],img1,42);
        this.controller = new Controller();
        this.floor = new Floor(450,460,10,90,"#edb51c");
        this.floor2 = new Floor(380,390,10,60,"#edb51c");
    }

    loop(){

        game.player.moveLeft();
        game.player.moveRight();
        game.player.jump();
        game.player.idle();

        game.player.update();
        
        game.player.y_velocity += 1.0;// gravity
        game.player.x += game.player.x_velocity;
        game.player.y += game.player.y_velocity;
        game.player.x_velocity *= 0.9;// friction
        game.player.y_velocity *= 0.9;// friction

        game.player.onGroud();
        game.player.offScreen();
    
          
        game.player.animation.update();

        game.floor.drawFloor();
        game.player.drawPlayer();

        if (game.player.collision(game.floor) == true) { 
            console.log("KOLIZIA");
        } 
        
        if (game.player.collision(game.floor2) == true) { 
            console.log("KOLIZIA2");
        } 

        window.requestAnimationFrame(game.loop);

    }

}

class Animation{
    constructor(frame_set , delay){
        this.count = 0;
        this.delay = delay;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = frame_set;
    }

    change(frame_set, delay = 15){
        if (this.frame_set != frame_set) {// If the frame set is different:

            this.count = 0;// Reset the count.
            this.delay = delay;// Set the delay.
            this.frame_index = 0;// Start at the first frame in the new frame set.
            this.frame_set = frame_set;// Set the new frame set.
            this.frame = this.frame_set[this.frame_index];// Set the new frame value.
      
        }
    }

    update(){
        this.count ++;// Keep track of how many cycles have passed since the last frame change.

        if (this.count >= this.delay) {// If enough cycles have passed, we change the frame.
    
          this.count = 0;// Reset the count.
          /* If the frame index is on the last value in the frame set, reset to 0.
          If the frame index is not on the last value, just add 1 to it. */
          this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
          this.frame = this.frame_set[this.frame_index];// Change the current frame value.
    
        }
    }


}

class Sprite_sheet{
    constructor(frame_sets,image,size){
        this.frame_sets = frame_sets;
        this.image = image;
        this.size = size;
    }
}

class Player{

    constructor(x,y,x_velocity,y_velocity,height,width,jumping,animation){
        this.x = x;
        this.y= y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.height= height;
        this.width = width;
        this.jumping = jumping;
        this.animation = animation;
        this.bullets= [];
    }

    get bottom() { 
        return this.y + this.height;
    }
    get left() { 
        return this.x;
    }
    get right() { 
        return this.x + this.width;
    }
    get top() { 
        return this.y;
    }

    update(){
        for (var i=0 ; i < this.bullets.length ; i++){
            if(!this.bullets[i].updateBullet()){
                this.bullets.splice(i,1);
            }
        }
    }

    collision(object){
        if ((game.player.top > object.bottom || game.player.right < object.left || game.player.bottom < object.top || game.player.left > object.right)) {
 
            return false;
      
        }
      
        else return true;
    }

    moveLeft(){

        if (game.controller.left) {
      
            game.player.x_velocity -= 0.3;
            game.player.animation.change(game.sprite_sheet.frame_sets[2], 7);
        
        }
    }

    moveRight(){
        
        if (game.controller.right) {
        
            game.player.x_velocity += 0.3;
            game.player.animation.change(game.sprite_sheet.frame_sets[1], 7);
        
        }
    }

    jump(){

        if (game.controller.up && game.player.jumping == false) {

            game.player.y_velocity -= 17;
            game.player.jumping = true;
        
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right) {
  
            game.player.animation.change(game.sprite_sheet.frame_sets[0], 10);
      
        }
    }

    onGroud(){

        if (game.player.y > 500 - 20-40) {
        
            game.player.jumping = false;
            game.player.y = 500- 20-40;
            game.player.y_velocity = 0;
        
          }
    }

    offScreen(){
                
        if (game.player.x < -32) {
        
            game.player.x = 800;
        
        } else if (game.player.x > 800) {// if player goes past right boundary
        
            game.player.x = -32;
        
        }
    }

    shoot(){

        var rect = game.canvas.getBoundingClientRect();
        var posX = this.x+35 - (game.controller.xtarget - rect.left);
        var posY = this.y+20 - (game.controller.ytarget - rect.top);

        let direction = Math.atan2(posX,posY);
        let dirX = Math.sin(direction);
        let dirY = Math.cos(direction);

        var b = new Bullet (this.x+35,this.y+20,dirX,dirY);

        this.bullets.push(b);
    }

    drawPlayer(){
        game.context.drawImage(game.sprite_sheet.image, game.player.animation.frame * 42, 0, 42, 42, Math.floor(game.player.x), Math.floor(game.player.y), 42+20, 42+20);
        game.display.drawImage(game.buffer.canvas, 0, 0, game.buffer.canvas.width, game.buffer.canvas.height, 0, 0, game.display.canvas.width, game.display.canvas.height);

        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet();
        }
    }

}

class Floor{
    constructor(x,y,height,width,color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    get bottom() { 
        return this.y + this.height;
    }
    get left() { 
        return this.x;
    }
    get right() { 
        return this.x + this.width;
    }
    get top() { 
        return this.y;
    }

    drawFloor(){
        game.context.fillStyle = "#202020"; // bg 
        game.context.fillRect(0, 0, 800, 500);// bg
        game.context.fillStyle = game.floor.color;
        game.context.beginPath();
        game.context.rect(game.floor.x, game.floor.y, game.floor.width, game.floor.height);
        game.context.fill();
        game.context.closePath();
        game.context.beginPath();
        game.context.rect(game.floor2.x, game.floor2.y, game.floor2.width, game.floor2.height);
        game.context.fill();
        game.context.closePath();
    }

}

class Bullet{
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 10;
    }

    drawBullet(){
        game.context.beginPath();
        game.context.arc(this.x, this.y, 3, 0, 2*Math.PI);
        game.context.fill();
        game.context.closePath();
    }

    updateBullet(){
        this.x -=  this.dx * this.speed;
        this.y -= this.dy * this.speed;

        if (this.collision(game.floor) == true) { 
            console.log("bum");
        } 

        if(this.x < 0 || this.x > game.canvas.width || this.y < 0 || this.y > game.canvas.height){
            return false
        } else return true;
    
    }

    collision(object){
        if ((this.y > object.bottom || this.x < object.left || this.y < object.top || this.x > object.right)) {
 
            return false;
      
        }
      
        else return true;
    }
}

class Controller{
    constructor(){
        this.left= false;
        this.right = false;
        this.up = false;
        this.click=false;
        this.xtarget=0;
        this.ytarget=0;
    }


    keyListener = function(event) {
        var answer = (event.type == "keydown")?true:false;

        switch(event.keyCode) {
    
          case 65 :// left key
            game.controller.left = answer;
          break;

          case  87:// up key
            game.controller.up = answer;
          break;

          case  68:// right key
            game.controller.right = answer;
          break;
        }
    }

    clickListener = function(event) {
        game.controller.click = true;
        game.controller.xtarget = event.x;
        game.controller.ytarget = event.y;
        game.player.shoot();
    }

    
}

let game = new Game();

window.addEventListener("keydown", game.controller.keyListener);
window.addEventListener("keyup", game.controller.keyListener);
game.canvas.addEventListener("click", game.controller.clickListener);


img1.addEventListener("load", function(event) {// When the load event fires, do this:

    window.requestAnimationFrame(game.loop);// Start the game loop.
  
});
