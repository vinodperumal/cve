//global variable declaration
var globalvendorname = '';
var functioncallcount = 0;

function ShowTheRightBlock(Chosenoption) {//open function show the right block

console.log(Chosenoption);

switch(Chosenoption) {//openswitch
  case 'OneProductOneVendor':
    	// code block
	document.getElementById('OneProductOneVendor').style.display = 'block';
	document.getElementById('AllProductsOneVendor').style.display = 'none';
	document.getElementById('SearchWithCVEID').style.display = 'none';
	document.getElementById('DescCard').style.display = 'none';
	document.getElementById('OptionsList').style.display = 'none';
	document.getElementById('Aboutinfobutton').style.display = 'none';
	document.getElementById('showData4').value = null;
	document.getElementById('VendorName-input').value = null;
	document.getElementById('vendor-name-input').value = null;
	document.getElementById('product-name-input').value = null;
	document.getElementById('CVEID-input').value = null;
    	break;

  case 'SearchWithCVEID':
    	// code block
	document.getElementById('SearchWithCVEID').style.display = 'block';
	document.getElementById('OneProductOneVendor').style.display = 'none';
	document.getElementById('AllProductsOneVendor').style.display = 'none';
	document.getElementById('DescCard').style.display = 'none';
	document.getElementById('OptionsList').style.display = 'none';
	document.getElementById('showData4').value = null;
	document.getElementById('VendorName-input').value = null;
	document.getElementById('vendor-name-input').value = null;
	document.getElementById('product-name-input').value = null;
	document.getElementById('CVEID-input').value = null;
	document.getElementById('Aboutinfobutton').style.display = 'none';

    	break;

  case 'AllProductsOneVendor':
    	// code block
	document.getElementById('AllProductsOneVendor').style.display = 'block';
	document.getElementById('OneProductOneVendor').style.display = 'none';
	document.getElementById('SearchWithCVEID').style.display = 'none';
	document.getElementById('DescCard').style.display = 'none';
	document.getElementById('OptionsList').style.display = 'none';
	document.getElementById('showData4').value = null;
	document.getElementById('VendorName-input').value = null;
	document.getElementById('vendor-name-input').value = null;
	document.getElementById('product-name-input').value = null;
	document.getElementById('CVEID-input').value = null;
	document.getElementById('Aboutinfobutton').style.display = 'none';

    	break;

  case 'AllVendors':
    	// code block
	document.getElementById('AllProductsOneVendor').style.display = 'none';
	document.getElementById('OneProductOneVendor').style.display = 'none';
	document.getElementById('SearchWithCVEID').style.display = 'none';
	document.getElementById('DescCard').style.display = 'none';
	document.getElementById('OptionsList').style.display = 'none';
	document.getElementById('showData4').value = null;
	document.getElementById('VendorName-input').value = null;
	document.getElementById('vendor-name-input').value = null;
	document.getElementById('product-name-input').value = null;
	document.getElementById('CVEID-input').value = null;
	document.getElementById('Aboutinfobutton').style.display = 'none';
	CreateTableFromJSON('AllVendors');

    	break;

  default:
    // code block
    console.log('Defaultvalue');
    break;	
}//close switch

}//close function show the right block

function CreateTableFromJSON(Chosenoption) {//open function create table from JSON



//Clearing residual values
	console.log(functioncallcount);
	functioncallcount = functioncallcount + 1;
	for (i = 0;i < functioncallcount ;i++){//open for
	try{	
	document.getElementById('listcontainer').style.display = 'none';
	console.log('The products have been cleared');
	}catch{
	console.log('The list is not made yet' );
	}}//close for

console.log(Chosenoption);

switch(Chosenoption) {//openswitch
  case 'OneProductOneVendor':
    	// code block
	var vendorname = document.getElementById('vendor-name-input').value;
	var productname = document.getElementById('product-name-input').value;
	if(vendorname.length != 0 && productname.length != 0){//open if
	var apiurl = 'https://cve.circl.lu/api/search/';
	var newapiurl = apiurl.concat(vendorname,'/',productname);
	}else if (vendorname.length == 0 && productname.length != 0){
	
	var apiurl = 'https://cve.circl.lu/api/search/';
	var newapiurl = apiurl.concat(productname);	
	document.getElementById('vendor-name-input').value = 'Getting all known vulnerabilities for this product';
	}else{
	document.getElementById('vendor-name-input').value = 'Enter valid vendor(optional)';
	document.getElementById('product-name-input').value = 'Enter valid product(must)';
	}//close if	
    	break;

  case 'SearchWithCVEID':
    	// code block
	var cveidinput = document.getElementById('CVEID-input').value; 
	if(cveidinput.length != 0){//open if   	
	var apiurl = 'https://cve.circl.lu/api/cve/';
	var newapiurl = apiurl.concat(cveidinput);
	}else{
	document.getElementById('CVEID-input').value = 'Enter valid input';
	}//close if	 
    	break;

  case 'AllProductsOneVendor':
    	// code block
	var vendornameonly = document.getElementById('VendorName-input').value; 
	if(vendornameonly.length != 0){ //open if  	
	var apiurl = 'https://cve.circl.lu/api/browse/';
	var newapiurl = apiurl.concat(vendornameonly);
	}else{
	document.getElementById('VendorName-input').value = 'Enter valid input';
	} //close if
    	break;

  case 'AllVendors':
    	// code block
	var newapiurl = 'https://cve.circl.lu/api/browse/';
    	break;
  
  default:
    // code block
    console.log('Defaultvalue');
    break;	
}//close switch

document.getElementById('OptionsList').style.display = "none";
var request = new XMLHttpRequest();

var elem = document.getElementById('progress-bar');

request.addEventListener("progress", updateProgress);
request.addEventListener("load", transferComplete);
request.addEventListener("error", transferFailed);
request.addEventListener("abort", transferCanceled);

console.log(newapiurl);

request.open('GET', newapiurl, true);
request.send(null);

// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {//open function progress
  if (oEvent.lengthComputable) {//open if
    var percentComplete = oEvent.loaded / oEvent.total * 100;
    elem.style.width = percentComplete + '%' ;
  } else {
    console.log('Unable to compute progress information since the total size is unknown');
  }//close if
}//close function progress
function transferComplete(evt) {
  console.log("The transfer is complete.");
}
function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}
function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}

request.onload = function () {// open request on load

// Begin accessing JSON data here
var data = JSON.parse(this.response);
//console.log(data.length);

if (data.length == undefined && Chosenoption == 'SearchWithCVEID'){// open if undefined

        var CVEIDtable = document.createElement("table");
	CVEIDtable.setAttribute('class', 'table table-dark');
	var colnames = ["Modified", "Published", "ID","Summary"];
	var tr = CVEIDtable.insertRow(-1); 
	for (var i = 0; i < colnames.length; i++) {// open for
            var th = document.createElement("th");   
            th.innerHTML = colnames[i];
            tr.appendChild(th);}//close for
        
	var tr = CVEIDtable.insertRow(-1); 
	var tabCell2 = tr.insertCell();
        tabCell2.innerHTML = data.Modified;
	var tabCell3 = tr.insertCell();
        tabCell3.innerHTML = data.Published;
	var tabCell4 = tr.insertCell();
        tabCell4.innerHTML = data.id;
	var tabCell5 = tr.insertCell();
        tabCell5.innerHTML = data.summary;

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData4");
        divContainer.innerHTML = "";
        divContainer.appendChild(CVEIDtable);
 	showresult();
	
	}else if(data.length == undefined &&  Chosenoption == 'OneProductOneVendor'){

	var CVEIDtable = document.createElement("table");
	CVEIDtable.setAttribute('class', 'table table-dark');
	var colnames = ["Modified", "Published", "ID","Summary"];
	var tr = CVEIDtable.insertRow(-1); 
	for (var i = 0; i < colnames.length; i++) {//open for
        var th = document.createElement("th");   
        th.innerHTML = colnames[i];
        tr.appendChild(th);}//close for

	for (i in data.data){// open for i
	var tr2 = CVEIDtable.insertRow(-1); 
	for (j in data.data[i]){// open for j

	switch(j){// open switch

	case 'Modified':

			var tabCell2 = tr2.insertCell();
			tabCell2.innerHTML = data.data[i][j];
			break;

	case 'Published':

			var tabCell3 = tr2.insertCell();
			tabCell3.innerHTML = data.data[i][j];
			break;

	case 'id':

			var tabCell4 = tr2.insertCell();
			tabCell4.innerHTML = data.data[i][j];
			break;

	case 'summary':

			var tabCell5 = tr2.insertCell();
			tabCell5.innerHTML = data.data[i][j];
			break;

	default :
			break;
 	
	}//close switch
	}//close for i
	}//close for j
	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData4");
        divContainer.innerHTML = "";
        divContainer.appendChild(CVEIDtable);
 	showresult();
	
} else if(Chosenoption == 'AllProductsOneVendor'){
	var productsfound = 0;
	
	for (y in data) {// open for y

	// Make a container element for the list
    	var listContainer = document.createElement('div');
	listContainer.setAttribute('id', 'listcontainer');

    	// Add it to the page
    	document.getElementsByTagName('body')[0].appendChild(listContainer);

    	// Make the list
    	var listElement = document.createElement('ul');
	listElement.setAttribute('class', 'list-group');
	listElement.setAttribute('display', 'block');
	listElement.setAttribute('id', 'ProductsList');

    	// Add it to the page
    	listContainer.appendChild(listElement);

    	// Set up a loop that goes through the items in listItems one at a time
	try{
    	var numberOfListItems = data[y].length;
	}catch{
        document.getElementById('VendorName-input').value = 'This input could not be handled';
	}

    	for (var i = 0; i < numberOfListItems; ++i) {// open for i
        
		// create an item for each one
        	var listItem = document.createElement('button');
		listItem.setAttribute('type', 'button');
		listItem.setAttribute('class', 'list-group-item list-group-item-action');
		
        	// Add the item text
		if(typeof data[y] != 'string'){// open if
        	listItem.innerHTML = data[y][i];
		globalvendorname = vendornameonly
		listItem.setAttribute('value', data[y][i]);
		listItem.setAttribute('onclick', 'CallOneProductOneVendor(globalvendorname,this.value)');

		productsfound = productsfound + 1;
		
		}else{
		//listItem.innerHTML = data[y];
		i = numberOfListItems;
		}//close if
		
        	// Add listItem to the listElement
        	listElement.appendChild(listItem);
	}//close for i
	}//close for y
	console.log(productsfound);	
	var resulttext = 'Result: ';
	document.getElementById("VendorName-input").value = resulttext.concat(productsfound , ' products found');
	showresult();

} else if(Chosenoption == 'AllVendors') { 

var vendorarray = data.vendor;
console.log(vendorarray.length);

	// Make a container element for the list
    	var listContainer = document.createElement('div');

    	// Add it to the page
    	document.getElementsByTagName('body')[0].appendChild(listContainer);

    	// Make the list
    	var listElement = document.createElement('ul');
	listElement.setAttribute('class', 'list-group');
	listElement.setAttribute('display', 'block');
	listElement.setAttribute('id', 'VendorsList');

    	// Add it to the page
    	listContainer.appendChild(listElement);


    	for (var i = 0; i < vendorarray.length; ++i) {//open for i
        
		// create an item for each one
        	var listItem = document.createElement('button');
		listItem.setAttribute('type', 'button');
		listItem.setAttribute('class', 'list-group-item list-group-item-action');
		
        	// Add the item text
        	listItem.innerHTML = vendorarray[i];
		listItem.setAttribute('value', vendorarray[i]);
		listItem.setAttribute('onclick', 'CallAllProductOneVendor(this.value)');

        	// Add listItem to the listElement
        	listElement.appendChild(listItem);
		
	}//close for i


} else {

if (data.length == 0) {//open if
document.getElementById("vendor-name-input").value = ' O records found';
document.getElementById("product-name-input").value = ' O records found';
}else{
document.getElementById("vendor-name-input").value = data.length + ' records found';
document.getElementById("product-name-input").value = data.length + ' records found';
}//close if

// EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < data.length; i++) {// open for i
            for (var key in data[i]) {//open for k
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }//close for k
        }//close for i


// CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
	table.setAttribute('class', 'table table-dark');

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {// open for i
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }//close for i

 // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.length; i++) {//open for i

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {//open for j
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }//close for j
        } //close for i

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData4");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
	showresult();

}// close if undefined 	
}// close request on load
}// close function create table from JSON
function CallOneProductOneVendor(vendorname,productname){//open func

document.getElementById('ProductsList').style.display = 'none';
console.log('old elements hidden');
console.log('One product one vendor called');
console.log(vendorname);
console.log(productname);
ShowTheRightBlock('OneProductOneVendor');
document.getElementById('vendor-name-input').value = vendorname;
document.getElementById('product-name-input').value = productname;
var globalvendorname = '';
var globalproductname = '';
CreateTableFromJSON('OneProductOneVendor'); 
}//close function


function CallAllProductOneVendor(vendorname){//open function
document.getElementById('VendorsList').style.display = 'none';
console.log('old elements hidden');
console.log('All product one vendor called');
console.log(vendorname);
ShowTheRightBlock('AllProductsOneVendor');
document.getElementById('VendorName-input').value = vendorname;
CreateTableFromJSON('AllProductsOneVendor'); 
}//close function

function showresult(){//open function
document.getElementById('output').style.display = 'block';
}//close function
