import axios from "axios";
import { Dispatch } from "redux";
import {
  CommentDispatchTypes,
  COMMENT_FAIL,
  COMMENT_LOADING,
  COMMENT_ADD,
  FETCH_COMMENTS_SUCCESS,
} from "./CommentActionTypes";
import { API_URL } from "../config";

export const RegisterComment = (
  content: string,
  _user: string,
  _blog: string,
  token: string
) => async (dispatch: Dispatch<CommentDispatchTypes>) => {
  try {
    dispatch({
      type: COMMENT_LOADING,
    });

    const res = await axios.post(
      `${API_URL}/comments/register`,
      {
        content: content,
        _user: _user,
        _blog: _blog,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: COMMENT_ADD,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENT_FAIL,
    });
  }
};

export const CommentList = (_id: string) => async (
  dispatch: Dispatch<CommentDispatchTypes>
) => {
  try {
    dispatch({
      type: COMMENT_LOADING,
    });

    const res = await axios.get(`${API_URL}/comments/${_id}`);

    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENT_FAIL,
    });
  }
};
