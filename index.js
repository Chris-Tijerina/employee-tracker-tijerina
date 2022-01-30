// get the client
const mysql = require('mysql2');
const inquirer = require("inquirer")
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'newuser',
  password: 'password',
  database: 'employees'
});


function initialize() {
  console.log(" ______                 _                         _______             _             ");
  console.log("|  ____|               | |                       |__   __|           | |            ");
  console.log("| |__   _ __ ___  _ __ | | ___  _   _  ___  ___     | |_ __ __ _  ___| | _____ _ __ ");
  console.log("|  __| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\    | | '__/ _` |/ __| |/ / _ \\ '__|");
  console.log("| |____| | | | | | |_) | | (_) | |_| |  __/  __/    | | | | (_| | (__|   <  __/ |   ");
  console.log("|______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|    |_|_|  \\__,_|\\___|_|\\_\\___|_|   ");
  console.log("                 | |             __/ |                                              ");
  console.log("                 |_|            |___/                                               ");

  inquirer.prompt(
    {
      name: "mainMenu",
      type: "list",
      message: "Welcome to the employee database, what would you like to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee", "Exit"],
    },
  )
    .then(function (answer) {
      switch (answer.mainMenu) {
        case "View All Departments":
          viewEmployees();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add A Department":
          addDepartment();
          break;
        
        case "Add A Role":
          addRole();
          break;

        case "Add An Employee":
          addRole();
          break;

        case "Update An Employee":
          updateEmployee();
          break;

        case "Exit":
          console.log("Goodbye!");
      }

    })
    .catch((error) => {
      console.log(error);
    })
}

// function viewEmployees() {
//   connection.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id;", function (err, results) {
//     console.table(results);
//   })

}

function viewAllDept() {
  connection.query("")
}

initialize();