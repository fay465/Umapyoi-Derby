// =========================
// ui_finish.js
// =========================
function ScreenFinish(m){ this.m=m; }
ScreenFinish.prototype.update=function(){
// Solo START
if(btnp(6)){
if(this.m.bank<=0){ this.m.bank=1000; pmem(0,this.m.bank|0); }
this.m.resetRaceOnly();
scene=menu;
}
};
ScreenFinish.prototype.draw=function(){ cls(0); rect(50,44,140,48,0); rectb(50,44,140,48,12); if(this.m.winner>=0){ var t='GANADOR '+SUIT_LET[this.m.winner]; print(t,84,52,ink(this.m.winner)); } else { print('GAME OVER', 92, 52, 14); } var bankT='BANCO '+(this.m.bank|0)+' BEST '+(pmem(1)|0); print(bankT,70,64,7); print('START: Menú principal',70,76,6); };
