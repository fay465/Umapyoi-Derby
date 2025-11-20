// =========================
// ui_quit.js
// =========================
function ScreenQuit(){}
ScreenQuit.prototype.update=function(){ if(btnp(6) || btnp(4)) scene=menu; };
ScreenQuit.prototype.draw=function(){ cls(0); rect(40,44,160,48,0); rectb(40,44,160,48,12); print('SALIR DEL JUEGO', 72, 50, 14); print('Presiona ESC para salir de TIC-80', 50, 64, 7); print('START/A: Volver al menú', 80, 76, 6); };
