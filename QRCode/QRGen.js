window.onload = function init() {
	
	var qrButton=document.getElementById("qr");
	qrButton.addEventListener("click", QRgenerate,false);
	
}

function QRgenerate(){
	var name= $("#usr").val();
	var i=0;
	var urlStr=name;
	
	$("#qr_img").attr("src","https://api.qrserver.com/v1/create-qr-code/?data="+urlStr+"&amp;size=100x100");
	$("#qr_img").attr("style","");
	console.log(document.getElementById("qr_img").getAttribute("src"));
	$("#output").html(urlStr);
	
}


//http://secretid2.github.io/SecretID_Projects_007/Local_store/GeneratedStore.html
//https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100