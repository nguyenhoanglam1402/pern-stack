import axios from "axios";

export const registerStaffAndTrainer = async (requestData) => {
  const respond = await axios.post(
    "http://localhost:5001/api/v1/admin/accounts/register",
    {
      email: requestData.email,
      password: requestData.password,
      fullname: requestData.fullname,
      role: requestData.role,
      age: requestData.age,
      specialty: requestData.specialty,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond;
};

export const changePasswordSystemStaff = async (requestData) => {
  const respond = await axios.patch(
    `http://localhost:5001/api/v1/admin/accounts/password/${requestData.id}`,
    {
      newPassword: requestData.newPassword,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};
export const deleteSystemStaff = async (id) => {
  const respond = await axios.delete(
    `http://localhost:5001/api/v1/admin/accounts/delete/${id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data;
};

export const getAllTrainer = async () => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/admin/trainer`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const getAllStaff = async () => {
  const respond = await axios.get(`http://localhost:5001/api/v1/admin/staff`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return respond.data.data;
};

export const getTrainerProfile = async (requestData) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/admin/trainer/profile/${requestData.id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};

export const updateTrainerProfile = async (requestData) => {
  const respond = await axios.put(
    `http://localhost:5001/api/v1/admin/trainer/edit/${requestData.id}`,
    {
      fullname: requestData.fullname,
      age: requestData.age,
      specialty: requestData.specialty,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond;
};

export const getStaffProfile = async (requestData) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/admin/staff/profile/${requestData.id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};

export const updateStaffProfile = async (requestData) => {
  const respond = await axios.put(
    `http://localhost:5001/api/v1/admin/staff/edit/${requestData.id.id}`,
    {
      fullname: requestData.fullname,
      age: requestData.age,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond;
};
