CREATE DATABASE IF NOT EXISTS `grocery_list_app`;

CREATE TABLE categories (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  INDEX `name` (`name`)
);

CREATE TABLE items (
  id INT(11) NOT NULL AUTO_INCREMENT,
  categoryId INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  completed TINYINT DEFAULT 0,
  quantity INT(11) DEFAULT NULL,
  PRIMARY KEY(id),
  INDEX `categoryId` (`categoryId`)
);

INSERT INTO categories (name) VALUES
('produce'), ('other'), ('frozen'), ('fish'), ('poultry'), ('dairy'), ('dry goods'), ('snacks');
