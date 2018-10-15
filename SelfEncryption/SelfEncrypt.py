# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

def XOR(n1,n2):
    if(n1==n2):
        return 0
    else:
        return 1
    

def chatoint(string):
    array=[]
    for letter in string:
        array.append(ord(letter))
        
    return array

def numbertobinary(number):
   binstring=format(number,"b")
   outarray=[]
   for n in binstring:
       outarray.append(int(n))
       
   return outarray

def numArrayToBinArray(inarray):
    outarray=[]
    for ele in inarray:
        outarray.append(numbertobinary(ele))
        
    return outarray

def textToBin(text):
    intarray=chatoint(text)
    binarray=numArrayToBinArray(intarray)
    return binarray



def binToLetter(bnumberArray):
    text=""
    
    for n in bnumberArray:
        text+=str(n)
        
    return chr(int(text, 2))
    
def binArrayToText(arrayOfBins):
    text=""
    for el in arrayOfBins:
        text+=binToLetter(el)
        
    return text

def xorArrays(b1,b2):
    outarray=[]
    if(len(b1)==len(b2)):
        for i in range(len(b1)):
            outarray.append(XOR(b1[i],b2[i]))
    else:
        if(len(b1)>len(b2)):
            while len(b2)<len(b1):
                b2=[0]+b2
        else:
            while len(b1)<len(b2):
                b1=[0]+b1
        
        for i in range(len(b1)):
            outarray.append(XOR(b1[i],b2[i]))
        
    return outarray        



def Encrypt(text,key):
    
    bintext=textToBin(text)
    binkey=textToBin(key)
    binarray=[]
    for el in bintext:
        binarray.append([])
        
    
    for kel in binkey:
        for i in range(len(bintext)):
            binarray[i]=xorArrays(bintext[i],kel)
            
        bintext=binarray    
    return binArrayToText(binarray)        


def Decrypt(etext,key):
    
    bintext=textToBin(etext)
    binkey=textToBin(key)
    binarray=[]
    for el in bintext:
        binarray.append([])
    
    for kel in binkey:
        
        for i in range(len(bintext)):
            binarray[i]=(xorArrays(bintext[i],kel))
        
        bintext=binarray
    return binArrayToText(binarray)

#
#def Encrypt(arrayInput,arrayKey):
#    outarray=[]
#    
#    for kel in arrayKey:
#        for el in arrayInput:    
#            outarray.append(xorArrays(el,kel))
#    
#    
#    return outarray


#def Decrypt(entext,key):
#    outtext=""
#    binentext=textToBin(entext)
#    binkey=textToBin(key)
#    for kel in binkey:
#        for el in binentext:    
#            outtext+=binArrayToText(xorArrays(el,kel))
#    
#    return outtext
    
text="A pass é 123321"
key="231"    

print(textToBin(text))
print()
print(textToBin(key))


print()
print(binArrayToText(textToBin(text)))



enmessage=Encrypt(text,key)

print()
print(enmessage)
#
print()
print(Decrypt(enmessage,'213'))








