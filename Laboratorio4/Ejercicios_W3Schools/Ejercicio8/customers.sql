CREATE DATABASE IF NOT EXISTS ajax_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE ajax_demo;

DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
  CustomerID  VARCHAR(10)  NOT NULL PRIMARY KEY,
  CompanyName VARCHAR(100) NOT NULL,
  ContactName VARCHAR(100),
  Address     VARCHAR(200),
  City        VARCHAR(50),
  PostalCode  VARCHAR(20),
  Country     VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO customers 
  (CustomerID, CompanyName, ContactName, Address, City, PostalCode, Country)
VALUES
  ('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Obere Str. 57', 'Berlin', '12209', 'Germany'),
  ('NORTS', 'North/South',         'Simon Crowther',    'South House 300 Queensbridge', 'London', 'SW7 1RZ', 'UK'),
  ('WOLZA', 'Wolski Zajazd',       'Zbyszek Piestrzeniewicz', 'ul. Filtrowa 68', 'Warszawa', '01-012', 'Poland');