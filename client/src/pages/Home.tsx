import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBlogs } from "../actions/BlogActions";
import { BlogType } from "../actions/BlogActionTypes";
import BlogCard from "../components/BlogCard";
import BlogCreate from "../components/BlogCreate";
import Message from "../components/Message";
import { RootStore } from "../Store";

function Home() {
  const dispatch = useDispatch();
  const blogState = useSelector((state: RootStore) => state.blogs);
  let userState;
  try {
    userState = JSON.parse(localStorage.getItem("_user") || "");
  } catch (error) {
    userState = undefined;
  }

  const { blogs, message } = blogState;

  useEffect(() => {
    dispatch(GetBlogs());
  }, []);

  return (
    <div className="blog-content">
      {message && <Message message={message} />}
      {userState && <BlogCreate />}

      {blogs &&
        blogs.map((data: BlogType) => {
          return <BlogCard key={data._id} blog={data} />;
        })}
    </div>
  );
}

export default Home;
