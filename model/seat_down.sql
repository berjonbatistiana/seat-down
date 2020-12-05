DROP DATABASE IF EXISTS seat_db;

CREATE DATABASE seat_db;

USE seat_db;

CREATE TABLE company (
    id VARCHAR(255) NOT NULL,
    ownerId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    deskCapacity INT NOT NULL,
    address VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE desk (
    id VARCHAR(255) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    floor VARCHAR(255) NOT NULL,
    building VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    chairCapacity INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(companyId) REFERENCES company(id)
);

CREATE TABLE chair (
    id VARCHAR(255) NOT NULL,
    deskId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(deskId) REFERENCES desk(id)
);

CREATE TABLE roles (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(roleId) REFERENCES roles(id)
);

CREATE TABLE occupancy (
    id VARCHAR(255) NOT NULL,
    occupancyDate VARCHAR(255) NOT NULL,
    chairId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (chairId) REFERENCES chair(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);