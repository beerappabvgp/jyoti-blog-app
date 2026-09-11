import { BlogModel } from "../models/Blog.js";

export let createBlogInDB = async (blogData) => {
    try {
        // create a new blog
        let newBlog = new BlogModel({
            title: blogData.title,
            description: blogData.description,
            content: blogData.content,
            author: blogData.author,
        });

        // save the blog to the database 
        const savedBlog = await newBlog.save();
        return savedBlog;
    } catch (error) {
        console.log("error while creating the blog in DB: ", error);
        throw error;
    }
}

export let updateBlogInDB = async (blogData) => {
    // blogData.id has the blog Id and also new updated data 
    // we need to update the blog 
    // we will validate whether blog is present in the DB or not
    const updatedBlog = await BlogModel.findByIdAndUpdate(blogData.id, blogData);
    return updatedBlog;
}

export let getBlogByIdFromDB = async (blogId) => {
    try {
        const blog = await BlogModel.findById(blogId);
        return blog;
    } catch (error) {
        console.log("error while reading the blog from the DB ... ", error);
        throw error;
    }
}
