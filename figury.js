"use strict";

//Klasa definijaca Kanwe; onomastyka TypMojaKanwa -> TMKanwa :
class TMKanwa {
    constructor(kanwa, dx, dy) {
        this.kanwa = kanwa; //odnosnik reprezentujący fizyczna kanwe
        this.ctx   = kanwa.getContext("2d");   //pole na context
        this.dx    = dx;    //szerokosc kanwy w % rodzica
        this.dy    = dy;    //wysokosc kanwy  w % rodzica
        //
        // this.kanwa.style.backgroundColor = "red";
        //ustalenie fizycznych rozmiarow (bedzie mialo przelozenie na ekran!):
        this.kanwa.style.width  = dx+"%";
        this.kanwa.style.height = dy+"%";        
    }

    zrobOutline() {
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#000000';
        this.ctx.stroke();        
    }

    rysujLinie(x1,y1, x2,y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);    
        //the outline
        this.zrobOutline();
    }

    rysujOkrag(x0,y0,r) {
        //this.ctx.arc(100, 100, 50, 0, Math.PI*2, true);
        this.ctx.arc(x0,y0, r, 0, Math.PI*2, true);
        this.zrobOutline();
    }

    rysujKwadrat(x0,y0,r) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0-r/2,y0-r/2);
        this.ctx.lineTo(x0+r/2, y0-r/2);    
        this.ctx.lineTo(x0+r/2, y0+r/2);    
        this.ctx.lineTo(x0-r/2, y0+r/2);    
        this.ctx.closePath();
        //the outline
        this.zrobOutline();        
    }

    rysujTrojkat(x0,y0,r) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0-r/2,y0-r/2);
        this.ctx.lineTo(x0+r/2, y0-r/2);    
        this.ctx.lineTo(x0+r/2, y0+r/2);    
        // this.ctx.lineTo(x0-r/2, y0+r/2);    
        this.ctx.closePath();
        //the outline
        this.zrobOutline();        
    }

}   //koniec klasy TMKanwa


//Tablica 'kanwy' zostaje 'pobrana' z dokumentu, zeby potem mozna ja bylo wstawic do kanwyObj[]:
let kanwy = Array.from(document.querySelectorAll('canvas'));

//Zm. glob. -> w jakim stanie sa kanwy (duza/male):
let stanDuza = false;

let handleKlikOnKanwa = function (event) {
/* POKAZANIE DUZEJ CANWY Z POJEDYNCZA DUZA FIGURA */
    var indxKliknietej = -1;   

    if (!stanDuza) {
        //Chowanie wszystkich, pokazanie w powiekszeniu kanwy kliknietej:
        for (let i=0; i<kanwyObj.length; i++) {
            if (kanwyObj[i].kanwa!==event.target) {
                kanwyObj[i].kanwa.style.display = "none";
            }
            else 
              //przechwycenie indeksu kliknietej:
              indxKliknietej = i;
        }
        //Powiekszanie kliknietej:
        event.target.style.width  = "97%";
        event.target.style.height = "97%";
        //Korygowanie marginesu kliknietej kanwy - doswiadczalnie w zaleznosci od wiersza:
        event.target.style.marginTop = korektaMarginTop(indxKliknietej) ;
        stanDuza = true;
    }
    //Powrot do 9-ciu kmalych kanw:
    else {
        event.target.style.width  = "32%";
        event.target.style.height = "32%";
        for (let i=0; i<kanwyObj.length; i++) {
            (kanwyObj[i].kanwa.style.display = "inline-block")
        }
        stanDuza = false;
    }
}

function korektaMarginTop(idx) {
//Zwraca wartosc o jaka nalezy skorygowac margines kanwy o indeksie idx,
//(invoked only if the canvas is enlarged)
    var row = 0; //ktory to wiersz -> 0,1,2
    row = Math.trunc(idx/3);
    return -(row*18)+'px';
}


//Tablica obiektów TMKanwa:
let kanwyObj = [];
// kanwy.forEach(kanwa=>kanwyObj.push(new TMKanwa(kanwa, 32.9,32.9)));
kanwy.forEach(kanwa=>kanwyObj.push(new TMKanwa(kanwa, 32,32)));

//Definiwanie zdarzenia onClick na każdej z kanw:
kanwyObj.forEach(elem=>elem.kanwa.onclick=handleKlikOnKanwa);


//rysowanie linii na kazdej:
// kanwyObj.forEach((elem,ind)=>elem.rysujLinie(10,10,150,20*ind));

//rysowanie kola na kazdej:
kanwyObj.forEach((elem,ind)=>elem.rysujOkrag(100,100,10*(ind+1)));


//rysowanie kwadratu na kazdej:
// kanwyObj.forEach((elem,ind)=>elem.rysujKwadrat(100,100,10*(ind+1)));


//rysowanie trojkata na kazdej:
kanwyObj.forEach((elem,ind)=>elem.rysujTrojkat(100,100,10*(ind+1)));










//rysowanie testowe - wywalic....
//ctxy.forEach(elem=>rysujTrojkat(elem, 0,0, 100,100, 150,100));
//kanwyObj.forEach(blabla=>blabla.rysujLinie(10,10, 100,10));
// for (let i=0; i<kanwyObj.length; i++) {
//     kanwyObj[i].rysujLinie(10,10,100,10);
// }




function rysujTrojkat(ctx, x1,y1, x2,y2, x3,y3) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.closePath();
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();    
    //ctx.fill();
}
/*
function rysujLinie(ctx, x1,y1, x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);    
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();        
}
*/

/*
window.onload=function() {
    //Rysowanie:

    // the Triangle
    var canvasElement = document.querySelector("#k0");
    var ctx = canvasElement.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 150);
    ctx.lineTo(150, 150);
    ctx.closePath();
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();

    //the Circle:
    canvasElement = document.querySelector("#k1");
    ctx = canvasElement.getContext("2d");
    ctx.arc(100, 100, 50, 0, Math.PI*2, true);
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();    

    //the Rectangle vertical:
    canvasElement = document.querySelector("#k2");
    ctx = canvasElement.getContext("2d");
    ctx.rect(30,30, 80,150);
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();        

    //the Line vertical:
    canvasElement = document.querySelector("#k3");
    ctx = canvasElement.getContext("2d");
    this.rysujLinie(ctx, 100,10, 100, 180);

   
    //the Square:
    canvasElement = document.querySelector("#k4");
    ctx = canvasElement.getContext("2d");
    ctx.rect(40,40, 110,110);
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();        

    //the Line horizontal:
    canvasElement = document.querySelector("#k5");
    ctx = canvasElement.getContext("2d");
    rysujLinie(ctx, 30,100, 180,100);
        

    //the Rectangle horizontal:
    canvasElement = document.querySelector("#k6");
    ctx = canvasElement.getContext("2d");
    ctx.rect(20,60, 150,70);
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    
    //the Triangle 2:
    canvasElement = document.querySelector("#k7");
    ctx = canvasElement.getContext("2d");
    this.rysujTrojkat(ctx, 20,180, 180,180, 100,10);

    //the Line askew:
    canvasElement = document.querySelector("#k8");
    ctx = canvasElement.getContext("2d");    
    rysujLinie(ctx, 40,10, 150,190);

  }
  */