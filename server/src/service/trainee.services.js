const database = require("../../database/models/index");
const Trainee = database.db.Trainee;
const Account = database.db.Account;
const Role = database.db.Role;

const createTraineeService = async (uid, year, education) => {
  const trainee = await Trainee.create({
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
        fullname: name,
        age: age,
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

const updateTraineeInforService = async (oldData, newData) => {
  const result = await Account.update(
    {
      fullname: newData.fullname,
      age: newData.age,
      email: newData.email,
    },
    {
      where: {
        fullname: oldData.fullname,
        age: oldData.age,
      },
    }
  );
  return result;
};

const deleteTraineeService = async (traineeName, age) => {
  await Account.destroy({
    where: {
      fullname: traineeName,
      age: age,
    },
  });
};
module.exports = {
  createTraineeService,
  searchTraineeService,
  updateTraineeInforService,
  deleteTraineeService,  
};
