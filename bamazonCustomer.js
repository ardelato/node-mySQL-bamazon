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
      {
        type: "number",
        message: "How many units would you like to buy: ",
        name: "quantity",
      },
    ])
    .then(function (inquirerResponse) {
      //   console.log(inquirerResponse);
      purchase(inquirerResponse.id_choice, inquirerResponse.quantity);
    })
    .catch(function (err) {
      throw err;
    });
}

function purchase(id, quantity) {
  connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (
    err,
    res
  ) {
    if (err) throw err;
    // console.log(res);

    var newQuantity = res[0].stock_quantity - quantity;
    if (newQuantity <= 0) {
      console.log("\n\x1b[31m%s\x1b[0m\n", "Insufficient quanitity!");
      start();
    } else {
      var totalPrice = res[0].price * quantity;
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQuantity,
          },
          {
            item_id: id,
          },
        ],
        function (error) {
          if (error) throw error;
          console.log("\nTotal: " + totalPrice + "\n");
          start();
        }
      );
    }
  });
}
