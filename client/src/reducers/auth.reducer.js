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
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        fullname: "",
        email: "",
        uid: "",
        token: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
