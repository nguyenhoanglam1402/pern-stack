import axios from "axios";

export const userAuthenticate = async (data) => {
  const respond = await axios.post("http://localhost:5001/api/v1/auth/login", {
    email: data.email,
    password: data.password,
  });
  return respond;
};

export const fetchTrainerList = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/trainer/view"
  );
  return respond.data.data;
};

export const fetchAllClasses = async () => {
  const respond = await axios.get("http://localhost:5001/api/v1/staff/classes");
  return respond.data.data;
};

export const assignTrainerClass = async (requestData) => {
  console.log("API Test: ", requestData.trainerID);
  const respond = await axios.put(
    `http://localhost:5001/api/v1/staff/classes/trainer/assign/${requestData.trainerID}`,
    {
      className: requestData.className,
    }
  );
  return respond.data.data;
};

export const fetchAllTrainee = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/trainee/view"
  );
  return respond.data.data;
};

export const searchTraineeAPI = async (requestData) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/staff/trainee/search`,
    { params: { name: requestData.name, age: requestData.age } }
  );
  return respond.data.data.Accounts;
};

export const deleteTraineeAPI = async (id) => {
  const respond = await axios.delete(
    `http://localhost:5001/api/v1/staff/trainee/delete/${id}`
  );
  return respond.data;
};

export const createTraineeAPI = async (requestData) => {
  const respond = await axios.post(
    `http://localhost:5001/api/v1/staff/trainee/create`,
    {}
  );
  return respond.data;
};
