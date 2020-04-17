class MovingObstacle extends Obstacle{

    constructor(x,y,height,width,damage,position,direction){

        super(x,y,height,width,damage,position);
        this.count = 0;
        this.left = true;
        this.right = false;
        this.direction = direction;

    }


    update(){
        
        if (this.direction == "l"){ //ak ma zacat pohyb vlavo

            if(this.count <= 100 && this.left == true) {

                this.count++;
                this.x--; // pohyb vlavo

            }else { // po urcitej dobe zemna strany

                this.left = false;
                this.right = true;

            }
            if(this.count >= 0 && this.right == true) {

                this.count--;
                this.x++; // pohyb vpravo

            }else { // po urcitej dobe zemna strany

                this.left = true;
                this.right = false;  

            }     

        } else if (this.direction == "r") {

            if(this.count <= 100 && this.right == true) {

                this.count++;
                this.x++; // pohyb vpravo

            }else { // po urcitej dobe zemna strany

                this.right = false;
                this.left = true;

            }
            if(this.count >= 0 && this.left == true) {

                this.count--;
                this.x--; // pohyb vlavo

            }else { // po urcitej dobe zemna strany

                this.right = true;
                this.left = false;  
                
            } 
        }

    }
}