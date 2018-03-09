


class Brain{
    constructor(){
        this.states={};
    }
    //find number of differences between two strings
    static FindDifferences(str1,str2){
        var number_of_differences=0;
        
        for(i=0;i<str1.length;i++){
            if(str1[i]!=str2[i]){
                number_of_differences++;
            }
        }
        
        return number_of_differences;
    }
    static SelectBestPlay(plays){
        //0-reward;1-play
        //initialize with 0 because all rewards are higher than 0
        
        var max_play=[0];
        for(play in plays){
            if(plays[play]>max_play[0]){
                max_play[0]=plays[play];//reward
                max_play[1]=play;//play string
            }
        }
        return max_play[1];
    }
    static GenerateRandomPlay(state){
        var possibilities=['0','1'];
        var result='';
        for(i=0;i<10;i++){
            //n equals 0 or 1;
            var n=Math.random();
            if(){
               
            }
            result+=possibilities[n];
        }
        return result;
    }
    
    SelectBest(actual_state){
        //min saves number of differences [0] and state [1]
        //initialize with 10 because the array could never have more than 10 differences
        var min=[10,'000000000'];
        //Go through each state and select the one that has less differences from actual state
        for(state in this.states){
            var n_diff =this.FindDifferences(state,actual_state);
            if(n_diff<min[0]){
                min[0]=n_diff;
                min[1]=state;
            }
        }
        //return state from brain with less differences
        //meaning more similar
        return min[1];
    }
    //add play to database
    AddPlay(state,play){
        this.states[state]={};
        var saved_play=this.states[state];
        //if already exists play increase its reward
        if(saved_play[play]!=null){
            saved_play[play]+=1;
        }
        //create new play
        else{
            saved_play[play]=1;
        }
    }
    Play(state, percentage){
        var n=Math.random();
        //play random play
        if(n<=percentage){
            return this.GenerateRandomPlay(state);
        }
        //select best option from Brain
        else{
            //if dictionary is empty
            if(Object.keys(this.states).length>0){
                
                //select closer state in brain to the received state
                var best_state= this.SelectBest(state);
                var plays= this.states[best_state];
                //select best play
                return this.SelectBestPlay(plays);
            }
            else{
                return this.GenerateRandomPlay(state);
            }
            
        }
        
    }
}
class Square{
    constructor(x,y,xsize,ysize){
        this.x=x;
        this.y=y;
        this.xsize=xsize;
        this.ysize=ysize;
    }
}

class DrawCanvas{
    constructor(matrix_size){
        this.c=document.getElementById('canvas');
        this.ctx=this.c.getContext('2d');
        this.matrix_size=matrix_size;
        this.matrix=[];
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
    Draw(x,y,color){
        var square=this.matrix[x][y];
        this.fillStyle=color;
        this.ctx.fillRect(square.x,square.y,square.xsize,square.ysize)
    }
    
    
}




class Game{
    constructor(brain,matrix_size){
        this.state=0;
        this.OneMatrix=[];
        this.OnePlays=[];
        this.TwoPlays=[];
        this.TwoMatrix=[];
        this.brain=brain;
        this.matrix_size=matrix_size;
        this.draw_canvas=new DrawCanvas(matrix_size);
    }
    Initialize(){
        for(i=0;i<this.matrix_size;i++){
            this.OneMatrix[i]=[];
            for (j=0;j<this.matrix_size;j++){
                this.OneMatrix[i][j]='0';
            }    
        }
        for(i=0;i<this.matrix_size;i++){
            this.TwoMatrix[i]=[];
            for (j=0;j<this.matrix_size;j++){
                this.TwoMatrix[i][j]='0';
            }    
        }
    }
    
    static MatrixToString(matrix){
        result='';
        for(i=0;i<matrix.legth;i++){
            for(j=0;j<matrix[i].length;j++){
                result+=matrix[i][j];
            }
        }
        return result;
    }
    StringToMatrix(string,One){
        if(One){
            var j=0;
            var firstTime=true;
            for(i=0;i<this.matrix_size;i++){
                for(j=0;j<this.matrix_size;j++){
                    this.OneMatrix[i][j]=string[i+j];
                }
            }
        }
        //player two
        else{
            var j=0;
            var firstTime=true;
            for(i=0;i<this.matrix_size;i++){
                for(j=0;j<this.matrix_size;j++){
                    this.TwoMatrix[i][j]=string[i+j];
                }
            }
        }
    }
    

    GetHumanPlayerPlay(){
        
    }
    BotPlay(state){
        //second param is the percentage for playing random 
        var play=this.brain.Play(state,0.5);
        
    }
    Play(){
        //Player One time to play
        if(this.state==0){
            
        }
        //alter playerOne Matrix and stuff
        if(this.state==1){
            
        }
        //Player Two time to play
        if(this.state==2){
            
        }
        //alter player two Matrix and stuff
        if(this.state==3){
            
        }
        //Check winner and Run GameOver
        if(this.state==4){
            
        }
    }
}


function PlayerVsBot(){
    
    
    
    
}
function BotVsBot(){
    
}

function Start(){
    out="<h1 >Welcome to 'Teach Bot how play tic tac toe'</h1>";
    out+="<h2>Select Option</h2>"
    out+="<button id='pb'>Player vs Bot Learning</button>";
    out+="<button id='bb'>Bot vs Bot Learning</button>";
    out+="<button id='tb'>Play against trained Bot</button>";
    document.body.innerHTML=out;
    var pb_btn=document.getElementById('pb');
    var bb_btn=document.getElementById('bb');
    var tb_btn=document.getElementById('tb');
    pb_btn.addEventListener('click',PlayerVsBot);
    bb_btn.addEventListener('click',BotVsBot);
}


//Main-----------------------------------
window.onload=Start();
