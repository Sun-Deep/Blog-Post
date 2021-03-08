import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterComment, RegisterReply } from "../actions/CommentActions";
import { CommentType } from "../actions/CommentActionTypes";

interface PropsType {
  blogId: string;
  comments?: CommentType[];
}

function Comment({ comments, blogId }: PropsType) {
  const [newComment, setNewComment] = useState<string>("");
  const [reply, setReply] = useState<string>("");

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

  const handleSubmit = () => {
    dispatch(
      RegisterComment(newComment, userState.user._id, blogId, userState.token)
    );
  };

  const handleReplyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = (
    comment_id: string,
    user_id: string,
    content: string
  ) => {
    dispatch(RegisterReply(comment_id, user_id, content, userState.token));
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
                <br />

                <div className="reply-box">
                  <input
                    onChange={handleReplyChange}
                    type="text"
                    className="reply-comment"
                    name={`name-${c._id}`}
                  />
                  <button
                    onClick={() => handleReplySubmit(c._id, c._user._id, reply)}
                    className="reply-button"
                  >
                    Reply
                  </button>
                </div>

                <div className="reply-lists">
                  {c.replies &&
                    c.replies.map((r) => {
                      return (
                        <div className="each-reply">
                          <p key={r.createdAt}>{r.content}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Comment;
