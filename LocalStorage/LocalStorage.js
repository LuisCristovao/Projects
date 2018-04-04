

var object_id;
var number_of_items;
var deleteItemButton;
var currentStore;
window.onload = function init() {
	var submitButton=document.getElementById("submit");
	submitButton.addEventListener("click",CreateStorage,false);
	var clearButton=document.getElementById("clear");
	clearButton.addEventListener("click", ClearStorage,false);
	var qrButton=document.getElementById("qr");
	qrButton.addEventListener("click", QRgenerate,false);
    var ItemListButtons=document.getElementById("item_list");
    ItemListButtons.addEventListener("change",DeleteItemOnStore,false);
    var generateStore=document.getElementById("next");
    generateStore.addEventListener("click",GenerateStore,false);
    deleteItemButton=document.getElementById("delete_item");
    deleteItemButton.addEventListener("click",DeleteItem,false);
    number_of_items=0;
    object_id=0;
    currentStore=[];
    ShowCurrentStore();
	//console.log("NU "+number_of_items);
}


function CreateStorage(){
	$("#delete_item").fadeOut();
	var name= $("#usr").val();
	var price=$("#pwd").val();
	// var store=[]; 
	// store.push({name:name,price:price});
	// if(localStorage.e1=="NaN" || localStorage.Salgados==undefined){
			// localStorage.setItem(e1,JSON.stringify(store));
	// }
	
	// $("#output").html("You have clicked the button " + localStorage.e1 + " time(s).");
	 //document.cookie=name+","+price+";";
	// document.cookie = "username=John Doe";
	//var name1= document.cookie.split(",");
	 //alert(price+"   "+name);
	if(price=="" || name==""){
        alert("You need to fill the form! to submit");
    }else{
        
        //localStorage.clear();
	   // str="Store"+number_of_items;
	   //alert(str);
	
        //localStorage.setItem(str,name+","+price);
	   //alert(localStorage.getItem(str));
        //number_of_items++;
        //AddNumberOfItemsInLocalStore(number_of_items);
        
        //inserir novo produto na lista de items inseridos
        createItemList(name,price,object_id);
        //esta função aumenta object_id por isso vem depois
        AddToStore(name,price);
    }
}
function GenerateStore(){
    number_of_items=0;
    //alert(currentStore.length);
    while(number_of_items<currentStore.length){
        var str="Store"+number_of_items;
        var obj=currentStore[number_of_items];
        localStorage.setItem(str,obj.name+","+obj.price);
        number_of_items++;
    }
    //AddNumberOfItemsInLocalStore();
}

function AddNumberOfItemsInLocalStore(){
    localStorage.setItem("NumberOfItems",number_of_items);
}


function createItemList(name,price,storeid){
    
    $("#item_list").append("<option id=\"item\" value="+storeid+">"+name+" - "+price+"</option>");
}
function AddToStore(name,price){
    currentStore.push({id:object_id,name:name,price:price});
    object_id++;
}

function clearItemList(){
    $("#item_list").empty();
}

function ShowCurrentStore(){
    var name=[];
    var price=[];
    name=getName();
    price=getPrice();
     
    for(var i=0;i<name.length;i++){
       
        createItemList(name[i],price[i],object_id);
        AddToStore(name[i],price[i]);  
        console.log(object_id);
    }
    number_of_items=object_id;
    //alert(number_of_items);
}

function getName(){
	var i=0;
	var str="Store"+i;
	var str_aux;
	var localname=[];
    //number_of_items=localStorage.getItem("NumberOfItems");
	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
		str_aux=localStorage.getItem(str).split(",");
		localname.push(str_aux[0]);
		//alert(str);
	}    
//    if(number_of_items==null){
//        number_of_items=0;
//    }
//    
//    for(i=0;i<number_of_items;i++,str="Store"+i){
//         
//        str_aux=localStorage.getItem(str).split(",");
//        localname.push(str_aux[0]);
//        
//    }        
	return localname;
}
function getPrice(){
	var i=0;
	var str="Store"+i;
	var str_aux;
	var localprice=[];
     //number_of_items=localStorage.getItem("NumberOfItems");
	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
		str_aux=localStorage.getItem(str).split(",");
		localprice.push(str_aux[1]);
		//alert(str);
	}        
//    if(number_of_items==null){
//        number_of_items=0;
//    }    
//    
//    for (i=0;i<number_of_items;i++,str="Store"+i){
//       
//            str_aux=localStorage.getItem(str).split(",");
//		
//            localprice.push(str_aux[1]);
//        
//		//alert(str);
//	}
        
	return localprice;
}


function DeleteItem(){
    var selected_item=document.getElementById("item_list").value;
    localStorage.removeItem(selected_item);
    //apagar da lista item_list
    //$("#item_list").remove
    //console.log(selected_item);
    //alert(selected_item);
    $("#delete_item").fadeOut();
    //number_of_items--;
    //AddNumberOfItemsInLocalStore(number_of_items);
    clearItemList();
    findObject(selected_item);
    
    
    //ShowCurrentStore();
}

function DeleteItemOnStore(){
     
    $("#delete_item").fadeIn();
    //alert("oi");
    
}
function findObject(id){
    var aux=[];
    for(var i=0;i<currentStore.length;i++){
        if(id==currentStore[i].id){
            
        }
        else{
            aux.push(currentStore[i]);
        }
    }
    currentStore=[];
    currentStore=aux;
    localStorage.clear();
    for(var i=0;i<currentStore.length;i++){
        var str="Store"+i;
       localStorage.setItem(str,currentStore[i].name+","+currentStore[i].price);
        createItemList(currentStore[i].name,currentStore[i].price,currentStore[i].id)
    }
}

function ClearStorage(){
	localStorage.clear();
    $("#delete_item").fadeOut();
//    for(var i=0;i<number_of_items;i++){
//        var s="Store"+i;
//        localStorage.removeItem(s);
//    }
    
    clearItemList();
    currentStore=[];
}

function QRgenerate(){
    $("#delete_item").fadeOut();
	var name,price;
	name=getName();	
	price= getPrice();
	var i=0;
	var urlStr="http://secretid2.github.io/Projects/Local_store/GeneratedStore.html?";
	while (i<price.length){
		urlStr+= name[i]+","+price[i]+";";
		i++;
	}
	$("#qr_img").attr("src","https://api.qrserver.com/v1/create-qr-code/?data="+urlStr+"&amp;size=100x100");
	$("#qr_img").attr("style","");
	console.log(document.getElementById("qr_img").getAttribute("src"));
	$("#output").html(urlStr);
	
}

//function getName(){
//	var i=0;
//	var str="Store"+i;
//	var str_aux;
//	var localname=[];
//	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
//		str_aux=localStorage.getItem(str).split(",");
//		localname.push(str_aux[0]);
//		//alert(str);
//	}
//	return localname;
//}
//function getPrice(){
//	var i=0;
//	var str="Store"+i;
//	var str_aux;
//	var localprice=[];
//	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
//		str_aux=localStorage.getItem(str).split(",");
//		localprice.push(str_aux[1]);
//		//alert(str);
//	}
//	return localprice;
//}
//http://secretid2.github.io/SecretID_Projects_007/Local_store/GeneratedStore.html
//https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100