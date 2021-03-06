import { act } from "react-dom/test-utils";
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  UsertDispatchTypes,
  UserType,
  USER_FAIL,
  USER_LOADING,
  USER_REGISTER_SUCCESS,
} from "../actions/UserActionTypes";

interface UserI {
  loading: boolean;
  user: UserType;
  message?: string;
}

const defaultStateUser: UserI = {
  loading: false,
  user: {
    _id: "",
    email: "",
    name: "",
    token: "",
  },
};

const userReducer = (
  state: UserI = defaultStateUser,
  action: UsertDispatchTypes
): UserI => {
  switch (action.type) {
    case USER_FAIL:
      return {
        ...state,
        message: undefined,
        loading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        message: undefined,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: undefined,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: undefined,
        user: action.payload,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export { userReducer };
