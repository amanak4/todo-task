import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import authRoutes from "./auth/route.js";
import todoRoutes from "./todo/route.js";
import passport from "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(passport.initialize());

connectDB();

app.get("/",(req,res)=>{
    res.render("index");
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/todo",todoRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});