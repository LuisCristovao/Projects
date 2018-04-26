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

//percentage is a string in form '10%'
function Loading(percentage){
    $('#myBar').html(percentage);
    $('#myBar').css('width',percentage);
    if(percentage.localeCompare('100%')==0){
        setTimeout(function(){
            $('#myBar').html('0%');
            $('#myBar').css('width','0%');
        },1000);
    }
}

function supercompare(search_word,word){
    //first method
    var dif=Math.abs(search_word.length-word.length);
    var matches=0;
    var word_freq={};
    var search_freq={}
    for(i=0;i<word.length;i++){
        if(search_word[i]==word[i]){
            matches++;
        }

    }
    var compare_index0=matches/(word.length);
    var compare_index1=matches/(word.length+dif);
    //Second methods
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
            }
        }
    }
    var compare_index2=matches/word.length;
    var compare_index=(compare_index1+compare_index2)/2;
    
    //
    return compare_index;
   
}

function Show(text){
    console.log(text.value);
}
function WordArray(text){
    words={};
    lines=text.value.split("\n");
    var i=0;
    lines.forEach(function(line){
        Loading(Math.round((i/lines.length))*100+'%');
        line.split(' ').forEach(function(word){
            word=word.replace(',','');
            word=word.replace('.','');
            word=word.replace(';','');
            word=word.replace(':','');
            word=word.replace('...','');
            words[word]=word;
        });
        i++;
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
            if(compare_index>0.5){
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
//Send Http request to get bible text
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        all_text.value=this.responseText;
        WordArray(all_text);
    }
};
  xhttp.open('get', 'https://raw.githubusercontent.com/mxw/grmr/master/src/finaltests/bible.txt', true);
  xhttp.send();