import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    try{
           const res = await mongoose.connect(process.env.MONGODB_URL);
           console.log("Connected to MongoDB",res.connection.host);
    }catch(err){
        console.log("Error connecting to MongoDB",err);
        process.exit(1); 
    }
}