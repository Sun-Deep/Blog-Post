import axios from "axios";
import { Dispatch } from "redux";

import { API_URL } from "../config";

import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  UsertDispatchTypes,
  USER_FAIL,
  USER_LOADING,
  USER_REGISTER_SUCCESS,
} from "./UserActionTypes";

export const UserProfile = (_id: string) => async (
  dispatch: Dispatch<UsertDispatchTypes>
) => {
  try {
    dispatch({
      type: USER_LOADING,
    });

    const res = await axios.get(`${API_URL}/comments/${_id}`);

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_FAIL,
    });
  }
};

export const UserLogin = (email: string, password: string) => async (
  dispatch: Dispatch<UsertDispatchTypes>
) => {
  try {
    dispatch({
      type: USER_LOADING,
    });

    const res = await axios.post(`${API_URL}/users/login`, {
      email: email,
      password: password,
    });

    console.log(res.data.data.user);

    localStorage.setItem("_user", JSON.stringify(res.data.data));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_FAIL,
    });
  }
};

export const UserRegister = (data: any) => async (
  dispatch: Dispatch<UsertDispatchTypes>
) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  // };
  try {
    const res = await axios.post(`${API_URL}/users/register`, data);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data.message,
    });
  } catch (err) {
    dispatch({
      type: USER_FAIL,
    });
  }
};
