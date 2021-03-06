import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetBlogById } from "../actions/BlogActions";
import { CommentList } from "../actions/CommentActions";
import Comment from "../components/Comment";

import { RootStore } from "../Store";

function Blog({ match }: any) {
  const dispatch = useDispatch();
  const blogState = useSelector((state: RootStore) => state.blogs);

  const commentList = useSelector((state: RootStore) => state.comments);

  const { comments } = commentList;

  const { blog } = blogState;

  useEffect(() => {
    dispatch(GetBlogById(match.params.id));
  }, []);

  useEffect(() => {
    if (blog) {
      dispatch(CommentList(blog && blog._id));
    }
  }, [blog]);

  return (
    <div className="blog-card">
      {blog && (
        <div key={blog._id}>
          <p className="blog-title">{blog.title}</p>
          <small className="blog-author">{blog.createdAt}</small>
          <p className="blog-content">{blog.content}</p>
        </div>
      )}

      {/* Comment Section */}
      {blog && <Comment blogId={blog._id} comments={comments && comments} />}
    </div>
  );
}

export default withRouter(Blog);
