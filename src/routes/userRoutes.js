import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
export const router = express.Router();


// create the user 

router.post("/create-user", createUser);

router.post('/login', loginUser);
