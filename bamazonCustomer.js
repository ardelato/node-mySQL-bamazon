var mysql = require("mysql");
var inquirer = require("inquirer");

var product_choices = [];
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
      console.table(data);
      data.forEach((row) => {
        product_choices.push(row.item_id);
      });
      start();
    }
  );
  connection.end();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose the product you would like to buy: ",
        choices: product_choices,
        name: "id_choice",
      },
    ])
    .then(function (inquirerResponse) {
      console.log(inquirerResponse);
    })
    .catch(function (err) {
      throw err;
    });
}
