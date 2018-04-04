

var total_price=0;
var payment=0;
var countSells;
// var name=[];
// var price=[];
window.onload = function init() {
	// var element = document.Page.createElement("canvas");
	// element.html("This is a paragraph.");
	// element.setAttribute("name", "Ola");
	// element.setAttribute("class", "btn btn-default btn-lg");
	//var name= document.cookie.split(",");
	var clearButton=document.getElementById("clear");
	clearButton.addEventListener("click", Reset,false);
	 var name,price;
	 if(window.location.search.localeCompare("")!=0){
		 name=ReadHashName();	
		 price= ReadHashPrice();
	 }
	 else{
		name=getName();	
		price= getPrice();
	 }
	 countSells=PrepareSells(name);
	 PrintSells();
	 var query = window.location.hash;
	console.log(query);
	 //document.location.hash = "?";
	var i=0;
	var str="b"+i;
	while(i<name.length){
		
		$("#Page").append("<button id="+str+">"+name[i]+"</button>");
	
		$("#"+str+"").attr("class","btn btn-default btn-lg");
		i++;
		str="b"+i;
	}
	// ButtonControl(price);
	// i=0;
	// str="b"+i;
	// var Button=document.getElementById(str);
	// var f= new Function('price','total_price+=price;$("#totalPricePay").html(total_price);');
		
		// Button.addEventListener("click",f(price[i]),false);
		
	i=0;	
	var Button;
	var f;
	 while(i<price.length){
		 str="b"+i;
		Button=document.getElementById(str);
		 //f= new Function('','total_price+='+price[i]+';$("#totalPricePay").html(total_price);$("#totalPricePay").attr({"value":total_price});Change();incrementSellDB('+i+','+countSells+');PrintSells('+countSells+');');
		f= new Function('','total_price+='+price[i]+';$("#totalPricePay").html(total_price);$("#totalPricePay").attr({"value":total_price});Change();incrementSellDB('+i+');'); 	
		Button.addEventListener("click",f,false);
		//document.location.hash += name[i]+","+price[i]+";";
		i++;
	 }	
	 
	 i=1;
	 str="m"+i;
	 while(i<16){
		
		
		Button=document.getElementById(str);
		var Text=$("#"+str+"").text();
		// var num=parseInt(Text);
		f= new Function('','payment+='+parseFloat(Text)+';$("#payment").html(payment);$("#payment").attr({"value":payment});Change();');
		Button.addEventListener("click",f,false);
		i++;
		str="m"+i;
	}
	 
		 // var query = window.location.hash;
		 // console.log(query);
	
}
function Reset(){
	total_price=0;
	payment=0;
	$("#totalPricePay").html(total_price);
	$("#payment").html(payment);
	$("#change").html(0);
	ResetSells();
	
}

function getName(){
	var i=0;
	var str="Store"+i;
	var str_aux;
	var localname=[];
	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
		str_aux=localStorage.getItem(str).split(",");
		localname.push(str_aux[0]);
		//alert(str);
	}
	return localname;
}
function getPrice(){
	var i=0;
	var str="Store"+i;
	var str_aux;
	var localprice=[];
	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
		str_aux=localStorage.getItem(str).split(",");
		localprice.push(str_aux[1]);
		//alert(str);
	}
	return localprice;
}

// var f = new Function('name', 'return alert("hello, " + name + "!");');
// f('erick');

function ButtonControl(price){
	 var i=0;
	 var str;
	 var Button;
	 while(i<price.length){
		 str="b"+i;
		Button=document.getElementById(str);
		// var f= new Function('price','total_price+=price;');
		// f(price[i]);
		Button.addEventListener("click",AddPrice(price[i]),false);
		i++;
	 }
}

function Change(){
	var change=0;
	 change=payment-total_price;
	//change = Math.abs(parseFloat($("#totalPricePay").val())-parseFloat($("#payment").val()));
	$("#change").html(change);	
}

function PrepareSells(name){
	var countDB=[];
	var i=0;
	var array=[];
	while(i<name.length){
		array =[];
		array.push(name[i]);
		array.push(0);
		countDB.push(array);
		
		i++;
	}
	return countDB;
	
}
function incrementSellDB(i){
	countSells[i][1]++;
	var str="p"+i;
	$("#"+str+"").text(countSells[i][0]+": "+countSells[i][1]);
}
function PrintSells(){
	var i=0;
	var str="p"+i;
	while(i<countSells.length){
		
		$("#DB").append("<p id="+str+">"+countSells[i][0]+": "+countSells[i][1]+"</button>");
	
		
		i++;
		str="p"+i;
	}
}
function ResetSells(){
	var i=0;
	var str="p"+i;
	while(i<countSells.length){
		
		countSells[i][1]=0;
		$("#"+str+"").html(countSells[i][0]+": "+countSells[i][1]);
		
		i++;
		str="p"+i;
	}
}
function ReadHashName(){
	
	
		var query = window.location.search;
	var i=0;
	
	var str;
	var str_aux;
	str=query.split(";");
	var name=[];
	for (i=0;i<str.length && str[i].localeCompare("")!=0;i++){
		
		str_aux=str[i].split(",");
		if(i==0)
			str_aux[0]=str_aux[0].substring(1);
		name.push(str_aux[0]);
		//alert(str);
	}
	return name;
}
function ReadHashPrice(){
	
	
		var query = window.location.search;
	var i=0;
	
	var str;
	var str_aux;
	str=query.split(";");
	var price=[];
	for (i=0;i<str.length && str[i].localeCompare("")!=0;i++){
		str_aux=str[i].split(",");
		price.push(str_aux[1]);
		//alert(str);
	}
	return price;
}
	