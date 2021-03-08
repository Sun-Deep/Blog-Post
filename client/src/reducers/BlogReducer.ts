import {
  BlogDispatchTypes,
  BLOGS_BY_USER_SUCCESS,
  BlogType,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_LOADING,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOG_SUCCESS,
  UPDATE_BLOG_SUCCESS,
} from "../actions/BlogActionTypes";

export interface DefaultBlogsState {
  loading: boolean;
  blogs?: BlogType[] | [];
  blog?: BlogType;
  userBlogs?: BlogType[];
  message?: string;
}

const defaultState: DefaultBlogsState = {
  loading: false,
};

export const blogsReducer = (
  state: DefaultBlogsState = defaultState,
  action: BlogDispatchTypes
): DefaultBlogsState => {
  switch (action.type) {
    case FETCH_BLOGS_LOADING:
      return {
        ...state,
        loading: true,
        message: undefined,
      };
    case FETCH_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        message: undefined,
      };
    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        message: undefined,
        loading: false,
        blog: action.payload,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        message: `${action.payload.title} created successfully..`,
        loading: false,
        blogs: [...(state.blogs || []), action.payload],
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        message: undefined,
        loading: false,
        blogs: action.payload,
      };

    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        message: `${action.payload.title} updated successfully..`,
        loading: false,
        blog: action.payload,
        blogs:
          state.blogs &&
          state.blogs.map((b: BlogType) =>
            b._id === action.payload._id ? action.payload : b
          ),
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs:
          state.blogs &&
          state.blogs.filter((b) => b._id !== action.payload._id),
        userBlogs:
          state.userBlogs &&
          state.userBlogs.filter((b) => b._id !== action.payload._id),
        message: `${action.payload.title} deleted successfully..`,
      };

    case BLOGS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: undefined,
        userBlogs: action.payload,
      };

    default:
      return state;
  }
};
