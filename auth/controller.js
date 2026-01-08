import { User } from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { loginSchema, signupSchema } from "./schema.js";

export const login = async (req, res, next) => {
    const { error } = loginSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            message: JSON.parse(error.message)[0].message
        });
    }
    passport.authenticate('local', (err, user, info) => {
        try {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: "Internal server error"
                });
            }

            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: info?.message || "Authentication failed"
                });
            }

            const token = jwt.sign(
                { id: user._id }, process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                status: true,
                message: "Login successful",
                token
            });

        } catch (err) {
            console.log("Error logging in", err);
            res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    })(req, res, next);
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { error } = signupSchema.safeParse(req.body);
        // console.log(JSON.parse(error.message)[0].message);
        if (error) {
            return res.status(400).json({
                status: false,
                message: JSON.parse(error.message)[0].message
            });
        }
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: false,
                message: "User already exists"
            });
        }

        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound);
        
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const token = jwt.sign(
            { id: newUser._id, name: newUser.name, email: newUser.email }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            status: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });

    } catch (err) {
        console.log("Error signing up", err);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

export const logout = async (req,res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({
            status:true,
            message:"Logged out successfully"
        })
    }catch(err){
        console.log("Error logging out",err);
        res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id || req.user._id);
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log("Error fetching profile", err);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}