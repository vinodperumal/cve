function ShowTheRightBlock(Chosenoption) {

console.log(Chosenoption);

switch(Chosenoption) {
  case 'OneProductOneVendor':
    	// code block
	document.getElementById('OneProductOneVendor').style.display = 'block';
	document.getElementById('AllProductsOneVendor').style.display = 'none';
	document.getElementById('SearchWithCVEID').style.display = 'none';
    	break;

  case 'SearchWithCVEID':
    	// code block
	document.getElementById('SearchWithCVEID').style.display = 'block';
	document.getElementById('OneProductOneVendor').style.display = 'none';
	document.getElementById('AllProductsOneVendor').style.display = 'none';
    	break;

  case 'AllProductsOneVendor':
    	// code block
	document.getElementById('AllProductsOneVendor').style.display = 'block';
	document.getElementById('OneProductOneVendor').style.display = 'none';
	document.getElementById('SearchWithCVEID').style.display = 'none';
    	break;

  default:
    // code block
    console.log('Defaultvalue');
    break;	
}

}

function CreateTableFromJSON(Chosenoption) {

console.log(Chosenoption);

switch(Chosenoption) {
  case 'OneProductOneVendor':
    	// code block
	var vendorname = document.getElementById('vendor-name-input').value;
	var productname = document.getElementById('product-name-input').value;
	var apiurl = 'https://cve.circl.lu/api/search/';
	var newapiurl = apiurl.concat(vendorname,'/',productname);
    	break;

  case 'SearchWithCVEID':
    	// code block
	var cveidinput = document.getElementById('CVEID-input').value;    	
	var apiurl = 'https://cve.circl.lu/api/cve/';
	var newapiurl = apiurl.concat(cveidinput);
    	break;

  case 'AllProductsOneVendor':
    	// code block
	var vendornameonly = document.getElementById('VendorName-input').value;    	
	var apiurl = 'https://cve.circl.lu/api/browse/';
	var newapiurl = apiurl.concat(vendornameonly);
    	break;
  
  default:
    // code block
    console.log('Defaultvalue');
    break;	
}

document.getElementById('OptionsList').style.display = "none";
var request = new XMLHttpRequest();

var elem = document.getElementById('progress-bar');

request.addEventListener("progress", updateProgress);
request.addEventListener("load", transferComplete);
request.addEventListener("error", transferFailed);
request.addEventListener("abort", transferCanceled);

console.log(newapiurl);

request.open('GET', newapiurl, true);

// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total * 100;
    elem.style.width = percentComplete + '%' ;
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}
function transferComplete(evt) {
  console.log("The transfer is complete.");
}
function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}
function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}

request.onload = function () {

// Begin accessing JSON data here
var data = JSON.parse(this.response);
console.log(data.length);
if (data.length == undefined && Chosenoption == 'SearchWithCVEID')	{

        var CVEIDtable = document.createElement("table");
	CVEIDtable.setAttribute('class', 'table table-dark');
	var colnames = ["Modified", "Published", "Summary"];
	var tr = CVEIDtable.insertRow(-1); 
	for (var i = 0; i < colnames.length; i++) {
            var th = document.createElement("th");   
            th.innerHTML = colnames[i];
            tr.appendChild(th);
        }
	var tr = CVEIDtable.insertRow(-1); 
	var tabCell2 = tr.insertCell(-1);
        tabCell2.innerHTML = data.Modified;
	var tabCell3 = tr.insertCell(0);
        tabCell3.innerHTML = data.Published;
	var tabCell4 = tr.insertCell(1);
        tabCell4.innerHTML = data.summary;

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData3");
        divContainer.innerHTML = "";
        divContainer.appendChild(CVEIDtable);
 

} else if(Chosenoption == 'AllProductsOneVendor'){

	for (y in data) {

	// Make a container element for the list
    	var listContainer = document.createElement('div');

    	// Add it to the page
    	document.getElementsByTagName('body')[0].appendChild(listContainer);

    	// Make the list
    	var listElement = document.createElement('ul');
	listElement.setAttribute('class', 'list-group');

    	// Add it to the page
    	listContainer.appendChild(listElement);

    	// Set up a loop that goes through the items in listItems one at a time
    	var numberOfListItems = data[y].length;

    	for (var i = 0; i < numberOfListItems; ++i) {
        
		// create an item for each one
        	var listItem = document.createElement('li');
		listItem.setAttribute('class', 'list-group-item');

        	// Add the item text
		if(typeof data[y] != 'string'){
        	listItem.innerHTML = data[y][i];
		}else{
		listItem.innerHTML = data[y];
		i = numberOfListItems;
		}
		
        	// Add listItem to the listElement
        	listElement.appendChild(listItem);
	}
	}

} else {


// EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }


// CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
	table.setAttribute('class', 'table table-dark');

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

 // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
        } 

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

}	
}

request.send();

}
