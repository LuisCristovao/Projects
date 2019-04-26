# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 17:01:18 2019

@author: luis cristovao

goal:  from html output tags and secondary tags
Try to use my ml to acheive this.
"""

#import urls as pages # to import urls.py locally
from importlib.machinery import SourceFileLoader

#to import module in json_files.py when using server
#json_files=SourceFileLoader("json_files.py", "modules/json_files.py").load_module()
#to import json lib locally
json_files=SourceFileLoader("json_files.py", "../json_files.py").load_module()

#print(json_files.get_json_file(json_files.get_dirpath_less()+"/brain.json"))



print(__name__)