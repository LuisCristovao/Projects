var html=document.getElementById("html");
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;
var body=document.getElementById("body");

var months=["Jan","Fev","Mar","Apr","May","Jun","Jul","Ago","Set","Out","Nov","Dez"]
var lines=31
var columns=12


function columnWidth(){
    return global_width*((global_width<=global_height)?0.5:0.2)
}
function headerHeight(){
    return global_height*0.20
}
function columnHeight(){
    return global_height*0.35
}

function setStyle(element,atributes){
    var properties=""
    for(key in atributes){
        properties+=key+":"+atributes[key]+";"
    }
    element.setAttribute("style",properties)        
}

function CreateDiv(left,top,width,height,color,position){
    var div=document.createElement("div");
    var body=document.getElementById("body");
    var atributes={"top":top,
                   "left":left,
                   "width":width,
                   "height":height,
                   //"background":color,
                   "position":position
                  }
    setStyle(div,atributes)
    
    return div
    //body.appendChild(hex)
}

function CreateButton(){
    var btn=document.createElement("div");
    setStyle(btn,{"position":"relative","background":"rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+","+Math.random()+")","border-radius":"50%","width":"80%","height":"80%"})
    var text=document.createElement("p")
    text.appendChild(document.createTextNode("ola"))
    
    
    btn.appendChild(text)
    if(global_width<=global_height){
        setStyle(text,{"text-align":"center","top":"35%","position":"inherit","font-size":"12vw"})
    }
    else{
        setStyle(text,{"text-align":"center","top":"35%","position":"inherit","font-size":"7vh"})
    }
    return btn
}

function CreateHeader(){
    var body=document.getElementById("body");
    body.innerHTML="";
    var header=CreateDiv(0,0,global_width,headerHeight(),"rgb(255,255,255)","absolute")
    for(var j=0;j<columns;j++){
        
        var headerblock=CreateDiv(j*columnWidth(),0,columnWidth(),headerHeight(),"rgb(255,255,255)","absolute")
        var h1=document.createElement("h1")
        h1.appendChild(document.createTextNode(months[j]))
        headerblock.appendChild(h1)
        if(global_width<=global_height){
                h1.setAttribute("style","font-size:15vw")
        }
        else{
                h1.setAttribute("style","font-size:10vh")
        }

        headerblock.setAttribute("align","center")
        header.appendChild(headerblock)
        
    }
    
    body.appendChild(header)
}


function CreateColumns(lines, columns){
    var body=document.getElementById("body");
    
    
    
    
    var table=CreateDiv(0,headerHeight(),global_width,global_height,"rgb(255,255,255)","absolute")
    
    var width_factor=columnWidth()
    var height_factor=columnHeight()
    
    
    var lines_elements=[];
    for(var i=0;i<lines;i++){
        
        for(var j=0;j<columns;j++){
            var column=CreateDiv(j*width_factor,i*height_factor,width_factor,height_factor,"rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+","+Math.random()+")","absolute")
            
            column.setAttribute("align","center")
            
            var btn=CreateButton()
            column.appendChild(btn)
            
            //line.appendChild(column)
            table.appendChild(column)
        }
    }
    
    body.appendChild(table)
}


window.onload=function(){
    //alert("hello");
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    prev_width=global_width;
    prev_height=global_height;
    
    CreateHeader()    
    CreateColumns(lines,columns)
    
    //setStyle(body,{"width":global_width,"height":global_height,"top":"0px","left":"0px","position":"absolute"})
    
    
}

//Main-------------------
function Main(){
    var html=document.getElementById("body");
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    //console.log("with: "+global_width)
    //console.log("height: "+global_height)
    if(prev_width!=global_width || prev_height!=global_height){
        console.log("change")
        prev_height=global_height
        prev_width=global_width
        
        CreateHeader()
        CreateColumns(lines,columns)
        
        //var body=document.getElementById("html");
        //setStyle(body,{"width":global_width,"height":global_height,"top":"0px","left":"0px","position":"absolute"})
    }
    setTimeout(Main,100);
}

setTimeout(Main,100);