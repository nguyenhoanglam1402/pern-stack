import axios from "axios";

export const getAllTrainerCourses = async (data) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainer/courses/${data.uid}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};

export const getTraineeInClass = async (data) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainer/courses/${data.uid}/classes/${data.className}/trainees`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};

export const getTrainerProfile = async (data) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainer/profile/${data.uid}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};

export const updateTrainerProfile = async (data, requestData) => {
  const respond = await axios.patch(
    `http://localhost:5001/api/v1/trainer/edit/${data.uid}`,
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
