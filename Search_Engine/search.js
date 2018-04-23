var all_text=document.getElementById("text");
var search=document.getElementById("search");
var words=[];

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




function Show(text){
    console.log(text.value);
}
function WordArray(text){
    lines=text.value.split("\n");
    lines.forEach(function(line){
        line.split(' ').forEach(function(word){
            words.push(word);
        });
    });
        
    
}
function liveSearch(){
    //$('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">Bla1</p>');
    //$('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">Bla333</p>');
    var prev_words=[];
    prev_words.push("");
    search_text=search.value.toLowerCase();
    if(search.value==""){
        $('#live_search').html("");
        prev_words=[];
        prev_words.push("");
    }
    else{
        
        for(i=0;i<words.length ;i++){
            
            if(search_text.localeCompare(words[i].toLowerCase())==0){
                console.log(words[i]);
                prev_words.forEach(function(prev_word){
                    var count=0;
                    if(words[i].localeCompare(prev_word)!=0){
                        count++;
                    }
                    if(count==prev_words.length){
                        
                        prev_words.push(words[i]);
                        $('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">'+words[i]+'</p>');
                    }
                });
                
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