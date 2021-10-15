const database = require("../../database/models/index");
const Role = database.db.Role;

const findRoleServices = async (name) => {
  const roleID = await Role.findOne({ where: { name: name } });
  if (roleID === null) {
    console.error("Error: There is no found 'Role'");
  }
  return roleID["id"];
};

module.exports = { findRoleServices };
