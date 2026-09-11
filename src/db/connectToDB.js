import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to the database successfully .... ");
    } catch (error) {
        console.log("error while connecting to the DB: ", error);
    }
}