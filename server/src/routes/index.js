import express from "express";

import userRoutes from "./user.routes";
import blogRoutes from "./blog.routes";
import commentRoutes from "./comment.routes";
import replyRoutes from "./reply.routes";

const routes = express.Router();

// Users
routes.use("/users", userRoutes);

// Blogs
routes.use("/blogs", blogRoutes);

// Comments
routes.use("/comments", commentRoutes);

// Reply
routes.use("/replies", replyRoutes);

export default routes;
