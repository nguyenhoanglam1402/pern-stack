const database = require("../../database/models/index");
const Account = database.db.Account;

const deleteAccountService = async (uid) => {
  await Account.destroy({
    where: {
      id: uid,
    },
  });
};

module.exports = { deleteAccountService };
