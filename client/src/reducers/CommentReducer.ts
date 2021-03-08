import {
  CommentDispatchTypes,
  CommentType,
  COMMENT_FAIL,
  COMMENT_LOADING,
  COMMENT_ADD,
  FETCH_COMMENTS_SUCCESS,
  REPLY_ADD,
} from "../actions/CommentActionTypes";

interface CommentList {
  loading: boolean;
  comments?: CommentType[];
}

const defaultStateCommentList: CommentList = {
  loading: false,
};

const commentsReducer = (
  state: CommentList = defaultStateCommentList,
  action: CommentDispatchTypes
): CommentList => {
  switch (action.type) {
    case COMMENT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_ADD:
      return {
        ...state,
        loading: false,
        comments: [...(state.comments || []), action.payload],
      };
    case REPLY_ADD:
      return {
        ...state,
        loading: false,
        comments:
          state.comments &&
          state.comments.map((c) =>
            c._id === action.payload._id ? action.payload : c
          ),
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export { commentsReducer };
