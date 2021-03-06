#DROP DATABASE IF EXISTS trivia_dev;
#CREATE DATABASE IF NOT EXISTS trivia_dev;

#use trivia_dev;

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  username VARCHAR(56) NOT NULL UNIQUE,
  password VARCHAR(56) NOT NULL,
  email VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS categories (
id int(11) NOT NULL auto_increment PRIMARY KEY,
nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_statistics_categories(
id int(11) NOT NULL auto_increment PRIMARY KEY,
nombre VARCHAR(50),
user VARCHAR(56),
points int(11) NOT NULL,
correct_answer int(11) NOT NULL,
incorrect_answer int(11) NOT NULL,
foreign key (nombre) references categories (nombre) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (user) references users (username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS questions (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  category VARCHAR(50),
  description VARCHAR(255) NOT NULL UNIQUE,
  wrong_attempts INT NOT NULL,
  right_attempts INT NOT NULL,
  total_attempts INT NOT NULL,
  foreign key (category) references categories (nombre) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_questions (
  user_id int(11) NOT NULL,
  question_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
  PRIMARY KEY(user_id,question_id)
);

CREATE TABLE IF NOT EXISTS options (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  question_id int(11) ,
  foreign key (question_id) references questions (id) on delete cascade,
  description VARCHAR(255) NOT NULL ,
  correct BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
);
