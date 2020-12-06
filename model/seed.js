const {insertRoleToDb, } = require('./rolesOrm')
const {insertUserToDb} = require('./userOrm')
const fake = require('faker');

async function seed () {
  
  // add role
  const roleAdmin = insertRoleToDb('admin');
  
  // add user
  const userAdmin = insertUserToDb('admin', 'password', roleAdmin.id);
  
  
}
