DROP TABLE IF EXISTS employee; 

DROP TABLE IF EXISTS position; 

DROP TABLE IF EXISTS department; 

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL 
);

CREATE TABLE position (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,  
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) 
    ON DELETE 
    SET NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    position_id INTEGER, 
    manager_id INTEGER,
    CONSTRAINT fk_position FOREIGN KEY (position_id) REFERENCES position(id) ON DELETE SET NULL
);