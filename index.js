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

const roles = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
  "Lawyer",
];
const managers = ["Leslie", "Ann", "April", "Gerry"];

const departments = ["Engineering", "Finance", "Sales", "Legal"];

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
    departments.push(`${response.deptName}`);
    db.query(`INSERT INTO department (name) VALUES  ("${response.depName}")`);
    init();
  });
}

const newEmpQuestions = [
  // First Name
  {
    type: "input",
    message: "Employee First Name:",
    name: "firstName",
  },
  // Last Name
  {
    type: "input",
    message: "Employee Last Name:",
    name: "lastName",
  },
  // Role
  {
    type: "list",
    message: "Employee's Role:",
    name: "roleName",
    choices: roles,
  },
  // Manager
  {
    type: "list",
    message: "Employee's Manager",
    name: "managerName",
    choices: managers,
  },
];
function addEmp() {
  inquirer.prompt(newEmpQuestions).then((response) => {
    console.log(response);
    let deptNum = roles.indexOf(`${response.roleName}`) + 1;
    let managerNum = managers.indexOf(`${response.managerName}`) + 1;

    db.query(
      `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES  ("${response.firstName}", "${response.lastName}", ${roleNum}, ${managerNum})`
    );
    init();
  });
}

const roleQuestions = [
  // Role Name
  {
    type: "input",
    message: "Role Name:",
    name: "roleName",
  },
  // Salary
  {
    type: "input",
    message: "Role Salary:",
    name: "salary",
  },
  // Department
  {
    type: "input",
    message: "Department:",
    name: "department",
  },
];
function addRole() {
  inquirer.prompt(roleQuestions).then((response) => {
    console.log(response);
    roles.push(`${response.roleName}`);
    let deptNum = departments.indexOf(`${response.department}`) + 1;
    db.query(
      `INSERT INTO  roles (title, salary, department_id) VALUES  ("${response.roleName}", ${salary}, ${deptNum})`
    );
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
      case "Quit":
        process.exit();
      default:
        return;
    }
  });
}

init();
