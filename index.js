// get the client
const mysql = require('mysql2');
const inquirer = require("inquirer")
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  database: 'password'
});


function initialize() {
  console.log("------------------------------------");
  console.log("|           EMPLOYEE               |");
  console.log("|           TRACKER                |")
  console.log("------------------------------------");


  return inquirer
    .prompt(
      {
        name: "welcome",
        type: "list",
        message: "Welcome to the employee database, what would you like to do?",
        choices: ["view employees", "view departments"],
      },
    )
    .then((answer) => {
      console.log(answer.welcome);
    })
    .catch((error) => {
      console.log(error);
    })
}

initialize()