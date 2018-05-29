var all_text=document.getElementById("text");
var search=document.getElementById("search");
var load_bible=document.getElementById("lb");
var filter=document.getElementById("filter");
var info_text=document.getElementById("info_text");
var words={};
var prev_words={};
var wordArrayIndex=0;
var wordArrayLines=0;
//var step_div=100;
var wordcount=0;

var ordered_array_len=0;

prev_words['']='';

//percentage is a string in form '10%'
function Loading(percentage){
    real_percentage=parseInt(percentage.split('%')[0]);
    if(real_percentage>1){
        info_text.innerHTML='<h3><font color="lightgreen">You can start searching while the text is being processed!</font></h3>';
    }
    if(real_percentage<=100){
        
        $('#myBar').html(percentage+' getting words');
        $('#myBar').css('width',percentage);

        if(real_percentage>=100){
            setTimeout(function(){
                $('#myBar').html('0%');
                $('#myBar').css('width','0%');
            },1000);
        }
    }
    if(real_percentage>=100){
        info_text.innerHTML='<h3><font color="blue">Finished to get all words from text, there are: '+Object.keys(words).length+' unique words!</font></h3>';
        setTimeout(function(){},5000);
    }
}

function supercompare(search_word,word){
    //first method
    var dif=Math.abs(search_word.length-word.length);
    var matches=0;
    var missMatches=0;
    var word_freq={};
    var search_freq={}
    var compare_lenght=Math.floor(word.length*0.5);
    //first method
    for(i=0;i<compare_lenght;i++){
        if(search_word[i]==word[i]){
            matches++;
        }
    }
    
    var compare_index0=matches/(compare_lenght);
    
    
    //Second methods
    matches=0;
    missMatches=0;
    for(i=0;i<word.length;i++){
        //if not exists
        if(word_freq[word[i]]==null){
            word_freq[word[i]]=1;
        }//already exists
        else{
            var count=word_freq[word[i]];
            count++;
            word_freq[word[i]]=count;
        }
    }
    for(i=0;i<search_word.length;i++){
        //if not exists
        if(search_freq[search_word[i]]==null){
            search_freq[search_word[i]]=1;
        }//already exists
        else{
            var count=search_freq[search_word[i]];
            count++;
            search_freq[search_word[i]]=count;
        }
    }
    //
    matches=0;
    missMatches=0;
    for(var key in search_freq){
        //both have same letter
        if(search_freq[key]!=null && word_freq[key]!=null){
            
                
            //
            if(search_freq[key]==word_freq[key]){
                matches+=search_freq[key];
            }
            else{
                //give the lowest value of matches
                matches+=(search_freq[key]<word_freq[key])? search_freq[key] : word_freq[key];
                difference=Math.abs(search_freq[key]-word_freq[key]);
                missMatches+=difference;
            }
            
        }
        else{
            missMatches++;
        }
    }
    //count missmatches if word bigger than search word
    for(var key in word_freq){
        if(search_freq[key]==null && word_freq[key]!=null){
            missMatches++;
        }
    }
    var compare_index2=matches/(matches+missMatches);
   
    
    var compare_index=(compare_index2+compare_index0)/2;
    //
    return compare_index;
   
}

function Show(text){
    console.log(text.value);
}
function WordArray(){
    
    
    
        var line=wordArrayLines[wordArrayIndex];
        var percentage=Math.floor((wordArrayIndex/(wordArrayLines.length))*100);
        var step=Math.round(wordArrayLines.length/Math.ceil(0.1*wordArrayLines.length));
        Loading(percentage.toString()+'%');
        if(percentage<100){
            
            

            next_step=wordArrayIndex+step;
            if(next_step>wordArrayLines.length){
                next_step=wordArrayLines.length;
            }
            for(;wordArrayIndex<next_step;wordArrayIndex++){
                line=wordArrayLines[wordArrayIndex];
                line.split(' ').forEach(function(word){
                    word=word.replace(',','');
                    word=word.replace('.','');
                    word=word.replace(';','');
                    word=word.replace(':','');
                    word=word.replace('...','');
                    word=word.replace('?','');
                    word=word.replace('"','');
                    word=word.replace('(','');
                    word=word.replace(')','');
                    word=word.replace("'",'');
                    word=word.replace("!",'');
                    words[word]=word;
                    wordcount++;
                });
            }
            //wordArrayIndex++;

            window.requestAnimationFrame(WordArray);
        }
        else{
            window.cancelAnimationFrame(WordArray);
        }
    
    
}
function liveSearch(){
    //$('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">Bla1</p>');
    //$('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">Bla333</p>');
    var max=0;
    var search_list={};
    var compare_list={};
    //order from best to worst
    var order_list=[];
    var i=0;
    $('#live_search').html("");
        
    
    search_text=search.value.toLowerCase();
    if(search.value==""){
        $('#live_search').html("");
        
    }
    else{
        
        for(key in words){
            //Loading(Math.round((i/Object.keys(words).length)*100)+'%');
            //i++;
            compare_index=supercompare(search_text,key.toLowerCase())
            //console.log("Compare index: "+compare_index);
            if(compare_index>=filter.value){
                //prev_words[key]=key;
                if(search_list[key]==null){
                    //does not exist in search list
                        search_list[key]=compare_index;
                        
                }
            }
                        
        }        
          
        //dictionary to array
        for(key in search_list){
            order_list.push([key,search_list[key]]);
        }
        //order array with basic bubble sort
        var i=0;any_change=false;needs_change=true;
        while(needs_change && order_list.length>1){
            var value=order_list[i][1];
            j=i+1;
            if(order_list[j][1]>value){
                auxj=order_list[j];
                auxi=order_list[i];
                order_list[i]=auxj;
                order_list[j]=auxi;
                any_change=true;
            }
            i++;
            if(i==order_list.length-1){
                i=0;
                //There was no change so it's ordered
                if(!any_change){
                    needs_change=false;
                }
                else{
                    any_change=false;
                }
            }
        }
        for(i=0;i<order_list.length && order_list.length>0;i++){
                $('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">'+order_list[i][0]+' -> '+order_list[i][1]+'</p>');
        }
    }
}
    

function on(element,color_str){
    element.style.backgroundColor=color_str;
}
function put(element){
    
    search.value=element.innerHTML.split('-')[0];
}

//Send Http request to get bible text
function LoadBible(){
    load_bible.innerHTML="<h3>Loading...</h3>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            load_bible.innerHTML="<h3>Finished!</h3>";
            all_text.value=this.responseText;
            //initialize stuff
            words={};
            wordArrayIndex=0;
            wordArrayLines=all_text.value.split('\n');
            window.requestAnimationFrame(WordArray);
        }
    };
      xhttp.open('get', 'https://raw.githubusercontent.com/mxw/grmr/master/src/finaltests/bible.txt', true);
      xhttp.send();
}


all_text.addEventListener("input",function(){
    words={};
    wordArrayIndex=0;
    wordArrayLines=all_text.value.split('\n');
    window.requestAnimationFrame(WordArray);
});
search.addEventListener("input",function(){liveSearch();});
load_bible.addEventListener("click",LoadBible);