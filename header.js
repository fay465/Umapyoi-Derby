// title: Horserace
// author: Fay
// desc: Tripl3 Crown
// script: js
// saveid: horserace
// input: gamepad, mouse

// =========================
// header.js
// =========================
var W=240, H=136;

var LAY={
    M: W/2, 
    trackX0:10, 
    trackX1:180,  
    yTop:22,
    yGap:22,
    
    lineCardsY:110, 
    
    drawCardX: 224, 
    drawCardY: 60,
    
    betSuitY:60, betSuitW:44, betSuitH:32,
    chipRowY:116, margin:8
};

var KEY_Z = 412;
var KEY_X = 444;
var KEY_A = 476;

var KEY_RIGHT = 382;
var KEY_DOWN  = 414;
var KEY_UP    = 446;
var KEY_LEFT  = 478;

var SPR_POOF = [264, 266, 268]; 
var SPR_STUN = [316, 364];      

var CHIP_SPRITES = {
    100:  [2, 98, 34, 66],
    500:  [4, 100, 36, 68],
    1000: [6, 102, 38, 70],
    5000: [8, 104, 40, 72]
};

var LINKS=10; var LINE_CARDS=8;
var CHIP_VALS=[100,500,1000,5000];

var SUIT_COL=[0,2,4,11]; 
var SUIT_LET=['S','H','D','C'];

var __seed=(time()|0)^0x9e3779b9; function _imul(a,b){return (a*b)|0;}
function rnd(){ __seed=(_imul(__seed,1664525)+1013904223)|0; return ((__seed>>>0)/4294967296);}
function rndi(n){return (rnd()*n)|0;}
function clamp(v,a,b){return v<a?a:v>b?b:v;}

function ink(s){ return (s===0)?14:SUIT_COL[s]; }
function fmt(n){ return n.toString(); }

function pal(c0, c1){
    if(c0 === undefined && c1 === undefined){
        for(var i=0; i<16; i++){ poke4(0x3FF0 * 2 + i, i); }
    } else { poke4(0x3FF0 * 2 + c0, c1); }
}

var M={x:0,y:0,l:false,_pl:false,lp:false};
function updMouse(){ var a=mouse(); M.x=a[0]|0; M.y=a[1]|0; M.l=!!a[2]; M.lp=M.l&&!M._pl; M._pl=M.l; }
function hit(x,y,w,h){ return M.x>=x&&M.y>=y&&M.x<x+w&&M.y<y+h; }

function hs_load(){
    var arr=[]; var base=10;
    for(var i=0;i<5;i++){
        var b=base+i*4; var sc=pmem(b)|0; var c1=pmem(b+1)|0, c2=pmem(b+2)|0, c3=pmem(b+3)|0;
        if(sc>0){ arr.push({score:sc,name:String.fromCharCode(c1||45,c2||45,c3||45)}); }
    }
    arr.sort(function(a,b){return b.score-a.score;});
    while(arr.length<5) arr.push({score:0,name:"---"});
    return arr;
}
function hs_save(arr){
    var base=10; for(var i=0;i<5;i++){
        var e=arr[i]||{score:0,name:"---"}; var b=base+i*4;
        pmem(b, e.score|0);
        var c1=(e.name&&e.name.length>0)?e.name.charCodeAt(0):45;
        var c2=(e.name&&e.name.length>1)?e.name.charCodeAt(1):45;
        var c3=(e.name&&e.name.length>2)?e.name.charCodeAt(2):45;
        pmem(b+1,c1|0); pmem(b+2,c2|0); pmem(b+3,c3|0);
    }
}
function hs_qualify(score){ var arr=hs_load(); return (score>arr[4].score)?true:false; }
function hs_insert(score,name){ var arr=hs_load(); arr.push({score:score,name:name}); arr.sort(function(a,b){return b.score-a.score;}); arr=arr.slice(0,5); hs_save(arr); }


var MUS_RACE = 0;
var MUS_WIN_TRACK = 1;
var MUS_WIN_FRAME = 4;
var MUS_MENU = 2;
var MUS_BET  = 3;

var SND_NAV  = 40;
var SND_SEL  = 41;
var SND_STEP = 42;
var SND_FLIP = 43;
var SND_WIN  = 44; 

var currentMusic = -1;

function playMus(track){
    if(currentMusic !== track){
        music(track, 0, 0, true);
        currentMusic = track;
    }
}

function stopMus(){
    music(-1);
    currentMusic = -1;
}