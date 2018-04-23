var all_text=document.getElementById("text");
var search=document.getElementById("search");
var words=[];
function Show(text){
    console.log(text.value);
}
function WordArray(text){
    words=text.value.split(" ");
}
all_text.addEventListener("input",function(){WordArray(all_text)});
search.addEventListener("input",function(){Show(search)});