INSERT INTO department (name)
VALUES
    ('Legal'),
    ('Accounting'),
    ('Marketing'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Legal Team Lead', 100000, 1),
    ('Attorney', 80000, 1),
    ('Lead Accountant', 90000, 2),
    ('Accountant', 65000, 2),
    ('Intern', 40000, 2),
    ('Creative Director', 100000, 3),
    ('Digital Marketing Specialist', 80000, 3),
    ('Marketing Assistant', 50000, 3),
    ('Lead Engineer', 100000, 4),
    ('Software Engineer', 80000, 4),
    ('Network Engineer', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mia', 'Fey', 1, NULL),
    ('Phoenix', 'Wright', 2, 1),
    ('Lana', 'Skye', 3, NULL),
    ('Dick', 'Gumshoe', 4, 3);