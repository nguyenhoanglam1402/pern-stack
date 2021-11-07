import axios from "axios";

export const userAuthenticate = async (data) => {
  const respond = await axios.post(
    "http://localhost:5001/api/v1/auth/login",
    {
      email: data.email,
      password: data.password,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond;
};

export const fetchTrainerList = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/trainer/view",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const fetchAllClasses = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/classes",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const assignTrainerClass = async (requestData) => {
  console.log("API Test: ", requestData.trainerID);
  const respond = await axios.put(
    `http://localhost:5001/api/v1/staff/classes/trainer/assign/${requestData.trainerID}`,
    {
      className: requestData.className,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const fetchAllTrainee = async () => {
  const respond = await axios.get(
    "http://localhost:5001/api/v1/staff/trainee/view",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const searchTraineeAPI = async (requestData) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/staff/trainee/search`,
    { params: { name: requestData.name, age: requestData.age } },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data.Accounts;
};

export const deleteTraineeAPI = async (id) => {
  const respond = await axios.delete(
    `http://localhost:5001/api/v1/staff/trainee/delete/${id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
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
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data;
};

export const changePasswordTrainee = async (requestData) => {
  const respond = await axios.patch(
    `http://localhost:5001/api/v1/staff/trainee/password/${requestData.id}`,
    {
      newPassword: requestData.newPassword,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const deleteCourse = async (id) => {
  const respond = await axios.delete(
    `http://localhost:5001/api/v1/staff/courses/delete/${id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const searchCourse = async (name) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/staff/courses/${name}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
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
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const fetchClassByCourse = async (courseName) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/staff/classes/${courseName}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const createNewClass = async (requestData) => {
  const respond = await axios.post(
    `http://localhost:5001/api/v1/staff/classes/create`,
    {
      courseName: requestData.courseName,
      trainerID: requestData.trainerID,
      name: requestData.name,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond.data.data;
};

export const deleteClass = async (requestData) => {
  const respond = await axios.delete(
    `http://localhost:5001/api/v1/staff/classes/delete/${requestData}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond;
};

export const getTraineeInClass = async (requestData)=>{
  const respond = await axios.get(
    `http://localhost:5001/api/v1/staff/courses/${requestData.idTrainer}/classes/trainees`,
    {
      classname: requestData.className,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return respond;
}