const database = require("../../database/models/index");
const Trainer = database.db.Trainer;
const createTrainerService = async (uid, specialty) => {
  await Trainer.create({
    id: uid,
    specialty: specialty,
  });
};

module.exports = { createTrainerService };
