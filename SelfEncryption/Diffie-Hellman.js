/*import random


def DH(generator,private_number,mod):
    
    return generator**(private_number)%mod

def generateRandom(length=30):
    numbers="0123456789"
    fnum=""
    for i in range(length):
       r=random.randrange(0,len(numbers))
       fnum+=numbers[r]
       
    return int(fnum)   

Alice_key=random.randrange(2,100)
Bob_key=random.randrange(2,100)

gen=random.randrange(2,100)
mod=generateRandom()


print("[Public]Alice: the generator is",gen,"and the mod is",mod,"\n")
print("[Private]Alice: my private number is,",Alice_key)
print("[Private]Bob: my private number is,",Bob_key)
dhAlice=DH(gen,Alice_key,mod)
dhBob=DH(gen,Bob_key,mod)
print("\n[Public]Alice: Take my DH number:",DH(gen,Alice_key,mod))
print("[Public]Bob: Take my DH number:",DH(gen,Bob_key,mod))

print("\n[Private]Alice: Our Common Key is:",DH(dhBob,Alice_key,mod))
print("\n[Private]Bob: Our Common Key is:",DH(dhAlice,Bob_key,mod))*/



function DH(generator,private_number,mod){
    return (generator**private_number)%mod;
}

console.log(DH(23000,34,345));