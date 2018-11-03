var global_width=window.innerWidth;
var global_height=window.innerHeight;
var body=document.getElementById("body");


function CreateHex(){
    var hex=document.createElement("div");
    var body=document.getElementById("body");
    var text=document.createElement("div")
    text.setAttribute("class","text")
    text.appendChild(document.createTextNode("Ola tudo bem!"))
    
    hex.setAttribute("class","hexagon")
    hex.appendChild(text)
    return hex
    //body.appendChild(hex)
}
function CreateColumns(columns, lines){
    var body=document.getElementById("body");
    var table=document.createElement("table");
    table.setAttribute("style","width:100%")
    var lines_elements=[];
    for(var i=0;i<lines;i++){
        var line=document.createElement("tr")
        table.appendChild(line)
        for(var j=0;j<columns;j++){
            var column=document.createElement("th")
            column.setAttribute("style","align:center")
            column.appendChild(CreateHex())
            line.appendChild(column)
        }
    }
    
    body.appendChild(table)
}


window.onload=function(){
    //alert("hello");
    global_width=window.innerWidth;
    global_height=window.innerHeight;
    CreateColumns(2,2)
    
}

//Main-------------------
function Main(){

    global_width=window.innerWidth;
    global_height=window.innerHeight;
    if(global_width>=global_height){
        
    }
    else{
        
    }
    setTimeout(Main,100);
}

setTimeout(Main,100);