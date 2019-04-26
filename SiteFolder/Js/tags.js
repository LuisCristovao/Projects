//global var
var prev_scrollTop = 0
var db;
var loaded_projects = 0

//global functions
async function getDBPosts() {
    let response = await fetch('SiteFolder/DB/tags.json');
    let val = await response.json();
    return val
}


function buildCard(html, data) {

}

async function buildTagsPage() {
    var html = ""
    var tags_body = document.getElementById("tags_body")
    db = await getDBPosts()
    var keys_stack = []

    for (var key in db) {
        keys_stack.push(key)
        console.log(key)
    }

    for (var i = 0; i < keys_stack.length; i = j) {

        html += '<div class="row">'
        var j = i
        //4 columns
        while (j < keys_stack.length) {

            var key = keys_stack[j]
            console.log(key)
            html += '<div class="col"><h1 align="center" style="color:rgba(0, 0, 255, 1);">' + key + '</h1>'
            html += '<div align="center">'
            html += '<ul style="list-style: none; padding-left:0px;">'
            for (var value in db[key]) {
                html += '<li><a style="color:rgba(200, 36, 255, 1);" href="?search='+value+'">' + value + '</a></li>'
            }
            html += '</ul>'
            html += '</div>'
            html += '</div>'
            j++;
            if (j % 4 == 0) {
                break
            }
        }
        html += '</div>'
    }
    tags_body.innerHTML = html


}

function init() {
    buildTagsPage()
}


//main-------------------------
window.onload = init()
