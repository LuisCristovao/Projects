//variables---------------------------------
let project_configs = {
    "A": {
        "class": "btn btn-default btn-lg",
        "font-size": "2em",
        "name": "A",
        "action": (el) => {
            var html=""
            html+=`<div align="center">`
            
            el.target="_blank"
            let text=el.innerText
            el.innerHTML=`<button class="btn btn-default btn-lg" style="font-size:2em">${text}</button><br><br>`
            //el.setAttribute("class", "btn btn-default btn-lg")
            //el.style["font-size"] = "2em"
            html+=el.outerHTML
            html+=`</div>`
            el.outerHTML=html
        }
    },
    "IFRAME": {
        "width": "70%",
        "height": "250px",
        "name": "IFRAME",
        "action": (el) => {
            var html=""
            html+=`<div align="center">`
            
            el.style.width = "70%"
            el.style.height = "250px"
            el.style["padding-top"]="2%"
            html+=el.outerHTML
            html+=`</div>`
            el.outerHTML=html
        }
    },
    "P":{
        "action":(el)=>{
            el.style["padding-top"]="1%"
        }
    },
    "H1":{
        "action":(el)=>{
            var html=""
            html+=`<div align="center">`
            el.style["padding-bottom"]="2%"
            html+=el.outerHTML
            html+=`</div>`
            el.outerHTML=html
        }
    },
    "XMP":{
        "action":(el)=>{
            var html=""
            html+=`<div style="overflow:auto;background-color:hsl(1, 0%, 90%);border-radius:5px">`
            html+=el.outerHTML
            html+=`<button onclick="copyCode(this)" class="ripple">Copy</button>`
            html+=`</div>`
            el.outerHTML=html
     }
    }
        
}

//functions--------------------------------
function copyCode(btn){
    var div=btn.parentElement
    var codeText=div.children[0]
    copyToClipboard(codeText.innerText)
}

function adaptProjectContent() {
    let page_body = document.getElementById("project_body")
    let body_elements = Array.from(page_body.children)
    body_elements.filter(el => project_configs[el.nodeName]).forEach(el => {
        project_configs[el.nodeName]["action"](el)
    })

}
async function getPages() {
    let response = await fetch('SiteFolder/DB/pages.json');
    let val = await response.json();
    return val
}
async function getHtml(filename) {
    let response = await fetch(filename);
    let val = await response.text();
    $("#project_body").html(val)
}
async function loadPageContent() {
    let pages = await getPages()
    getHtml(pages[window.location.search]["page content"])
}

function init() {
    loadPageContent()
}
//Main--------------------------------------
init()
setTimeout(adaptProjectContent, 500)







//var prev_height = window.innerHeight
//var prev_width = window.innerWidth


/*function ChangeOrientation(){
    

    if(prev_width!=window.innerWidth || prev_height!=window.innerHeight){
        console.log("change")
        prev_height=window.innerHeight
        prev_width=window.innerWidth

        align_burguer();
    }
    requestAnimationFrame(ChangeOrientation)
}
requestAnimationFrame(ChangeOrientation)*/
