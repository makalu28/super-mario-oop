//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_01-likovi.js"/>

// gameover
let gameoverEvent = new Event("gameover");
const btnGame = document.getElementById("btnGame");
btnGame.addEventListener("gameover", smrt)
// levelup
let levelUpEvent = new Event("levelUp");
btnGame.addEventListener("levelUp", noviLevel);

let winEvent = new Event("win");
btnGame.addEventListener("win", pobjeda);
// što će se pokrenuti kad se klikne button Setup:
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);
let odabrana;

function smrt() {
  console.log("izgubio si");
  btnStop_click();
  setup();
}

function pobjeda(){
  console.log("pobjeda");
  btnStop_click();
  btnSetupGame.click();
}

function noviLevel(){
  btnStop_click();
  GAME.setActiveWorldMap("level2");
  setupLevel2();
  btnStart_click();
}


function setup() {

  Postavke.izbrisi();
  GAME.clearSprites();

  Postavke.odabrana = GAME.activeWorldMap.name;
  GameSettings.output(Postavke.odabrana);

  switch (Postavke.odabrana) {
    case "igra":
      setupLevel1();
      break;

    case "level2":
      setupLevel2();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */
function setupLevel1() {
  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platforme");

  

  Postavke.mario=new Mario(0*32, 8*32, GAME.getSpriteLayer("mario"));
  GAME.addSprite(Postavke.mario);

  Postavke.neprijatelj=new Neprijatelj(GAME.getSpriteLayer("neprijatelj"), 17 ,9);
  GAME.addSprite(Postavke.neprijatelj);
  Postavke.neprijatelj.visible=true;

  Postavke.vatra=new Vatra(GAME.getSpriteLayer("vatra"),22, 15);
  GAME.addSprite(Postavke.vatra);
  Postavke.vatra.visible=true;

  Postavke.gljiva=new Gljiva(GAME.getSpriteLayer("gljiva"),8, 11);
  GAME.addSprite(Postavke.gljiva);
  Postavke.gljiva.visible=false;

  Postavke.kotac=new Kotac(GAME.getSpriteLayer("kotac"),16);
  GAME.addSprite(Postavke.kotac);
  Postavke.kotac.visible=true;
//kocka sa gljivom
  Postavke.kocka = new Kocka(GAME.getSpriteLayer("kocka"),8, 12);
  GAME.addSprite(Postavke.kocka);
  Postavke.kocka.visible=true;

  Postavke.coin=new Coin(GAME.getSpriteLayer("coin"));
  GAME.addSprite(Postavke.coin);
  //Postavke.coin.dodajCoin();
  //Postavke.coin.visible=true;
//obicne prazne kocke
  Postavke.kocka1=new Kocka2(GAME.getSpriteLayer("kocka2"),6, 12);
  GAME.addSprite(Postavke.kocka1);
  Postavke.kocke.push(Postavke.kocka1);

  Postavke.kocka2=new Kocka2(GAME.getSpriteLayer("kocka2"),10, 12);
  GAME.addSprite(Postavke.kocka2);
  Postavke.kocke.push(Postavke.kocka2);

  Postavke.kocka3=new Kocka2(GAME.getSpriteLayer("kocka2"),12, 12);
  GAME.addSprite(Postavke.kocka3);
  Postavke.kocke.push(Postavke.kocka3);

  Postavke.podloga1=new Podloga(GAME.getSpriteLayer("podloga"),17, 15);
  GAME.addSprite(Postavke.podloga1);
  Postavke.podloga.push(Postavke.podloga1);

  Postavke.podloga2=new Podloga(GAME.getSpriteLayer("podloga"),18, 15);
  GAME.addSprite(Postavke.podloga2);
  Postavke.podloga.push(Postavke.podloga2);

  Postavke.projektil=new Projektil(GAME.getSpriteLayer("projektil"));
  GAME.addSprite(Postavke.projektil);


}

function setupLevel2() {
  GAME.clearSprites();
  //alert("New level");
  btnStop_click();
  //Postavke.pokrenut=false;
  GAME.setActiveWorldMap("level2");
  GAME.activeWorldMap.setCollisions("platforme");


  Postavke.mario = new Mario(16 * 32, 1 * 32, GAME.getSpriteLayer("mario"));
  Postavke.mario.start(16, 1);
  GAME.addSprite(Postavke.mario);
  console.log(Postavke.mario.x);

  Postavke.zmaj=new Zmaj(12*32, 16*32, GAME.getSpriteLayer("zmaj"));
  GAME.addSprite(Postavke.zmaj);
  console.log(Postavke.zmaj.x);

  Postavke.gljiva=new Gljiva(GAME.getSpriteLayer("gljiva"),1, 16);
  GAME.addSprite(Postavke.gljiva);
  Postavke.gljiva.visible=false;

  Postavke.kocka = new Kocka(GAME.getSpriteLayer("kocka"),1, 16);
  GAME.addSprite(Postavke.kocka);
  console.log(Postavke.kocka)

  Postavke.kocka2=new Kocka2(GAME.getSpriteLayer("kocka2"), 5, 11);
  GAME.addSprite(Postavke.kocka2);

  Postavke.coin=new Coin(GAME.getSpriteLayer("coin"));
  GAME.addSprite(Postavke.coin);
  Postavke.coin.dodajCoin();
  Postavke.coin.visible=true;

  Postavke.projektil=new Projektil(GAME.getSpriteLayer("projektil"));
  GAME.addSprite(Postavke.projektil);
  
  Postavke.neprijatelj1=new Neprijatelj(GAME.getSpriteLayer("neprijatelj"), 3, 1);
  GAME.addSprite(Postavke.neprijatelj1);
  Postavke.neprijatelji.push(Postavke.neprijatelj1);
  Postavke.neprijatelj1.visible=true;

  Postavke.neprijatelj2=new Neprijatelj(GAME.getSpriteLayer("neprijatelj"), 15, 6);
  GAME.addSprite(Postavke.neprijatelj2);
  Postavke.neprijatelji.push(Postavke.neprijatelj2);
  Postavke.neprijatelj2.visible=true;

  Postavke.neprijatelj3=new Neprijatelj(GAME.getSpriteLayer("neprijatelj"), 19, 11);
  GAME.addSprite(Postavke.neprijatelj3);
  Postavke.neprijatelji.push(Postavke.neprijatelj3);
  Postavke.neprijatelj3.visible=true;

  Postavke.kraj=new Kraj(GAME.getSpriteLayer("kraj"), 28, 16);
  GAME.addSprite(Postavke.kraj);

  Postavke.kotac=new Kotac(GAME.getSpriteLayer("kotac"),11);
  GAME.addSprite(Postavke.kotac);

  Postavke.vatra=new Vatra(GAME.getSpriteLayer("vatra"), 23, 16);
  GAME.addSprite(Postavke.vatra);






}

