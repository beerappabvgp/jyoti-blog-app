import * as z from 'zod';
import { createBlogInDB, deleteBlogById, getAllBlogsFromDB, getBlogByIdFromDB, updateBlogInDB } from '../services/blogService.js';

export let createBlog = async (req, res) => {
    try {
        // zod validation 
        let blogSchema = z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
        });
        // 2nd step : get data from the client 
        const blogData = req.body;
        const validatedBlogData = blogSchema.parse(blogData);
        console.log("req.user: ", req.user);
        validatedBlogData.author = req.user.data._id;
        const savedBlog = await createBlogInDB(validatedBlogData);
        const response = {
            "message": "Blog created successfully .... ",
            "data": savedBlog,
        };
        res.status(201).json(response);

    } catch (error) {
        console.log("error while creating the blog ... ");
        res.status(500).json({
            "message": error,
        });
    }
}

export let updateBlog = async (req, res) => {
    try {
        // zod schema 
        const blogSchema = z.object({
            title: z.string(),
            description: z.string(),
            content: z.string(),
        });

        // get the data from the client 
        const blogData = req.body;
        // validate the input data using zod schema 
        const validatedBlogSchema = blogSchema.parse(blogData);
        blogData.id = req.params.blogId;
        const updatedBlog = await updateBlogInDB(blogData);
        const response = {
            "message": "Blog updated successfully ... ",
            "data": updatedBlog,
        };
        res.status(200).json(response);
    } catch (error) {
        console.log("error in blogController while updating the blog ... ", error);
        const response = {
            "message": "Internal server error ... ",
            "error": error.message,
        }
        res.status(500).json(response);
    }
}

export let getBlogById = async (req, res) => {
    try {
        // get the blog id from the client 
        const blogId = req.params.blogId;
        if (!blogId) {
            const response = {
                "message": "blogId is required to get the blog info ... ",
            }
            return res.status(400).json(response);
        }
        const blogData = await getBlogByIdFromDB(blogId);
        const response = {
            "message": "Blog data fetched successfully .... ",
            "data": blogData,
        }
        // sending response back to the client 
        res.status(200).json(response);
    } catch (error) {
        console.error("error while reading the data of the blog ... ", error);
        const response = {
            "message": "Internal server error",
            "error": error.message,
        };
        res.status(500).json(response);
    }
}

export let deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        if (!blogId) {
            const response = {
                "message": "blogId is required in order to delete the blog post from the DB ... ",
            }
            return res.status(400).json(response);
        }
        let deletedBlogData = await deleteBlogById(blogId);
        const response = {
            "message": "The blog has been deleted successfully ... ",
            "data": deletedBlogData,
        }
        res.status(200).json(response);
    } catch (error) {
        console.log("error in delete blog controller: ", error);
        const response = {
            "message": "Internal server error",
            "errro": error.message,
        };
        res.status(500).json(response);
    }
}

export let getAllBlogs = async (req, res) => {
    try {
        let blogs = await getAllBlogsFromDB();
        const response = {
            "message": "Blogs fetched successfully .... ",
            "data": blogs
        };
        res.status(200).json(response);
    } catch (error) {
        console.log("error while fetching the blogs: ", error);
        const response = {
            "message": "internal server error",
            "error": error,
        }
        res.status(500).json(response);
    }
}