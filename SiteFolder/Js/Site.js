//On site open do Start function
        window.onload=Start();
        var allBD;
        function Start(){
            document.getElementById('burguer').style.position="absolute";
            allBD=readTextFile('SiteFolder/DB/DB.txt');
            allBD=allBD.split('##########');
            align_burguer(toggle_nav);
            
           
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
        
        
        function align_burguer(panel){
            var burguer=document.getElementById('burguer');
            if(panel){
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
                    burguer.style.left='50%';
                }
            }
            //change images size
            var imgs = document.getElementsByTagName("img");
            for(i=0;i<imgs.length;i++){
                if(i!=0){
                    imgs[i].width=imgs[0].width;
                    imgs[i].height=imgs[0].height;    
                }
            }
        }
        
        document.body.onresize=function(){align_burguer(toggle_nav)};
        
        var toggle_nav=false;
        function openNav(x) {
            toggle_nav=!toggle_nav;
            if(toggle_nav){
                x.classList.toggle("change");
                x.style.position="absolute";
                x.style.top="15%";
                //x.style.left="49%";
                align_burguer(toggle_nav);
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
                align_burguer(toggle_nav);
                document.getElementById("myNav").style.visibility = "collapse";
                document.getElementById("myNav").style.height = "0%";
                $('#SiteBody').slideDown('fast');   
                $('#footer').slideDown('fast');
            }
        }

    var loaded_projects=0;
    //Load first projects
    LoadProjects();
    
    
    function highLight(obj){
      
        obj.style.backgroundColor="blue";
        
    }
    function normal(obj){
        obj.style.backgroundColor="cornflowerblue";
    }
    function LoadProjects(){
        if(window.innerWidth>window.innerHeight){
            
            $('#footer').html('<div style="position: relative; left: 50%;" class="loader"></div>');
        }
        else{
            $('#footer').html('<div style="position: relative; left: 45%;" class="loader"></div>');
        }
        setTimeout(function(){
            $('#footer').html('<h3 style="text-align: center"><font color="white">Load More Projects</font></h3>');
        },1000);
        $('#SiteBody').append(allBD[loaded_projects]);
        if(loaded_projects<allBD.length){
            
            loaded_projects++;
        }
        window.scrollTo(0,document.body.scrollHeight);
    }
    //only show footer when scroll to bottom
    $(window).scroll(function() {
        console.log($(window).scrollTop() + $(window).height());
       if($(window).scrollTop() + $(window).height() >= ($(document).height()*(1-0.1))) {
           //alert("bottom!");
           //console.log($(window).scrollTop() + $(window).height());
           //$('footer').slideUp('fast');
           document.getElementById('footer').style.visibility="visible";
       }
        else{
            document.getElementById('footer').style.visibility="collapse";
        }
    });

