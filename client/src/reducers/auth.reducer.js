var initializedState = {};

const authReducer = (state = initializedState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        fullname: action.payload.fullname,
        email: action.payload.email,
        uid: action.payload.uid,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        fullname: "",
        email: "",
        uid: "",
        token: "",
        role: "",
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
