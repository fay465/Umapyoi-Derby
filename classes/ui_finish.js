// =========================
// classes/ui_finish.js
// =========================
function ScreenFinish(m){ this.m=m; }

ScreenFinish.prototype.update=function(){
    if(this.m.bank <= 0){
        if(btnp(4) || btnp(6)){
            this.m.bank = 1000;
            pmem(0, 1000);
            this.m.resetRaceOnly();
            scene = menu;
        }
    }
    else {
        if(btnp(4)){
            this.m.resetRaceOnly(); 
            scene=bet;              
        }
        if(btnp(6)){
            var finalScore = this.m.bank;
            if(hs_qualify(finalScore)){
                nameEntry = new ScreenName(finalScore);
                scene = nameEntry;
            } else {
                this.m.bank = 1000; 
                pmem(0, 1000);
                this.m.resetRaceOnly();
                scene = menu;
            }
        }
    }
};

ScreenFinish.prototype.draw=function(){
    cls(0); 
    
    var centerX = 120;

    rect(45, 20, 150, 96, 0); 
    rectb(45, 20, 150, 96, 12);
    
    var bankT='BANCO '+ (this.m.bank|0) +'  BEST '+(pmem(1)|0); 
    var w2=print(bankT,0,-6,0,true,1,true);
    print(bankT,(W-w2)/2, 26, 7, false, 1, true);
    
    if(this.m.winner>=0){ 
        var txt = "GANADOR";
        var wTxt = print(txt, 0, -10, 0); 
        print(txt, centerX - (wTxt/2), 38, 14); 
        
        var iconId = ICON_IDS[this.m.winner];
        
        if(typeof pal === 'function'){
            pal(14, TEAM_COLS[this.m.winner]); 
            pal(15, TEAM_COLS[this.m.winner]); 
            pal(0, TEAM_COLS[this.m.winner]); 
            pal(2, TEAM_COLS[this.m.winner]); 
        }
        spr(iconId, centerX - 4, 48, 0, 1, 0, 0, 1, 1);
        if(typeof pal === 'function') pal();
        
        var winnerHorse = this.m.caballos[this.m.winner];
        var oldX = winnerHorse.startX;
        var oldY = winnerHorse.laneY;
        
        winnerHorse.startX = centerX - (winnerHorse.pos * winnerHorse.dx);
        winnerHorse.laneY = 65; 
        
        winnerHorse.draw(true, true); 
        
        winnerHorse.startX = oldX;
        winnerHorse.laneY = oldY;
        
    } else { 
        print('GAME OVER', 92, 50, 14); 
    } 
    
    var yBtn = 90;
    
    if(this.m.bank <= 0){
        var txt1 = "¡BANCARROTA!";
        var w1 = print(txt1,0,-10,0);
        print(txt1, centerX - (w1/2), 85, 2);
        
        spr(KEY_A, centerX - 40, yBtn+5, 0, 1, 0, 0, 2, 2);
        print("Salir al Menú", centerX - 20, yBtn+10, 6);
    } else {
        spr(KEY_Z, 55, yBtn-5, 0, 1, 0, 0, 2, 2);
        print("Seguir", 75, yBtn, 6);

        spr(KEY_A, 115, yBtn-5, 0, 1, 0, 0, 2, 2);
        print("Retirarse", 133, yBtn, 13);
    }
};