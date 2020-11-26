const bcrypt = require("bcryptjs");
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
    const [rows] = await connection.query(findUserByIdQuery, userId); //
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertUserToDb = async (username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const [result] = await connection.query(insertUserQuery, [
      username,
      hashedPassword,
    ]);
    const [userResult] = await connection.query(
      findUserByIdQuery,
      result.insertId
    );
    return userResult[0];
  } catch (e) {
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
