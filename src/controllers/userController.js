import * as z from 'zod';
import { createUserInDB, validateUserLogin } from '../services/userService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const userSchema = z.object({
            username: z.string(),
            email: z.string().email(),
            contact: z.string(),
            password: z.string().min(8),
            bio: z.string().max(200).optional(),
        });

        // get the data from the client 
        const userData = req.body;
        // validate the data
        const user = userSchema.parse(userData);

        // encrypt the password 
        user.password = await bcrypt.hash(user.password, 10);

        console.log("user: ", user);

        // take the validated data and store in the Database
        const savedUser = await createUserInDB(user);
        const response = {
            "message": "User created successfully ... ",
            "data": savedUser,
        }

        res.json(response);
        

    } catch (error) {
        const response = {
            "message": error,
        }
        //sending the response back to the client
        res.json(response);
    }
}

export const loginUser = async (req, res) => {
    try {
        // client is sending the data 
        const userSchema = z.object({
            username: z.string(),
            password: z.string().min(8),
        });

        // read the data the client is sending 
        const userData = req.body;
        const validatedUserData = userSchema.parse(userData);
        // verify whether the username and the password is matching or not 
        const {result, data} = await validateUserLogin(validatedUserData);
        //generate jwt token 
        const token = await generateJWTToken(data);
        if (result == true) {
            const response = {
                "message": "User Logged In successfully ... ",
                "token": token,
            };
            res.status(200).json(response);
        } else {
            const response = {
                "error": "Invalid credentials ... "
            }
            res.status(400).json(response);
        }

    } catch (error) {
        console.log("error is: ", error);
        const response = {
            "message": error,
        }
        // send this response to the client
        res.status(500).json(response);
    }
}

export const verifyJWTToken = async (token) => {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
}

export const generateJWTToken = async (user) => {
    console.log("user: ", user);
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
        expiresIn: '7h'
    });
    return token;
}