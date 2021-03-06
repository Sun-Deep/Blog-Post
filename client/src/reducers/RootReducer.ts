import { combineReducers } from "redux";
import { blogsReducer } from "./BlogReducer";
import { commentsReducer } from "./CommentReducer";
import { userReducer } from "./UserReducer";

const RootReducer = combineReducers({
  blogs: blogsReducer,
  comments: commentsReducer,
  user: userReducer,
});

export default RootReducer;
