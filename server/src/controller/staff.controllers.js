const {
  changePasswordService,
  getRoleByIdService,
  deleteAccountService,
  getAccountStaffService,
  updateAccountStaffService,
  getAccountsByRoleService,
} = require("../service/account.services");
const argon = require("argon2");
const { findRoleServices } = require("../service/roles.services");
const changePasswordSystemStaffController = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "The id cannot empty",
    });
  } else {
    const checkingRole = await getRoleByIdService(id);
    if (
      checkingRole.Role.name === "Trainee" ||
      checkingRole.Role.name === "Admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot change password of trainee or admin",
      });
    }
    try {
      const hashPassword = await argon.hash(req.body.newPassword);
      const result = await changePasswordService(id, hashPassword);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  }
};

const deleteSystemStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const checkingRole = await getRoleByIdService(id);
    console.log(checkingRole.Role.name);
    if (
      checkingRole.Role.name === "Trainee" ||
      checkingRole.Role.name === "Admin"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You don't have permission to delete this role! User must be trainer or training staff",
      });
    }
    await deleteAccountService(id);
    return res.status(200).json({
      success: true,
      message: "Deleted successully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

const getProfileStaffById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "The id cannot empty",
    });
  } else {
    try {
      const checkRole = await getRoleByIdService(id);
      if (checkRole.Role.name !== "Staff") {
        return res.status(400).json({
          success: false,
          message: "You don't have permission to find this role",
        });
      }
      const result = await getAccountStaffService(id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Cannot find this staff",
        });
      }
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  }
};

const updateStaff = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "The id trainer cannot empty",
    });
  } else {
    const checkRole = await getRoleByIdService(id);
    if (checkRole.Role.name !== "Staff") {
      return res.status(400).json({
        success: false,
        message: "You don't have permission to update this role",
      });
    }
    const newData = {
      fullname: req.body.fullname,
      age: req.body.age,
    };
    try {
      const result = await updateAccountStaffService(id, newData);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  }
};

const getAllStaff = async (req, res) => {
  try {
    const roleID = await findRoleServices("Staff");
    const result = await getAccountsByRoleService("Staff", roleID);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Internal server error",
    });
  }
};
module.exports = {
  changePasswordSystemStaffController,
  deleteSystemStaff,
  getProfileStaffById,
  updateStaff,
  getAllStaff,
};
