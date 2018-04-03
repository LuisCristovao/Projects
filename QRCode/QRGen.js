window.onload = function init() {
	
	var qrButton=document.getElementById("qr");
	qrButton.addEventListener("click", QRgenerate,false);
	var copybtn=document.getElementById('copy');
	copybtn.addEventListener("click", Copy,false);
	$('#output').hide();
	$('#copy').hide();
	
}

function QRgenerate(){
	var name= $("#usr").val();
	var i=0;
	var urlStr=name;
	$('#output').show();
	$('#copy').show();
	$("#qr_img").attr("src","https://api.qrserver.com/v1/create-qr-code/?data="+urlStr+"&amp;size=100x100");
	$("#qr_img").attr("style","");
	console.log(document.getElementById("qr_img").getAttribute("src"));
	$("#output").val(urlStr);
	
}
function Copy(){
  var copyText = document.getElementById("output");
  copyText.select();
  document.execCommand("Copy");
  $('#copy').html('Copied Text!');
  $('#copy').css('color','green');
  setTimeout(function(){ $('#copy').html('Copy Text');$('#copy').css('color','black'); }, 1000);

}

//http://secretid2.github.io/SecretID_Projects_007/Local_store/GeneratedStore.html
//https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100