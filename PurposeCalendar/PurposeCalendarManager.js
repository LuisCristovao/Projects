
var html=document.getElementsByTagName("html")[0];
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;




var test_array=["new year res ","alchool free", "rosary"]

function range(initial=0,end){
    var array=[]
    for(var i=initial;i<end;i++){
        array.push(i)
    }
    return array
}

function Highlight(el){
    el.style["text-decoration"]="underline"
}
function NotHighLight(el){
    el.style["text-decoration"]=""
}

function titleSize(){
    return (global_height>global_width)?"10vh":"7vw"
}
function tableFontSize(){
    return (global_height>global_width)?"7vh":"8vh"
}


function removeSubMenu(el){
    //el.get
    CreatePage()
}
function addSubMenu(el){
    prev_html=el.innerHTML;
    array=["Enter Calendar","export calendar","reset calendar","remove calendar"]
    new_html=prev_html
    
    for(var i in range(0,array.length)){
        new_html+="<ul><a href=#><li>"+array[i]+"</li></a></ul>"
    }
    el.innerHTML=new_html
    
    //update prev_width and height to not use createPage()
    html=document.getElementsByTagName("html")[0];
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    prev_width=global_width;
    prev_height=global_height;
    
    
    /*var ul=document.createElement("ul")
    var li=document.createElement("li")
    
    ul.appendChild(li)
    el.appendChild(ul)
    
    li*/
}

function clickAction(el){
    if(el.getAttribute("was_clicked")=="true"){
        el.setAttribute("was_clicked","false")
        removeSubMenu(el.parentElement)
    }
    else{
        el.setAttribute("was_clicked","true")
        addSubMenu(el.parentElement)
    }
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
    li.setAttribute("onmouseover","Highlight(this)")
    li.setAttribute("onmouseout","NotHighLight(this)")
    li.setAttribute("was_clicked","false")
    li.setAttribute("onclick","clickAction(this)")
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

