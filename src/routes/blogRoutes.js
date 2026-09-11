import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createBlog, getBlogById, updateBlog } from '../controllers/blogController.js';

export const blogRouter = express.Router();


// create a blog 
blogRouter.post("/create-blog", authMiddleware, createBlog);

// update blogPost
blogRouter.put("/:blogId", authMiddleware, updateBlog);

// read the blog from DB given the ID 
blogRouter.get("/:blogId", authMiddleware, getBlogById);

// deleet the blog from DB 