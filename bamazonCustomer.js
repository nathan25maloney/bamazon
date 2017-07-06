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
	
});

function end() {
	connection.end();
}


function read() {
	connection.query('SELECT * FROM products', function(err,results) {
	 	if (err) throw err;
	 	
	 	for (var i = 0; i < results.length; i++) {
	 		console.log("ID: "+results[i].item_id+" || PRODUCT: "+ results[i].product_name+" || DEPARTMENT: "+results[i].department_name+" || PRICE: "+results[i].price+" || INSTOCK: "+results[i].stock_quantity+"\n\n");

	 		
	 	}
	 	console.log("------------------------------------------------------------------------------------------------------\n");
	 	
	 	run();

	 })
	
}

 function run() {
 	
 	
	inquirer.prompt([
	{
		name: "choice",
		message: "Select the ID of the product you'd like to buy."
	},{
		name:"quantity",
		message:"How many do you wish to buy?"
	}

	]).then(function(answers) {
		check(parseInt(answers.choice),parseInt(answers.quantity));
		
		
	})
}


function check(id,num) {
	connection.query('SELECT * FROM products', function(err,results) {
	 	if (err) throw err;
	 	for (var i = 0; i < results.length; i++) {
			 		if (results[i].item_id === id){
			 			if(results[i].stock_quantity <= num){
			 				console.log("I'm sorry but we do not have enough stock for that. \n");
			 				inquirer.prompt([
										{
											name:"continue",
											message:"Would you like to perhaps buy something else? (yes/no)"
										}
										]).then(function(answ){
											if(answ.continue === "yes"){
												run();
											} else {
												console.log("Thank you for shopping with us today!");
												end();
											}
										})		
			 			} else if (results[i].stock_quantity >= num){
			 				console.log("We can fufill that order.")
			 				var newQuantity = results[i].stock_quantity - num;
			 				var price = num*parseInt(results[i].price);

			 				connection.query('UPDATE products SET ? WHERE ?', 
								[
									{
										stock_quantity: newQuantity 
									},
									{
										item_id: id
									}
								], function(err,res){
									if (err) throw err;
									
									console.log("You purchased "+num+" for "+ price);
									inquirer.prompt([
										{
											name:"continue",
											message:"Would you like to make another purchase? (yes/no)"
										}
										]).then(function(answ){
											if(answ.continue === "yes"){
												read();
												
											} else {
												console.log("Thank you for shopping with us today!");
												end();
											}
										})							
								});
			 				
			 				
			 			}
			 		}
			 	}
	 })
}