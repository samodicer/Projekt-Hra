let img1 = new Image();
img1.src = "./images/sprite.png";


class Game{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.context = canvas.getContext("2d");
        this.world = new World();
        this.player = new Player(100,300,0,0,62,62,false,100,300,new Animation());
        this.sprite_sheet = new Sprite_sheet([[0, 1, 2, 3], [4, 5, 6, 7] , [8, 9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22, 23]],img1,42);
        this.controller = new Controller();

    }

    start(){

        document.getElementById('menu').style.display="none";
        document.getElementById('canvas').style.display="block";
        window.addEventListener("keydown", game.controller.keyListener);
        window.addEventListener("keyup", game.controller.keyListener);
        game.canvas.addEventListener("click", game.controller.clickListener);
        game.canvas.addEventListener("mousemove", game.controller.mousemoveListener);
        window.requestAnimationFrame(game.loop);// Start the game loop.
        this.playername= document.getElementById('player_name').value;
    }

    loop(){
        game.player.moveLeft();
        game.player.moveRight();
        game.player.jump();
        game.player.idle();
        game.player.update();
        
        game.player.y_velocity += 0.8;// gravity
        game.player.old_x = game.player.x;
        game.player.old_y = game.player.y;
        game.player.x += game.player.x_velocity;
        game.player.y += game.player.y_velocity;
        game.player.x_velocity *= 0.9;// friction
        game.player.y_velocity *= 0.9;// friction

        game.player.offScreen();
       
        game.player.animation.update();

        game.world.drawWorld();
        game.player.drawPlayer();


        var tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        var tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        // get the value at the tile position in the map
        var value_at_index = game.world.map[tile_y * game.world.columns + tile_x];

        if (value_at_index != 0) {

            // simply call one of the routing functions in the collision object and pass
            // in values for the collision tile's location in grid/map space
            game.world.collision(value_at_index,game.player, tile_y, tile_x);
    
        }
        
        tile_x = Math.floor((game.player.x + game.player.width * 0.5) / game.world.tile_size);
        tile_y = Math.floor((game.player.y + game.player.height) / game.world.tile_size);
        value_at_index = game.world.map[tile_y * game.world.columns + tile_x];
  
        if (value_at_index != 0) {
  
            game.world.collision(value_at_index,game.player, tile_y, tile_x);
  
        }

        //console.log ( "tile_x: " + tile_x + "<br>tile_y: " + tile_y + "<br>map index: " + tile_y + " * " + game.world.columns + " + " + tile_x + " = " + String(tile_y * game.world.columns + tile_x) + "<br>tile value: " + game.world.map[tile_y * game.world.columns + tile_x] );
        window.requestAnimationFrame(game.loop);

    }

}

class World{
    constructor(){
        this.columns = 19;
        this.rows = 12;
        this.tile_size = 40;
        // [ 0=  no collision] , [ 1= right , top collision ] , [ 2= left , top collision ] , [ 3= only right collision ] , [ 4= top , left ,right collision ] , [ 5 = only top collision ]
        this.map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,5,0,5,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,
                    1,0,0,0,0,0,0,2,5,5,1,0,0,0,0,0,0,0,4,
                    3,0,0,4,5,5,5,5,5,5,3,0,2,4,0,0,4,0,4,
                    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
    }

    drawWorld(){
        for (let index = game.world.map.length - 1; index > -1; -- index) {
            game.context.fillStyle = (game.world.map[index] > 0)?("#0099" + game.world.map[index] + "f"):"#303840";
            game.context.fillRect((index % game.world.columns) * game.world.tile_size, Math.floor(index / game.world.columns) * game.world.tile_size, game.world.tile_size, game.world.tile_size);
          }
        game.context.font = '30px Courier New';
        game.context.fillStyle = "red";
        game.context.fillText(game.playername, 10, 30);  
        
    }

    collision(value_at_index,object,row,column){

        switch(value_at_index){
            case 1 :             
                    if (this.topCollision(object, row)) { return; }// if no top collision
                    this.rightCollision(object, column);           // try right side collision
                    break;
            case 2 :
                    if (this.topCollision(object, row)) { return; }
                    this.leftCollision(object, column);       
                    break;
            case 3 :
                    this.rightCollision(object, column);
                    break;
                    
            case 4 :         
                    if (this.topCollision(object, row)) { return; }// you only want to do one
                    if (this.leftCollision(object, column)) { return; }// of these collision
                    this.rightCollision(object, column);// responses. that's why there are if statements     
                    break;
            case 5 : 
                    this.topCollision(object, row);              
                    break;           


        }

    }

    leftCollision(object, column) {

        if (object.x_velocity > 0) {// If the object is moving right

          var left = column * game.world.tile_size;// calculate the left side of the collision tile

          if (object.x + object.width * 0.5 > left && object.old_x <= left) {// If the object was to the right of the collision object, but now is to the left of it

            object.x_velocity = 0;// Stop moving
            object.x = object.old_x = left - object.width * 0.5 - 0.001;// place object outside of collision
            // the 0.001 is just to ensure that the object is no longer in the same tile space as the collision tile
            // due to the way object tile position is calculated, moving the object to the exact boundary of the collision tile
            // would not move it out if its tile space, meaning that another collision with an adjacent tile might not be detected in another broad phase check

            return true;

          }

        }

        return false;

    }

    rightCollision(object, column) {

        if (object.x_velocity < 0) {

          var right = (column + 1) * game.world.tile_size;

          if (object.x + object.width * 0.5 < right && object.old_x + object.width * 0.5 >= right) {

            object.x_velocity = 0;
            object.old_x = object.x = right - object.width * 0.5;

            return true;

          }

        }

        return false;

      }

      topCollision(object, row) {

        if (object.y_velocity > 0) {

          var top = row * game.world.tile_size;

          if (object.y + object.height > top && object.old_y + object.height <= top) {

            object.jumping = false;
            object.y_velocity = 0;
            object.old_y = object.y = top - object.height - 0.01;

            return true;

          }

        }

        return false;

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

    constructor(x,y,x_velocity,y_velocity,height,width,jumping,old_x,old_y,animation){
        this.x = x;
        this.y= y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.height= height;
        this.width = width;
        this.jumping = jumping;
        this.old_x = old_x;
        this.old_y = old_y;
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
            game.player.animation.change(game.sprite_sheet.frame_sets[3], 7);
        
        }
    }

    moveRight(){
        
        if (game.controller.right) {
        
            game.player.x_velocity += 0.3;
            game.player.animation.change(game.sprite_sheet.frame_sets[2], 7);
        
        }
    }

    jump(){

        if (game.controller.up && game.player.jumping == false) {

            game.player.y_velocity -= 21;
            game.player.jumping = true;
        
        }
    }

    idle(){

        if (!game.controller.left && !game.controller.right) {
  
            if(game.controller.mousex > this.x+25 ) game.player.animation.change(game.sprite_sheet.frame_sets[0], 10);
            else game.player.animation.change(game.sprite_sheet.frame_sets[1], 10);
      
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
        var posX = this.x+25 - (game.controller.xtarget - rect.left);
        var posY = this.y+25 - (game.controller.ytarget - rect.top);

        let direction = Math.atan2(posX,posY);
        let dirX = Math.sin(direction);
        let dirY = Math.cos(direction);

        var b = new Bullet (this.x+25,this.y+25,dirX,dirY);

        this.bullets.push(b);
    }

    drawPlayer(){
        game.context.drawImage(game.sprite_sheet.image, game.player.animation.frame * 42, 0, 42, 42, Math.floor(game.player.x), Math.floor(game.player.y), 42+20, 42+20);
        game.context.drawImage(game.context.canvas, 0, 0, game.context.canvas.width, game.context.canvas.height, 0, 0, game.context.canvas.width, game.context.canvas.height);

        for (var i=0 ; i < this.bullets.length ; i++){
            this.bullets[i].drawBullet();
        }
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
        game.context.fillStyle = "red";
        game.context.arc(this.x, this.y, 3, 0, 2*Math.PI);
        game.context.fill();
        game.context.closePath();
    }

    updateBullet(){
        this.x -=  this.dx * this.speed;
        this.y -= this.dy * this.speed;

        if(this.x < 0 || this.x > game.canvas.width || this.y < 0 || this.y > game.canvas.height){
            return false
        } else return true;
    
    }
}

class Controller{
    constructor(){
        this.left= false;
        this.right = false;
        this.up = false;
        this.xtarget=0;
        this.ytarget=0;
        this.mousex = 500;
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
        game.controller.xtarget = event.x;
        game.controller.ytarget = event.y;
        game.player.shoot();
    }

    mousemoveListener = function(event) {
        var rect = game.canvas.getBoundingClientRect();
        game.controller.mousex = event.clientX - rect.left;
    }


    
}

