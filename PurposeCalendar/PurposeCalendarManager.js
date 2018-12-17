
var html=document.getElementsByTagName("html")[0];
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;




var all_calendars=getCalendars()


function getCalendars(){
    if(localStorage["PCM"]!=null){
        return JSON.parse(localStorage["PCM"])
    }
    else{
        localStorage["PCM"]=JSON.stringify([])
        return []
    }
}    
    
    
function range(initial,end){
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
function inputFontSize(){
    return (global_height>global_width)?"6vw":"6vh"
}
function tablePadding(){
    return (global_height>global_width)?"5%":"0%"
}

function removeSubMenu(el){
    //el.get
    //CreatePage()
    array=el.children
    
    for(var i=1;i<array.length;i++){
        array[i].innerHTML=""
    }
    
}
function addSubMenu(el){
    prev_html=el.innerHTML;
    array=["Enter Calendar","import calendar","export calendar","reset calendar","remove calendar"]
    new_html=prev_html
    
    for(var i=0;i<array.length;i++){
        new_html+="<ul><a href=#><li>"+array[i]+"</li></a></ul>"
    }
    el.innerHTML=new_html
    
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
    //update prev_width and height to not use createPage()
    html=document.getElementsByTagName("html")[0];
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    prev_width=global_width;
    prev_height=global_height;
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

function createPC(event,input){
    if (event.keyCode == 13 ) {
        // Do something
        //alert(document.getElementsByTagName("input")[0].value);
        all_calendars.push(input.value)
        localStorage["PCM"]=JSON.stringify(all_calendars)
        CreatePage()
    }
    
}
function createPCBtn(el){
    var input=el.parentElement.children[0]
    all_calendars.push(input.value)
    localStorage["PCM"]=JSON.stringify(all_calendars)
    CreatePage()
}
function undoCreatePC(el){
    el.parentElement.parentElement.parentElement.innerHTML='<ul onclick="openInput(this)"><a href="#"><li>+ create purpose calendar</li></a></ul>'
}
function okBtn(el){
    return '<button onclick="createPCBtn(this)" style="border-radius:50%;background:green;color:white;font-size:'+inputFontSize()+';margin-left:2%;">&#160;&#10004&#160;</button>';
}
function crossBtn(el){
    return '<button onclick="undoCreatePC(this)" style="border-radius:50%;background:red;color:white;margin-left:2%;font-size:'+inputFontSize()+'">&#160;&#10006&#160;</button>'
}
function openInput(el){
    var prev_html=el.innerHTML
    el.setAttribute("onclick","")
    el.innerHTML='<li><input onkeypress="createPC(event,this)" type="text" placeholder="Insert PC Name" style="width:70%;height:auto;font-size:'+inputFontSize()+';">'+okBtn(el)+crossBtn(el)+'</li>'
    
    //update prev_width and height to not use createPage()
    html=document.getElementsByTagName("html")[0];
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    prev_width=global_width;
    prev_height=global_height;
}

function addNewPurposeCalendarRow(){
    var row=document.createElement("tr")
    var column=document.createElement("td")
    row.appendChild(column)
    
    column.innerHTML='<ul onclick="openInput(this)"><a href="#"><li>+ create purpose calendar</li></a></ul>'
    
    return row
    
}
function CreatePage(){
    var title=document.getElementById("title")
    title.style["font-size"]=titleSize()
    
    var table=document.getElementsByTagName("table")[0]
    table.style["font-size"]=tableFontSize()
    
    table.style["padding-left"]=tablePadding()
    
    var tbody=document.getElementsByTagName("tbody")[0]
    tbody.innerHTML="";
    for(var i in range(0,all_calendars.length)){
        tbody.appendChild(CreateTableRow(all_calendars[i]))    
    }
    //Add create new purpose calendar row
    tbody.appendChild(addNewPurposeCalendarRow())
    
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

