import { UserModel } from "../models/User.js"
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { BlogModel } from "../models/Blog.js";

export const createUserInDB = async (user) => {
    // take the data and store it in DB 
    const newUser = new UserModel({
        username: user.username, // input validated data
        email: user.email,
        password: user.password,
        bio: user.bio,
        contact: user.contact
    });

    // It will save the new user document to the DB
    const savedUser = await newUser.save(); 
    return savedUser;
}

export const validateUserLogin = async (user) => {
    // get the data of the user from the database 
    const userData = await UserModel.findOne({
        username: user.username,
    })
    // verify the password using bcrypt 
    const res = await bcrypt.compare(user.password, userData.password);
    return {
        "result": res,
        "data": userData
    };
}

export const getUserBlogsFromDB = async (userId) => {
    try {
        // get all the blogs from the DB Of the userId
        const blogs = await BlogModel.find({
            author: userId,
        });
        return blogs;
    } catch (error) {
        console.log("error is: ", error);
        throw new Error(error);
    }
}

export const getUserProfile = async (userId) => {
    try {
        // get the profile data of the user from the db
        const userProfile = await UserModel.findById(userId);
        return userProfile;   
    } catch (error) {
        console.log("error while eading profile : ", error);
        throw new Error(error);
    }
}