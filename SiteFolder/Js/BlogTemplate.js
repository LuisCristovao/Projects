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
let blog_configs = {
    "OL": {
        "class": "blog_li",
        "font-size": "1.5em",
        "name": "ol",
        "action": (el) => {
            let children = Array.from(el.children)
            children.filter(child => child.nodeName == "LI").forEach(child => {
                child.setAttribute("class", "blog_li")
            })
        }
    },
    "UL": {
        "class": "blog_li",
        "font-size": "1.5em",
        "name": "ul",
        "action": (el) => {
            let children = Array.from(el.children)
            children.filter(child => child.nodeName == "LI").forEach(child => {
                child.setAttribute("class", "blog_li")
            })
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
//functions-----------------------------------------------------
function copyCode(btn){
    var div=btn.parentElement
    var codeText=div.children[0]
    copyToClipboard(codeText.innerText)
}


async function getPages() {
    let response = await fetch('SiteFolder/DB/pages.json');
    let val = await response.json();
    return val
}

function adaptBlogContent() {

    let body_elements = Array.from(page_body.children)
    body_elements.filter(el => blog_configs[el.nodeName]).forEach(el => {
        blog_configs[el.nodeName]["action"](el)
    })

}

function myScrollTo(element_id) {
    let el = document.getElementById(element_id)
    scrollTo(0, el.offsetTop - 100)
}

function numeric(x) {
    return Number.parseInt(x[1]);
}

function f(array) {
    return fr(array, 0, 0)[0];
}

function struct(x) {
    return {
        element: x,
        sub: []
    }
}

function fr(array, index, level) {
    let ans = [];
    while (index < array.length) {
        const el = array[index]
        const numericEl = numeric(el.nodeName);
        const structEl = struct(el);
        if (level + 1 == numericEl) {
            ans.push(structEl);
            const next = fr(array, index + 1, level + 1);
            structEl.sub = next[0];
            index = next[1];
        } else {
            break;
        }
    }
    return [ans, index];
}

function createIndexLI(headers_struct_element) {
    const class_li = "blog_li_index"
    html = ""
    if (headers_struct_element["sub"].length > 0) {
        html += `<li class="${class_li}" onclick="myScrollTo('${headers_struct_element["element"].innerText.replaceAll(" ","-")}')">${headers_struct_element["element"].innerText}</li>`
        html += "<ul>"
        headers_struct_element["sub"].forEach(sub_el => {
            html += createIndexLI(sub_el)
        })
        html+="</ul>"

    } else {
        let nodeNumber = numeric(headers_struct_element["element"].nodeName)

        html += `<li class="${class_li}" onclick="myScrollTo('${headers_struct_element["element"].innerText.replaceAll(" ","-")}')">${headers_struct_element["element"].innerText}</li>`

    }
    return html
}

function createIndex() {
    let elements = Array.from(page_body.children)
    let headers = elements.filter(el => hs[el.nodeName] != null)
    headers.forEach(el => {
        //console.log(el.nodeName)
        el.setAttribute("id", el.innerText.replaceAll(" ", "-"))
    })

    let index_structure = f(headers)
    var html = "<ul>"
    index_structure.forEach(el => {
        html += createIndexLI(el)
    })
    html += "</ul>"
    index.innerHTML = html
}


//function createIndex() {
//    let elements = Array.from(page_body.children)
//    let headers = elements.filter(el => hs[el.nodeName] != null)
//    headers.forEach(el => {
//        console.log(el.nodeName)
//        el.setAttribute("id", el.innerText.replaceAll(" ", "-"))
//    })
//
//    
//    var html = "<ul>"
//    var first_h1 = true
//    var first_h2 = true
//    let class_val="blog_li_index"
//    headers.forEach((el,i) => {
//        if (el.nodeName == "H1") {
//            if (first_h1) {
//
//                html += `<li class="${class_val}" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
//                first_h1 = false
//            } else {
//                if(headers[i-1].nodeName!="H1"){
//                    //close all
//                    html += `</ul><li class="${class_val}" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
//                    first_h1 = false
//                    first_h2 = true
//                }
//                else{
//                    
//                    //close all
//                    html += `<li class="${class_val}" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
//                    first_h1 = false
//                    first_h2 = true
//                }
//            }
//        } else {
//            if (el.nodeName == "H2" && !first_h1) {
//                if (first_h2) {
//                    html += `<ul><li class="${class_val}" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
//                    first_h2 = !first_h2
//                } else {
//                    html += `<li class="${class_val}" onclick="myScrollTo('${el.innerText.replaceAll(" ","-")}')">${el.innerText}</li>`
//                }
//            } 
//        }
//        //html += `<li class="blog_li"><a href="#${el.innerText.replaceAll(" ","-")}">${el.innerText}</a></li>`
//    })
//    html += "</ul>"
//    index.innerHTML = html
//}
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
    setTimeout(createIndex, 500)
    setTimeout(adaptBlogContent, 500)

}
//main---------------------

init()
