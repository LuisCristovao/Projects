
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
    out+="<canvas id='canvas'></canvas>";
    document.body.innerHTML=out;
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
    pb_btn.addEventListener('click',PlayerVsBot);
    bb_btn.addEventListener('click',BotVsBot);
}


//Main-----------------------------------

window.onload=Start();
