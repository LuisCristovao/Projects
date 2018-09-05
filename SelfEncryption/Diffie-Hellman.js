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




function scientificToDecimal(num) {
        const sign = Math.sign(num);
        //if the number is in scientific notation remove it
        if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            const zero = '0';
            const parts = String(num).toLowerCase().split('e'); //split into coeff and exponent
            const e = parts.pop(); //store the exponential part
            let l = Math.abs(e); //get the number of zeros
            const direction = e/l; // use to determine the zeroes on the left or right
            const coeff_array = parts[0].split('.');
            
            if (direction === -1) {
                coeff_array[0] = Math.abs(coeff_array[0]);
                num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
            }
            else {
                const dec = coeff_array[1];
                if (dec) l = l - dec.length;
                num = coeff_array.join('') + new Array(l+1).join(zero);
            }
        }
        
        if (sign < 0) {
            num = -num;
        }

        return num;
    }




//works for numbers lower than 2**50
//need to do 3 times
function DH(generator,private_number,mod){
    return modulo(scientificToDecimal(generator**private_number).toString(),mod);
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

/*
Generate random string with numbers
*/
function genRandomNumber(length){
    var numbers="0123456789"
    var fnum=""
    for( i=0; i<length;i++){
        
       var r=getRandomArbitrary(0,numbers.length);
       fnum+=numbers[r];
    }
       
    return parseInt(fnum); 
    
}



var alicekey=getRandomArbitrary(2,100)
var bobkey=getRandomArbitrary(2,100)

gen=getRandomArbitrary(2,100);
mod=genRandomNumber(30);

console.log("[Public]Alice: the generator is "+gen+" and the mod is "+mod+"\n");
console.log("[Private]Alice: my private number is, "+alicekey);
console.log("[Private]Bob: my private number is, "+bobkey);
dhAlice=DH(gen,alicekey,mod)
dhBob=DH(gen,bobkey,mod)
console.log("\n[Public]Alice: Take my DH number: "+DH(gen,alicekey,mod))
console.log("[Public]Bob: Take my DH number: "+DH(gen,bobkey,mod))

console.log("\n[Private]Alice: Our Common Key is: "+DH(dhBob,alicekey,mod))
console.log("\n[Private]Bob: Our Common Key is: "+DH(dhAlice,bobkey,mod))
