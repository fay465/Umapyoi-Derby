// =========================
// escenas y TIC
// =========================
var model=null, bet=null, race=null, finish=null, menu=null, quit=null, scene=null, scores=null, nameEntry=null;

function init(){
    model = new RaceModel();
    bet = new ScreenBet(model);
    race = new ScreenRace(model);
    finish = new ScreenFinish(model);
    menu = new ScreenMenu();
    quit = new ScreenQuit();
    
    scene = menu;
}

init(); 

function TIC(){
    if(!scene) { init(); return; }

    scene.update();
    scene.draw();
}