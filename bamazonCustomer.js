var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bamazon",
});

connection.connect(function (err) {
  if (err) throw err;
  connection.query(
    "SELECT item_id,product_name,price FROM products WHERE stock_quantity <> 0",
    function (err, data) {
      if (err) throw err;
      var products = [];
      console.table(data);
    }
  );
  connection.end();
});
