var html=document.getElementById("html");
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;
var body=document.getElementById("body");
//var purpose=document.title;
//purpose="Ola"

var months=["Jan","Fev","Mar","Apr","May","Jun","Jul","Ago","Set","Out","Nov","Dez"]
var days={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:30,9:31,10:31,11:30,12:31}
var lines=31
var columns=12


function columnWidth(){
    return global_width*((global_height>global_width)?0.5:0.1)
}
function headerHeight(){
    return global_height*0.1
}

function columnHeight(){
    return global_height*((global_height>global_width)?0.25:0.35)
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


function btnClick(btn){
    if(btn.getAttribute("isActive")=="false"){
        btn.style.background="hsl(0,100%,100%)"
        btn.setAttribute("isActive","true")
    }else{
        var color=btn.style.border.split(" ")[2]+btn.style.border.split(" ")[3]+btn.style.border.split(" ")[4]
        btn.style.background=color
        btn.setAttribute("isActive","false")
    }
}



function CreateButton(_text,_color,_month){
    
    var btn=document.createElement("div");
    //btn.setAttribute("valign","center")
    var width_height=80;
    var middle=(100-width_height)/2;
    
    setStyle(btn,{"position":"inherit","background":"hsla("+_color+",100%,60%,1)","border-radius":"50%","width":width_height+"%","height":width_height+"%","top":middle+"%","left":middle+"%","border":"5px solid hsla("+_color+",100%,60%,1)"})
    
    var text=document.createElement("p")
    
    text.appendChild(document.createTextNode(_text))
    
    
    btn.appendChild(text)
    if(global_height>global_width){
        setStyle(text,{"text-align":"center","position":"relative","font-size":"12vw","top":"0%"})
    }
    else{
        setStyle(text,{"text-align":"center","position":"relative","font-size":"2.5vw","top":"0%"})
    }
    
    
    btn.setAttribute("isActive","false")
    btn.setAttribute("id",_text+"/"+(_month+1));
    btn.setAttribute("onclick","btnClick(this)")
    //btn.addEventListener("click",btnClick(btn))
    
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
        if(global_height>global_width){
                h1.setAttribute("style","font-size:15vw;margin-top:0px;")
        }
        else{
                h1.setAttribute("style","font-size:4vw;margin-top:0px;")
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
    var height_factor=columnWidth()
    
    
    var lines_elements=[];
    for(var i=0;i<lines;i++){
        
        for(var j=0;j<columns;j++){
            var column=CreateDiv(j*width_factor,i*height_factor,width_factor,height_factor,"rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+","+Math.random()+")","absolute")
            
            column.setAttribute("align","center")
            
            if(i<days[j+1]){
                var btn=CreateButton(i+1,j*20,j)
                column.appendChild(btn)
            }
            
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