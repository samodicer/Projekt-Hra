

var context , canvas , loop, player ,controller,floor,sprite_sheet;
const SPRITE_SIZE = 42;


canvas =  document.querySelector("canvas")
context = canvas.getContext("2d");

var buffer = document.createElement("canvas").getContext("2d");
var display = document.querySelector("canvas").getContext("2d");

var Animation = function(frame_set,delay){
  this.count = 0;// Counts the number of game cycles since the last frame change.
  this.delay = delay;// The number of game cycles to wait until the next frame change.
  this.frame = 0;// The value in the sprite sheet of the sprite image / tile to display.
  this.frame_index = 0;// The frame's index in the current animation frame set.
  this.frame_set = frame_set;// The current animation frame set that holds sprite tile values.
}
Animation.prototype = {

  change: function(frame_set, delay = 15) {

    if (this.frame_set != frame_set) {// If the frame set is different:

      this.count = 0;// Reset the count.
      this.delay = delay;// Set the delay.
      this.frame_index = 0;// Start at the first frame in the new frame set.
      this.frame_set = frame_set;// Set the new frame set.
      this.frame = this.frame_set[this.frame_index];// Set the new frame value.

    }
  },

  update: function() {

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

player = {
     animation:new Animation(),
     height: 62,
     width: 62,
     jumping: true,
     x: 300,
     y: 200,
     x_velocity:0,
     y_velocity:0,
     get bottom() { return this.y + this.height; },
     get left() { return this.x; },
     get right() { return this.x + this.width; },
     get top() { return this.y; },
};

floor = {
     height:10,
     width:90,
     x:450,
     y:460,
     color: "#edb51c",
     get bottom() { return this.y + this.height; },
     get left() { return this.x; },
     get right() { return this.x + this.width; },
     get top() { return this.y; },
}

controller = {
     left: false,
     right: false,
     up: false,
     keyListener:function(event) {

          var answer = (event.type == "keydown")?true:false;
      
          switch(event.keyCode) {
      
            case 65 :// left key
              controller.left = answer;
            break;
            case  87:// up key
              controller.up = answer;
            break;
            case  68:// right key
              controller.right = answer;
            break;
          }
     },

}

sprite_sheet = {

  frame_sets:[[0, 1, 2, 3], [4, 5, 6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17, 18, 19]],// standing still, walk right, walk left
  image:new Image()

};


collision = function() {
   
     if (player.top > floor.bottom || player.right < floor.left || player.bottom < floor.top || player.left > floor.right) {
 
       return false;
 
     }
 
     return true;
}


loop = function() {
     if (controller.up && player.jumping == false) {

          player.y_velocity -= 17;
          player.jumping = true;
      
        }
      
        if (controller.left) {
      
          player.x_velocity -= 0.3;
          player.animation.change(sprite_sheet.frame_sets[2], 7);
      
        }
      
        if (controller.right) {
      
          player.x_velocity += 0.3;
          player.animation.change(sprite_sheet.frame_sets[1], 7);
      
        }

        if (!controller.left && !controller.right) {

          player.animation.change(sprite_sheet.frame_sets[0], 10);
    
        }
      
        player.y_velocity += 1.0;// gravity
        player.x += player.x_velocity;
        player.y += player.y_velocity;
        player.x_velocity *= 0.9;// friction
        player.y_velocity *= 0.9;// friction
      
        // if player is falling below floor 
        if (player.y > 500 - 20-40) {
      
          player.jumping = false;
          player.y = 500- 20-40;
          player.y_velocity = 0;
      
        }
      
        // if player is going off the left of the screen
        if (player.x < -32) {
      
          player.x = 800;
      
        } else if (player.x > 800) {// if player goes past right boundary
      
          player.x = -32;
      
     }

     player.animation.update();

     render();

     changeCollor();

     if (collision() == true) { 
          var color;
          color =  player.color
          player.color = floor.color
          floor.color = color;
     } 

     window.requestAnimationFrame(loop);
}

render = function(){
  context.fillStyle = "#202020";
  context.fillRect(0, 0, 800, 500);// x, y, width, height
  context.fillStyle = floor.color;
  context.beginPath();
  context.rect(floor.x, floor.y, floor.width, floor.height);
  context.fill();
  /*context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();*/

  context.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE+20, SPRITE_SIZE+20);

  display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);
}


changeCollor = function(){

  if (collision() == true) { 
    floor.color =  "#16ccf5";
  } 

}

sprite_sheet.image.src = "sprite.png";


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);

sprite_sheet.image.addEventListener("load", function(event) {// When the load event fires, do this:

  window.requestAnimationFrame(loop);// Start the game loop.

});
