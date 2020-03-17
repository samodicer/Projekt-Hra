class Window {
    constructor(id,width,height){
        this.x= 0;
        this.y= 0;
        this.height = width;
        this.width = height;
        this.id = id;
    }

    drawWindow(){
        this.x = game.canvas.width / 2 - this.width / 2 ;
        this.y = game.canvas.height / 2 - this. height / 2;
        game.context.fillStyle = "#f8e728";
        game.context.fillRect(this.x,this.y,this.width, this.height);
        game.context.fillStyle = "black";
        game.context.strokeRect(this.x,this.y,this.width, this.height);
        game.context.font = '30px Trebuchet MS';
        if (this.id == 1){
            game.context.fillText("Koniec hry!", this.x + this.width / 2 - 70, this.y + this.height / 2 + 10 );
            game.button2.drawButton(); 
        }
        if (this.id == 2){
            game.context.font = '20px Trebuchet MS';
            var collectedPoints = game.player.points * 100 / game.points.length;
            console.log(collectedPoints);
            game.context.fillText("Centrálny počítač bol úspešne zničený!", this.x + this.width / 2 - 170, this.y + this.height / 2 - 30  ); 
            game.context.fillRect(this.x + this.width / 2 - 150,this.y + this.height / 2 + 10, 300 , 80);
            game.context.fillText("Získané body: " + game.player.points+ " / " + game.points.length, this.x + this.width / 2 - 100, this.y + this.height / 2 + 120  );
            game.button3.drawButton();   
            
            if (collectedPoints < 24) {
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 260, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 310, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 360, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 410, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 460, 270, 40, 40); 
            }else if (collectedPoints >= 24 && collectedPoints < 50){
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 260, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 310, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 360, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 410, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 460, 270, 40, 40); 

            }else if (collectedPoints >= 50 && collectedPoints < 75){
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 260, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 310, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 360, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 410, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 460, 270, 40, 40); 

            }else if (collectedPoints >= 75 && collectedPoints < 90){
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 260, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 310, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 360, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 410, 270, 40, 40); 
                game.context.drawImage(game.findImage("star_empty"), 0, 0, 40, 40, 460, 270, 40, 40); 

            }else if (collectedPoints >= 90){
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 260, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 310, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 360, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 410, 270, 40, 40); 
                game.context.drawImage(game.findImage("star"), 0, 0, 40, 40, 460, 270, 40, 40); 

            }

        }
    }
}