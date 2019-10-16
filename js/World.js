class World{
    constructor(){
        this.columns = 38;
        this.rows = 15;
        this.tile_size = 40;
        // [ 0=  right,top ] , [ 1= right ] , [ 2= top ] , [ 3= left , top ] , [ 4= left ] , [ 5 = ground ] , [ 6 = wall ] , [ 7 = wall with stripes ] , [ 8 = top,right,left ]
        this.map = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,6,3,2,2,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,6,6,6,3,4,5,5,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4,
                    1,7,7,7,4,5,5,5,1,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,7,7,7,7,7,7,7,4,
                    1,2,2,2,4,5,5,5,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,
                    5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
    }

    drawWorld(){
        game.context.fillStyle = "#000000";
        game.context.fillRect(0, 0, game.camera.screen[0], game.camera.screen[1]);
        
        /*for (let index = game.world.map.length - 1; index > -1; -- index) {
            game.context.fillStyle = (game.world.map[index] > 0)?("#0099" + game.world.map[index] + "f"):"#303840";
            game.context.fillRect((index % game.world.columns) * game.world.tile_size, Math.floor(index / game.world.columns) * game.world.tile_size, game.world.tile_size, game.world.tile_size);
        }*/



        for(var y = game.camera.startTile[1]; y < game.camera.endTile[1]; ++y)
        {
            for(var x = game.camera.startTile[0]; x < game.camera.endTile[0]; ++x)
            {
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

        game.context.font = '30px Courier New';
        game.context.fillStyle = "red";
        game.context.fillText(game.playername, 10, 30);  
        
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
            case 8 :
                    if (this.topCollision(object, row)) { return; }// you only want to do one
                    if (this.leftCollision(object, column)) { return; }// of these collision
                    this.rightCollision(object, column);// responses. that's why there are if statements     
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