import axios from "axios";

export const viewCourseOfTrainee = async (data) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainee/courses/${data.uid}`,
    {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return respond.data.data;
};

export const viewFriends = async (data, courseName) => {
  const respond = await axios.get(
    `http://localhost:5001/api/v1/trainee/courses/${data.uid}/friends/${courseName}`,
    {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return respond.data.data;
};
