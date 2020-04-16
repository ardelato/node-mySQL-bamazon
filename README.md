# Node & SQL Bamazon 

## Objective
---
To create a node/mysql app that can track & update mock data on amazon products with two different views for interaction (customer view and supervisor view)

## Technologies used
---
 * [mysql](https://www.npmjs.com/package/mysql)
   * To interact with the mysql database that holds the mock data on amazon products

 * [inquirer](https://www.npmjs.com/package/mysql)
   * To prompt the user (customer or supervisor) with a selection of options to interact with the

---
## Customer View

When first launching it will retrieve all the data from the database and display the IDs, names, and prices of the products for sale

The app will then prompt the customer: 

1. A choice to select which product they would like to buy based of the product id
2. Then ask how many units of the product they would like to purchase

After the selection it will determine if there is enough units in stock before update the database and informing the customer their total price. 


![](assets/customerView.gif)

-------
## Supervisor View

When first launching it will immediately prompt the supervisor with a few menu options:

### View Products for sale: 
This will list every available item with the following data: the item IDs, names, prices, and quantities.
![](assets/supervisorViewProducts.gif)

### View Low Inventory:
This will list all items with an inventory count lower than five.
![](assets/supervisorViewLow.gif)

### Add to Inventory:
This will then do a follow up prompt to the supervisor to select a product Id to add more stock to and ask how much more stock to add
![](assets/supervisorAddInv.gif)


### Add New Product:
This will prompt the manager with questions about the new product to add to the database.
![](assets/supervisorAddNew.gif)

