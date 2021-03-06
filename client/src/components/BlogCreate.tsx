import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { CreateBlog } from "../actions/BlogActions";

function BlogCreate() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const userState = JSON.parse(localStorage.getItem("_user") || "");
  const { user } = userState;

  const dispatch = useDispatch();

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userState &&
      dispatch(CreateBlog(title, content, user._id, userState.token));
    clearForm();
  };

  return (
    <div className="blog-create">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={handleTitle}
        />
        <textarea
          cols={30}
          rows={7}
          placeholder="Content..."
          value={content}
          onChange={handleContent}
        ></textarea>
        <br />
        <button className="btn-primary">Create Blog</button>
      </form>
    </div>
  );
}

export default BlogCreate;
