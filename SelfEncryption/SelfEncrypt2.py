# -*- coding: utf-8 -*-
"""
Created on Sat Sep  8 15:21:42 2018

@author: Samsung
"""

# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""




def charToNum(ch):
    return ord(ch)

def numToChar(n):
    return chr(n)


def ShiftLetter(l,secret):
    num=charToNum(l)
    num+=secret#%secret
#    num%=255
    return numToChar(num)

def UnShiftLetter(l,secret):
    num=charToNum(l)
    num-=secret
#    num%=255
    return numToChar(num)


def CharArrayToNumArray(larray):
    out=[]
    for l in larray:
        out.append(charToNum(l))
    
    return out


def CharArrayToString(charray):
    out=""
    
    for el in charray:
        out+=el
        
    return out


    
def Encrypt(text,key):
    
    
    out=[]
    key=CharArrayToNumArray(key)
    for el in text:
        out.append([])
    
    for kel in key:
        for i in range(len(text)):
            out[i]=ShiftLetter(text[i],kel)
            
        text=out    
    return CharArrayToString(out)        


def Decrypt(etext,key):
    
    out=[]
    key=CharArrayToNumArray(key)
    for el in text:
        out.append([])    
    
    for kel in key:
        for i in range(len(etext)):
            out[i]=UnShiftLetter(etext[i],kel)
            
        etext=out    
    return CharArrayToString(out) 


    
text="A pass é 123321"
key="123"    



enmessage=Encrypt(text,key)

print()
print(enmessage)
#
print()
print(Decrypt(enmessage,'321'))








