class Animation{
    constructor(){
        this.delay = 0;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = 0;
        this.column = 0;
        this.count = 0;
        this.count2 = 0;
        this.count3 = 0;
        this.count4 = 0;
        this.count5 = 0;
    }

    change(frame_set, delay = 15, column){
        if (this.frame_set != frame_set) {// If the frame set is different:
            if( (this.column == 10 ) && (column == 0) ){
                this.count2++
                if(this.count2==40){
                    this.count2 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.column = column;
                }
            }else if( (this.column == 11) && (column == 1) ) {
                this.count3++
                if(this.count3==40){
                    this.count3 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.column = column;
                }
            }else if( (this.column == 8 ) && (column == 4) ) {
                this.count4++

                if(this.count4==40){
                    this.count4 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.column = column;
                }
            }else if( (this.column == 9) && (column == 5) ) {
                this.count5++

                if(this.count5==40){
                    this.count5 =0;
                    this.count = 0;// Reset the count.
                    this.delay = delay;// Set the delay.
                    this.frame_index = 0;// Start at the first frame in the new frame set.
                    this.frame_set = frame_set;// Set the new frame set.
                    this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                    this.column = column;
                }
            }else {
                this.count = 0;// Reset the count.
                this.delay = delay;// Set the delay.
                this.frame_index = 0;// Start at the first frame in the new frame set.
                this.frame_set = frame_set;// Set the new frame set.
                this.frame = this.frame_set[this.frame_index];// Set the new frame value.
                this.column = column;
            }
      
        }
    }

    update(){
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

