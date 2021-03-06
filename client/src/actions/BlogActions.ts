import axios from "axios";
import { Dispatch } from "redux";
import {
  BlogDispatchTypes,
  BLOGS_BY_USER_SUCCESS,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_LOADING,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOG_SUCCESS,
  UPDATE_BLOG_SUCCESS,
} from "./BlogActionTypes";
import { API_URL } from "../config";
import { title } from "process";

export const GetBlogs = () => async (dispatch: Dispatch<BlogDispatchTypes>) => {
  try {
    dispatch({
      type: FETCH_BLOGS_LOADING,
    });

    const res = await axios.get(`${API_URL}/blogs`);

    dispatch({
      type: FETCH_BLOGS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
  }
};

export const GetBlogById = (id: string) => async (
  dispatch: Dispatch<BlogDispatchTypes>
) => {
  try {
    dispatch({
      type: FETCH_BLOGS_LOADING,
    });

    const res = await axios.get(`${API_URL}/blogs/${id}`);

    dispatch({
      type: FETCH_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
  }
};

export const CreateBlog = (
  title: string,
  content: string,
  _user: string,
  token: string
) => async (dispatch: Dispatch<BlogDispatchTypes>) => {
  try {
    dispatch({
      type: FETCH_BLOGS_LOADING,
    });

    const res = await axios.post(
      `${API_URL}/blogs/register`,
      {
        title: title,
        content: content,
        _user: _user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
  }
};

export const UpdateBlog = (
  _id: string,
  title: string,
  content: string,
  token: string
) => async (dispatch: Dispatch<BlogDispatchTypes>) => {
  try {
    dispatch({
      type: FETCH_BLOGS_LOADING,
    });

    const res = await axios.put(
      `${API_URL}/blogs/${_id}`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
  }
};

export const DeleteBlog = (_id: string, token: string) => async (
  dispatch: Dispatch<BlogDispatchTypes>
) => {
  try {
    dispatch({
      type: FETCH_BLOGS_LOADING,
    });

    const res = await axios.delete(`${API_URL}/blogs/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
  }
};

export const GetBlogsByUser = (token: string) => async (
  dispatch: Dispatch<BlogDispatchTypes>
) => {
  try {
    dispatch({
      type: FETCH_BLOGS_LOADING,
    });

    const res = await axios.get(`${API_URL}/blogs/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: BLOGS_BY_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
    });
  }
};
