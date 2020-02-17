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

function rysujLinie(ctx, x1,y1, x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);    
    //the outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#666666';
    ctx.stroke();        
}

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

    




    //ctx.beginPath();
    // ctx.moveTo(20, 20);
    // ctx.lineTo(20, 150);
    // ctx.lineTo(150, 150);
    // ctx.lineTo(150, 20);
    // ctx.closePath();

    //ctx.fillRect(10,10,100,100);
    //ctx.fill;
    




  }