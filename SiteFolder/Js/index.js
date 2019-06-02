//------------------------------------------------
//global variables
var server;
var scroll;
var search_engine;
//global functions-------------------------------------
function doesSearchTagExists(search_tag) {
    var tagsdb = search_engine.tagsdb
    for (var key in tagsdb) {
        for (var subkey in tagsdb[key]) {
            if (subkey == search_tag) {
                return true
            }
        }
    }
    return false
}

function getFirstSuggestion(input_value) {
    var suggestions = document.getElementById("suggestions")
    if (suggestions != null) {
        var first_suggestion = suggestions.children[0].children[0].innerText
        var query_words = input_value.split(" ")
        //if last query tag does not exists choose the first suggestion
        if (!doesSearchTagExists(query_words[query_words.length - 1])) {
            query_words[query_words.length - 1] = first_suggestion
        }
        if (query_words.length - 1 != 0) {

            return query_words.reduce((e1, e2) => {
                return `${e1} ${e2}`
            }, "")
        } else {
            return query_words[0]
        }
    } else {
        return input_value
    }
}

function Search(btn) {
    var parent = btn.parentElement
    var input = parent.children[0]
    //In future detect top suggestion of suggestion box and send it to get
    var query=getFirstSuggestion(input.value)
    window.location.search = "search=" + encodeSearchQuery(query.trim())

}

function SearchKeyPress(event, input) {
    //set time out because the input takes time to change its value
    setTimeout(() => {
        search_engine.onKeyPressSuggestion(input, event)
    }, 100)
    //press enter
    if (event.keyCode == 13) {
        //In future detect top suggestion of suggestion box and send it to get
        var query=getFirstSuggestion(input.value)
        window.location.search = "search=" + encodeSearchQuery(query.trim())

    }
    //if press space
    if (event.keyCode==32){
        input.value=getFirstSuggestion(input.value)
    }

}

function scrollToTop(btn) {

    document.body.scrollTo(0, 0)
    btn.parentNode.removeChild(btn);
}
//function to do at beginning
function Init() {
    server = new ServePages()
    scroll = new Scroll()
    search_engine = new SearchEngine()

    requestAnimationFrame(server.run)
    requestAnimationFrame(scroll.detectScrollTopUnderNavBar)
}
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function encodeSearchQuery(query) {
    return query.replaceAll(" ", "+")
}

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

//-------------------------------------------------------------------
//scroll class  controls navbar when scroll down and a button to scroll up
class Scroll {
    constructor() {
        this.navbar_visibility_point = ((Math.abs(document.body.scrollHeight-window.innerHeight)/document.body.scrollHeight)*100)>10?window.innerHeight * 0.2:65// detect  if windows height is close to document height. Basically if document is large there is not afraid of bug else...
        this.created_btn = false
        this.nav = document.getElementById("navbar")
        this.nav_clone = null
        this.detectScrollTopUnderNavBar = this.detectScrollTopUnderNavBar.bind(this);
    }


    screenHeightBiggerThanWidth() {
        return (screen.availHeight >= screen.availWidth)
    }
    scrollBtnDimensions() {
        if (this.screenHeightBiggerThanWidth()) {
            return {
                "font-size": "2em",
                "left": "92%",
                "height": 0.80
            }
        } else {
            return {
                "font-size": "3em",
                "left": "90%",
                "height": 0.70
            }
        }
    }
    createScrollTopBtn() {

        if (document.getElementById("scrollToTopBtn") == null) {

            var body = document.body
            var div = document.createElement("div")
            body.appendChild(div)
            var btn_dimensions = this.scrollBtnDimensions()
            var height = document.body.scrollTop + window.innerHeight * btn_dimensions["height"];
            //console.log(height)

            div.setAttribute("style", "background-color:white;cursor:pointer;border-radius:25px;border:1px solid black;font-size:" + btn_dimensions["font-size"] + ";color:blue;position:absolute;top:" + height + "px;left:" + btn_dimensions["left"] + ";width:10%,height:10%;")
            div.setAttribute("id", "scrollToTopBtn")
            div.innerHTML = "^"
            div.setAttribute("onclick", "scrollToTop(this)")
        } else {
            var btn_dimensions = this.scrollBtnDimensions()
            var height = document.body.scrollTop + window.innerHeight * btn_dimensions["height"];
            //console.log(height)
            var btn = document.getElementById("scrollToTopBtn")
            btn.style.top = height + "px"

            btn.style.left = btn_dimensions["left"]
            btn.style["font-size"] = btn_dimensions["font-size"]
        }
    }
    createNavBarClone() {
        if (this.nav_clone == null) {
            this.nav_clone = this.nav.cloneNode(true)
            this.nav_clone.id = this.nav_clone.id + "_clone" //navbar_clone; just so browser does not freak out with two elem with same id
            document.body.appendChild(this.nav_clone)
            this.nav_clone.style.position = "absolute"
            this.nav_clone.style.top = "0px"
            this.nav_clone.style.width = "100%"
            //change search input id so that search ngine object/class doesn not mix up
            this.nav_clone.children[2].children[1].children[0].id = "search_input_clone"
        }
        //if already created does not do anything
    }
    detectScrollTopUnderNavBar() {
        this.navbar_visibility_point = ((Math.abs(document.body.scrollHeight-window.innerHeight)/document.body.scrollHeight)*100)>11?65:window.innerHeight * 0.2// detect  if windows height is close to document height. Basically if document is large there is not afraid of bug else...
        if (window.scrollY > this.navbar_visibility_point) {
            //this.createNavBarClone()
            this.nav.style.position = "absolute"
            this.nav.style["z-index"] = 1
            this.nav.style.top = document.body.scrollTop + "px"
            this.nav.style.width = "100%"

            this.createScrollTopBtn()
            this.created_btn = true

        } else {
            
            if (this.created_btn ) {
                this.created_btn = false
                this.nav.style.position = ""
                this.nav.style["z-index"] = 0
                this.nav.style.top = ""
                this.nav.style.width = ""
                var btn = document.getElementById("scrollToTopBtn")
                //this.nav_clone.parentNode.removeChild(this.nav_clone)
                //this.nav_clone = null
                if (btn != null) {

                    btn.parentNode.removeChild(btn);
                }
            }
        }
        requestAnimationFrame(this.detectScrollTopUnderNavBar)
    }
}
//Class to Serve the html pages
class ServePages {

    constructor() {
        this.actual_page = window.location.search
        this.previous_page = "--default--" //just a string that differs from rest
        this.pages;
        this.getPages()
        //setTimeout(()=>{},1000)
    }

    detectChange() {
        if (this.actual_page != this.previous_page) {
            return true
        } else {
            return false
        }
    }
    DetectString(string, expression_to_find) {
        var n = string.indexOf(expression_to_find);
        if (n == -1) {
            return false;
        } else {
            return true;
        }
    }
    detectSearch() {
        return this.DetectString(window.location.search, "search=")
    }
    updatePreviousPage() {
        this.previous_page = this.actual_page
    }
    setActualPage(value) {
        this.actual_page = value
    }
    async getHtml(filename) {
        let response = await fetch(filename);
        let val = await response.text();
        $("#pageContent").html(val)
    }
    //    getHtml(filename){
    //        var xhttp = new XMLHttpRequest();
    //        xhttp.onreadystatechange = function() {
    //            if (this.readyState == 4 && this.status == 200) {
    //              document.getElementById("pageContent").innerHTML =this.responseText;
    //            }
    //        };
    //        xhttp.open("GET", filename, true);
    //        xhttp.send();
    //    }
    //    getPages() {
    //        fetch('pages.json').then(str => str.json()).then(str => {
    //            this.pages = str;
    //        })
    //    }
    async getPages() {
        let response = await fetch('SiteFolder/DB/pages.json');
        let val = await response.json();
        this.pages = val
    }
    //cheating.............
    //    readTextFile(file)
    //    {
    //        var rawFile = new XMLHttpRequest();
    //        var allText;
    //        rawFile.open("GET", file, false);
    //        rawFile.onreadystatechange = function ()
    //        {
    //            if(rawFile.readyState === 4)
    //            {
    //                if(rawFile.status === 200 || rawFile.status == 0)
    //                {
    //                     allText= rawFile.responseText;
    //                    //alert(allText);
    //
    //                }
    //            }
    //        }
    //        rawFile.send(null);
    //        return allText;
    //    }
    run = () => {
        this.setActualPage(window.location.search)

        if (this.detectChange()) {

            if (this.pages != undefined) {

                this.updatePreviousPage()

                var page_url = window.location.search.split("=")[0] // the .split is to detect when is search 
                var page = this.pages[page_url]
                this.getHtml(page)

            }
        }
        requestAnimationFrame(this.run)
    }


}
//Main-------------------------------
//to do function after complet load need to do this!!!
window.onload = () => {
    Init()
};
