class Animation{

    constructor(){

        this.delay = 0;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = 0;
        this.row = 0;
        this.count = 0;
        this.delay_animation_counter = 0;

    }

    changePlayerFrame(frame_set, delay, row){

        if (this.frame_set != frame_set) {// ak je frame set rozdielny

            if( (this.row == 10 ) && (row == 0) ){

                this.delay_animation_counter++

                if(this.delay_animation_counter==40){

                    this.delay_animation_counter =0;
                    this.count = 0;// resetne pocitadlo
                    this.delay = delay;// nastavenie oneskorenia
                    this.frame_index = 0;// zacne prvym frameom vo frame sete
                    this.frame_set = frame_set;// nastavenie noveho frame setu
                    this.frame = this.frame_set[this.frame_index];// nastavi novy index frame setu 
                    this.row = row;

                }
            }else if( (this.row == 11) && (row == 1) ) {

                this.delay_animation_counter++

                if(this.delay_animation_counter==40){

                    this.delay_animation_counter =0;
                    this.count = 0;
                    this.delay = delay;
                    this.frame_index = 0;
                    this.frame_set = frame_set;
                    this.frame = this.frame_set[this.frame_index];
                    this.row = row;

                }
            }else if( (this.row == 8 ) && (row == 4) ) {

                this.delay_animation_counter++

                if(this.delay_animation_counter==40){

                    this.delay_animation_counter =0;
                    this.count = 0;
                    this.delay = delay;
                    this.frame_index = 0;
                    this.frame_set = frame_set;
                    this.frame = this.frame_set[this.frame_index];
                    this.row = row;

                }
            }else if( (this.row == 9) && (row == 5) ) {

                this.delay_animation_counter++

                if(this.delay_animation_counter==40){

                    this.delay_animation_counter =0;
                    this.count = 0;
                    this.delay = delay;
                    this.frame_index = 0;
                    this.frame_set = frame_set;
                    this.frame = this.frame_set[this.frame_index];
                    this.row = row;

                }
            }else {

                this.delay_animation_counter = 0;
                this.count = 0;
                this.delay = delay;
                this.frame_index = 0;
                this.frame_set = frame_set;
                this.frame = this.frame_set[this.frame_index];
                this.row = row;

            }
        }
    }

    changeFrame(frame_set, delay , row){

        if (this.frame_set != frame_set) {

            this.count = 0;
            this.delay = delay;
            this.frame_index = 0;
            this.frame_set = frame_set;
            this.frame = this.frame_set[this.frame_index];
            this.row = row;

        }

    }

    update(object){

        this.count ++;// pocitadlo kolko cyklov preslo od poslednej zmeny frameu
        
        if (this.count >= this.delay) {// ak preslo dostatok cyklov zmenime frame
          
          this.count = 0;// resetnutie pocitadla
 
          if(object.frozen == true) {

            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? this.frame_index : this.frame_index + 1;   
          
          }else {

            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
          
          }

          this.frame = this.frame_set[this.frame_index]; // nastavi momentalny frame index

        }
    }

    updateHitEnemy(enemy){

        this.count ++;

        if (this.count >= this.delay) {
          
          this.count = 0;
 
          if (enemy.hitted == true){

            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;  
          
          } else this.frame_index =0;

          this.frame = this.frame_set[this.frame_index];
        
        }   
    }

    updateHitPlayer(player){
      
        this.count ++;

        if (this.count >= this.delay) {
          
          this.count = 0;

          if (player.hitted == true ){

            this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;  
          
          } else this.frame_index =0;

          this.frame = this.frame_set[this.frame_index];
        
        }   
    }

    updateExplosion(){ 

      this.count ++;

      if (this.count >= this.delay) {

        this.count = 0;

        this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index];

      }
    }




}

