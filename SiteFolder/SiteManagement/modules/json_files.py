# -*- coding: utf-8 -*-
"""
Created on Wed Mar  6 13:35:07 2019

@author: Luis Cristovao

Goal:script to deal with get and write json to files
"""
import json
import os


def parse(json_string):
    return json.loads(json_string)


def get_dirpath_less(less=0):
    '''
    goal: get current directory or a parent directory
    inputs:
        less: number that determines the parent folder the user wants.
              for instance in this folder tree : C > main > templates > index.html (working dir)
                                                            static  
              if we used get_dirpath_less(1) we would obtain: C/main/
              if we used get_dirpath_less(0) we would obtain: C/main/templates/
    '''

    out = ""
    dirpath = os.getcwd() 
    
    # check if working on windows or linux
    split_character_for_diretories = "/"

    if len(dirpath.split("\\")) > 1:
        split_character_for_diretories = "\\" #windows directories separator
    else:
        split_character_for_diretories = "/" #linux windows directories separator

    array = dirpath.split(split_character_for_diretories)
    
    for i in range(len(array)-less):
        out += array[i]+split_character_for_diretories

    return out


def get_json_file(filepath):
    '''
     goal: 
        gets json object in file
     inputs:
        filepath:
            complet path including filename of the file to write to.
     returns:
        json object
    '''

    print("open file:", filepath, "\n")
    with open(filepath) as f:
        data = json.load(f)

    return data


def dump_json_in_file(filepath, json_val):
    '''
    goal: 
        writes json object in file
    inputs:
        filepath:
            complet path including filename of the file to write to.
        json_val:
            json object
    '''

    with open(filepath, mode='w', encoding='utf-8') as f:
        json.dump(json_val, f)


print(__name__)
