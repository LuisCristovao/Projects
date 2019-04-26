# -*- coding: utf-8 -*-
"""
Created on Fri Apr 26 11:26:17 2019

@author: Luis Cristovao
"""

class Option:
    def __init__(self,val):
        self.value=val
        
    def isDefined(self):
        if self.value is None:
            return False
        else:
            return True
    
    def getOrElse(self,else_):
        if self.isDefined():
            return self.value
        else:
            return else_
        
class Migrate:
    def __init__(self):
        self.db=[];
        self.pages={}
        
    @staticmethod
    def createRow():
        row={"creation date":"",
            "image url":"",
            "last update date":"",
            "link":"",
            "page location":"",
            "search tags":"",
            "secondary search tags":"",
            "short description":"",
            "title":"",
            "type":"project"}
        return row
    @staticmethod
    def checkIfPage(page_or_link):
        return (page_or_link.find("SiteFolder/")>=0)
    
    @staticmethod
    def titleToLink(title):
        return "?"+title.replace(" ","-")
    
    def getRow(self,data):
        row=self.createRow()
        row["title"]=data["title"]
        if self.checkIfPage(data["link"]):
            #link is to a page
            row["link"]=self.titleToLink(data["title"])
            row["page location"]=data["link"]
            self.pages[row["link"]]=row["page location"]
        else:
            row["link"]=data["link"]
        row["image url"]=data["image"]
        row["short description"]=data["text"]
        
        return row
    
    def appendRow(self,data):
        row=self.getRow(data)
        self.db.append(row)
        
        
            
        
        

def htmlParser(start,end,row):
    try:
        return row.split(start)[1].split(end)[0]
    except:
        return None

def titleParser(row):
    out=Option(htmlParser("<h3>","</h3>",row))
    return out.getOrElse("")    
    #return row.splt("<h3>")[1].split("</h3>")[0]

def linkParser(row):
    out=Option(htmlParser('href="','">',row))
    return out.getOrElse("")    
    #return row.split('href="')[1].split('">')[0]

def imgParser(row):
    out=Option(htmlParser('src="','"',row))
    return out.getOrElse("")

def textParser(row):
    out=Option(htmlParser('<p>','</p>',row))
    return out.getOrElse("")

def showInfo(row,arguments_map):
    for key in arguments_map:
        print(key,arguments_map[key])
        
        
        
#Main--------------------------------

migrated_db=Migrate()
        

file_content=open("oldDB.txt")
for row in file_content.read().split("##########"):
#    showInfo(row,{"title:":titleParser(row),
#                  "link:":linkParser(row),
#                  "image:":imgParser(row),
#                  "text:":textParser(row)
#                  })
#    print("\n-------------\n")
    migrated_db.appendRow({"title":titleParser(row),
                  "link":linkParser(row),
                  "image":imgParser(row),
                  "text":textParser(row)
                  })
    
print(migrated_db.db)
print("\n\n\n")
print(migrated_db.pages)    