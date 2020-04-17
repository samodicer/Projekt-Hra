class DisappearingObstacle extends Obstacle{

    constructor(x,y,height,width,damage,position,time){

        super(x,y,height,width,damage,position);
        this.visible = true;
        this.time = time;

    }

    
    visibility(){
        //menenie viditelnosti
        if (this.visible == true){

            setTimeout(() => { this.visible = false }, this.time);

        } else {

            setTimeout(() => { this.visible = true }, this.time);
        
        }
    }   

}
