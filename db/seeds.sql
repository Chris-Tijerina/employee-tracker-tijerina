INSERT INTO department (name)
VALUES
    ('Legal'),
    ('Accounting'),
    ('Marketing'),
    ('Engineering');

INSERT INTO role (title, salary)
VALUES
    ('Legal Team Lead', 100000),
    ('Attorney', 80000),
    ('Lead Accountant', 90000),
    ('Accountant', 65000),
    ('Intern', 40000),
    ('Creative Director', 100000),
    ('Digital Marketing Specialist', 80000),
    ('Marketing Assistant', 50000),
    ('Lead Engineer', 100000),
    ('Software Engineer', 80000),
    ('Network Engineer', 80000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mia', 'Fey', 1, NULL),
    ('Phoenix', 'Wright', 2, 1),
    ('Lana', 'Skye', 3, NULL),
    ('Dick', 'Gumshoe', 4, 3);