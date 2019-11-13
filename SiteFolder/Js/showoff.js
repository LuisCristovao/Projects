//global var
var prev_scrollTop = 0
var db;
var loaded_projects = 0
var search_engine = new SearchEngine()
//global functions
async function getDBPosts() {
    let response = await fetch('SiteFolder/DB/all_posts.json');
    let val = await response.json();
    return val
}

function searchInGoogle() {
    let site_link = "https://luiscristovao.github.io/Projects"
    let search_words_array = search_engine.getQuery()

    if (search_words_array == null) {
        return null
    } else {

        let query_to_google = search_words_array.reduce((acc, next) => `${acc}+${next}`)
        //jump to google search
        let search_url = `https://www.google.com/search?q=${query_to_google} site:${site_link}`
        return {
            url: search_url,
            words: search_words_array
        }
    }
}



function showOptionalGoogleSearch(htmlOfFooter) {
    let search_fields = searchInGoogle()
    var content_div = document.getElementById("showOffFooter")
    var html = ""
    if (search_fields == null) {
        html+= htmlOfFooter
        //html += `<h2 style="cursor:pointer" onclick="document.body.scrollTo(0,document.body.scrollHeight)">&#8595;  Load More Posts &#8595;</h2>`
    } else {
        html+=htmlOfFooter
        //html += `<h2 style="cursor:pointer" onclick="document.body.scrollTo(0,document.body.scrollHeight)">&#8595;  Load More Posts &#8595;</h2>`
        html += `<br><h3>Search in google, the following text : "<b>${search_fields.words.reduce((acc,next)=>`${decodeURI(acc)} ${decodeURI(next)}`)}</b>" <a href="${search_fields.url}">Here</a></h3><br>`
        html += `<br><h3>Other Possible Categories:</h3><br><ul style="list-style:none;font-size:2em ;padding-left:0px">${search_fields.words.flatMap(el=>search_engine.calculateSuggestions(el)).reduce((acc,next)=>`${decodeURI(acc)}<li><a href="?search=${decodeURI(next)}">${decodeURI(next)}</a></li>`,"")}</ul>`
    }
    content_div.innerHTML = html
}

function detectIfMorePostsToLoadAction(db) {
    if (db.length > 0) {
        //$("#showOffFooter").html('<h2 style="cursor:pointer" onclick="document.body.scrollTo(0,document.body.scrollHeight)">&#8595;  Load More Posts &#8595;</h2>')
        showOptionalGoogleSearch('<h1 style="cursor:pointer" onclick="document.body.scrollTo(0,document.body.scrollHeight)">&#8595;  Load More Posts &#8595;</h1>')
    } else {
        //$("#showOffFooter").html('<h2>No Posts To Show!</h2>')
        //whatToDoWhenNoSearch()
        showOptionalGoogleSearch('<h1>No Posts To Show!</h1>')
    }
}
async function searchBlogPosts() {
    $("#showOffTitle").html("Blog Posts")

    db = await getDBPosts()
    //filter only blog posts type
    var blog_posts = []
    for (var i in db) {
        if (db[i]["type"] == "blog") {
            blog_posts.push(db[i])
        }
    }
    db = blog_posts
    //invert array so to show more recent at front
    //db=search_engine.invertArrayOrder(db)
    loaded_projects = 0
    detectIfMorePostsToLoadAction(db)
    requestAnimationFrame(detectScrollBottom)
}
async function searchProjects() {
    $("#showOffTitle").html("Project Posts")
    $("#showOffFooter").html("<h2>&#8595;Load more Posts&#8595;</h2>")
    db = await getDBPosts()
    //filter posts by projects posts
    var project_posts = []
    for (var i in db) {
        if (db[i]["type"] == "project") {
            project_posts.push(db[i])
        }
    }
    db = project_posts
    //invert array so to show more recent at front
    //db=search_engine.invertArrayOrder(db)
    loaded_projects = 0
    detectIfMorePostsToLoadAction(db)
    requestAnimationFrame(detectScrollBottom)
}

async function searchPostsByTags() {
    $("#showOffTitle").html("Search Results")

    db = await search_engine.findPosts()

    loaded_projects = 0
    detectIfMorePostsToLoadAction(db)
    requestAnimationFrame(detectScrollBottom)
}

function AddMoreInfoToCards(data) {
    var html = ""
    var vals = data
    html += '<ul class="list-group list-group-flush">'
    html += '<li class="list-group-item"><strong>Last Update:</strong><br>' + vals["last update date"] + '</li>'
    html += '<li class="list-group-item"><strong>Creation Date:</strong><br>' + vals["creation date"] + '</li>'
    var search_tags = vals["search tags"].split(",").map(el => el.trim())
    html += '<li class="list-group-item">'
    html += '<strong>Search Tags:</strong><br>'
    for (var i in search_tags) {
        html += '<a href="?search=' + encodeURIComponent(search_tags[i]) + '">' + search_tags[i] + '</a>&nbsp;'
    }
    html += '</li>'
    html += '</ul>'
    return html
}

function jsonToHml(data) {
    var html = ""
    var val = data
    html += '<div class="col-lg-4 col-sm-6" style="margin-bottom: 20pt">'
    html += '<div class="card" >'
    if (val["image url"] != "") {

        html += '<a target="_blank" href="' + val["link"] + '"><img class="card-img-top" src="' + val["image url"] + '" alt=""></a>'
    }
    html += '<div class="card-body">'
    html += '<h4 class="card-title">'
    html += '<a target="_blank" href="' + val["link"] + '">' + val["title"] + '</a>'
    html += '</h4>'
    html += '<p class="card-text">' + val["short description"] + '</p>'
    html += '</h4>'
    html += '</h4>'
    html += '</div>'
    html += AddMoreInfoToCards(val)
    html += '</div>'
    html += '</div>'
    return html
}

function loadMoreProjects() {
    var grid = document.getElementById("showOffGrid")
    var html = grid.innerHTML
    for (index in [0, 1, 2]) { //load 3 posts each time this is triggered
        if (db[loaded_projects] != undefined) {

            html += jsonToHml(db[loaded_projects])
            loaded_projects++
        } else {
            //Loaded everything
            if (loaded_projects != 0) {
                showOptionalGoogleSearch("<h1>Loaded EveryThing!</h1>")
                //$("#showOffFooter").html("<h2>Loaded EveryThing!</h2>")
            } else {
                //$("#showOffFooter").html("<h2>No Posts To Show!</h2>")
                //whatToDoWhenNoSearch()
                showOptionalGoogleSearch("<h1>No Posts To Show!</h1>")

            }
            break;
        }
    }
    grid.innerHTML = html
}

function detectScrollBottom() {
    //Just to load projects in the begining (just loaded the page)
    if (loaded_projects == 0 && loaded_projects < db.length) {
        loadMoreProjects()
    }
    if (Math.round(prev_scrollTop) != Math.round(document.body.scrollTop)) {
        prev_scrollTop = document.body.scrollTop
        if (Math.round(document.body.scrollTop + window.innerHeight) >= document.body.scrollHeight * 0.95) {
            loadMoreProjects()
        }
    }
    requestAnimationFrame(detectScrollBottom)
}

async function init() {
    var options = {
        "?Projects": searchProjects,
        "?Blog": searchBlogPosts,
    }
    if (options[window.location.search] != null) {
        options[window.location.search]()
    } else {
        searchPostsByTags()
    }

}



//Global functions
function main_init() {


    //    db = await getDBPosts()
    //    loaded_projects = db.length - 1
    //    requestAnimationFrame(detectScrollBottom)


}
//main-------------------
init()
