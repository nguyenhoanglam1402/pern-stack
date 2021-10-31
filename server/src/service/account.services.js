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

const getEmailByIDService = async (id) => {
  const result = Account.findOne({
    attributes: ["email"],
    where: {
      id: id,
    },
  });
  return result;
};

const getAccountsByRoleService = async (role, roleID) => {
  if (role === "Trainer") {
    const result = await Account.findAll({
      attributes: ["id", "fullname", "email", "age"],
      where: {
        rolesID: roleID,
      },
      include: [
        {
          model: Trainer,
          attributes: ["specialty"],
        },
      ],
    });
    return result;
  }
  if (role === "Trainee") {
    const result = await Account.findAll({
      attributes: ["id", "fullname", "email", "age"],
      where: {
        rolesID: roleID,
      },
      include: [
        {
          model: Trainee,
          attributes: ["education", "year"],
        },
      ],
    });
  }
  if (role === "Staff") {
    const result = await Account.findAll({
      attributes: ["id", "fullname", "email", "age"],
      where: {
        rolesID: roleID,
      },
    });
    return result;
  }
};

const getAcountService = async (uid) => {
  let result = {};
  const basicInformation = await Account.findOne({
    attributes: ["id", "email", "fullname", "age"],
    where: {
      id: uid,
    },
    include: [
      {
        model: Role,
        attributes: ["name"],
      },
    ],
  });
  if (basicInformation.dataValues.Role.dataValues.name === "Trainer") {
    const roleData = await Trainer.findOne({
      attributes: ["specialty"],
      where: {
        id: uid,
      },
    });
    result = {
      ...basicInformation.dataValues,
      specialty: roleData.dataValues.specialty,
    };
  }
  if (basicInformation.dataValues.Role.dataValues.name === "Trainee") {
    const roleData = await Trainee.findOne({
      attributes: ["year", "education"],
      where: {
        id: uid,
      },
    });
    result = {
      ...basicInformation.dataValues,
      year: roleData.dataValues.year,
      education: roleData.dataValues.education,
    };
  }
  return result;
};
const getTrainerIdService = async (emailTrainer) => {
  const result = await Account.findOne({
    attributes: ["id"],
    where: {
      email: emailTrainer,
    },
    include: [
      {
        model: Role,
        attributes: ["name"],
      },
    ],
  });
  if (result.dataValues.Role.name !== "Trainer") {
    return false;
  }
  return result.dataValues.id;
};
const getRoleByIdService = async (id) => {
  const result = await Account.findOne({
    attributes: ["rolesID"],
    where: {
      id: id,
    },
    include: [
      {
        model: Role,
        attributes: ["name"],
      },
    ],
  });
  return result;
};
const getPasswordService = async (id) => {
  const result = await Account.findOne({
    attributes: ["password"],
    where: {
      id: id,
    },
  });
  return result;
};

const changePasswordService = async (id, newPassword) => {
  const result = await Account.update(
    {
      password: newPassword,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};

const getAccountStaffService = async (id) => {
  const result = await Account.findOne({
    attributes: ["id", "email", "fullname", "age"],
    where: {
      id: id,
    },
    include: [
      {
        model: Role,
        attributes: ["name"],
      },
    ],
  });
  return result;
};

const updateAccountStaffService = async (id, newData) => {
  const result = await Account.update(
    {
      fullname: newData.fullname,
      age: newData.age,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};
module.exports = {
  deleteAccountService,
  getAcountService,
  getTrainerIdService,
  getPasswordService,
  changePasswordService,
  getRoleByIdService,
  getAccountsByRoleService,
  getEmailByIDService,
  getAccountStaffService,
  updateAccountStaffService,
};
