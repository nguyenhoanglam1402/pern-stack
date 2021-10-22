export const loginAction = (authData) => {
  return {
    type: "LOGIN",
    payload: authData,
  };
};

export const logoutAction = (authData) => {
  return {
    type: "LOGOUT",
    payload: authData,
  };
};
