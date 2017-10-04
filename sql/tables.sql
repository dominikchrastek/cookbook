DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  id INT PRIMARY KEY,
  name VARCHAR(56),
  description VARCHAR(56),
  likes INT NOT NULL
);


INSERT INTO recipe
(id, name, description, likes) VALUES
(1, 'cocka', 'awesomecocka', 0),
(2, 'pernik', 'awesomepernik', 1),
(3, 'kocka', 'catFromVietnam', 2)