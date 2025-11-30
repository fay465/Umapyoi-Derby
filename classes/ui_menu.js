// =========================
// classes/ui_menu.js
// =========================
function ScreenMenu(){ 
    this.idx=0; 
    this.opts=['Iniciar juego','Ver scores']; 
    
    this.scrollX = 0;
    this.scrollSpeed = 2; 

    this.menuHorses = [
        new Caballo(0, 80,  W/2 - 40, 0), 
        new Caballo(1, 90,  W/2 - 10, 0),
        new Caballo(2, 100, W/2 + 20, 0),
        new Caballo(3, 110, W/2 + 50, 0)
    ];
}

ScreenMenu.prototype.update=function(){
    this.scrollX = (this.scrollX + this.scrollSpeed) % 240;

    for(var i=0; i<this.menuHorses.length; i++){
        var h = this.menuHorses[i];
        h.animTimer = this.scrollX;
        h.pos = 1; 
    }

    if(btnp(0)) this.idx=(this.idx+1)%2;
    if(btnp(1)) this.idx=(this.idx+1)%2;
    
    if(btnp(4) || btnp(6)){
        if(this.idx===0){ 
            model.bank = 1000; pmem(0, 1000); model.resetRaceOnly(); scene=bet; 
        }
        else if(this.idx===1){ scores=new ScreenScores(); scene=scores; }
    }
};

ScreenMenu.prototype.draw=function(){ 
    cls(0); 

    map(0, 51, 30, 17, -this.scrollX, 0, -1);
    map(0, 51, 30, 17, -this.scrollX + 240, 0, -1);

    for(var i=0; i<this.menuHorses.length; i++){
        this.menuHorses[i].draw(false, false);
    }

    var title = "UMAPYOI";
    var scale = 4;
    var wTitle = print(title, 0, -200, 0, false, scale, true); 
    var tx = (W - wTitle) / 2;
    var ty = 25;
    
    var borderCol = 2; 
    var offs = [[-2,0], [2,0], [0,-2], [0,2], [-2,-2], [2,-2], [-2,2], [2,2]];
    
    for(var i=0; i<offs.length; i++){
        print(title, tx+offs[i][0], ty+offs[i][1], borderCol, false, scale, true);
    }

    print(title, tx, ty, 12, false, scale, true); 

    var sub = "DERBY";
    var sScale = 2;
    var wSub = print(sub, 0, -200, 0, false, sScale, true);
    var sx = (W - wSub) / 2;
    var sy = 55; 

    print(sub, sx+1, sy, 0, false, sScale, true);
    print(sub, sx-1, sy, 0, false, sScale, true);
    print(sub, sx, sy+1, 0, false, sScale, true);
    print(sub, sx, sy-1, 0, false, sScale, true);
    print(sub, sx, sy, 14, false, sScale, true);

    for(var i=0;i<2;i++){
        var y=85+i*14;
        var c=(i===this.idx)?14:7; 
        var txt = (i===this.idx?'> ':' ')+this.opts[i];
        
        print(txt, 70-1, y, 0); print(txt, 70+1, y, 0);
        print(txt, 70, y-1, 0); print(txt, 70, y+1, 0);
        
        print(txt, 70, y, c); 
    } 
    
    var yKeys = H-18;
    spr(KEY_Z, 81, yKeys, 0, 1, 0, 0, 2, 2);
    
    var selTxt = "Seleccionar";
    print(selTxt, 99-1, yKeys+5, 0); print(selTxt, 99+1, yKeys+5, 0);
    print(selTxt, 99, yKeys+4, 0); print(selTxt, 99, yKeys+6, 0);
    
    print(selTxt, 99, yKeys+5, 6);
};