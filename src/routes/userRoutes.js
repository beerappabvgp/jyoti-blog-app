import express from 'express';
import { createUser, getProfile, getUserBlogs, loginUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
export const router = express.Router();


// create the user 

router.post("/create-user", createUser);

router.post('/login', loginUser);

// get the profile data of the user 
router.get("/profile", authMiddleware, getProfile);

router.get('/blogs', authMiddleware, getUserBlogs);