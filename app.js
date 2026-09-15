import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './src/db/connectToDB.js';
import { router } from './src/routes/userRoutes.js';
import { blogRouter } from './src/routes/blogRoutes.js';
dotenv.config();

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use('/api/v1/users', router);
app.use('/api/v1/blogs', blogRouter);

// connect to the database 
connectToDatabase();

// health endpoint 

app.get("/health", (req, res) => {
    const response = {
        "message": "server health is good ... "
    };

    res.json(response);
});

app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
});
