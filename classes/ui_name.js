// =========================
// classes/ui_name.js
// =========================
function ScreenName(score){ this.score=score|0; this.letters=[65,65,65]; this.pos=0; }

ScreenName.prototype.update=function(){

    if(btnp(2)) this.pos = (this.pos + 2) % 3;
    if(btnp(3)) this.pos = (this.pos + 1) % 3;

    if(btnp(0)) this.letters[this.pos] = (this.letters[this.pos] >= 90) ? 65 : this.letters[this.pos] + 1; 
    if(btnp(1)) this.letters[this.pos] = (this.letters[this.pos] <= 65) ? 90 : this.letters[this.pos] - 1; 
    
    if(btnp(4)) { 
        var name=String.fromCharCode(this.letters[0],this.letters[1],this.letters[2]); 
        hs_insert(this.score,name); 
        
        model.bank = 1000;
        pmem(0, 1000);
        model.resetRaceOnly();
        
        scores=new ScreenScores(); 
        scene=scores; 
    }
};

ScreenName.prototype.draw=function(){ 
    cls(0); 
    print('NEW HIGH SCORE!', 70, 28, 14); 
    print('SCORE: '+this.score, 84, 40, 7); 
    
    var x=84, y=68; 
    for(var i=0;i<3;i++){ 
        var c=(i===this.pos)?14:7; 
        rectb(x-4+i*24,y-8,18,18,c); 
        print(String.fromCharCode(this.letters[i]), x+i*24, y, c); 
    } 

    var yInst = 95;

    spr(KEY_UP, 50, yInst, 0, 1, 0, 0, 2, 2); 
    spr(KEY_DOWN, 62, yInst, 0, 1, 0, 0, 2, 2); 
    print('Letra', 80, yInst+5, 6); 

    spr(KEY_LEFT, 50, yInst+14, 0, 1, 0, 0, 2, 2); 
    spr(KEY_RIGHT, 62, yInst+14, 0, 1, 0, 0, 2, 2); 
    print('Mover', 80, yInst+19, 6);

    var yK = 122;
    spr(KEY_Z, 70, yK, 0, 1, 0, 0, 2, 2);
    print('Confirmar', 88, yK+5, 14); 
};