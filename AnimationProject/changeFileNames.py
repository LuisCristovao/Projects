# -*- coding: utf-8 -*-
"""
Created on Sun Feb 11 21:14:02 2018

@author: Samsung
"""

import os
directory="images/Idle/"
files=os.listdir(directory)
for i in range(len(files)):
    os.rename(directory+files[i],directory+str(i)+".jpg")
    print(files[i])