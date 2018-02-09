var c;
var ctx;
var mouse=[];
var matrix_size=10;
var canvas=[]

function MousePos(e){
    mouse[0]=e.clientX;
    mouse[1]=e.clientY;
    console.log(mouse);
    
    //Draw(mouse[0],mouse[1],"red");
}

function Draw(x,y,_color){
    var width=c.width;
    var height=c.height;
    //var xsquare_size=width/matrix_size;
    //var ysquare_size=height/matrix_size;
    //perc_x=x/width;
    //perc_y=y/height;
    
    ctx.fillStyle = _color
    console.log(x,y);
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
}

function MouseClick(){
    ctx.fillStyle="red";
    ctx.fillRect(0,0,10,10);
    
}

function Init(){
        
        c = document.createElement('canvas'),        
        ctx = c.getContext('2d'),
        cw = c.width = 20;
        ch = c.height = 20;

    for( var x = 0; x < cw; x++ ){
        for( var y = 0; y < ch; y++ ){
            n=Math.round(Math.random()*255);
            ctx.fillStyle = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
            ctx.fillRect(x, y, 1, 1);
        }
    }
    t=setInterval(function(){c = document.createElement('canvas'),        
        ctx = c.getContext('2d'),
        cw = c.width = 20;
        ch = c.height = 20;

        for( var x = 0; x < cw; x++ ){
            for( var y = 0; y < ch; y++ ){
                n=Math.round(Math.random()*255);
                ctx.fillStyle = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
                ctx.fillRect(x, y, 1, 1);
            }
        }
        },1000);
    
    //document.addEventListener("mousemove",MousePos,false);
    //document.addEventListener("click",MouseClick,false);
    document.body.style.background = 'url(' + c.toDataURL() + ')';
}


//_________________Main_________________________
/*window.onload=function(){ c=document.getElementById("canvas");
                         ctx=c.getContext("2d");
                         c.addEventListener("mousemove",MousePos,false);
                       };
*/
//window.onload=Init();

setInterval(function(){c = document.createElement('canvas');        
        ctx = c.getContext('2d');
        cw = c.width = 20;
        ch = c.height = 20;

        for( var x = 0; x < cw; x++ ){
            for( var y = 0; y < ch; y++ ){
                n=Math.round(Math.random()*255);
                ctx.fillStyle = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
                ctx.fillRect(x, y, 1, 1);
            }
        }
        },10);

//requestAnimationFrame(Draw(mouse[0],mouse[1],"red"));