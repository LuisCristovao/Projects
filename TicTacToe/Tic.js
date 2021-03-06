


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
    //If we already now the state, we need to find the best play for that state
    
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
    //function that puts '1' in the matrix where there is a zero
    //state has form '100000100'
    static GenerateRandomPlay(state){
        var possibilities=['0','1'];
        var result=state;
        var zeros=[];
        //see zeros
        for(i=0;i<10;i++){
            //n equals 0 or 1;
            if(state[i]=='0'){
                zeros.push(i);
            }
        }
        //select random pos where there is a zero
        var n =Math.floor(Math.random()*zeros.length);
        var rindex=zero[n];
        //play
        result[rindex]='1';
        return result;
    }
    //Selects most similar state from saved states
    //dont know if just select when its equal or similar
    /*SelectBest(actual_state){
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
    }*/
    //actual state is a string like '002100000'
    SelectEqualState(actual_state){
        return this.states[actual_state]
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
                //var best_state= this.SelectBest(state);
                var best_state= this.SelectEqualState(state);
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
        this.Initialize();
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
    //replace 'num1' with 'num2'
    ChangeNumbersInMatrix(num1,num2,matrix){
         for(i=0;i<this.matrix_size;i++){
                for(j=0;j<this.matrix_size;j++){
                    if(matrix[i][j]==num1){
                        matrix[i][j]=num2;
                    }
                }
            }
    }
    /*CheckWinnner(){
        //winner[0]=true if player one is winner
        //winner[1]=true if player two is winner
        //if both are false than is still game on!
        var ones=[];
        var twos=[];
        var winner=[];
        var count=0;
        var neighbourstack=[];
        //pushing ones and twos to list
        for(i=0;i<this.matrix_size;i++){
                for(j=0;j<this.matrix_size;j++){
                    if(this.OneMatrix[i][j]=='1'){
                        ones.push([i,j]);
                    }
                    if(this.OneMatrix[i][j]=='2'){
                        twos.push([i,j]);
                    }
                }
        }
        //Now run algorithm that sees if player one wins
        for (i=0;i<ones.length;i++){
            var one_pos=ones[i];
            var dir=[];
            //if '1' have similar neighbour
            //put its neighbours in stack
            for(j=i+1;j<ones.length;j++){
                var neigh_pos=ones[j];
                //if the distance on x or y between the two '1' positions
                if(Math.abs(one_pos[0]-neigh_pos[0])==1 || Math.abs(one_pos[1]-neigh_pos[1])==1){
                    neighbourstack.push(neigh_pos);
                }
            }
            //Now we have one_pos neighbours lets see if there neighbours have other neighbours
            while
            
        }
        //Algorithm that sees if player two winned
        for (i=0;i<twos.length;i++){
            
        }
        
    }*/
    

    GetHumanPlayerPlay(){
        
    }
    BotPlay(state){
        //second param is the percentage for playing random 
        var play=this.brain.Play(state,0.5);
        
    }
    //if human is a player or not is the Bot boolean
    Play(Bot){
        //Player One time to play
        if(this.state==0){
            //if bot is a player
            if(Bot){
                //flatten matrix
                var actual_game_state=this.MatrixToString(this.OneMatrix);
                //0.5 is the percentage where the bot plays randomly
                var botplay= this.brain.Play(actual_game_state,0.5);
                //change player One matrix
                this.StringToMatrix(botplay,true);
                //change player two matrix 
                this.StringToMatrix(botplay,false);
                this.ChangeNumbersInMatrix('1','2',this.TwoMatrix);
                //draw what heppend
                this.draw_canvas.Draw(this.OneMatrix);
                this.state=2;
            }
            //if human player
            else{
                
            }
        }
        //alter playerOne Matrix and draw
        //if(this.state==1){
            
        //}
        //Player Two time to play
        //player two is always the bot
        if(this.state==2){
           //flatten matrix
                var actual_game_state=this.MatrixToString(this.TwoMatrix);
                //0.5 is the percentage where the bot plays randomly
                var botplay= this.brain.Play(actual_game_state,0.5);
                //change player Two matrix
                this.StringToMatrix(botplay,false);
                //change player One matrix 
                this.StringToMatrix(botplay,false);
                this.ChangeNumbersInMatrix('1','2',this.OneMatrix);
                //draw what heppend
                //One matrix is the reference matrix to draw
                this.draw_canvas.Draw(this.OneMatrix);
                this.state=4;
        }
        //alter player two Matrix and stuff
        if(this.state==3){
            
        }
        //Check winner and Run GameOver meaning save in brain plays
        if(this.state==4){
            
        }
    }
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
    document.body.innerHTML=out;
    var pb_btn=document.getElementById('pb');
    var bb_btn=document.getElementById('bb');
    var tb_btn=document.getElementById('tb');
    pb_btn.addEventListener('click',PlayerVsBot);
    bb_btn.addEventListener('click',BotVsBot);
}


//Main-----------------------------------

window.onload=Start();
