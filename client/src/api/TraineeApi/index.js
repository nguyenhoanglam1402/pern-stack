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

export const viewFriends = async (uid, courseName) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainee/courses/${uid}/friends/${courseName}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return respond.data.data;
};
