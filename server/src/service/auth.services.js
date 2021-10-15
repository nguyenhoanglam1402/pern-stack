const database = require("../../database/models/index");
const { generateUID } = require("./uid.services");
const Account = database.db.Account;
const Role = database.db.Role;

const checkExistAccountService = async (email) => {
  const account = await Account.findOne({
    where: {
      email: email,
    },
  });
  const result = account !== null ? true : false;
  return result;
};

const loginAccountService = async (email) => {
  const account = await Account.findOne({
    where: {
      email: email,
    },
    attributes: ["id", "password", "fullname", "email"],
    include: {
      model: Role,
      attributes: ["name"],
    },
  });
  return account;
};

const registryAccountService = async (email, password, fullname, roles) => {
  const account = await Account.build({
    id: generateUID(10),
    email: email,
    password: password,
    fullname: fullname,
    rolesID: roles,
  });
  console.log(account);
  await account.save();
  console.log("Successfully to save account");
};

module.exports = {
  checkExistAccountService,
  loginAccountService,
  registryAccountService,
};
