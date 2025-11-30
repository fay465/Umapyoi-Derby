// =========================
// classes/ui_scores.js
// =========================
function ScreenScores(){ this.list=hs_load(); }

ScreenScores.prototype.update=function(){ 

    if(btnp(6) || btnp(4) || btnp(5)) scene=menu; 
};

ScreenScores.prototype.draw=function(){ 
    cls(0); 
    
    print('HIGH SCORES', 80, 18, 7); 
    
    for(var i=0;i<5;i++){ 
        var e=this.list[i]; 
        var y=40+i*16; 
        var nm=e.name||'---'; 
        var sc=e.score|0; 
        
        print((i+1)+'. '+nm, 70, y, 12); 
        print(sc.toString(), 170, y, 7); 
    } 

    var yK = H-12;
    var centerX = W/2;
    
    
    spr(KEY_A, 96, yK-5, 0, 1, 0, 0, 2, 2);
    print('Volver', 114, yK, 6); 
};