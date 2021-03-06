import { useSelector } from "react-redux";
import { RootStore } from "../Store";

function Sidebar() {
  const blogState = useSelector((state: RootStore) => state.blogs);
  const { blogs } = blogState;
  return (
    <div>
      <p className="recent-posts">Recent Posts</p>
      {blogs &&
        blogs.map((blog) => {
          return (
            <div className="blog-list-recent" key={blog._id}>
              <h5>{blog.title}</h5>
              <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
            </div>
          );
        })}
    </div>
  );
}

export default Sidebar;
