export const USER_LOADING = "USER_LOADING";
export const USER_FAIL = "USER_FAIL";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  token?: string;
};

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserFail {
  type: typeof USER_FAIL;
}

export interface FetchUserSuccess {
  type: typeof FETCH_USER_SUCCESS;
  payload: UserType;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: UserType;
}

export interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: string;
}

export type UsertDispatchTypes =
  | UserLoading
  | UserFail
  | FetchUserSuccess
  | UserRegisterSuccess
  | LoginSuccess;
