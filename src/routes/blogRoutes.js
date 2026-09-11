import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/blogController.js';

export const blogRouter = express.Router();


// create a blog 
blogRouter.post("/create-blog", authMiddleware, createBlog);

// update blogPost
blogRouter.put("/:blogId", authMiddleware, updateBlog);

// read the blog from DB given the ID 
blogRouter.get("/:blogId", authMiddleware, getBlogById);

// delete the blog from DB 
blogRouter.delete("/:blogId", authMiddleware, deleteBlog);

// get all the blogs in the DB
blogRouter.get("/", authMiddleware, getAllBlogs);