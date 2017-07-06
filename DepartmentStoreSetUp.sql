drop database if exists bamazon;

create database bamazon;

use bamazon;

CREATE TABLE IF NOT EXISTS products(
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT(11) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pen","Office supplies",1.99,500),("White out","Office supplies",2.99,250),("Sticky Notes","Office supplies",0.99,1000),("Boxes","Shipping supplies",3.99,400),("Packing Tape","Shipping supplies",4.50,150),("Swivel Chair","Furniture",150,80),("Couch","Furniture",500,15),("Desk","Furniture",350,20),("Desktop Computer","Electronics",700,25),("Ethernet Cord","Electronics",5.00,200);

select * from products;

