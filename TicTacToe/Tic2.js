
class DrawCanvas{
    constructor(matrix_size){
        this.c=document.getElementById('canvas');
        this.ctx=this.c.getContext('2d');
        this.matrix_size=matrix_size;
        this.matrix=[];
        this.Initialize();
    }
    Initialize(){
        var width=this.c.width;
        var height=this.c.height;
        var xsize=width/this.matrix_size;
        var ysize=height/this.matrix_size;
        //Make matrix with squares
        for(i=0;i<this.matrix_size;i++){
            this.matrix[i]=[];
            for(j=0;j<this.matrix_size;j++){
                this.matrix[i]=[];
                this.matrix[i][j]=new Square(i*xsize,j*ysize,xsize,ysize);
            }
        }
        
    }
    //access matrix position like pixels
    Draw(state_matrix){
        var color;
        for(i=0;i<state_matrix.length;i++){
            for(j=0;j<state_matrix[0].length;j++){
                if(state_matrix[i][j]=='0'){
                    color='white';
                }
                if(state_matrix[i][j]=='1'){
                    color='blue';
                }
                if(state_matrix[i][j]=='2'){
                    color='red';
                }
                var square=this.matrix[x][y];
                this.fillStyle=color;
                this.ctx.fillRect(square.x,square.y,square.xsize,square.ysize)
            }
        }
        
    }
    
    
}

function InsertLayout(){
    var out = "<h1 id='info'></h1>";
    out+="<canvas id='canvas' width='500' height='500' onmousemove='MouseMove(event)' onmousedown='MouseClick()' onmouseup='MouseCancel()' style='border:1px solid #000000;'></canvas>";
    document.body.innerHTML=out;
}
function MouseMove(e){
    mouse[0]=e.clientX;
    mouse[1]=e.clientY;
    console.log(mouse);
}
function MouseClick(){
    console.log("Clicked on button"+' '+mouse[2]);
    mouse[2]=true;
}
function MouseCancel(){
    console.log("Stopped clicking!!"+' '+mouse[2]);
    mouse[2]=false;
}


function PlayerVsPlayer(){
    InsertLayout();
    
}
function PlayerVsBot(){
    
    
    
    
}
function BotVsBot(){
    var out = "Info ";
}

function Start(){
    out="<h1 >Welcome to 'Teach Bot how play tic tac toe'</h1>";
    out+="<h2>Select Option</h2>"
    out+="<button id='pb'>Player vs Bot Learning</button>";
    out+="<button id='bb'>Bot vs Bot Learning</button>";
    out+="<button id='tb'>Play against trained Bot</button>";
    out+="<button id='pp'>Player vs Player</button>";
    document.body.innerHTML=out;
    var pb_btn=document.getElementById('pb');
    var bb_btn=document.getElementById('bb');
    var tb_btn=document.getElementById('tb');
    var pp_btn=document.getElementById('pp');
    pb_btn.addEventListener('click',PlayerVsBot);
    bb_btn.addEventListener('click',BotVsBot);
    pp_btn.addEventListener('click',PlayerVsPlayer);
}


//Main-----------------------------------
//mouse[0]=x,mouse[1]=y,mouse[2]=true or false meaning it was pressed
var mouse=[];
window.onload=Start();
