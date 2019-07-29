var mysql = require("mysql");
var inquirer = require("inquirer"); 

// set up MySQL database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AC00per!",
    database: "bamazon"
});
  
// connect to MySQL database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
console.log("connected as id " + connection.threadId);
});

// initialize global variables used for printing to terminal
var divider = " || ";
var lineBreak = "-----------------------\n";
var productArr = [];

function displayItems() {
    // build MySQL query string
    var queryString = 'SELECT * FROM ??'
    // query MySQL database
    connection.query(queryString, ["products"], function(err, res){
        if (err) {
            return console.log("There was an error ", err)
        } 
        console.log(lineBreak + "ITEMS FOR SALE")
        // loop through response and format data for print
        res.forEach(function(element){
            var resPrint = element.item_id + ". " + element.product_name + divider + "Dept: " + element.department_name + divider + "Price: $" + element.price + divider + "In-stock: " + element.stock_quantity
            console.log(resPrint)
            productArr.push(resPrint);
        })

        console.log(lineBreak);
        selectItem();
    })
}
// run display items when bamazonCustomer.js is called in command line
displayItems();

// use inquirer to prompt messages
function selectItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID for the product you'd like to buy",
            name: "productID"
        },
        {
            type: "input",
            message: "How many units of the product would you like to buy?",
            name: "quantity"
        }
    ]).then(function(inquirerResponse){
        var productID = parseInt(inquirerResponse.productID);
        var quantity = inquirerResponse.quantity;
        console.log(productID);
        console.log(quantity);
        isAvailable(productID, quantity);
    })
};

function isAvailable(product, quantity) {
    var queryString = 'SELECT ?? FROM ?? WHERE item_id = ?';
    connection.query(queryString, ['stock_quantity', 'products', product], function(err, res){
        if(err) throw err;
        var availableQty = JSON.stringify(res[0].stock_quantity);
        
        if ((availableQty - quantity) >= 0) {
            console.log("Product is available for purchase in that quantity")
        } else {
            console.log("Product not available in that quantity")
        }
    })
}