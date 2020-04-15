var inquirer = require("inquirer");
var mysql = require("mysql");

var product_choices = [];
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bamazon",
});

//Establish mysql connection and populate current products for later use
connection.connect(function (err) {
  if (err) throw err;
  connection.query("SELECT * FROM products ", function (err, data) {
    if (err) throw err;
    data.forEach((row) => {
      product_choices.push(row.item_id);
    });
    start();
  });
});

function start() {
  //Run Menu Options
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an option:",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
        ],
        name: "option",
      },
    ])
    .then(function (inquirerResponse) {
      switch (inquirerResponse.option) {
        case "View Products for Sale":
          showItems();
          break;
        case "View Low Inventory":
          lowStocked();
          break;
        case "Add to Inventory":
          addMore();
          break;
        case "Add New Product":
          break;
      }
    })
    .catch(function (error) {
      throw error;
    });
}

// List every product available with item IDs, names, prices, and quantities
function showItems() {
  connection.query(
    "SELECT item_id,product_name,price,stock_quantity FROM products",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
}

// List low stocked items
function lowStocked() {
  connection.query(
    "SELECT item_id,product_name,price,stock_quantity FROM products WHERE stock_quantity < 5",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      start();
    }
  );
}

// Add quantity to an item
function addMore() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which product would you like to add more to?",
        choices: product_choices,
        name: "add_choice",
      },
      {
        type: "number",
        message: "How many more items do you want to add?",
        name: "add_by",
      },
    ])
    .then(function (inquirerResponse) {
      connection.query(
        "SELECT * FROM products WHERE item_id = ?",
        [inquirerResponse.add_choice],
        function (err, res) {
          if (err) throw err;
          // console.log(res);

          var newQuantity = res[0].stock_quantity + inquirerResponse.add_by;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity,
              },
              {
                item_id: inquirerResponse.add_choice,
              },
            ],
            function (error) {
              if (error) throw error;
              start();
            }
          );
        }
      );
    })
    .catch(function (err) {
      throw err;
    });
}

// Add a new product to the database
function newItem() {}
