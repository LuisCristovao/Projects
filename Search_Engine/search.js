var all_text=document.getElementById("text");
var search=document.getElementById("search");
var words={};
var prev_words={};
prev_words['']='';
/*class ProLetter{
    contructor(letter,percentage){
        this.letter=letter;
        this.percentage=percentage;
    }
}

class ProWords{
    
    constructor(){
    
    }
    Study(word){
        for(i=0;i<word.length;i++){
            
        }
    }
}*/


/*function supercompare(original,tocompare){
    if(original.localeCompare(tocompare)==0){
        return 100;
    }else{
        
    }
}*/

function Show(text){
    console.log(text.value);
}
function WordArray(text){
    words={};
    lines=text.value.split("\n");
    lines.forEach(function(line){
        line.split(' ').forEach(function(word){
            word=word.replace(',','');
            word=word.replace('.','');
            word=word.replace(';','');
            word=word.replace(':','');
            word=word.replace('...','');
            words[word]=word;
        });
    });
        
    
}
function liveSearch(){
    //$('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">Bla1</p>');
    //$('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">Bla333</p>');
    
    $('#live_search').html("");
        prev_words={};
        prev_words['']='';
    
    search_text=search.value.toLowerCase();
    if(search.value==""){
        $('#live_search').html("");
        prev_words={};
        prev_words['']='';
    }
    else{
        
        for(key in words){
            
            if(search_text.localeCompare(key.toLowerCase())==0){
                console.log(key);
                //if key is already on liveserarch bar
                if(key in prev_words){
                    //do nothing
                }else{
                    
                        prev_words[key]=key;
                        $('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">'+key+'</p>');

                }        
            }
                
        }
    }
}
    

function on(element,color_str){
    element.style.backgroundColor=color_str;
}
function put(element){
    search.value=element.innerHTML;
}
all_text.addEventListener("input",function(){WordArray(all_text);});
search.addEventListener("input",function(){liveSearch();});