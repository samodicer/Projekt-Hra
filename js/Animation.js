class Animation{
    constructor(){
        this.delay = 0;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = 0;
        this.row = 0;
        this.count = 0;
        this.count2 = 0;
        this.count3 = 0;
        this.count4 = 0;
        this.count5 = 0;
    }

    changePlayerFrame(frame_set, delay, row){
        if (this.frame_set != frame_set) {// If the frame set is different:
            if( (this.row == 10 ) && (row == 0) ){
                this.count2++
                if(this.count2==40){
                    this.count2 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.row = row;
                }
            }else if( (this.row == 11) && (row == 1) ) {
                this.count3++
                if(this.count3==40){
                    this.count3 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.row = row;
                }
            }else if( (this.row == 8 ) && (row == 4) ) {
                this.count4++

                if(this.count4==40){
                    this.count4 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.row = row;
                }
            }else if( (this.row == 9) && (row == 5) ) {
                this.count5++

                if(this.count5==40){
                    this.count5 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.row = row;
                }
            }else {
                this.count = 0;// Reset the count.
                this.delay = delay;// Set the delay.
                this.frame_index = 0;// Start at the first frame in the new frame set.
                this.frame_set = frame_set;// Set the new frame set.
                this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                this.row = row;
            }
      
        }
    }

    changeFrame(frame_set, delay , row){
        if (this.frame_set != frame_set) {
            this.count = 0;// Reset the count.
            this.delay = delay;// Set the delay.
            this.frame_index = 0;// Start at the first frame in the new frame set.
            this.frame_set = frame_set;// Set the new frame set.
            this.frame = this.frame_set[this.frame_index];// Set the new frame value.
            this.row = row;
        }
    }

    update(object){
        this.count ++;// Keep track of how many cycles have passed since the last frame change.
        
        if (this.count >= this.delay) {// If enough cycles have passed, we change the frame.
          this.count = 0;// Reset the count.
          /* If the frame index is on the last value in the frame set, reset to 0.
          If the frame index is not on the last value, just add 1 to it. */
          if(object.frozen == true) {
            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? this.frame_index : this.frame_index + 1;   
          }else {
            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
          }
          this.frame = this.frame_set[this.frame_index];// Change the current frame value.
    
        }
    }

    updateHit(enemy,player){
        this.count ++;// Keep track of how many cycles have passed since the last frame change.

        if (this.count >= this.delay) {// If enough cycles have passed, we change the frame.
          this.count = 0;// Reset the count.
          /* If the frame index is on the last value in the frame set, reset to 0.
          If the frame index is not on the last value, just add 1 to it. */
          if (enemy.hitted == true || player.hitted == true ){
            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;  
          } else this.frame_index =0;
          this.frame = this.frame_set[this.frame_index];// Change the current frame value.
        }   
    }




}

