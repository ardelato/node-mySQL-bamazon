var inquirer = require("inquirer");
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
          break;
        case "View Low Inventory":
          break;
        case "Add to Inventory":
          break;
        case "Add New Product":
          break;
      }
    })
    .catch(function (error) {
      throw error;
    });
}

// List every product available
function showItems() {}

// List low stocked items
function lowStocked() {}

// Add quantity to an item
function addMore() {}

// Add a new product to the database
function newItem() {}
