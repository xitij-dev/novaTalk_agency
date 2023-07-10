import setToken from "../../util/SetToken";
import setDevKey from "../../util/SetDevKey";
import jwt_decode from "jwt-decode";

import {
  SET_ADMIN,
  UNSET_ADMIN,
  SET_LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  UPDATE_PROFILE,
} from "./types";

const initialState = {
  isAuth: false,
  user: {},
  loginError: [],
};

const AdminReducer = (state = initialState, action) => {
  let decoded;
  const key = "GRBqJqoVrWo0sdEJTRvBnnizXQi8AhT8";

  switch (action.type) {
    case SET_ADMIN:
      if (action.payload) {
        decoded = jwt_decode(action.payload);
      }
      setToken(action.payload);
      setDevKey(key);
      localStorage.setItem("token", action.payload);
      localStorage.setItem("key", key);
      return {
        ...state,
        isAuth: true,
        user: decoded,
      };
    case UNSET_ADMIN:
      localStorage.removeItem("token");
      localStorage.removeItem("key");
      localStorage.removeItem("firstLoad");

      setToken(null);
      setDevKey(null);
      return {
        ...state,
        user: {},
        isAuth: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.data,
          id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          image: action.payload.image,
          flag: action.payload.flag,
          code: action.payload.code,
        },
      };
    case SET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.payload,
      };
    }
    case CLEAR_LOGIN_ERROR: {
      return {
        ...state,
        loginError: [],
      };
    }

    default:
      return state;
  }
};

export default AdminReducer;
