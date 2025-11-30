// =========================
// classes/ui_race.js
// =========================
function ScreenRace(m){ this.m=m; this.auto=false; this.t=0; }

ScreenRace.prototype.update=function(){ 
    if(btnp(4)) this.m.stepFlip(); 
    if(btnp(5)) this.auto=!this.auto; 
    if(btnp(6)) { this.m.refundBets(); scene=bet; } 
    if(this.auto){ 
        this.t++; 
        if(this.t>18){ this.m.stepFlip(); this.t=0; } 
    } 
    if(this.m.winner>=0){ 
        this.m.finishRace(); 
        scene=finish; 
    } 
};

ScreenRace.prototype.draw=function(){ 
    cls(0); 
    
    var ui = new UI();
    
    var x0=this.m.startX,x1=this.m.finishX,dx=this.m.dx,ys=this.m.ys; 

    rectb(x0-10,ys[0]-16,(x1-x0)+20,(ys[3]-ys[0])+32,6); 
    for(var i=0;i<4;i++) line(x0-4,ys[i],x1+4,ys[i],5); 
    for(var k=0;k<=LINKS;k++){ 
        var x=(x0+k*dx)|0; var col=(k===LINKS)?14:6; 
        for(var seg=ys[0]-10; seg<=ys[3]+10; seg+=8) line(x,seg,x,seg+3,col); 
    } 

    ui.drawLineCards(x0, dx, ys, this.m.lineRevealed, this.m.lineSuits);

    for(var j=0;j<4;j++){ 
        var isWinner = (this.m.winner === j);
        this.m.caballos[j].draw(isWinner); 
    }

    for(var s=0;s<4;s++){
        var multX = x1 + 2; 
        var multY = ys[s] - 4;
        if(typeof pal === 'function'){
            pal(14, TEAM_COLS[s]); pal(15, TEAM_COLS[s]); pal(0, TEAM_COLS[s]); pal(2, TEAM_COLS[s]); 
        }
        spr(ICON_IDS[s], multX, multY, 0, 1, 0, 0, 1, 1);
        if(typeof pal === 'function') pal();
        print('x'+this.m.mults[s], multX + 8, multY, ink(s));
    }

    if(this.m.lastCard){ 
        ui.drawLastCard(this.m.lastCard);
    } 
    
    ui.hudTop();

    var yK = 120; 
    var yText = yK + 5;

    spr(KEY_Z, 4, yK, 0, 1, 0, 0, 2, 2);
    print("Flip", 22, yText, 6);
    
    var autoText = this.auto ? "ON" : "OFF";
    var autoCol = this.auto ? 11 : 6;
    spr(KEY_X, 60, yK, 0, 1, 0, 0, 2, 2);
    print("Flip Auto: " + autoText, 78, yText, autoCol);

    spr(KEY_A, 180, yK, 0, 1, 0, 0, 2, 2);
    print("Volver", 198, yText, 6);
};