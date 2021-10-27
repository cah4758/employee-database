INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Sales"),
        ("Legal");

INSERT INTO  roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 3),
        ("Salesperson", 80000, 3),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES  ("Leslie", "Knope", 1, null),
        ("Ron", "Swanson", 2, 1),
        ("Ann", "Perkins", 3, null),
        ("Andy", "Dwyer", 4, 3),
        ("April", "Ludgate-Dwyer", 5, null),
        ("Ben", "Wyatt-Knope", 6, 5),
        ("Gerry", "Gergich", 7, null),
        ("Chris", "Traeger", 8, 7);