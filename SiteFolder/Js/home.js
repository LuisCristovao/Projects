//global vars
var db;
//global functions
async function getDBPosts() {
    let response = await fetch('SiteFolder/DB/all_posts.json');
    let val = await response.json();
    return val
}

function AddMoreInfoToCards(data) {
    var html = ""
    var vals = data
    html += '<ul class="list-group list-group-flush">'
    html += '<li class="list-group-item"><strong>Last Update:</strong><br>' + vals["last update date"] + '</li>'
    html += '<li class="list-group-item"><strong>Creation Date:</strong><br>' + vals["creation date"] + '</li>'
    var search_tags = vals["search tags"].split(",")
    html += '<li class="list-group-item">'
    html += '<strong>Search Tags:</strong><br>'
    for (var i in search_tags) {
        html += '<a href="?search=' + decodeURI(search_tags[i]) + '">' + search_tags[i] + '</a>&nbsp;'
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

        html += '<a href="' + val["link"] + '"><img class="card-img-top" src="' + val["image url"] + '" alt=""></a>'
    }
    html += '<div class="card-body">'
    html += '<h4 class="card-title">'
    html += '<a href="' + val["link"] + '">' + val["title"] + '</a>'
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

function selectRandom(min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random
}

function createPage() {
    var recent_grid = document.getElementById("recent")
    var random_grid = document.getElementById("random")
    var recent = ""
    var random = ""
    for (index in [0, 1, 2]) { //load 3 posts each time this is triggered
        recent += jsonToHml(db[index])
        var r_index=selectRandom(0,db.length)
        random+=jsonToHml(db[r_index])
    }
    recent_grid.innerHTML = recent
    random_grid.innerHTML = random
}
async function init() {
    db = await getDBPosts()
    createPage()
}
//Main--------------
window.onload = init()
