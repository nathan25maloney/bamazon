var mysql = require('mysql');

var inquirer = require("inquirer");

var connection = mysql.createConnection({
 	host: 'localhost',
 	port: 3306,
 	user: 'root',
 	password: 'norsekey#1',
 	database: 'bamazon'
});

connection.connect(function(err) {
	if (err) throw err;
	
		   console.log("------------------------------------------------------------------------------------------------------\n");
	read();
	// run();
});


function read() {
	connection.query('SELECT * FROM products', function(err,results) {
	 	if (err) throw err;
	 	
	 	for (var i = 0; i < results.length; i++) {
	 		console.log("ID: "+results[i].item_id+" || PRODUCT: "+ results[i].product_name+" || DEPARTMENT: "+results[i].department_name+" || PRICE: "+results[i].price+" || INSTOCK: "+results[i].stock_quantity+"\n\n");

	 		
	 	}
	 	console.log("------------------------------------------------------------------------------------------------------\n");
	 	// run();
	 })
	
}