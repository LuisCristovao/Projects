//variables ------------
let encrypted_text=document.getElementById("encrypted")
let decrypted_text=document.getElementById("decrypted")
let encryption_options=document.getElementById("encryption_options")
let enc_btn=document.getElementById("enc_btn")
let dec_btn=document.getElementById("dec_btn")
let password=document.getElementById("pass")
let options={
				"cesar":{
					"encrypt":(text,key)=>{cesarEncryption(text,key)},
					"decrypt":(text,key)=>{cesarDecryption(text,key)}
				},
				"cesar_with_pass":{
					"encrypt":(text,key)=>{cesarPassEncryption(text,key)},
					"decrypt":(text,key)=>{cesarPassDecryption(text,key)}
				}
				
				
			
			}
//events
enc_btn.onclick=()=>{
	let dec_text=getDecryptedText()
	let pass=getPassword()
	let option=getEncryptionOption()
	options[option]["encrypt"](dec_text,pass)
	
}
dec_btn.onclick=()=>{
	let dec_text=getEncryptedText()
	let pass=getPassword()
	let option=getEncryptionOption()
	options[option]["decrypt"](dec_text,pass)
	
}
//functions-------------
function getPassword(){
	return password.value
}
function getEncryptionOption(){
	return encryption_options.value
}
function getDecryptedText(){
	return decrypted_text.value
}
function getEncryptedText(){
	return encrypted_text.value
}
function setEncryptionText(text){
	encrypted_text.value=text
}
function setDecryptionText(text){
	decrypted_text.value=text
}
function characterToCode(character){
	return character.charCodeAt(0)
}
function codeToCharacter(code){
	return String.fromCharCode(code)
	
}
function stringToCodes(str){
	return str.split("").map(el=>characterToCode(el))
}
function codesToString(codes_array){
	return codes_array.map(el=>codeToCharacter(el)).reduce((acc,n)=>{return `${acc}${n}`})
}
//normal cesar -------------
function cesarEncryption(text,key){
	let text_codes=stringToCodes(text)
	let key_code=characterToCode(key)
	let final_codes=text_codes.map(el=>el+(key_code-96)) // 96 is the code right before a
	let final_text=codesToString(final_codes)
	setEncryptionText(final_text)
	
}
function cesarDecryption(text,key){
	let text_codes=stringToCodes(text)
	let key_code=characterToCode(key)
	let final_codes=text_codes.map(el=>el-(key_code-96)) // 96 is the code right before a
	let final_text=codesToString(final_codes)
	setDecryptionText(final_text)
}
//Cesar with pass ----------------------------
function cesarPassEncryption(text,key){
	let text_codes=stringToCodes(text)
	let key_code=stringToCodes(key)
	var final_codes=[]
	for (var i=0;i<text_codes.length;i+=key_code.length){
		var el=text_codes[i]
		var subset=text_codes.slice(i,i+key_code.length)
		for (var j=0;j<key_code.length;j++){
			var kel=key_code[j]
			var nel=subset[j]
			final_codes.push(nel+(kel-96))// 96 is the code right before a
		}
	}
	let final_text=codesToString(final_codes)
	setEncryptionText(final_text)
	
}
function cesarPassDecryption(text,key){
	let text_codes=stringToCodes(text)
	let key_code=stringToCodes(key)
	var final_codes=[]
	for (var i=0;i<text_codes.length;i+=key_code.length){
		var el=text_codes[i]
		var subset=text_codes.slice(i,i+key_code.length)
		for (var j=0;j<key_code.length;j++){
			var kel=key_code[j]
			var nel=subset[j]
			final_codes.push(nel-(kel-96))// 96 is the code right before a
		}
	}
	let final_text=codesToString(final_codes)
	setDecryptionText(final_text)
}
//New ideia 1--------------
function newIdeia1Encrypt(text,key){
	let text_codes=stringToCodes(text)
	let key_code=stringToCodes(key)
	var final_codes=[]
	for (var i=0;i<text_codes.length;i+=key_code.length){
		var el=text_codes[i]
		var subset=text_codes.slice(i,i+key_code.length)
		for (var j=0;j<key_code.length;j++){
			var kel=key_code[j]
			var nel=subset[j]
			final_codes.push(nel+(kel-96))// 96 is the code right before a
		}
	}
	let final_text=codesToString(final_codes)
	setEncryptionText(final_text)
	
}
function newIdeia1Decrypt(text,key){
	let text_codes=stringToCodes(text)
	let key_code=stringToCodes(key)
	var final_codes=[]
	for (var i=0;i<text_codes.length;i+=key_code.length){
		var el=text_codes[i]
		var subset=text_codes.slice(i,i+key_code.length)
		for (var j=0;j<key_code.length;j++){
			var kel=key_code[j]
			var nel=subset[j]
			final_codes.push(nel-(kel-96))// 96 is the code right before a
		}
	}
	let final_text=codesToString(final_codes)
	setDecryptionText(final_text)
}