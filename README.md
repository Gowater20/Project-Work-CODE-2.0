# Final Project Work  - PROGETTO CODE

**E-commerce Development Project in Node.js**

## Tecnologie utilizzate
- `Javascript` was used as the primary language for e-commerce development.
- `Typescript` offers better code maintainability by implementing static typing, allowing type errors to be caught.
- `Express.js` is a web framework for Node.js that simplifies web application and API development through its routing system, middleware, and error handling.
- `MongoDB` is a flexible and scalable NoSQL document-oriented database that offers a dynamic data structure and powerful query capabilities.

The combination of JavaScript, TypeScript, Express.js, and MongoDB provides a complete solution; it allows for a performant, scalable, and easily modifiable application.

## Initial Setup

Open a terminal in your project directory and run the following command:

    npm install

This will download and install all the necessary dependencies listed in the package.json file.

## Transpilation (Run just one time):

This step compiles TypeScript code into JavaScript. It is only required the first time you set up the project.

    npm run tsc

## Starting the Server

To start the server, use the single command:

    npm start

The command compiles the TypeScript code and starts the server using Nodemon. 
Nodemon will automatically monitor TypeScript file changes and restart the server whenever modifications are made, optimizing and streamlining development.

## API Testing

To test API calls, it is recommended to install the REST Client extension for Visual Studio Code or another IDE, allowing you to send HTTP requests directly from the editor and view the responses clearly and interactively. This extension is useful for testing RESTful APIs and other HTTP services without needing an external application or browser.
The test file for HTTP requests is named:

    TestAPI // write API's test

## Implemented Features
### USERS
Create and register a user profile
Required fields: first name, last name, email, and password

*Auth API (authApi) assigns a "role" for profile authorization management. We use an authentication system to ensure registered users can access certain features.

### PRODUCTS
Add, modify, delete a product
Required fields: name, brand, price

Product API (productApi) allows viewing all products with a get all products. Admin users can add, modify, and delete a product.

### CART
Add, remove, empty the cart

Cart API (cartApi) returns details of each purchased product. You can add, modify, and delete a product.

### ORDERS
Create, update, delete an order
Required fields: user data (first name, last name, email, password)

Order API (orderApi)
Admin users' functionalities: update the status of an existing order and delete an order.
User functionalities: view order history, create a new order.

# USABILITY
- The .env file is used to manage environment variables in this project.
- The Test Api folder allows testing the routes listed above present in the project.

# Missing Features at Last Update
- Cart Management
    - [ ] Calculation of the total cost of the cart
- Gestioni ordini
    - [ ] Calculation of the total cost of the order
 

Created by: Fabio Vallacqua
