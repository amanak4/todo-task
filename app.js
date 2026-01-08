import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import authRoutes from "./auth/route.js";
import todoRoutes from "./todo/route.js";
import passport from "./config/passport.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

connectDB();

app.get("/",(req,res)=>{
    res.json({
        status:true,
        message:`Server is running on port ${PORT}`
    })
})

app.use("/auth",authRoutes);
app.use("/todo",todoRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});