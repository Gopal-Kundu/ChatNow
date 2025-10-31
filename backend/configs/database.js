import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ quiet: true });
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log("MongoDB connection Failure:", error);
    }
};
