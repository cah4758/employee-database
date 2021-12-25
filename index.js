const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "workforce_db",
  },
  console.log(`Connected to the workforce_db database.`)
);

const questions = [
  {
    type: "list",
    message: "What type of license would you like to use with this project?",
    name: "empQuery",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const deptQuestions = [
  {
    type: "input",
    message: "What is the new department name?",
    name: "depName",
  },
];

function addDepartment() {
  inquirer.prompt(deptQuestions).then((response) => {
    console.log(response);

    db.query(`INSERT INTO department (name) VALUES  ("${response.depName}")`);
    init();
  });
}

function init() {
  inquirer.prompt(questions).then((response) => {
    switch (response.empQuery) {
      case "View All Employees":
        db.query(`SELECT * FROM employee`, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
          init();
        });
        break;
      case "Add Employee":
        addEmp();
        break;
      case "Update Employee Role":
        updateEmp();
        break;
      case "View All Roles":
        db.query(
          `SELECT * FROM roles JOIN department ON roles.department_id = department.name`,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            init();
          }
        );
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        db.query(`SELECT * FROM department`, (err, result) => {
          console.table(result);
          init();
        });
        break;
      case "Add Department":
        addDepartment();
        break;
      default:
        return;
    }
  });
}

init();
