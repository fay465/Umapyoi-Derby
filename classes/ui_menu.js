// =========================
// ui_menu.js — menú principal
// =========================
function ScreenMenu(){ this.idx=0; this.opts=['Iniciar juego','Ver scores','Salir']; }
ScreenMenu.prototype.update=function(){
if(btnp(0)) this.idx=(this.idx+2)%3; // UP
if(btnp(1)) this.idx=(this.idx+1)%3; // DOWN
if(btnp(4) || btnp(6)){
if(this.idx===0){ model.resetRaceOnly(); scene=bet; }
else if(this.idx===1){ scores=new ScreenScores(); scene=scores; }
else { scene=quit; }
}
};
ScreenMenu.prototype.draw=function(){ cls(0); print('HORSERACE', 84, 30, 7); for(var i=0;i<3;i++){ var y=56+i*14; var c=(i===this.idx)?14:7; print((i===this.idx?'> ':' ')+this.opts[i], 70, y, c); } print('A/START: Seleccionar UP/DOWN: Mover', 24, H-12, 6); };
