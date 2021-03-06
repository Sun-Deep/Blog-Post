import { Link } from "react-router-dom";
import { BlogType } from "../actions/BlogActionTypes";

interface PropsType {
  blog: BlogType;
}

function BlogCard({ blog }: PropsType) {
  return (
    <div className="blog-card">
      <p className="blog-title">{blog.title}</p>
      <small className="blog-author">
        {blog._user.name} - {new Date(blog.createdAt).toLocaleString()}
      </small>
      <p className="blog-content">{blog.content.substring(0, 200)} ...</p>
      <Link to={`/blogs/${blog._id}`} className="btn-primary">
        Read More
      </Link>
    </div>
  );
}

export default BlogCard;
