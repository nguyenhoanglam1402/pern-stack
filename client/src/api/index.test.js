import axios from "axios";

export const userAuthenticate = async (data) => {
  const respond = await axios.post(
    "http://localhost:5001/api/v1/staff/auth/login",
    {
      email: data.email,
      password: data.password,
    }
  );
  return respond;
};
