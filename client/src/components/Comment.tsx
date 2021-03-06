import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterComment } from "../actions/CommentActions";
import { CommentType } from "../actions/CommentActionTypes";
import { RootStore } from "../Store";

interface PropsType {
  blogId: string;
  comments?: CommentType[];
}

function Comment({ comments, blogId }: PropsType) {
  const [newComment, setNewComment] = useState<string>("");

  let userState: any;
  try {
    userState = JSON.parse(localStorage.getItem("_user") || "");
  } catch (error) {
    userState = undefined;
  }

  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const { comment } = useSelector((state: RootStore) => state.comments);

  const handleSubmit = () => {
    dispatch(
      RegisterComment(newComment, userState.user._id, blogId, userState.token)
    );
  };

  return (
    <div className="comment-section">
      {userState && (
        <div>
          <input
            type="text"
            value={newComment}
            onChange={handleChange}
            className="comment"
          />
          <button className="btn-primary" onClick={handleSubmit}>
            Comment
          </button>
        </div>
      )}

      <div>
        {comments &&
          comments.map((c) => {
            return (
              <div key={c.createdAt} className="each-comment">
                <small className="username">{c._user.name}</small>
                <p className="user-comment">{c.content}</p>
                <small className="date">
                  {new Date(`${c.createdAt}`).toString()}
                </small>
              </div>
            );
          })}

        {comment && (
          <div key={comment.createdAt} className="each-comment">
            <small className="username">{comment._user.name}</small>
            <p className="user-comment">{comment.content}</p>
            <small className="date">
              {new Date(`${comment.createdAt}`).toString()}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
