const bcrypt = require("bcryptjs");
const uniqid = require('uniqid');
const {
  findAllUsers,
  findUserByIdQuery,
  findUserByUsername,
  insertUserQuery,
  deleteUserByIdQuery,
} = require("./userQueries");
const connection = require("../config/connection");

const comparePassword = async (candidatePassword, userPassword) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

const fetchUserByUsernameFromDb = async (username) => {
  try {
    const [rows] = await connection.query(findUserByUsername, username);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const fetchUsers = async () => {
  try {
    const [rows] = await connection.query(findAllUsers);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchUserByIdFromDb = async (userId) => {
  try {
    const [rows] = await connection.query(findUserByIdQuery, userId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertUserToDb = async (username, password, roleId) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const _id = uniqid();
  try {
    await connection.query(insertUserQuery, [
      _id,
      username,
      hashedPassword,
      roleId
    ]);
    
    const [userResult] = await connection.query(
      findUserByIdQuery,
      _id
    );
    return userResult[0];
  } catch (e) {
    console.log(e)
    throw new Error(e);
  }
};

const deleteUserByIdFromDb = async (userId) => {
  try {
    const [rows] = await connection.query(findUserByIdQuery, userId);
    await connection.query(deleteUserByIdQuery, userId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  comparePassword,
  fetchUsers,
  fetchUserByIdFromDb,
  fetchUserByUsernameFromDb,
  insertUserToDb,
  deleteUserByIdFromDb,
};
