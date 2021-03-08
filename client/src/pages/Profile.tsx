import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { DeleteBlog, GetBlogsByUser } from "../actions/BlogActions";
import Message from "../components/Message";
import { RootStore } from "../Store";

function Profile() {
  const userState = JSON.parse(localStorage.getItem("_user") || "");
  const { user } = userState;

  const URL = "http://localhost:4000";

  const dispatch = useDispatch();

  const blogState = useSelector((state: RootStore) => state.blogs);

  const { userBlogs, message } = blogState;

  const handleDeleteBlog = (_id: string) => {
    dispatch(DeleteBlog(_id, userState.token));
  };

  useEffect(() => {
    userState && dispatch(GetBlogsByUser(userState.token));
  }, []);

  return (
    <div>
      {user && (
        <div className="profile">
          <div>
            <img src={`${URL}/${user.image}`} alt="Person" />
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
            <small>
              Joined on: {new Date(user.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      )}

      {message && <Message message={message} />}

      <div className="blog-list">
        <table>
          <thead>
            <tr>
              <th>Blog Title</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userBlogs &&
              userBlogs.map((blog) => {
                return (
                  <tr className="rows" key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/blogs/edit/${blog._id}`}>
                        {" "}
                        <button className="warning">Edit</button>
                      </Link>{" "}
                      |{" "}
                      <button
                        className="danger"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(Profile);
