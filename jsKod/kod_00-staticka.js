class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }

 ///** @type {Mario} */
 static mario=null;
 static zmaj=null;

 /** @type {Vatra} */
static vatra=null;

/** @type {Gljiva} */
static gljiva=null;

/** @type {Kotac} */
static kotac = null;

/** @type {Kocka} */
static kocka=null;

/** @type {Coin} */
static coin = null;

/** @type {Kocka2} */
static kocka2=null;

/** @type {Neprijatelj} */
static neprijatelj1 = null;
static neprijatelj2=null;
static neprijatelj3=null;

/** @type {Podloga} */
static podloga=null;

/** @type {Projektil} */
static projektil;

/** @type {Cijev} */
static cijev;

//metoda koja brise globalne objekte kako ne bi doslo do bug-ova
static izbrisi(){
  Postavke.mario = null;
  Postavke.gljiva = null;
  Postavke.neprijatelj = null;
  Postavke.neprijatelj1 = null;
  Postavke.neprijatelj2 = null;
  Postavke.neprijatelj3 = null;
  Postavke.neprijatelji = [];
  Postavke.vatra = null;
  Postavke.kocka = null;
  Postavke.kocka2 = null;
  Postavke.coin = null;
  Postavke.kotac = null;
  Postavke.podloga1 = null;
  Postavke.podloga2 = null;
  Postavke.podloga = [];
  Postavke.projektil = null;
  Postavke.kraj = null;
}



/** @type {Kraj} */
static kraj;

static neprijatelji=[];
static projektili=[];
static podloga=[];
static kocke=[];
static odabrana;


static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


//static dno = 16*32;

static ukloniProjektil(p){
    for (let i = Postavke.projektili.length - 1; i >= 0; i--) {
      if (Postavke.projektili[i] === p) {
        Postavke.projektili.splice(i, 1); // brisanje i-tog elementa       
        console.log("uk");
        break; 
      }
    }
  }
}
