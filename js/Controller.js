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