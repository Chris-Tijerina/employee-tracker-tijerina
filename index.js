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
  mainMenu();
}

function mainMenu() {
  inquirer.prompt(
    {
      name: "mainMenu",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee", "Exit"]
    }
  )
    .then(function (answer) {
      switch (answer.mainMenu) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
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
          addEmployee();
          break;

        case "Update An Employee":
          updateEmployee();
          break;

        case "Exit":
          console.log("Goodbye!");
          process.exit();
      }

    })
    .catch((error) => {
      console.log(error);
    })
}


function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    mainMenu();
  })
}

function viewEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;", function (err, results) {
    console.table(results);
    mainMenu();
  })
}

function viewRoles() {
  connection.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;", function (err, results) {
    console.table(results);
    mainMenu();
  })
}

function addDepartment() {
  inquirer.prompt(
    {
      name: "newDept",
      type: "input",
      message: "What is the name of the new department?"
    }
  )
    .then(answer => {
      var sql = "INSERT INTO department(name) VALUES (?);"
      var values = answer.newDept;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(answer.newDept + " has been successfully added to the list of departments.")
      })
    })

}

function addRole() {
  var choices = [];
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      var list = results[i].name;
      choices.push(list);
    }
  });
  inquirer.prompt([
    {
      name: "roleName",
      type: "text",
      message: "What is the title of the new role?"
    },
    {
      name: "roleSalary",
      type: "number",
      message: "What is the salary of the new role?"
    },
    {
      name: "roleDept",
      type: "list",
      message: "Which department would you like to add this role to?",
      choices: choices
    }
  ])
    .then(answer => {
      var userChoice = "";
      for (i = 0; i < answer.length; i++) {
        if (results[i].name === answer.department_id) {
          userChoice = answer[i];
        }
      };
      var sql = "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);";
      var values = [answer.roleName, answer.roleSalary, userChoice.id]
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log(answer.roleName + " has been added to the list of roles!")
      })
    })
    .then(() => {
      mainMenu();
    })
}
initialize();