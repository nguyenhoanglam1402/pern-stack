const database = require("../../database/models/index");
const Trainer = database.db.Trainer;
const Account = database.db.Account;
const createTrainerService = async (uid, specialty) => {
  await Trainer.create({
    id: uid,
    specialty: specialty,
  });
};

const updateTrainerInforService = async (idTrainer, newData) => {
  let result= {};
  console.log(newData);
  const account = await Account.update(
    {
      fullname: newData.fullname,
      age: newData.age,
    },
    {
      where: {
        id: idTrainer
      },
    }
  );
  const specialty = await Trainer.update({
    specialty: newData.specialty,
  },
  {
    where:{
      id: idTrainer
    }
  });
  result={account:account, specialty: specialty};
  console.log(result);
  return result;
};
module.exports = { createTrainerService, updateTrainerInforService };
