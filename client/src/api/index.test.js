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
