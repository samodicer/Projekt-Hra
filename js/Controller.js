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
    
          case 65 :// A
            game.controller.left = answer;
          break;

          case  87:// W
            game.controller.up = answer;
          break;

          case  68:// S
            game.controller.right = answer;
          break;

          case  37:// left arrow
          game.controller.left = answer;
          break;

          case  38:// up arrow
          game.controller.up = answer;
          break;

          case  39:// right arrow
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