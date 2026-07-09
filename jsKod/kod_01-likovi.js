//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

// ovdje pišete svoje klase

class Mario extends Sprite {
    #zivoti;
    constructor(x,y, layer) {
        super(x, y, 32-1, 32-1);
        this.x=x;
        this.y=y;
        this.height=50;
        this.width=50;
        this.frame_sets = {
            "up": [9],
            "walk-up": [9],
            "right": [5],
            "walk-right": [5, 6, 7, 8],
            "down": [9],
            "walk-down": [9],
            "left": [1],
            "walk-left": [1, 2, 3, 4]
        };

        this.#zivoti = 3;
        this.layer = layer;
        this.visible = true; //tek kad se postavi layer*/
        this.bodovi = 0;
        this.stanje = "veliki";
        this.puca = false;
        
    }
    get zivoti(){
        return this.#zivoti;
    }
    set zivoti(v){
        if (v<=0) {
            this.#zivoti = 0;
            
        }
        else{
            this.#zivoti = v;
        }

    }
    moveRight(){
        this.direction = 90;
        this.velocity_x += 1.7;
    }

     moveLeft() {
        this.direction = 270;
        this.velocity_x -= 1;
    }

    //premoscivanje
    jump(h=60){
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= h;
        }
    }
 
//preopterecenje
    jump() {
    let a = arguments.length;
    if (a == 1) a = typeof arguments[0];

    switch (a) {
      case "number":
        let h = arguments[0];
        super.jump(h); 
        break;
      case "string":
        let vrsta = arguments[0];
        if (vrsta == "podloga") {
          console.log("Ne mogu skakati");
        }
        else{
            super.jump();
        }
        break;
        default:
            break;
  }
}


  
  start(x, y){
    this.x = x;
    this.y = y;
    this.stanje = "veliki";
    this.height = 50;
    this.width = 50; 
  }

  PromjenaStanja(){   //kad dirne nesto sto ne smi smanji se
    if (this.stanje == "veliki") {
        this.stanje = "mali";
        this.width = 35;
        this.height = 35;
        GameSettings.output("Mario se smanjio");

    }
    else if (this.stanje == "mali"){
            this.#zivoti--;
            this.start(0,8);
            if (this.zivoti<1) {
                GameSettings.output("Mario umro");
                //kad izgubi zivote tad je gameover
                btnGame.dispatchEvent(gameoverEvent);
                alert("Izgubio si 3 zivota! GAME OVER")
            }
        }
  }

  updatePosition(){
    super.updatePosition(2,0.8);
    //za pucanje kocke skakanjem
    if (this.y > Postavke.kocka.y && // ispod kocke
        this.velocity_y < 0 && this.touching(Postavke.kocka)) // ide prema gore  i dira kocku
        {
            Postavke.kocka.razbij();
            Postavke.gljiva.dodajGljivu();
        }
    
    for (let i = 0; i < Postavke.kocke.length; i++) {
        let k = Postavke.kocke[i];
        if (this.y>k.y &&
            this.velocity_y<0 && this.touching(k)) 
        {
            console.log("tu je");
            k.razbij();
            Postavke.coin.dodajCoin(k.x, k.y);
        }
        
    }
}

  pokupiGljivu(g){  //ako dirne gljivu ona ga poveca
    if (this.touching(g)) {
        g.visible=false;
        if (this.stanje=="mali") {
            this.stanje="veliki";
            this.width=50;
            this.height=50;
            GameSettings.output("Mario dirno gljivu");
        }
    }
  }

  pokupiCoin(c){
    if (this.touching(c)) {
        //c.visible=false;
        this.bodovi+=10;
        Postavke.coin.dodajCoin();
        GameSettings.output("Bodovi: "+this.bodovi);
        
    }

  }

  //pucanje projektila
  pucaj(){
    let p = new Projektil(GAME.getSpriteLayer("projektil"));
    GAME.addSprite(p);

    p.rbr=Postavke.projektili.length;
    Postavke.projektili.push(p);

    p.x=this.x;
    p.y=this.y;
    p.direction=this.direction;

    p.put=0;
    p.visible=true;
    p.move=true;
  }
 
}

class Zmaj extends Sprite{
    #zivoti;
    constructor (x, y, layer){
        super(x, y, 32-1, 32-1);

        this.frame_sets = {
            "up": [8],
            "walk-up": [8],
            "right": [5],
            "walk-right": [5, 6, 7, 8],
            "down": [9],
            "walk-down": [9],
            "left": [1],
            "walk-left": [1, 2, 3, 4]
        };

        this.layer = layer;
        this.visible = true;
        this.height=30;
        this.width=30;
        this.puca=false;
        this.#zivoti=3;
    }

    get zivoti(){
        return this.#zivoti;
    }
    set zivoti(v){
        if (v<=0) {
            this.#zivoti=0;
            
        }
        else{
            this.#zivoti=v;
        }

    }

    moveLeft() {
        this.direction = 270;
        this.velocity_x -= 0.6;
    }

    moveRight() {
        this.direction = 90;
        this.velocity_x += 0.6;
    }

    //ako je igrac u blizini

    blizina(igrac){
        let dx=Math.abs(this.x - igrac.x);
        let dy = Math.abs(this.y-igrac.y);
        
        //proizvoljno odabrano koliko ce biti blizu
        return dx<180 && dy<60;
    }

    napadni(igrac){
        if (igrac.x>this.x) {
            this.velocity_x=4;
        }
        else{
            this.velocity_x=-4;
        }
    }

    //zmaj ima 3 zivota
    ubijZmaja(){
        console.log("Preostalo: "+ this.#zivoti);
        this.#zivoti--;
        if (this.#zivoti==0) {
            Postavke.zmaj.visible=false;
        }
    }


   updatePosition(){
    super.updatePosition(2, 0.8); 
}  
}



class Neprijatelj extends Item {
    constructor(layer,x, y) {
        super(layer);
        this.x=x*32;
        this.y=y*32-1; //zbog kolizije jer se onda ne zeli pomjerati
    
        this.minX=this.x;
        this.maxX=this.x+200;
        this.movingRight=true;
        this.velocity_x=2;
        this.puca=false;
        this.visible=false;
}


pucajlijevo(){
    let p = new Projektil(GAME.getSpriteLayer("projektil"));
    GAME.addSprite(p);

    p.rbr=Postavke.projektili.length;
    Postavke.projektili.push(p);

    p.x=this.x;
    p.y=this.y;
    p.direction=this.direction;

    p.put=0;
    p.visible=true;
    p.move=true;

}
pucajdesno(){
    let p = new Projektil(GAME.getSpriteLayer("projektil"));
    GAME.addSprite(p);

    p.rbr=Postavke.projektili.length;
    Postavke.projektili.push(p);

    p.x=this.x;
    p.y=this.y;
    p.direction=90;

    p.put=0;
    p.visible=true;
    p.move=true;

}

blizina(igrac){
        let dx=Math.abs(this.x - igrac.x);
        let dy = Math.abs(this.y-igrac.y);

        return dx<120 && dy<60;
}

//ako je Mario u blizini neprijatelj se pucati, ako ne samo ce se kretati
pucanje(){
if (this.blizina(Postavke.mario) && this.visible==true && Postavke.mario.x > this.x){
    if (!this.puca) {
        this.puca=true;
        this.pucajdesno();
            console.log("puca");
    }
    else {
      this.puca=false;
    }

    for (let i = 0; i < Postavke.projektili.length; i++) {
    const r = Postavke.projektili[i];
    if(r.touching(Postavke.mario)){
      r.stop();
      Postavke.mario.PromjenaStanja();
      break;
    }
  }

} else if (this.blizina(Postavke.mario) && this.visible==true && Postavke.mario.x < this.x){
    if (!this.puca) {
        this.puca=true;
        this.pucajlijevo();
            console.log("puca");
    }
    else {
      this.puca=false;
    }

    for (let i = 0; i < Postavke.projektili.length; i++) {
    const r = Postavke.projektili[i];
    if(r.touching(Postavke.mario)){
      r.stop();
      Postavke.mario.PromjenaStanja();
      break;
    }
  }

}

}


updatePosition(){
    if (this.movingRight) {
        this.x+=this.velocity_x;
        if (this.x >= this.maxX) {
            this.movingRight = false;
        }
    } else {
        this.x-=this.velocity_x;
        if (this.x <= this.minX) {
            this.movingRight = true;
        }
    }
   }
}


class Cijev extends Item {
    constructor(layer, x, y) {
        super(layer);
        this.x=x*32;
        this.y=y*32;
        this.visible=true;
    }

    updatePosition(){}
}

class Vatra extends Item {
    constructor(layer,x, y) {
        super(layer);
        
        this.x=x*32;
        this.y=y*32;
        this.visible=true;
    }

    updatePosition(){}
  }

class Collectable extends Item{
    constructor(layer){
        super(layer);
        this.visible=true;
    }

    getType(){
        return this.constructor.name;
    }
}

class Coin extends Collectable {
    constructor(layer) {
        super(layer);
        this.visible=false;
        this.value=10;
    }

    dodajCoin(x,y){
        this.x=x;
        this.y=y;
        this.visible=true;
        
    }
   
    ukloniCoin(){
        this.visible=false;
    }
    updatePosition(){}
}

class Projektil extends Item {
    #put;
    constructor(layer) {
        super(layer);
        this.visible=false;
        this.put=0;
        this.move=true;
        this._collidedPlatform="";
    }

    get collidedPlatform(){
        return this._collidedPlatform;
    }
    set collidedPlatform(v){
        if (v!="") {
            this.stop();
        }
        this._collidedPlatform=v;
    }

    get put(){
        return this.#put;
    }
    set put(v){
        if (v >= 200) {
      this.#put = 0;
      this.stop(); // vraća sve postavke za projektil
    }
    else {
      this.#put = v;
    }

    }

     updatePosition() {
    if (this.move) {

      // ovo mora biti prije promjene x-a kako bi se ponašalo "normalno"
      // kod dodira s platformom (update old_x i old_y)
      //super.updatePosition();

      // kretanje projektila po posebnim pravilima
      if (this.direction == 90) {
        this.x += 10; // ide desno
        this.put += 10; // povećava put
      }
      else {
        this.x -= 10; // ide lijevo
        this.put += 10; // povećava put
      }

    }
  }

  stop() {
    this.visible = false;
    this.move = false;

    // popis svih likova u mapi
    let sprites = GAME.activeWorldMap.sprites;

    // izbaci onog koji staje (tako da se više ne crta)
    for (let i = sprites.length - 1; i >= 0; i--) {
      if (sprites[i] === this) {
        sprites.splice(i, 1); // brisanje i-tog elementa        

        Postavke.ukloniProjektil(this);

        break;
      }
    }

  }
}

class Gljiva extends Collectable{
    constructor(layer, x, y) {
        super(layer);
        this.x=x*32;
        this.y=y*32;
        this.visible=false;

    }

    dodajGljivu(){
        this.visible=true;
    }
    ukloniGljivu(){
        this.visible=false;
    }

    updatePosition(){}
}

class Kocka extends Item {
    constructor(layer, x, y) {
        super(layer);
        this.x=x*32;
        this.y=y*32; 
        this.visible=true;
    }

    razbij(){
        this.visible=false;
    }

    updatePosition(){}
   
}
class Kocka2 extends Kocka{
    constructor(layer, x, y) {
        super(layer, x, y);
        this.x=x*32;
        this.y=y*32;
        this.visible=true;
        
    }
    updatePosition(){}
}
class Podloga extends Item{  //dodala nevidljivu podlogu koja ce smetati pri skakanju na odredenom mjestu
    constructor(layer, x, y){
        super(layer);
        this.x=x*32;
        this.y=y*32;
        this.visible=true;
    }
    updatePosition(){}
}


class Kotac extends Item {
    constructor(layer, y) {
        super(layer);
        this.visible=true;
        this.x=0;
        this.y=y*32-1;
        this.minX=this.x;
        this.maxX=this.x+200;
        
        this.movingRight=true;
        this.velocity_x=0;
    }

    moveLeft(){
        this.direction=270;
        this.velocity_x-=0.1;

    }
   moveRight(){
        this.direction=90;
        this.velocity_x+=0.1;
    }


    updatePosition(){
        if (this.movingRight) {
        this.moveRight();
        if (this.x >= this.maxX) {
            this.movingRight = false;
        }
    } else {
        this.moveLeft();
        if (this.x <= this.minX) {
            this.movingRight = true;
        }
    }

    // Ažuriraj poziciju
    this.x += this.velocity_x;
    }
}


class Kraj extends Item{
    constructor(layer, x, y) {
        super(layer);
        this.x=x*32;
        this.y=y*32;
        this.visible=true;
    }

    updatePosition(){}
}





    


