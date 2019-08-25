# Bamazon
A CLI node application that allows you to search inventory and "purchase" from a mock storefront. It is built with:

* node.js
* JavaScript
* npm packages:
  * MySQL
  * inquirer
  * dotenv

## Overview
A MySQL database is used to store the inventory of an Amazon-style store. The schema is designed to store the following data:
* item id
* item name
* department
* price
* quantity in stock
(The application comes with a seeds.sql file to populate the database.)

Bamazon performs the following tasks:

Num | Task performed | Tech used
:--- | :--- | :---
1 | Displays inventory. | mysql npm query
2 | User selects item to purchase | inquirer npm
3 | User inputs quantity to purchase | inquirer npm
4 | Confirms/rejects purchase | mysql npm query
5 | Updates inventory | mysql npm query

## Functionality
![Screenshot of Game](assets/screenshotvideo.gif)