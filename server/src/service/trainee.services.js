const database = require("../../database/models/index");
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const Role = database.db.Role;
const { Op } = require('sequelize');

const createTraineeService = async (uid, year, education) => {
  await Trainee.create({
    id: uid,
    year: year,
    education: education,
  });

};
const searchTraineeService = async (name, age) => {
  const result = await Role.findOne({
    where: {
      name: "Trainee",
    },
    attributes: [],
    include: {
      model: Account,
      where: {
        [Op.and]: [{fullname: name},{age: age}]
      },
      attributes: [["id", "uid"], "fullname", "email", "age"],
      include: {
        model: Trainee,
        attributes: [["year", "expect graduate"], "education"],
      },
    },
  });
  return result;
};

const updateTraineeInforService = async (id, newData) => {
  let result = {};
  const account = await Account.update(
    {
      fullname: newData.fullname,
      age: newData.age,
    },
    {
      where: {
        id:id
      },
    }
  );
  const eduYear = await Trainee.update({
    education: newData.education,
    year: newData.year
  },{
    where: {
      id: id
    }
  });
  result = {account: account, eduyear: eduYear}
  return result;
};





module.exports = {
  createTraineeService,
  searchTraineeService,
  updateTraineeInforService,
};
