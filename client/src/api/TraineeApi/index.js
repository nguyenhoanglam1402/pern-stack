import axios from "axios";

export const viewCourseOfTrainee = async (uid) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainee/courses/${uid}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};

export const viewFriends = async (uid, className) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainee/courses/${uid}/friends/${className}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data[0].Classes;
};

export const viewProfile = async (data) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainee/profile/${data.uid}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};
