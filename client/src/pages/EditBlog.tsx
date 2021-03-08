import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBlogById, UpdateBlog } from "../actions/BlogActions";
import Message from "../components/Message";
import { RootStore } from "../Store";

function EditBlog({ match }: any) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const userState = JSON.parse(localStorage.getItem("_user") || "");

  const blogState = useSelector((state: RootStore) => state.blogs);

  const { blog, message } = blogState;

  useEffect(() => {
    dispatch(GetBlogById(match.params.id));
  }, []);

  useEffect(() => {
    blog && setTitle(blog.title);
    blog && setContent(blog.content);
  }, [blog]);

  const dispatch = useDispatch();

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    blog &&
      userState &&
      dispatch(UpdateBlog(blog?._id, title, content, userState.token));
  };

  return (
    <div className="blog-create">
      {message && <Message message={message} />}

      {blog && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={handleTitle}
          />
          <textarea
            cols={30}
            rows={20}
            placeholder="Content..."
            value={content}
            onChange={handleContent}
          ></textarea>
          <br />
          <button className="btn-primary">Update Blog</button>
        </form>
      )}
    </div>
  );
}

export default EditBlog;
