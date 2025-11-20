// =========================
// ui_name.js
// =========================
function ScreenName(score){ this.score=score|0; this.letters=[65,65,65]; this.pos=0; }
ScreenName.prototype.update=function(){
if(btnp(2)) this.letters[this.pos]=(this.letters[this.pos]<=65)?90:this.letters[this.pos]-1; // LEFT
if(btnp(3)) this.letters[this.pos]=(this.letters[this.pos]>=90)?65:this.letters[this.pos]+1; // RIGHT
if(btnp(0)) this.pos=(this.pos+2)%3; // UP
if(btnp(1)) this.pos=(this.pos+1)%3; // DOWN
if(btnp(4)) { var name=String.fromCharCode(this.letters[0],this.letters[1],this.letters[2]); hs_insert(this.score,name); scores=new ScreenScores(); scene=scores; }
};
ScreenName.prototype.draw=function(){ cls(0); print('NEW HIGH SCORE!', 70, 28, 14); print('SCORE: '+this.score, 84, 40, 7); var x=84, y=68; for(var i=0;i<3;i++){ var c=(i===this.pos)?14:7; rectb(x-4+i*24,y-8,18,18,c); print(String.fromCharCode(this.letters[i]), x+i*24, y, c); } print('LEFT/RIGHT: letra UP/DOWN: mover', 36, 96, 6); print('A: Confirmar', 96, 110, 6); };
