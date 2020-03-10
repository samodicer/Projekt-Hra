class MovingObstacle extends Obstacle{

    constructor(x,y,height,width,damage,position,direction){
        super(x,y,height,width,damage,position);
        this.count = 0;
        this.left = true;
        this.right = false;
        this.direction = direction;
    }


    update(){
        
        if (this.direction == "l"){
            if(this.count <= 100 && this.left == true) {
                this.count++;
                this.x--;
            }else {
                this.left = false;
                this.right = true;
            }
            if(this.count >= 0 && this.right == true) {
                this.count--;
                this.x++;
            }else {
                this.left = true;
                this.right = false;  
            }     
        } else if (this.direction == "r") {

            if(this.count <= 100 && this.right == true) {
                this.count++;
                this.x++;
            }else {
                this.right = false;
                this.left = true;
            }
            if(this.count >= 0 && this.left == true) {
                this.count--;
                this.x--;
            }else {
                this.right = true;
                this.left = false;  
            } 
        }

    }
}