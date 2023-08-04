CREATE TABLE
  contacts (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CHECK (
      email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
    ),
    phone_number VARCHAR(20) NOT NULL,
    CHECK (
      phone_number REGEXP '^\+(?:[0-9]{1,2})\([0-9]{3}\)[0-9]{3}-[0-9]{4}$'
    ),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
