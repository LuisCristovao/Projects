# -*- coding: utf-8 -*-
"""
Created on Sun Feb 11 21:14:02 2018

@author: Samsung
"""

import os
import cv2





directory="images/Intro/"
files=os.listdir(directory)
for i in range(len(files)):
    os.rename(directory+files[i],directory+str(i)+".jpg")
    #im = cv2.imread(directory+files[i])
    #cv2.imwrite(directory+str(i)+".jpg",im)
    print(files[i])