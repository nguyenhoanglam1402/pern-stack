import axios from "axios";
import GetToken from "./header";
import GetHeader from "./header";

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
    `http://localhost:5001/api/v1/staff/trainee/register`,
    {
      email: requestData.email,
      password: requestData.password,
      fullname: requestData.fullname,
      role: requestData.role,
      age: requestData.age,
      education: requestData.education,
      year: requestData.year,
    }
  );
  return respond.data;
};

export const assignTraineeClass = async (requestData) => {
  const respond = await axios.post(
    "http://localhost:5001/api/v1/staff/classes/trainee",
    {
      emailTrainee: requestData.traineeEmail,
      className: requestData.className,
    }
  );
  return respond.data;
};

export const changePasswordTrainee = async (requestData) => {
  const respond = await axios.patch(
    `http://localhost:5001/api/v1/staff/trainee/password/${requestData.id}`,
    {
      newPassword: requestData.newPassword,
    }
  );
  return respond.data.data;
};

export const fetchAllCourse = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/courses",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  console.log(respond.data.message);
  return respond.data.data;
};

export const fetchAllCategories = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/categories",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const createNewCourse = async (requestData) => {
  const respond = await axios.post(
    "http://localhost:5001/api/v1/staff/courses/create",
    {
      name: requestData.name,
      description: requestData.description,
      categoryName: requestData.categoryName,
    }
  );
  return respond.data.data;
};

export const deleteCourse = async (id) => {
  const respond = await axios.delete(
    `http://localhost:5001/api/v1/staff/courses/delete/${id}`
  );
  return respond.data.data;
};

export const searchCourse = async (name) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/staff/courses/${name}`
  );
  return respond.data.data;
};

export const updateCourse = async (requestData) => {
  const respond = await axios.put(
    `http://localhost:5001/api/v1/staff/courses/update/${requestData.id}`,
    {
      name: requestData.name,
      description: requestData.description,
      categoryName: requestData.categoryName,
    },
    GetHeader
  );
  return respond.data.data;
};
