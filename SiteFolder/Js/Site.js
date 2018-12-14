function Start(){
    document.getElementById('burguer').style.position="absolute";
    allBD=readTextFile('SiteFolder/DB/indexDB.txt');
    allBD=allBD.split('##########');
    align_burguer();
    LoadRandom(allBD,3);
    LoadRecent(allBD,3);
    resizeImages();
}

function resizeImages(){
    /////////////////code to resize images after load////////////////////////////
    var objs = document.getElementsByTagName('img'),
        len = objs.length,
        counter = 0;

    [].forEach.call( objs, function( obj ) {
        obj.addEventListener( 'load', incrementCounter, false );
    } );

    function incrementCounter() {
        counter++;
        if ( counter === len ) {
            console.log( 'All images loaded!' );
            //document.getElementById('debug').innerHTML="All "+counter+" gifs loaded!";
            //setTimeout(function(){document.getElementById('debug').innerHTML="<font color='white'>See Some of my Projects!</font>"},5000);
            align_burguer();
        }
    }
    //////////////////////////////////////////////////////////////////////////
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                 allText= rawFile.responseText;
                //alert(allText);

            }
        }
    }
    rawFile.send(null);
    return allText;
}


function align_burguer(){
    var burguer=document.getElementById('burguer');
    if(toggle_nav){
        if(window.innerWidth<window.innerHeight){
            burguer.style.left='46%';
        }
        else{
            burguer.style.left='49%';
        }
    }
    else{

        if(window.innerWidth<window.innerHeight){
            burguer.style.left='45%';
        }
        else{
            burguer.style.left='49%';
        }
    }
    //change images size
    var objs = document.getElementsByTagName("img");
    for(i=0;i<objs.length;i++){
        if(i!=0){
            objs[i].width=objs[0].width;
            objs[i].height=objs[0].height;    
        }
    }
}



var toggle_nav=false;
function openNav(x) {
    toggle_nav=!toggle_nav;
    if(toggle_nav){
        x.classList.toggle("change");
        x.style.position="absolute";
        x.style.top="15%";
        //x.style.left="49%";
        align_burguer();
        //x.style.hover="color:white";
        document.getElementById("myNav").style.visibility = "visible";
        document.getElementById("myNav").style.height = "100%";
        $('#SiteBody').slideUp('fast');
        $('#footer').slideUp('fast');
    }
    else{
        x.classList.toggle("change");
        x.style.position="absolute";
        x.style.top="auto";
        
        document.getElementById("myNav").style.visibility = "collapse";
        document.getElementById("myNav").style.height = "0%";
        $('#SiteBody').slideDown('fast');   
        $('#footer').slideDown('fast');
        align_burguer();
    }
}


function highLight(obj){

    obj.style.backgroundColor="blue";

}
function normal(obj){
    obj.style.backgroundColor="cornflowerblue";
}
function LoadRandom(db_array,size){
    var selected=1;
    var index=Math.floor(Math.random()*db_array.length);
    var prev_index={};
    prev_index[index]=index;
    $('#random_projects').html(db_array[index]);
    while(selected<size){
        index=Math.floor(Math.random()*db_array.length);
        //it is a different index from previous
        if(prev_index[index]==null){
            $('#random_projects').append(db_array[index]);
            selected++;
            prev_index[index]=index;
        }
    }
}
function LoadRecent(db_array,size){
    for(i=0;i<size;i++){
        $("#recent_projects").append(db_array[i]);
    }
    
}

class Image{
    constructor(gif_src,img_src=null){
        this.gif_src=gif_src;
        this.img_src=img_src;
        this.Init();
    }
    Init(){
        
    }
}
class FPS{
    constructor(){
        this.dt=0;
        this.start_time=new Date().getTime();
        this.Run();
    }
    Run(){
        this.dt = 1E-3 * (new Date().getTime() - this.startTime);
        this.startTime = new Date().getTime();
        //time += dt%10000;
        console.log(this.dt);
        window.requestAnimationFrame(this.Run());
    }
}
//Main--------------------------------
//On site open do Start function
var allBD;
var loaded_projects=0;

var html=document.getElementsByTagName("html")[0];
var global_width=html.offsetWidth;
var global_height=html.offsetHeight;
var prev_width=global_width;
var prev_height=global_height;
//var prev_toggle_nav_state=toggle_nav;

//Load first projects

window.onload=Start();


//Align everything when change phone orientation
function ChangeOrientation(){
    html=document.getElementsByTagName("html")[0];
    global_width=html.offsetWidth;
    global_height=html.offsetHeight;
    
    if(prev_width!=global_width || prev_height!=global_height){
        console.log("change")
        prev_height=global_height
        prev_width=global_width
        prev_toggle_nav_state=toggle_nav
        
        align_burguer();
    }
    requestAnimationFrame(ChangeOrientation)
}
requestAnimationFrame(ChangeOrientation)