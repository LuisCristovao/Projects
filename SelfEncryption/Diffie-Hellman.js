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


//works for numbers lower than 2**50
//need to do 3 times
function DH(generator,private_number,mod){
    return (generator**private_number)%mod;
}
/*
Makes mod for big numbers 
aNumStr is a string with the number not in scientific notation
aDiv is a number (did not test if it works for really large numbers)
*/
function modulo( aNumStr, aDiv)
{
	var tmp = "";
	var  i, r;
	for ( i=0; i<aNumStr.length ; i++)
	{
		tmp += aNumStr.charAt( i);
		r = tmp % aDiv;
		tmp = r.toString( 10);
	}
	return tmp / 1;
}




/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var alicekey=getRandomArbitrary(2,12)
var bobkey=getRandomArbitrary(2,12)

gen=getRandomArbitrary(2,9);
do{
    
    mod=getRandomArbitrary(2,9)*getRandomArbitrary(10,50)
}while(mod>2**50)

console.log("[Public]Alice: the generator is "+gen+" and the mod is "+mod+"\n");
console.log("[Private]Alice: my private number is, "+alicekey);
console.log("[Private]Bob: my private number is, "+bobkey);
dhAlice=DH(gen,alicekey,mod)
dhBob=DH(gen,bobkey,mod)
console.log("\n[Public]Alice: Take my DH number: "+DH(gen,alicekey,mod))
console.log("[Public]Bob: Take my DH number: "+DH(gen,bobkey,mod))

console.log("\n[Private]Alice: Our Common Key is: "+DH(dhBob,alicekey,mod))
console.log("\n[Private]Bob: Our Common Key is: "+DH(dhAlice,bobkey,mod))
