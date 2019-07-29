var connection = require("./config/connections.js")
var inquirer = require("inquirer"); 

// initialize global variables used for printing to terminal
var divider = " || ";
var lineBreak = "-----------------------\n";

// function to display all available items for purchase in the database
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
        var qty = inquirerResponse.quantity;
        isAvailable(productID, qty);
    })
};

function isAvailable(product, qty) {
    var queryString = 'SELECT ?? FROM ?? WHERE item_id = ?';
    connection.query(queryString, ['stock_quantity', 'products', product], function(err, res) {
        if(err) throw err;
        // assign variable for response data
        var availableQty = res[0].stock_quantity;
        // assign variable for calculation of new quantity after purchase
        var newQty = availableQty - qty; 
        // conditional statement that checks to see if desired qty is available
        if (newQty >= 0) {
            purchase(product, qty, newQty);
        } else {
            console.log("Insufficient quantity!")
        }
    })
}

function purchase(product, qty, newQty) {
    // build MySQL query string
    var queryString = 'UPDATE ?? SET stock_quantity = ? WHERE item_id = ?'
    // query the MQL database
    connection.query(queryString, ['products', newQty, product], function(err){
        if (err) throw err;
        var queryString2 = 'SELECT ?? FROM ?? WHERE item_id = ?'
        connection.query(queryString2, ['price', 'products', product], function(err, res){
            if (err) throw err;
            var price = res[0].price;
            var totalPrice = (price * qty);
            
            console.log("Purchase confirmed! Total cost: $" + totalPrice)
        })
    })
}