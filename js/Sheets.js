class Sprite_sheet{
    constructor(frame_sets,image,size){
        this.frame_sets = frame_sets;
        this.image = image;
        this.size = size;
    }
}

class Tile_sheet{
    constructor(image,tile_height,tile_width,columns){
        this.image = image;
        this.tile_height = tile_height;
        this.tile_width = tile_width;
        this.columns = columns;
    }    
}