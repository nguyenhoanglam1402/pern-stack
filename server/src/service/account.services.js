const database = require("../../database/models/index");
const Account = database.db.Account;
const Trainee = database.db.Trainee;
const Trainer = database.db.Trainer;
const Role = database.db.Role;
const deleteAccountService = async (uid) => {
  await Account.destroy({
    where: {
      id: uid,
    },
  });
};

const getAcountService = async (uid) => {
  let result = {};
  const basicInformation = await Account.findOne({
    attributes: ["id","email","fullname","age"],
    where: {
      id: uid,
    },
    include: [{
      model: Role,
      attributes: ["name"],
    }]
  });
  if(basicInformation.dataValues.Role.dataValues.name === "Trainer"){
    const roleData = await Trainer.findOne({
      attributes: ["specialty"],
      where: {
        id: uid
      }
    });
    result = {...basicInformation.dataValues, specialty: roleData.dataValues.specialty}
  }
  if(basicInformation.dataValues.Role.dataValues.name === "Trainee"){
    const roleData = await Trainee.findOne({
      attributes: ["year","education"],
      where: {
        id: uid,
      }
    });
    result = {...basicInformation.dataValues, year: roleData.dataValues.year, education: roleData.dataValues.education}
  }
  return result;
}
module.exports = { deleteAccountService,getAcountService };
