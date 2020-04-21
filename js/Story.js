class Story {
    constructor(){
        this.count = 0;
        this.playing = true;
    }

// odstartuje uvodny pribeh
playStory(){

    // skrytie menu a zobrazenie canvasu
    document.getElementById('menu').style.display="none";
    document.getElementById('canvas').style.display="block";
    // pridanie listenerov
    window.addEventListener("keydown", game.controller.keyListener);
    window.addEventListener("keyup", game.controller.keyListener);
    game.canvas.addEventListener("click", game.controller.clickListener);
    game.canvas.addEventListener("mousemove", game.controller.mousemoveListener);
    // spustenie hudby
    game.intro.volume= 0.2;
    game.intro.play();
    
    var story1 = setInterval(() => { 
        // vycisti canvas
        game.context.clearRect(0, 0, canvas.width, canvas.height);

        this.count+=0.5;
        // nastavenie pisma
        game.context.font = '20px Trebuchet MS';
        game.context.fillStyle = "black";
        // vykreslenie obrazkov , textu a tlacidla
        game.context.drawImage(game.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
        game.context.drawImage(game.findImage("story1_human"), 0, 0 , 192 , 256 , 0+this.count , 0 , 192, 256);
        game.context.drawImage(game.findImage("story1_robot"), 0, 0 , 192 , 256 , 575-this.count , 0 , 192, 256);
        game.context.fillText("Vitaj v roku 2077. Vo svete vyspelých technológií.", 170, 300); 
        game.context.fillText("Roboti sú už bežnou súčasťou každodenného života.", 160, 325); 
        game.context.fillText("Využívajú sa hlavne ako pomocníci v domácnostiach.", 160, 350); 
        game.button1.drawButton();
        game.button1.click();

        // ak pribeh skonci zmaze interval
        if(this.playing == false) clearInterval(story1);

        if(Math.round(this.count) == 200){

            clearInterval(story1);
            this.count=0;

            var story2 = setInterval(() => { 
                // vycisti canvas
                game.context.clearRect(0, 0, canvas.width, canvas.height);
                game.context.fillStyle = "black";
                this.count+=0.1;
                // vykreslenie obrazkov , textu a tlacidla
                game.context.drawImage(game.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                game.context.drawImage(game.findImage("story2_assassin"), 0, 0 , 700 , 706 , -100+this.count , 0+this.count , 600+this.count, 606+this.count);
                game.context.drawImage(game.findImage("story2_ghost"), 0, 0 , 150 , 220 , 500+this.count , 330-this.count , 150, 223);
                game.context.fillText("Avšak náš technologický pokrok", 400, 200);
                game.context.fillText("má aj svoju temnú stránku.", 400, 225);
                game.context.fillText("Na tajnej základni začali", 400, 250);
                game.context.fillText("testovať robtov na armádne účely.", 400, 275);
                game.button1.drawButton();
                game.button1.click();

                if(this.playing == false) clearInterval(story2);

                if(Math.round(this.count) == 20){

                    clearInterval(story2);
                    this.count=0;

                    var story3 = setInterval(() => { 
                        // vycisti canvas
                        game.context.clearRect(0, 0, canvas.width, canvas.height);
                        game.context.fillStyle = "black";
                        this.count+=0.1;
                        // vykreslenie obrazkov , textu a tlacidla
                        game.context.drawImage(game.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                        game.context.drawImage(game.findImage("story3_assassin"), 0, 0 , 700 , 706 , -80+this.count , 20+this.count , 620+this.count, 626+this.count);
                        game.context.drawImage(game.findImage("story3_ghost"), 0, 0 , 150 , 220 , 520+this.count , 310-this.count , 150, 223);
                        game.context.fillText("Všetky tieto stroje", 450, 100);
                        game.context.fillText("riadi centrálny počítač", 450, 125);
                        game.context.fillText("ktorý bol napadnutý", 450, 150);
                        game.context.fillText("vírusom a zmenil robotov", 450, 175);
                        game.context.fillText("na nebezpečných protivníkov.", 450, 200);
                        game.button1.drawButton();
                        game.button1.click();

                        if(this.playing == false) clearInterval(story3);

                        if(Math.round(this.count) == 20){

                            clearInterval(story3);
                            this.count=0;

                            var story4 = setInterval(() => { 
                                // vycisti canvas
                                game.context.clearRect(0, 0, canvas.width, canvas.height);
                                game.context.fillStyle = "black";
                                this.count+=0.1;
                                // vykreslenie obrazkov , textu a tlacidla
                                game.context.drawImage(game.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                                game.context.drawImage(game.findImage("story4_robot"), 0, 0 , 567 , 556 , -100+this.count , 0+this.count/2 , 567, 556);
                                game.context.fillText("Posledná nádej sa vkladá do bojového robota", 310, 300);
                                game.context.fillText("najnovšej technológie. Bol vyrobený iba jeden, ", 310, 325);
                                game.context.fillText("za účelom chrániť ľudstvo.", 310, 350);
                                game.button1.drawButton();
                                game.button1.click();

                                if(this.playing == false) clearInterval(story4);

                                if(Math.round(this.count) == 20){

                                    clearInterval(story4);
                                    this.count=0;

                                    var story5 = setInterval(() => { 
                                        // vycisti canvas
                                        game.context.clearRect(0, 0, canvas.width, canvas.height);
                                        game.context.fillStyle = "black";
                                        this.count+=0.1;
                                        // vykreslenie obrazkov , textu a tlacidla
                                        game.context.drawImage(game.findImage("story_bg"), 0, 0 , 760 , 480 , 0 , 0 , 760 , 480);
                                        game.context.drawImage(game.findImage("story5_centralpc"), 0, 0 , 294 , 287 , 235 , 230-this.count , 294 , 287);
                                        game.context.fillText("Úlohou je nájsť a zničiť", 270, 100);
                                        game.context.fillText("centrálny počítač napadnutý vírusom.", 220, 125);
                                        game.button1.drawButton();
                                        game.button1.click();

                                        if(this.playing == false) clearInterval(story5);

                                        if(Math.round(this.count) == 20){

                                            clearInterval(story5);
                                            this.count=0;
                                            this.playing = false;
                                            // zastavit hudbu 
                                            game.intro.pause();
                                            // volanie metody start
                                            game.start();

                                        }
                                    }, 50);
                                }
                            }, 50); 
                        }
                    }, 50); 
                }
            }, 50); 

        }
     }, 20);
}
}