
var html=document.getElementsByTagName("html")[0];
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;

var test_array=["new year res ababa ababsb ashjahgajs ","alchool free", "rosary"]

function range(initial=0,end){
    var array=[]
    for(var i=initial;i<end;i++){
        array.push(i)
    }
    return array
}


function titleSize(){
    return (global_height>global_width)?"10vh":"7vw"
}
function tableFontSize(){
    return (global_height>global_width)?"7vh":"8vh"
}

function CreateTableRow(string){
    var row=document.createElement("tr")
    var column=document.createElement("td")
    
    row.appendChild(column)
    
    var ul=document.createElement("ul")
    var li=document.createElement("li")
    ul.appendChild(li)
    column.appendChild(ul)
    
    var text=document.createTextNode(string+"(0/365)")
    li.appendChild(text)
    return row
    
    
}

function CreatePage(){
    var title=document.getElementById("title")
    title.style["font-size"]=titleSize()
    
    var table=document.getElementsByTagName("table")[0]
    table.style["font-size"]=tableFontSize()
    
    var tbody=document.getElementsByTagName("tbody")[0]
    tbody.innerHTML="";
    for(var i in range(0,test_array.length)){
        tbody.appendChild(CreateTableRow(test_array[i]))    
    }
}



//------Main------------

window.onload=function(){
    CreatePage()
    html=document.getElementsByTagName("html")[0];
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    prev_width=global_width;
    prev_height=global_height;
    requestAnimationFrame(Main)
}


function Main(){
    var html=document.getElementsByTagName("html")[0];
    
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    //console.log("with: "+global_width)
    //console.log("height: "+global_height)
    if(prev_width!=global_width || prev_height!=global_height){
        console.log("change")
        CreatePage()
        prev_height=global_height
        prev_width=global_width
        
        
    }
    requestAnimationFrame(Main)
}

