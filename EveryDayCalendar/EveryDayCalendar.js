var html=document.getElementById("html");
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;
var body=document.getElementById("body");





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
                   "background":color,
                   "position":position
                  }
    setStyle(div,atributes)
    
    return div
    //body.appendChild(hex)
}


function CreateHeader(){
    var header=CreateDiv(0,0,global_width,global_height*0.20,"rgb(255,255,255)","absolute")
    var h1=document.createElement("h1")
    h1.appendChild(document.createTextNode("June"))
    header.appendChild(h1)
    if(global_width<=global_height){
            h1.setAttribute("style","font-size:15vw")
    }
    else{
            h1.setAttribute("style","font-size:10vh")
    }
    
     header.setAttribute("align","center")
    var body=document.getElementById("html");
    body.appendChild(header)
}


function CreateColumns(lines, columns){
    var body=document.getElementById("html");
    
    body.innerHTML="";
    
    
    var table=CreateDiv(0,global_height*0.20,global_width,global_height,"rgb(255,255,255)","absolute")
    
    var width_factor=global_width*((global_width<=global_height)?0.5:0.2)
    var height_factor=global_height*0.35
    
    
    var lines_elements=[];
    for(var i=0;i<lines;i++){
        //var line=CreateDiv(i*width_factor,i*height_factor,global_width,height_factor,"rgba(Math.random()*255,Math.random()*255,Math.random()*255,Math.random())","relative")
        //table.appendChild(line)
        for(var j=0;j<columns;j++){
            var column=CreateDiv(j*width_factor,i*height_factor,width_factor,height_factor,"rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+","+Math.random()+")","absolute")
            
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
        
    if(global_width<=global_height){

        CreateColumns(30,12)
    }
    else{
        CreateColumns(30,12)
    }
    CreateHeader()
    //setStyle(body,{"width":global_width,"height":global_height,"top":"0px","left":"0px","position":"absolute"})
    
    
}

//Main-------------------
function Main(){
    var html=document.getElementById("html");
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    console.log("with: "+global_width)
    console.log("height: "+global_height)
    if(prev_width!=global_width || prev_height!=global_height){
        console.log("change")
        prev_height=global_height
        prev_width=global_width
        if(global_width<=global_height){
            CreateColumns(30,12)
        }
        else{
            CreateColumns(30,12)
        }
        
        CreateHeader()
        //var body=document.getElementById("html");
        //setStyle(body,{"width":global_width,"height":global_height,"top":"0px","left":"0px","position":"absolute"})
    }
    setTimeout(Main,100);
}

setTimeout(Main,100);