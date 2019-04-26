# -*- coding: utf-8 -*-
"""
Created on Tue Feb 26 09:07:27 2019

@author: Luis Cristovao

Goal:
    add edit delete rows from pages.json table

"""


#import json_files #to import json_files module locally
from importlib.machinery import SourceFileLoader

#to import module in json_files.py when using server
json_files=SourceFileLoader("json_files.py", "modules/json_files.py").load_module() 



def getDB():
    '''
    goal:
        return json object inside DB/pages.json
    '''
    
    #dirpath=json_files.get_dirpath_less(2) #to work locally
    dirpath=json_files.get_dirpath_less(1)# to work as a module of server
    return json_files.get_json_file(dirpath + "DB/pages.json")

def dumpInDB(new_db):
    try:
        #dirpath=json_files.get_dirpath_less(2) #to work locally
        dirpath=json_files.get_dirpath_less(1)# to work as a module of server
        json_files.dump_json_in_file(dirpath + "DB/pages.json",new_db)
        return True
    except:
        return False

def detect_if_unique(db,url):
    '''
    goal:
        detect if post has unique title and if that is true returns true else returns false
    inputs:
        db:
            json with all posts data
        new_title
            
    '''
        
    return not(url in db.keys())

def writeRowDB(url,page_site):
    try:
        db=getDB()
        if detect_if_unique(db,url):
            db[url]=page_site
            dumpInDB(db)
            return True
        else:
            return False
    except:
        return False
    
    
def editRowDB(old_url,new_url,new_page_site):
    try:
        db=getDB()
        if detect_if_unique(db,new_url) or new_url==old_url:
            try:
                del db[old_url]
            except:
                # there is not old url in the dbso create new one
                print("old url does not exists! Just creating the new one!")
            db[new_url]=new_page_site
            dumpInDB(db)
            return True
        else:
            return False
    except:
        return False
    
def deleteRowDB(url):
    try:
        db=getDB()
        del db[url]
        dumpInDB(db)
        return True
    except:
        return False

print(__name__)