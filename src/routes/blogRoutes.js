import express from 'express';

export const blogRouter = express.Router();


// create a blog 
blogRouter.post("/create-blog");