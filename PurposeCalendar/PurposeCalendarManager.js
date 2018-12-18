
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
        localStorage["PCM"]=JSON.stringify({})
        return {}
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

function hyperlinkStyle(){
    return "text-decoration:underline;color:#0183D9"
}

function updatePrevWidthHeight(){
     //update prev_width and height to not use createPage()
    html=document.getElementsByTagName("html")[0];
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    prev_width=global_width;
    prev_height=global_height;
}

function removeSubMenu(el){
    //el.get
    //CreatePage()
    var new_html='<td><ul><li onmouseover="Highlight(this)" onmouseout="NotHighLight(this)" was_clicked="false" onclick="clickAction(this)">'+el.innerText.split("\n")[0]+"</li></ul></td>"
    new_html+="<td><ul>(0/365)</ul></td>"
    //changing row
    el.parentElement.parentElement.innerHTML=new_html
    
}
function addSubMenu(el){
    
    //el.parentElement.parentElement.innerHTML="<td colspan='2'><ul><li>ola</li></ul></td>"
    
    //change array to map of option_name:function_to_execute()
    var map={"Enter Calendar":"enterCalendar(this)","Import Calendar":"importCalendar(this)","Export Calendar":"exportCalendar(this)","reset calendar":"resetCalendar(this)","remove calendar":"removeCalendar(this)"}
    
    var new_html="<td colspan='2'><ul>"+el.innerHTML.split("</ul")[0]+"<div>"

    for(var key in map){
        new_html+='<ul onclick="'+map[key]+'"><li style="'+hyperlinkStyle()+'">'+key+'</li></ul>'
    }
    new_html+="</ul></div></td>"
    //changing row
    el.parentElement.parentElement.innerHTML=new_html
    
    /*var ul=document.createElement("ul")
    var li=document.createElement("li")
    
    ul.appendChild(li)
    el.appendChild(ul)
    
    li*/
}


function enterCalendar(el){
    var calendar=el.parentElement.innerText.split("\n")[0];
    window.location.href="PurposeCalendar.html?"+calendar
}
function resetCalendar(el){
    var calendar=el.parentElement.innerText.split("\n")[0];
    delete localStorage[calendar]
    CreatePage()
}
function removeCalendar(el){
    var calendar=el.parentElement.innerText.split("\n")[0];
    delete localStorage[calendar]
    var aux=JSON.parse(localStorage["PCM"])
    delete aux[calendar]
    localStorage["PCM"]=JSON.stringify(aux)
    all_calendars=aux
    CreatePage()
    
}
function importCalendar(el){
    /*var calendar=el.parentElement.innerText.split("\n")[0];
    var calendar_json=JSON.parse(localStorage[calendar])
    if(global_height>global_width){
        
        el.parentElement.innerHTML='<textarea style="">sdwsdsw</textarea>'
    }else{
        
    }
    //update prev_width and height so that main does not createPage() again
    updatePrevWidthHeight()*/
    //console.log(el.parentElement)
    
    //Cannot be this it must be a input box as i did previously!!!
    el.parentElement.innerHTML='<textarea style="width:100%;height:100%">Paste JSON over this text!</textarea>'
    updatePrevWidthHeight()
}

function exportCalendar(){
    //need to put the json text in clipboard can see an example in site copy contact
    //put setimeout to warning the user of the json in clipboard and change back to normal view.
    /*var calendar=el.parentElement.innerText.split("\n")[0];
    var calendar_json=JSON.parse(localStorage[calendar])*/
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
    //update prev_width and height so that main does not createPage() again
    updatePrevWidthHeight()
}

function CreateTableRow(string){
    var row=document.createElement("tr")
    var column=document.createElement("td")
    var column2=document.createElement("td")
    
    row.appendChild(column)
    row.appendChild(column2)
    
    var ul=document.createElement("ul")
    var li=document.createElement("li")
    ul.appendChild(li)
    column.appendChild(ul)
    
    var text=document.createTextNode(string)
    li.appendChild(text)
    li.setAttribute("onmouseover","Highlight(this)")
    li.setAttribute("onmouseout","NotHighLight(this)")
    li.setAttribute("was_clicked","false")
    li.setAttribute("onclick","clickAction(this)")
    
    column2.innerHTML="<ul>(0/365)</ul>"
    
    
    
    return row
    
    
}

function createPC(event,input){
    if (event.keyCode == 13 ) {
        // Do something
        //alert(document.getElementsByTagName("input")[0].value);
        all_calendars[input.value]="(0/365)"
        localStorage["PCM"]=JSON.stringify(all_calendars)
        CreatePage()
    }
    
}
function createPCBtn(el){
    var input=el.parentElement.children[0]
    all_calendars[input.value]="(0/365)"
    localStorage["PCM"]=JSON.stringify(all_calendars)
    CreatePage()
}
function undoCreatePC(el){
    el.parentElement.parentElement.parentElement.innerHTML='<ul onclick="openInput(this)"><li style="'+hyperlinkStyle()+'">+ create purpose calendar</li></ul>'
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
    
    //update prev_width and height so that main does not createPage() again
    updatePrevWidthHeight()
}

function addNewPurposeCalendarRow(){
    var row=document.createElement("tr")
    var column=document.createElement("td")
    row.appendChild(column)
    column.setAttribute("colspan","2")
    column.innerHTML='<ul onclick="openInput(this)"><li style="'+hyperlinkStyle()+'">+ create purpose calendar</li></ul>'
    
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
    for(var key in all_calendars){
        tbody.appendChild(CreateTableRow(key))    
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

