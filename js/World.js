class World{

    constructor(){

        this.columns = 126;
        this.rows = 16;
        this.tile_size = 50;
        // [ 0=  right,top ] , [ 1= right ] , [ 2= top ] , [ 3= left , top ] , [ 4= left ] , [ 5 = ground ] , [ 6 = wall ] , [ 7 = top left corner ] , [ 8 = top right corner ]
        this.map = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,4,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,4,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,3,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,4,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,2,0,6,6,6,6,6,6,6,6,6,6,6,4,1,6,6,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,8,2,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,3,2,4,5,5,1,6,6,6,6,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,5,1,6,6,6,6,3,2,2,2,2,0,6,6,6,4,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,8,2,2,2,2,0,6,6,6,6,6,6,6,6,4,5,4,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,4,1,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,2,2,2,2,2,2,2,2,2,2,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,3,4,5,4,5,5,8,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,3,4,1,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,3,2,2,7,5,4,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,4,1,2,2,2,2,2,2,2,2,2,2,2,0,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,3,0,6,6,6,6,6,6,6,6,6,6,6,3,2,2,0,6,6,6,6,6,6,4,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,3,2,2,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,3,2,0,6,6,4,1,5,5,5,5,5,5,5,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,3,2,2,2,2,2,2,0,6,6,6,6,3,2,0,6,6,6,6,6,6,6,6,6,6,6,4,5,5,5,5,1,2,0,6,6,6,6,6,6,6,3,2,0,6,6,4,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,4,1,5,5,5,5,5,5,5,5,5,5,5,8,2,2,2,2,2,2,2,2,2,0,6,6,4,
                    1,6,6,6,6,3,2,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,3,7,5,1,6,6,6,6,6,6,6,6,6,6,6,4,5,5,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,5,5,1,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,5,1,6,6,6,3,2,0,6,6,6,6,6,6,6,4,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,3,7,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,3,7,5,5,1,6,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,3,2,2,0,6,6,6,6,6,6,6,4,5,5,5,1,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,3,4,
                    1,6,6,6,4,5,5,5,1,0,6,6,6,6,6,6,6,6,6,6,6,4,5,5,5,1,0,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,4,5,5,1,6,6,6,6,6,6,6,4,5,5,5,1,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,6,6,6,6,6,3,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,4,
                    8,2,2,2,7,5,5,5,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,
                    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
    
    }

    drawWorld(){

        game.context.fillStyle = "#C7C7C7";
        game.context.fillRect(0, 0, game.camera.screen[0], game.camera.screen[1]);

        for(var y = game.camera.startTile[1]; y < game.camera.endTile[1]; ++y){

            for(var x = game.camera.startTile[0]; x < game.camera.endTile[0]; ++x){

              var value = game.world.map[((y*game.world.columns)+x)];
              /* This is the x and y location at which to cut the tile image out of the
              tile_sheet.image. */
              var source_x = (value % game.tile_sheet.columns) * game.tile_sheet.tile_width;
              var source_y = Math.floor(value / game.tile_sheet.columns) * game.tile_sheet.tile_height;
              /* This is the x and y location at which to draw the tile image we are cutting
              from the tile_sheet.image to the buffer canvas. */
              var destination_x = (((y*game.world.columns)+x) % game.world.columns) * game.tile_sheet.tile_width;
              var destination_y = Math.floor(((y*game.world.columns)+x) / game.world.columns) * game.tile_sheet.tile_height;
    
              game.context.drawImage(game.tile_sheet.image, source_x, source_y, game.tile_sheet.tile_width, game.tile_sheet.tile_height,game.camera.offset[0]+destination_x, game.camera.offset[1]+destination_y, game.tile_sheet.tile_width, game.tile_sheet.tile_height);   
            
            }
        }

        game.context.drawImage(game.findImage("table"), 0, 0, 150, 100, 100+game.camera.offset[0],  250+game.camera.offset[1], 150, 100);
        game.context.drawImage(game.findImage("table"), 0, 0, 150, 100, 2600+game.camera.offset[0],  600+game.camera.offset[1], 150, 100);
        game.context.drawImage(game.findImage("plant"), 0, 0, 50, 80, 250+game.camera.offset[0],  278+game.camera.offset[1], 50, 80);
        game.context.drawImage(game.findImage("plant"), 0, 0, 50, 80, 1000+game.camera.offset[0],  178+game.camera.offset[1], 50, 80);
        game.context.drawImage(game.findImage("plant"), 0, 0, 50, 80, 2500+game.camera.offset[0],  628+game.camera.offset[1], 50, 80);
        game.context.drawImage(game.findImage("plant"), 0, 0, 50, 80, 6000+game.camera.offset[0],  128+game.camera.offset[1], 50, 80);
        game.context.drawImage(game.findImage("plant"), 0, 0, 50, 80, 5275+game.camera.offset[0],  578+game.camera.offset[1], 50, 80);
        game.context.drawImage(game.findImage("trashcan"), 0, 0, 40, 50, 52+game.camera.offset[0],  300+game.camera.offset[1], 40, 50);
        game.context.drawImage(game.findImage("trashcan"), 0, 0, 40, 50, 1450+game.camera.offset[0],  650+game.camera.offset[1], 40, 50);
        game.context.drawImage(game.findImage("trashcan"), 0, 0, 40, 50, 2050+game.camera.offset[0],  300+game.camera.offset[1], 40, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 132+game.camera.offset[0],  190+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 700+game.camera.offset[0],  570+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 1550+game.camera.offset[0],  550+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 1150+game.camera.offset[0],  80+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 1280+game.camera.offset[0],  80+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 2070+game.camera.offset[0],  180+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 2625+game.camera.offset[0],  320+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 5525+game.camera.offset[0],  290+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("window"), 0, 0, 100, 50, 4480+game.camera.offset[0],  370+game.camera.offset[1], 100, 50);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 330+game.camera.offset[0],  260+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 390+game.camera.offset[0],  260+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 1500+game.camera.offset[0],  612+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 1555+game.camera.offset[0],  612+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 1610+game.camera.offset[0],  612+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 1665+game.camera.offset[0],  612+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 5200+game.camera.offset[0],  310+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 5250+game.camera.offset[0],  310+game.camera.offset[1], 50, 90);
        game.context.drawImage(game.findImage("cardrepertory"), 0, 0, 50, 90, 5300+game.camera.offset[0],  310+game.camera.offset[1], 50, 90);

    }

    collision(value_at_index,object,row,column){

        switch(value_at_index){  

            case 0 :   
                    if (this.topCollision(object, row)) { return; }// if no top collision
                    this.rightCollision(object, column);           // try right side collision
                    break;  

            case 1 :    
                    this.rightCollision(object, column);
                    break;      

            case 2 :  
                    this.topCollision(object, row);              
                    break;     

            case 3 :
                    if (this.topCollision(object, row)) { return; }
                    this.leftCollision(object, column);       
                    break;

            case 4 :
                    this.leftCollision(object, column);             
                    break;  

            case 7 :
                    if (this.topCollision(object, row)) { return; }
                    this.leftCollision(object, column);       
                    break;  

            case 8 :
                    if (this.topCollision(object, row)) { return; }
                    this.rightCollision(object, column);           
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

          var right = (column + 1) * game.world.tile_size ;

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