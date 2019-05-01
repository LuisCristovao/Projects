









        
        
        
  
  
# One-page site Logic  
  
  
  
  

## Intro  
  
  
  
  

We have on an original page the following structure:  
  
  
  
  

* index.html -> is the first page  
* on **Site** folder we have the images, video, pages, blog, CSS, js... **folders**  
  
  
  
  

Trying to copy this structure, with just one template page where the rest HTML is copied in to.  
  
  

## Features  
  
  
  
  

- Have a good navbar with a menu (projects, blog, contact,...)  
- Needs to be scalable, if I want new menu options it has to be really easy. Or adding a new project must be automated.  
- Every project must have a **date, tags/categories, title, short description**  
- Every project must have its own page, and it should have a systematic way to create these pages.  
- It must be possible to search by category or just by writing a text in search input.  
- The search engine must be capable of search in the text of projects pages.  
- There will be template pages to show all projects  
- Must have the following menu sites: **home, projects,blog posts,tags,youtube,github,contact**
    - home will show 3 recent projects (of any type, blog or not) and 3 random.
    - projects will show off all projects in chronological (recent to oldest edit)
    - blog posts will show off all blog posts the same way as projects page.
    - tags will show alphabet with all tags.
    - the rest is  the same as the previous blog
  
  
  

## Thinking Solution  
  
  
  
  

For instance, let the **index.html** be the **template**. It has a header with the burger menu.  
The template is basically just this because this will appear on any page so that the user has access to the menu all the time. In the case of the projects page where there is a footer, this is still not a problem.  
  
  
  

So there is a **div** with **id="pageContent"** that will have all the pages content, but it will change depending on # or ?. Then with **js** it is possible to check the url with **window.location.hash (#)** or **window.location.search (?)**.  
  
  

Let us see if it is possible to create a **general js script** that works basically like Flask. Meaning can get HTML from files and place them here.  
For instance:  
  

if(window.location.hash=="#Projects"){  
GetContent("ProjectsContent.html")  
}  
if(window.location.hash=="#Contact"){  
GetContent("ContactContent.html")  
}  
  
  
  

GetContent could be done with **fetch** or an **ajax request**  
  
  

### Automate creation of a new project  

To create a new project it is needed the following:  
  

- Create an HTML page specific for the new project  
- Add a row on projects DB (there should only exist a single DB to facilitate the process)  
  

This should be it for adding a new project on Blog or projects  
  

### DB for projects and blog posts  

So the DB should have the following format:  
  
    [  
            {  
                "id": array index number,
                "title":"X",  
                "type":"blog or project".
                "short description":"x",  
                "creation date":"dd/mm/yyyy",
                "last update date":"dd/mm/yyyy",  
                "link": "project or page link",  
                "image": "image link",  
                "search tags":["x1","bla bla","x2"]  
              
            }  
    ]  

This is what the project showcase page will drink from. From this JSON the project page should be able to generate itself.

To automate the site creation I will have to create a python script that fills up the DB tables such as:
* Blog posts table
* Project posts table
* Search tags table
#### Blog Posts Table Formate:
    [  
        {  
            "id":"id": array index number,
            "blog id": id from the table with all projects(foreing key),
            "title":"X",  
            "type":"blog or project".
            "short description":"x",  
            "creation date":"dd/mm/yyyy",
            "last update date":"dd/mm/yyyy",  
            "link": "project or page link",  
            "image": "image link",  
            "search tags":["x1","bla bla","x2"]  
          
        }  
    ]  
But only with the blog posts. **I will do another file with only project posts.**
#### SearchTags.json File Formate:

    {
        "A":[aba,abc,...,ordered search tags that begin with "a/A"],
        "B":[...same with b],
        ...
    }
Need to create an ordering algorithm in python to order inside arrays. Something like having an array with the alphabet and think later ...
### Dates
The main page will show 3 recently updated projects and 3 random blog/projects.
On the projects and blog pages it will have projects ordered by creation date but can have a switch that changes the order from creation date -> recently updated. That way I can see if I doing posts or not.

### Python File 
This python file will be useful to automate the following processes:

 - Add new post
 - Edit post 
 - Delete post

#### Add Post:
The python file will first ask if I want to create, delete or edit a post.
If I choose to add a post, the program should make me answer a form to fill the JSON I can even make a flask application to make the HTML forms and so on...
Probably will do this I could also do a Django but, is simpler if I just do a one file server that handles everything

#### Edit Post:
The same HTML form but now the inputs are already filled.
#### Delete Post:
The first phase can just be inserting the post id and the program will delete the post in all tables (CASCADE Delete)


The python program will always check if the exists a title with the same text and it always will insert the posts in the main posts table. The posts table should be the reference to create the others.

### Search Tags Page:
This page should be like the projects and blog posts showcase pages, but instead of an Image, it should show a Big Letter like A, B, C ... and under them the list of tags: **#unity** links. This page should be generated from Search tags.json table and only print the letters that exist. 

Each tag must has an href to the following: **#search-tags : [tag1,tag2]** 
What this will do is search for all projects with these tags and show off with HTML cards.

**In this page there will exist another search input box to filter the tags**

### Serving Pages:
The method  I came up with is with # links such as **<a href="#Projects"...** the **Js script** detects the change in the URL and serves the page. I will do the URL with **#** because otherwise the browser or Github server will try to serve another page that probably does not exists. 

### Search Engine:
To simplify this I will just use tags and a python or js program to generate from the pages the important tags.
The search engine itself will use **window.location.search** of the URL. Meaning when there is a change in the **?** of the URL than the engine starts running. It has priority over the normal pages. What the search engine will do is the following:

 - Read input and change the URL **?query**
 - The search engine will find the tags that best correlate with the query.
 - The algorithm will search for the best tags that match the query the user to the following hash URL:**#search-tags = [tag1,tag2,...]**
     - This means that the server will show the projects with those tags.
 
 
## Implementation
### Steps:
 - Organize folders: **index.html, ReadMe.txt, SiteFolder[Pages, DB, Images,Projects, Blog, Videos, JS, CSS, SiteManagement]**
 - DB's: 
     - pages.json (has the map between url hash and actual path location)
     - all_projects.json (it has all content created for site blog/projects...)
     - projects.json
     - blog.json
 - Fill DB with some records and create js file to generate project show off page
 - If previous point works then create python program to add/edit/delete projects easily, and changes all json files.
 - Change template.html name 
 - create new branch, and replace previous site with new if every thing is working than merge


### after new site migration, to do:
- IMplement tags page:
    - Create a python program (or add new flask URL)
    - To read from DB and create **SearchTags.json**
- Search input
- Tags Filter input.


# Implementation

## Template Page

### Basic Functionality
 Already working, but basically it detects if #page and gets the page html and it inserts in inner html of div= content.
 ### NavBar
 it should follow user if he is scrolling down the page. Also it should appear a botton on the side to scroll back up
To do this I should detetct he scrollTop
## Flask Server
This server should do the following:

 - Don't care about presentation just basic HTML
 - Have a home page where the user can select the following option:
     - Add
     - Edit
     - Delete
     - Search id by title
     - Generate Tags json

All of them were explained previously but in relation to their implementation, I will explain in the coming section.
The flask app will have the following format:

 - server.py (contains the server and the modules that it uses)
 - aed.py (add edit delete module)
 - tags.py
 - templates/... (will contain pages to serve )
 - settings (contains JSON with additional info to the server)


### Add 
- The server.py will serve the page add.html which will be able to add a post. 
- If is adding then no input of the form is filled, otherwise the contrary.  
- As it is a template I can send the form data. 
- Then is just send add a post with form data, and in the server side, the module aed.py should handle the rest.

#### aed.py:
- receives the form post and turns it to json and adds to the current json DB in **all_projects.json**. 
- Sends the form to the HTML page in such a way that it knows which is a number a string or a date or a select box.

### Edit 
The same as add but in the HTML the user first needs to select the id first and then it appears the already filled form.

 - The HTML must have a select box with all id's
 - on select box change it must send a post (fetch) and if id = -1 then DB is empty; else create a select box with available id's
 - if DB is not empty then show form with filled inputs

### Add to DB considerations

 - On adding to db a project I need to order by creation date.
 - Later on the index.html page I just need to select 3 of the recently updated posts and insert there, plus random projects.
 - 
   

### Delete
Just a simple form with one input with row id and an "are you sure" question.

### Generate tags 
For later...

## Project Page
This page should be a simple HTML that imports a **js file** that reads **all_posts.json** file and generates the site.

 - Need a function to read the json file
 - need function that processes that json to create the cards thats it
 - All cards should be same size.
 - Need to filter by type
 - need to roder by last update or creation date the posts
 - Footer to load more projects, better load more projects on scroll bottom, thats it.
### New Approach
Need a template for show off pages (projects, blog posts and search )
That receives a json array and a title and does the rest.

## Search Engine

### Search Input at top

 - Need to detect with priority the search tag!! (in the server page class)
 - the search get should be **? \<query\>**
 - For instance: **?unity+games+turn base+** 
 - still need to do html encode and decode
 - If **?unity+games+turn base+**  this tag appears than the page should show all posts with this tags

The DB will have another column **secondary search tags** that will only show up in the search engine to server search purposes.

 If this method does not work, probably the best way to aproach this subject is to use the already created server page and detect the keyword **search=** in the **#** probaby going to do this way....

 #### Easy Way
Get DB and search for projects with similar tags than the query

 #### Hard Way

 - Generate primary tags db that map **(primary tags, projects)**
 - For the search input do as the previous section

#### Search Algorithm Basic

    //need to have array with query tags
    var query_tags=getQueryTags()
    for(post in db){
	    var post_tags=post['search tags']
    }...

### Show suggestions
OK here is where I use the tags.json file. Basically, on the keypress I will search for best tags and everything works ok, meaning the code to find posts from tags is already final (need to do optimizations...)

#### On key press function.
On each character inserted in the search input, the program will test progressively what tag is most approximated. It needs to detect **spaces** because the search engine will suggest a tag by query words separated by **spaces**. To do this I may check how many words are in search query and search for the latest word in search query.

On search Engine I need to create function **onKeyPressSuggestion()** and need to have progression index..

#### onKeyPressSuggestion()
Get **tags.json** and make a global variable have the json. Then need to search progressively over all the query tags.
	
    var suggestions=[]
    for(var i=0; i<=progress_step;i++){
	    for(s in search_tags){
		    var tag= tags[global_tag_index]
		    ...select best suggestion with global acceptance index...
		}
		global_tag_index=(global_tag_index+1)%tags.length
    }
    if(suggestion.length==0){
	    decrease global acceptance index...
    }
**More basic way**
Suggestions are calculated based on filter, meaning if first later is an **a or A** then send all keys in **tags["A"]** if select **ab** then select all keys in **tags["A"]**  that begin with **ab**. Simple probably will try this one first. **Problem** any mistake on **typing** will consider error, but for first try may be it
 
This might be done later.

### Tags/categories page
This will be just another page that will collect from a json all tags that exist in the DB and insert in the page like this:

    |   A   |    B   |   C   |
	-ab...   - ba..   -...
	-ac...	 - be..   -...
    |   D   | ...

The page should be like this but dont know if I really need loading because there will always be finite number of tags but load is more general so probably will do loading... 

If I can I must have **4 columns** by row

#### SearchTags.json File Formate:

    {
        "A":{"aba":"aba","abc":"abc"},
        "B":{...same with b},
        ...
    }
I will make this way because t seems that if this is in this format, then on JSON.parse and later on with **for(key in json)** every thing will be ordered automatically.


## Home page
As said previously, it will have 3 recently updated projects and 3 random projects
Maybe in future I create a page only with recently updated order

## Migration 
Python program that sees the previous db and generates the new one.


## Notes
 JSON format already organizes alphabetically the key!!!!!!!!
### Important

Search posts should only memorize post id in order to not insert repeated posts.Also should put in front those posts that match more the query tags.

Every time I insert a post on DB, it should always update search_tags.json (add,edit, delete).



**next:** 

1. **create page template.html**
2. **Solve error in FileUpload Page**
3. **create python generate tags from html**


### Errors

 1. ?search=recent on phone mode has an error find out (more or less fixed!!!)
 2.   html encode on tags not working, for instance hiperlink to ?search=machine learning => ?search=machine%20learning. What I need is decodeURI() encodeURI(), no solution maybe send post... which i will not do
 


