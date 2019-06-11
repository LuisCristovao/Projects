# -*- coding: utf-8 -*-
"""
Created on Mon Feb 25 18:14:14 2019

@author: Luis Cristovao
"""


from datetime import datetime
#import json_files #to import json_files module locally
#import urls as pages # to import urls.py locally
from importlib.machinery import SourceFileLoader

#to import module in json_files.py when using server
json_files=SourceFileLoader("json_files.py", "modules/json_files.py").load_module() 
#to import module in urls.py when using server
pages=SourceFileLoader("urls.py", "modules/urls.py").load_module() 
#to import module in tags.py when using server
tags=SourceFileLoader("tags.py", "modules/tags.py").load_module() 


#config constants
config_constants={
                   "title":"title",
                   "type":"type",
                   "short description":"short description",
                   "creation date":"creation date",
                   "last update date":"last update date",
                   "link":"link",
                   "image url":"image url",
                   "search tags":"search tags",
                   "secondary search tags":"secondary search tags",
                   "page location":"page location"
                  }

def strToDate(date_str):
    '''
    goal: 
        convert string to date object
    inputs:
        date_str: string with date in format yyyy-mm-dd
    returns:
        date object
    '''
    return datetime.strptime(date_str,'%Y-%m-%d')


def detect_if_unique(db,new_title):
    '''
    goal:
        detect if post has unique title and if that is true returns true else returns false
    inputs:
        db:
            json with all posts data
        new_title
            
    '''
    unique= True
    for val in db:
        if val["title"]==new_title:
            return False
        
    return unique

def get_data_columns():
    '''
    goal:
        return json object with columns of main db table
    '''
    #dirpath=get_dirpath_less(2) #to work locally
    dirpath=json_files.get_dirpath_less(1)# to work as a module of server
    return json_files.get_json_file(dirpath + "SiteManagement/modules/settings/all_posts_table_columns.json")
                   

def get_all_posts():
    '''
    goal:
        return json object inside DB/all_posts.json
    '''
    
    #dirpath=get_dirpath_less(2) #to work locally
    dirpath=json_files.get_dirpath_less(1)# to work as a module of server
    return json_files.get_json_file(dirpath + "DB/all_posts.json")
    
def update_position_index(db_array):
    for i in range(0,len(db_array)):
        db_array[i]["array_position"]=i
        
def insertByDate(db,new_data):
    '''
    goal:
        Insert new post on json DB, but order by last update date.
        Here we consider already that the db is ordered
        0- most recent 
        n- oldest
    inpouts:
        db:
            all json db like [post1,post2]
        new_data:
            new post data
        returns:
            new ordered db array
    '''
    #print(db)
    new_db=[]
    target_date=strToDate(new_data["last update date"])
    already_inserted_new_data=False
    if len(db)==0:
        new_db.append(new_data)
    else:
        
        for i in range(len(db)):
            db_date=strToDate(db[i]["last update date"])
            #if target_date is more recent than db_date
            #put target first and than db date
            if target_date>=db_date and not already_inserted_new_data: 
                new_db.append(new_data)
                already_inserted_new_data=True
                new_db.append(db[i])
                    
            else:
                new_db.append(db[i])
            
#            print("\n-----------------------\n")
#            print(new_db)
#            print("\n-----------------------\n")    
        
        if not already_inserted_new_data:
            new_db.append(new_data)
                
    
    update_position_index(new_db)    
    return new_db
        

def send_all_posts_form():
    '''
    goal:
        Send json with required info for script in html to fill the form with inputs
    description:
        gets json settings/all_posts_table_columns.json and sends it.
    '''
    
    dirpath=json_files.get_dirpath_less(0)
    dirpath+="modules/"# to work as a module of server; comment this to work locally
    data=json_files.get_json_file(dirpath+"settings/all_posts_table_columns.json")
    return data


def add_posts_row(data):
    '''
    goal:
        add row to all_posts.json
        
    inputs:
        data:
            json object with data to insert on a row
    '''
    
    try:
        
        db=get_all_posts()
        url="?"+data["title"].replace(" ","-")
        page=json_files.parse(data["page location"])
        data["page location"]=json_files.parse(data["page location"])
        #data["id"]=len(db)
        if detect_if_unique(db,data["title"]):
            if data["page location"]!="":
                data["link"]=url
                pages.writeRowDB(url,page)
            new_db=insertByDate(db,data)
            
            
            #add tags to tags db
            tags.writeTags(data["search tags"])
            tags.writeTags(data["secondary search tags"])
            
            #db.append(data)
            #dump json object in db all_post.json
            dirpath=json_files.get_dirpath_less(1)# to work as a module of server
            json_files.dump_json_in_file(dirpath + "DB/all_posts.json",new_db)
            return True
        else:
            return False
    except:
        return False
    
def edit_posts_row(data):
    '''
    goal:
        edit row in all_posts.json
        
    inputs:
        data:
            json object with data to edit  row
    '''
    
    try:
        db=get_all_posts()
        id_=int(data["id"])
        url="?"+data["title"].replace(" ","-")
        old_url=db[id_]["link"]
        page=json_files.parse(data["page location"])
        data["page location"]=json_files.parse(data["page location"])
        del data["id"]
        
        if detect_if_unique(db,data["title"]) or data["title"]==db[id_]["title"]:
            
            
            #delete old tags
            tags.deleteTags(db[id_]["search tags"])
            tags.deleteTags(db[id_]["secondary search tags"])
            
            del db[id_]
            
            if page!="":
                data["link"]=url
                pages.editRowDB(old_url,url,page)
            new_db=insertByDate(db,data)
            
            #add tags to tags db
            tags.writeTags(data["search tags"])
            tags.writeTags(data["secondary search tags"])
            
            #dump json object in db all_post.json
            dirpath=json_files.get_dirpath_less(1)# to work as a module of server
            json_files.dump_json_in_file(dirpath + "DB/all_posts.json",new_db)
            return True
        else:
            return False
    except:
        return False   
    
def delete_posts_row(id_):
    '''
    goal:
        delete row in all_posts.json
        
    inputs:
        id_: contains the number id of the row to delete
    '''
    
    try:
        db=get_all_posts()
        #print("delete id:",id_)
        
        #get url from db row
        url=db[id_]["link"]
        
        #get search tags from row
        all_tags=db[id_]["search tags"]
        all_tags+=','+db[id_]["secondary search tags"]
        
        
        
        #Delete row in pages DB if exists
        pages.deleteRowDB(url)
        
        #Delete tags in tags DB
        tags.deleteTags(all_tags)
        #Delete row in posts db
        del db[id_]
        #Update array_position column on every row
        update_position_index(db)
        #dump json object in db all_post.json
        dirpath=json_files.get_dirpath_less(1)# to work as a module of server
        json_files.dump_json_in_file(dirpath + "DB/all_posts.json",db)
        return True
    except:
        return False       
    

def select_post(id_):
    '''
    goal:
        return a row with some id in all_posts.json 
        
    inputs:
        id_:
            row id 
    '''
    
    db=get_all_posts()
    return db[id_]

def select_all_ids():
    '''
    goal:
        return array with all existing ids 
    '''
    db=get_all_posts()
    return [num for num in range(len(db))]

print(__name__)

#dirpath=get_dirpath_less(2)
#data=get_json_file(dirpath + "DB/all_posts.json")
#dump_json_in_file(dirpath + "DB/blog_posts.json",data)