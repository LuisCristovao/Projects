//Notes
//<div class="col-lg-4 col-sm-6 portfolio-item" style="margin-bottom: 20pt">
//          <div class="card " >
//            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
//            <div class="card-body">
//              <h4 class="card-title">
//                <a href="#">Project One</a>
//              </h4>
//              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellatfscfse ewfwef ewf wef wefwe fwefwsef sdcv er fwefwfweff fwefweawdwad d w wqdq wdqwd qwd qwd qw qwdqwd asdcwdwd </p>
//            </div>
//          </div>
//        </div>
//Global vars
var prev_scrollTop = 0
var db;
var loaded_projects = 0
//Global functions
async function getDBPosts() {
    let response = await fetch('SiteFolder/DB/all_posts.json');
    let val = await response.json();
    var project_posts=[]
    for(var i in val){
        if(val[i]["type"]=="project"){
            project_posts.push(val[i])
        }
    }
    
    return project_posts
}

function AddMoreInfoToCards(data) {
    var html = ""
    var vals = data
    html += '<ul class="list-group list-group-flush">'
    html += '<li class="list-group-item"><strong>Creation Date:</strong><br>' + vals["creation date"] + '</li>'
    html += '<li class="list-group-item"><strong>Last Update:</strong><br>' + vals["last update date"] + '</li>'
    var search_tags = vals["search tags"].split(",")
    html += '<li class="list-group-item">'
    html += '<strong>Search Tags:</strong><br>'
    for (var i in search_tags) {
        html += '<a href="?search=' + search_tags[i] + '">' + search_tags[i] + '</a>&nbsp;'
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

function fillGrid() {
    var grid = document.getElementById("projects_grid")
    data = db
    //alert(JSON.stringify(data))
    var html = ""
    for (index in data) {
        if (index < 9) {

            var val = data[index]
            html += jsonToHml(val)
            loaded_projects++
        } else {
            break
        }

    }
    grid.innerHTML = html

}

function loadMoreProjects() {
    var grid = document.getElementById("projects_grid")
    var html = grid.innerHTML
    for (index in [0, 1, 2]) {
        if (db[loaded_projects] != undefined) {

            html += jsonToHml(db[loaded_projects])
            loaded_projects--//invert order to insert most recent posts in front
        }
    }
    grid.innerHTML = html
}

function detectScrollBottom() {
    if (window.innerHeight == document.body.scrollHeight && loaded_projects>=0) {
        loadMoreProjects()
    }
    if (prev_scrollTop != document.body.scrollTop) {
        prev_scrollTop = document.body.scrollTop
        if ((document.body.scrollTop + window.innerHeight) == document.body.scrollHeight) {
            loadMoreProjects()
        }
    }
    requestAnimationFrame(detectScrollBottom)
}
async function init() {


    db = await getDBPosts()
    loaded_projects=db.length-1
    requestAnimationFrame(detectScrollBottom)
    //fillGrid()
    //    setInterval(() => {
    //        detectScrollBottom()
    //    }, 100)

}
//main-----
init()
