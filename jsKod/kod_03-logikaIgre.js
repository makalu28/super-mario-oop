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
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "igra")
    level1();

  if (GAME.activeWorldMap.name=="level2") {
    level2();
  }
  /*if (GAME.activeWorldMap=="level3") {
    level3();
  }*/

  GAME.update();

};



function level1() {
  if (SENSING.right.active) {
    Postavke.mario.moveRight();
    //console.log(Postavke.mario.x); // da provjerim gdje je zadnja x koordinata
  }
  if (SENSING.left.active) {
    Postavke.mario.moveLeft();
  }

  if (SENSING.down.active) {
    Postavke.mario.moveDown();
  }


  if (SENSING.up.active) {
    let pod = "";
    for (let i = 0; i < Postavke.podloga.length; i++) {
      const k = Postavke.podloga[i];
      if (Postavke.mario.touching(k)) {
        pod="podloga";
      }
    }
    
    Postavke.mario.jump(pod);
    
  }

  //kad pritisne D puca
  if (SENSING.keyD.active) {
    if (!Postavke.mario.puca) {
      Postavke.mario.puca=true;
      Postavke.mario.pucaj();
    }
    else {
      Postavke.mario.puca=false;
    }

    for (let i = 0; i < Postavke.projektili.length; i++) {
    const p = Postavke.projektili[i];
    if(p.touching(Postavke.neprijatelj)){
      p.stop();
      Postavke.neprijatelj.visible = false;
      break;
    }
  }
  }
    
 
//ako dodirne kotac ili vatru smanjiva se
  if (Postavke.mario.touching(Postavke.vatra)|| Postavke.mario.touching(Postavke.kotac)) { 
    Postavke.mario.PromjenaStanja();
  }

  if (Postavke.mario.touching(Postavke.neprijatelj)) {
    Postavke.mario.PromjenaStanja();
  }


  if (Postavke.mario.touching(Postavke.podloga1) || Postavke.mario.touching(Postavke.podloga2)) {  //nevidljiva podloga koja onemogucuje igracu da skace kako bi teze izbjegao neprijatelja
    GameSettings.output("dira");  //provjera
  }


  if (Postavke.mario.touching(Postavke.neprijatelj)) {
    Postavke.mario.PromjenaStanja();
  }

   
Postavke.neprijatelj.pucanje();
Postavke.neprijatelj.updatePosition();
 
Postavke.mario.pokupiGljivu(Postavke.gljiva);
Postavke.mario.pokupiCoin(Postavke.coin);
  
Postavke.kotac.updatePosition();
Postavke.kocka.updatePosition();
Postavke.kocka2.updatePosition();
Postavke.coin.updatePosition();
Postavke.projektil.updatePosition();
  

// kad dode do zelene 'cijevi' i stisne donju tipku, a pri tom je skupio 3 coin-a i ubio neprijatelja prošao je level
if (SENSING.down.active && (Postavke.mario.x>=909 || Postavke.mario.x<925) && Postavke.mario.bodovi>=30 && Postavke.neprijatelj.visible==false) {
    btnGame.dispatchEvent(levelUpEvent);
}

}

function level2() {
  if (SENSING.right.active) {
    Postavke.mario.moveRight();
    //console.log(Postavke.mario.x); // da provjerim gdje je zadnja x koordinata
  }
  if (SENSING.left.active) {
    Postavke.mario.moveLeft();
  }

  if (SENSING.up.active) {
    Postavke.mario.jump(50);
  }

  if (SENSING.keyD.active) {
    if (!Postavke.mario.puca) {
      Postavke.mario.puca=true;
      Postavke.mario.pucaj();
    }
    else {
      Postavke.mario.puca=false;
    }

    for (let i = 0; i < Postavke.projektili.length; i++) {
    const p = Postavke.projektili[i];
    if(p.touching(Postavke.neprijatelj1 )){
      p.stop();
      Postavke.neprijatelj1.visible = false;
      break;
    }
    if(p.touching(Postavke.neprijatelj2 )){
      p.stop();
      Postavke.neprijatelj2.visible = false;
      break;
    }
    if(p.touching(Postavke.neprijatelj3 )){
      p.stop();
      Postavke.neprijatelj3.visible = false;
      break;
    }
    if (p.touching(Postavke.zmaj)) {
      p.stop();
      Postavke.zmaj.ubijZmaja();
      break;
    }
    if (p.touching(Postavke.kocka)) {
      p.stop();
      Postavke.kocka.razbij();
      Postavke.gljiva.dodajGljivu();
      break;
    }
    if (p.touching(Postavke.kocka2)) {
      p.stop();
      Postavke.kocka2.razbij();
      Postavke.coin.dodajCoin(Postavke.kocka2.x, Postavke.kocka2.y);
      break;
    }
  }
}

if ( Postavke.mario.touching(Postavke.kotac)) 
{ //ako dirne kotac smanji se
  Postavke.mario.PromjenaStanja();
}

if (Postavke.mario.touching(Postavke.vatra)) {
  Postavke.mario.PromjenaStanja();
}
if (Postavke.mario.touching(Postavke.coin)) {
  Postavke.coin.visible=false;
  Postavke.mario.bodovi=10;
}

//ako dodirne nekog od neprijatelja, promijeni stanje
for (let i = 0; i < Postavke.neprijatelji.length; i++) {
  const k = Postavke.neprijatelji[i];
  if (Postavke.mario.touching(k)) {
    Postavke.mario.PromjenaStanja();
  }
}

//ako je mario u blizini, zmaj ga napada
if (Postavke.zmaj.blizina(Postavke.mario)) {
  Postavke.zmaj.napadni(Postavke.mario);
}

if (Postavke.mario.touching(Postavke.zmaj)) {
  Postavke.mario.PromjenaStanja();
}

//ako ude u 'cijev' vrati se na početak
if (SENSING.down.active && (Postavke.mario.x<=360 && Postavke.mario.x>345)) {
    Postavke.mario.moveDown();
    Postavke.mario.start(0,1);
  }


  Postavke.neprijatelj1.updatePosition();
  Postavke.neprijatelj2.updatePosition();
  Postavke.neprijatelj3.updatePosition();

//mario mora ubiti zmaja, skupi bar 1 coin te doci kraja

if (Postavke.mario.touching(Postavke.kraj) && Postavke.zmaj.visible==false && Postavke.mario.bodovi>=10) {
  alert("BRAVO!!!")
  btnGame.dispatchEvent(winEvent);
  
}

Postavke.mario.pokupiGljivu(Postavke.gljiva);

Postavke.kotac.updatePosition();
Postavke.kocka.updatePosition();
Postavke.kocka2.updatePosition();
Postavke.neprijatelj1.updatePosition();
Postavke.neprijatelj2.updatePosition();
Postavke.neprijatelj3.updatePosition();
Postavke.coin.updatePosition();
Postavke.projektil.updatePosition();

    
}


