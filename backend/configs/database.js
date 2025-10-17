import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mocktestdewarjonno_db_user:xodNihH4YUHV8sR3@cluster0.1tmq54x.mongodb.net/");
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log("MongoDB connection Failure:", error);
    }
};
