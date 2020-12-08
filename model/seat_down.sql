DROP DATABASE IF EXISTS seat_db;

CREATE DATABASE seat_db;

USE seat_db;

CREATE TABLE companies (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE buildings (
    id VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId VARCHAR(255) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(roleId) REFERENCES roles(id),
    FOREIGN KEY(companyId) REFERENCES companies(id)
);

CREATE TABLE floors (
    id VARCHAR(255) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    buildingId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    deskCapacity INT DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(companyId) REFERENCES companies(id),
    FOREIGN KEY(buildingId) REFERENCES buildings(id)
);

CREATE TABLE desks (
    id VARCHAR(255) NOT NULL,
    floorId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    chairCapacity INT DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY(floorId) REFERENCES floors(id)
);

CREATE TABLE chairs (
    id VARCHAR(255) NOT NULL,
    deskId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(deskId) REFERENCES desks(id)
);

CREATE TABLE occupancy (
    id VARCHAR(255) NOT NULL,
    occupancyDate VARCHAR(255) NOT NULL,
    chairId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (chairId) REFERENCES chairs(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);