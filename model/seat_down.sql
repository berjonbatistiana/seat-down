DROP DATABASE IF EXISTS seat_db;

CREATE DATABASE seat_db;

USE seat_db;

CREATE TABLE chair (
    id INT AUTO_INCREMENT NOT NULL,
    deskId INT references desk(id),
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE company (
    id INT AUTO_INCREMENT NOT NULL,
    ownerId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    deskCapacity INT NOT NULL,
    address VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE desk (
    id INT AUTO_INCREMENT NOT NULL,
    companyId INT references company(id),
    name VARCHAR(255) NOT NULL,
    chairCapacity INT NOT NULL,

CREATE TABLE users (
    id VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
