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
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;", function (err, results) {
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
      //console.log(choices);
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
      var sql = "INSERT INTO role (title, salary, department_id) SELECT ?, ?, department.id FROM department WHERE department.name = ?;";
      var values = [answer.roleName, answer.roleSalary, answer.roleDept]
      connection.query(sql, values, function (err, result) {
        if (err) {
          throw err;
        } else {
          console.log("---------------------------------------------------------");
          console.log(answer.roleName + " has been added to the list of roles!");
          console.log("---------------------------------------------------------");
          mainMenu();
        }
      });
    })
}

function addEmployee() {
  var deptChoices = [];
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      var deptList = results[i].name;
      deptChoices.push(deptList);
    }
  });
  var roleChoices = [];
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      var roleList = results[i].title;
      roleChoices.push(roleList);
    }
  });
  var managerChoices = [];
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      var managerList = results[i].first_name + " " + results[i].last_name;
      managerChoices.push(managerList);
    }
  });
  inquirer.prompt([
    {
      name: "employeeFirst",
      type: "text",
      message: "What is the first name of the new employee?"
    },
    {
      name: "employeeLast",
      type: "text",
      message: "What is the last name of the new employee?"
    },
    {
      name: "employeeRole",
      type: "list",
      message: "What role will they have?",
      choices: roleChoices
    },
    {
      name: "employeeManager",
      type: "list",
      message: "Who is their manager?",
      choices: managerChoices
    }
  ])
  .then(answer => {
    console.log(answer)
    var sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) SELECT ?, ?, role.id, employee.id FROM role, employee WHERE role.title = ? AND CONCAT(employee.first_name, ' ', employee.last_name) = ?;";
    var values = [answer.employeeFirst, answer.employeeLast, answer.employeeRole, answer.employeeManager]
    connection.query(sql, values, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log("---------------------------------------------------------");
        console.log(answer.employeeFirst + "" + answer.employeeLast + " has been added to the list of employees!");
        console.log("---------------------------------------------------------");
        mainMenu();
      }
    });
  })
}


initialize();