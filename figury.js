"use strict";

//Klasa definijaca Kanwe; onomastyka TypMojaKanwa -> TMKanwa :
class TMKanwa {
    constructor(kanwa, dx, dy) {
        this.kanwa = kanwa; //odnosnik (pointer) reprezentujący fizyczna kanwe
        this.ctx   = kanwa.getContext("2d");   //pole na context
        this.dx    = dx;    //szerokosc kanwy w % rodzica
        this.dy    = dy;    //wysokosc kanwy  w % rodzica
        //
        // this.kanwa.style.backgroundColor = "red";
        //ustalenie fizycznych rozmiarow (bedzie mialo przelozenie na ekran!):
        this.kanwa.style.width  = dx+"%";
        this.kanwa.style.height = dy+"%";        

        //Dzwiek (nazwa figury) stowarzyszony z konkretnym egzemplarzem kanwy, ustawiany przez funkcje rysujace:
        this.plik = "alamakota.ogg";
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
        //ustawienie dzwieku do odegrania w razie klikniecia:
        this.plik = "snd/linia.ogg";
    }

    rysujOkrag(x0,y0,r) {
        this.ctx.arc(x0,y0, r, 0, Math.PI*2, true);
        this.zrobOutline();
        //ustawienie dzwieku do odegrania w razie klikniecia:
        this.plik = "snd/kolo.ogg";        
    }

    rysujKwadrat(x0,y0,r) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0-r/2, y0-r/2);
        this.ctx.lineTo(x0+r/2, y0-r/2);    
        this.ctx.lineTo(x0+r/2, y0+r/2);    
        this.ctx.lineTo(x0-r/2, y0+r/2);    
        this.ctx.closePath();
        //the outline
        this.zrobOutline();  
        //ustawienie dzwieku do odegrania w razie klikniecia:
        this.plik = "snd/kwadrat.ogg";
    }

    rysujProstokat(x0,y0,w,h) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0-w/2, y0-h/2);
        this.ctx.lineTo(x0+w/2, y0-h/2);    
        this.ctx.lineTo(x0+w/2, y0+h/2);    
        this.ctx.lineTo(x0-w/2, y0+h/2);    
        this.ctx.closePath();
        //the outline
        this.zrobOutline();        
        //ustawienie dzwieku do odegrania w razie klikniecia:
        this.plik = "snd/prostokat.ogg";
    }

    rysujTrojkatProstokatny(x0,y0,r) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0-r/2,y0-r/2);
        this.ctx.lineTo(x0+r/2, y0-r/2);    
        this.ctx.lineTo(x0+r/2, y0+r/2);    
        // this.ctx.lineTo(x0-r/2, y0+r/2);    
        this.ctx.closePath();
        //the outline
        this.zrobOutline();       
        //ustawienie dzwieku do odegrania w razie klikniecia:
        this.plik = "snd/trojkat.ogg";         
    }

    rysujTrojkatZwykly(x1,y1, x2,y2, x3,y3) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.lineTo(x3,y3);
        this.ctx.closePath();
        this.zrobOutline();    
        this.plik = "snd/trojkat.ogg";         
    }

    rysuj(i) {
    //Rysowanie figury na kanwie o indeksie i    
        switch(i) {
            case 0:  this.rysujProstokat(100,100,150,70); break;            
            case 1:  this.rysujLinie(100,20,100,180); break;
            case 2:  this.rysujLinie(30,30,170,170); break;
            case 3:  this.rysujLinie(20,100,180,100); break;
            case 4:  this.rysujOkrag(100,100,55); break;
            case 5:  this.rysujKwadrat(100,100,110); break;            
            case 6:  this.rysujTrojkatZwykly(50,50,150,20, 70,180); break;
            case 7:  this.rysujProstokat(100,100,70,140); break; 
            case 8:  this.rysujTrojkatProstokatny(100,100,-10*(i+5)); break;
        }
    }

    odegrajNazwe(delay) {
    //Odegranie nazwy stowarzyszonej z konkretnym egzemplarzem (instancją) obiektu-kanwy    
        var nazwaSound = new Audio(this.plik);
        setTimeout(() => nazwaSound.play(), delay);
    }

}   //koniec klasy TMKanwa


//Tablica 'kanwy' zostaje 'pobrana' z dokumentu, zeby potem mozna ja bylo wstawic do kanwyObj[]:
let kanwy = Array.from(document.querySelectorAll('canvas'));

//Zm. glob. -> w jakim stanie sa kanwy (duza/male):
let stanDuza = false;

let handleKlikOnKanwa = function (event) {
/* POKAZANIE DUZEJ CANWY Z POJEDYNCZA DUZA FIGURA */
/* Po kliknieciu na duzej - powrot do 9-ciu malych */

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
        //Korygowanie marginesu Top kliknietej kanwy - doswiadczalnie w zaleznosci od wiersza:
        event.target.style.marginTop = korektaMarginTop(indxKliknietej) ;
        stanDuza = true;
        //Odegranie kliknietej:
        kanwyObj[indxKliknietej].odegrajNazwe(150);
    }
    //Powrot do 9-ciu kmalych kanw:
    else {
        window.location.reload(false); //param. false -> wezmie z cache (if any)
        //podobno nalezy zwrocic false, jesli to refreshing after  onClick -> stackoverflow https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript :
        return false;
        stanDuza = false;
    }
}

function korektaMarginTop(idx) {
//Zwraca wartosc o jaka nalezy skorygowac margines malej kanwy o indeksie idx,
//(invoked only if the canvas is enlarged)
    var row = 0; 
    row = Math.trunc(idx/3); //ktory to wiersz -> 0,1,2
    return -(row*18)+'px'; //18->doswiadczalnie....
}


//Tablica obiektów TMKanwa:
let kanwyObj = [];
//Inicjowanie tablicy kanwyObj (32-procent szerokosci i wysokosci diva obejmujacego):
kanwy.forEach(kanwa=>kanwyObj.push(new TMKanwa(kanwa, 32,32)));

//Definiwanie zdarzenia onClick na każdej z kanw:
kanwyObj.forEach(elem=>elem.kanwa.onclick=handleKlikOnKanwa);
//Rysowanie figur na kanwach:
kanwyObj.forEach((elem,idx)=>elem.rysuj(idx));
