let page_body = document.getElementById("blog_body")

let index = document.getElementById("blog_index")
var hs = {
    "H1": "H1",
    "H2": "H2",
    "H3": "H3",
    "H4": "H4",
    "H5": "H5",
    "H6": "H6"
}
let titels_subtitles_order = [
    {
        "element": "h1",
        "sub": [{
            "element": "h2",
            "sub": []
        }, {
            "element": "h2",
            "sub": []
        }]
    }, {
        "element": "h1",
        "sub": [{
            "element": "h2",
            "sub": []
        }, {
            "element": "h2",
            "sub": [
                {
                    "element": "h3",
                    "sub": []
                    }]
            }]
    }]
//functions-----------------------------------------------------
async function getPages() {
    let response = await fetch('SiteFolder/DB/pages.json');
    let val = await response.json();
    return val
}
function myScrollTo(element_id){
    let el=document.getElementById(element_id)
    scrollTo(0,el.offsetTop-100)
}
function createIndex() {
    let elements = Array.from(page_body.children)
    let headers = elements.filter(el => hs[el.nodeName] != null)
    headers.forEach(el => {
        console.log(el.nodeName)
        el.setAttribute("id", el.innerText.replaceAll(" ", "-"))
    })

    
    var html = "<ul>"
    var first_h1 = true
    var first_h2 = true
    headers.forEach((el,i) => {
        if (el.nodeName == "H1") {
            if (first_h1) {

                html += `<li class="blog_li" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
                first_h1 = false
            } else {
                if(headers[i-1].nodeName!="H1"){
                    //close all
                    html += `</ul><li class="blog_li" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
                    first_h1 = false
                    first_h2 = true
                }
                else{
                    
                    //close all
                    //html += `</li>`
                    first_h1 = false
                    first_h2 = true
                }
            }
        } else {
            if (el.nodeName == "H2" && !first_h1) {
                if (first_h2) {
                    html += `<ul><li class="blog_li" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
                    first_h2 = !first_h2
                } else {
                    html += `<li class="blog_li" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
                }
            } 
        }
        //html += `<li class="blog_li"><a href="#${el.innerText.replaceAll(" ","-")}">${el.innerText}</a></li>`
    })
    html += "</ul>"
    index.innerHTML = html
}
async function getHtml(filename) {
    let response = await fetch(filename);
    let val = await response.text();
    $("#blog_body").html(val)
}
async function loadPageContent() {
    let pages = await getPages()
    getHtml(pages[window.location.search]["page content"])
}

function init() {
    //Create Index for page
    //var hide_show_index_btn=document.getElementById("hide_show_index_btn")
    $("#hide_show_index_btn").click(() => {
        $("#blog_index").toggle("fast")
    })

    loadPageContent()

}
//main---------------------

init()
setTimeout(createIndex, 500)
