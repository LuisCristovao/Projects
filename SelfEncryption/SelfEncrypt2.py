# -*- coding: utf-8 -*-
"""
Created on Wed Oct  3 09:21:57 2018

@author: lcristovao
"""

import random



characters='abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*+´`^~{}()[]&%$#"!/.,;:-_áÁóòÓÒ'

def numToCharacter(num):
    
    return chr(num)

def chaToNumber(letter):
    
    return ord(letter)


def stringToNumArray(string):
    num_array=[]
    for l in string:
        num_array.append(chaToNumber(l))
        
    return num_array

def numArrayToString(num_array):
    string=''
    for num in num_array:
        string+=numToCharacter(num)
        
    return string


def stringToChaArray(string):
    cha_array=[]
    for l in string:
        cha_array.append(l)
        
    return cha_array

def chaArrayToString(cha_array):
    string=""
    for l in cha_array:
        string+=l
        
    return string    


def shuffleArray(array):
    new_array=array
    random.shuffle(new_array)
    return new_array

#-------------------------------------
#Working if key ==1 then does not change
def Subs(key,character,size=255):
    
    num=chaToNumber(character)
    num=((num+key)%size)-1
    return numToCharacter(num)

#Working if key ==1 then does not change
def invertSubs(key,character,size=255):
    
    num=chaToNumber(character)
    num=((num-key)%size)+1
    return numToCharacter(num)

    
def SubsString(key,string):
    out=""
    for l in string:
        out+=Subs(key,l)
    
    return out

def invertSubsString(key,string):
    out=""
    for l in string:
        out+=invertSubs(key,l)
    
    return out


#def Subs(key,character,size=255,sub_by=3):
#    numbers=[]
#    
#    num=chaToNumber(character)
#    numbers.append(((num+key)%size)-1)
#    for i in range(1,sub_by):
#        numbers.append(((numbers[i-1]+key)%size)-1)
#    
#    out=""
#    for i in range(sub_by):
#        out+=numToCharacter(numbers[i])
#    return out
#
##Working if key ==1 then does not change
#def invertSubs(key,characters,size=255,sub_by=3):
#
#    for i in range(0,len(characters),sub_by):
#        
#    
#    
#    num=chaToNumber(character)
#    num=((num+key)%255)+1
#    num1=((num+key)%255)+1
#    num2=((num1+key)%255)+1
#    out=numToCharacter(num)+numToCharacter(num1)+numToCharacter(num2)
#    
#    return out
#
#    
#def SubsString(key,string):
#    out=""
#    for l in string:
#        out+=Subs(key,l)
#    
#    return out
#
#def invertSubsString(key,string):
#    out=""
#    for l in string:
#        out+=invertSubs(key,l)
#    
#    return out


#-------------------------------------
def ShiftArray(key, array):
    out_array=array.copy()
    copy=array.copy()
    length=len(copy)
    
    for i in range(length):
        replace_index=(i+key) % length
        #print(replace_index)
        original_character=copy[i]
        out_array[replace_index]=original_character
        
    return out_array    
        
    
    
def mix(key,string):
    
    cha_array=stringToChaArray(string)
    out_array=ShiftArray(key,cha_array)
    return chaArrayToString(out_array)
    

def invertMix(key,string):
    key=-key
    cha_array=stringToChaArray(string)
    out_array=ShiftArray(key,cha_array)
    return chaArrayToString(out_array)

#------------------------------------------
    
def encript_procedure(key,string):
    
    out=SubsString(key,string)
    out=mix(key,out)
    
    return out
    

def decript_procedure(key,string):
    
    out=invertSubsString(key,string)
    out=invertMix(key,out)
    
    return out
    

#----------------------------------------------
    
def Encrypt(string_key,string):
    out=string
    for key in string_key:
        key=chaToNumber(key)
        out=encript_procedure(key,out)
        #print(key)
        #print(out)
        
    return out    

def Decrypt(string_key,string):
    out=string
    for key in string_key:
        key=chaToNumber(key)
        out=decript_procedure(key,out)
#        print(key)
#        print(out)
        
    return out