class Animation{
    constructor(){
        this.count = 0;
        this.delay = 0;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = 0;
    }

    change(frame_set, delay = 15){
        if (this.frame_set != frame_set) {// If the frame set is different:

            this.count = 0;// Reset the count.
            this.delay = delay;// Set the delay.
            this.frame_index = 0;// Start at the first frame in the new frame set.
            this.frame_set = frame_set;// Set the new frame set.
            this.frame = this.frame_set[this.frame_index];// Set the new frame value.
      
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

