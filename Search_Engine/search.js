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


function supercompare(search_word,word){
    
    if(search_word.localeCompare(word)==0){
        return 1; //comparation index
    }else{
        var dif=Math.abs(search_word.length-word.length);
        var matches=0;
        for(i=0;i<word.length;i++){
            if(search_word[i]==word[i]){
                matches++;
            }
            
        }
        var compare_index=matches/(word.length+dif);
        return compare_index;
    }
}

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
    var max=0;
    var search_list={};
    var compare_list={};
    //order from best to worst
    var order_list=[];
    
    $('#live_search').html("");
        
    
    search_text=search.value.toLowerCase();
    if(search.value==""){
        $('#live_search').html("");
        
    }
    else{
        
        for(key in words){
            compare_index=supercompare(search_text,key.toLowerCase())
            //console.log("Compare index: "+compare_index);
            if(compare_index>0.3){
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
        //order array
        for(i=0;i<order_list.length;i++){
            var value=order_list[i][1];
            for(j=0;j<order_list.length;j++){
                if(order_list[j][1]<value){
                    auxj=order_list[j];
                    auxi=order_list[i];
                    order_list[i]=auxj;
                    order_list[j]=auxi;
                    
                }
            }
        }
        for(i=0;i<order_list.length;i++){
                $('#live_search').append('<p onmouseover="on(this,\'rgb(170,170,170)\')"  onmouseout="on(this,\'rgb(255,255,255)\')" onclick="put(this)">'+order_list[i][0]+' -> '+order_list[i][1]+'</p>');
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