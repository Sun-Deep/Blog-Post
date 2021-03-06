import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { BlogType } from "./actions/BlogActionTypes";
import { CommentType } from "./actions/CommentActionTypes";
import { UserType } from "./actions/UserActionTypes";

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export interface RootStore {
  blogs: {
    loading: false;
    blogs?: BlogType[];
    blog?: BlogType;
    userBlogs?: BlogType[];
    message?: string;
  };
  comments: {
    loading: false;
    comments?: CommentType[];
    comment?: CommentType;
  };
  user: {
    user: UserType;
    message?: string;
  };
}

export default Store;
