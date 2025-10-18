import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const ragister = async (req, res) => {
  const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
            message: "Please provide a valid email address" 
            });
        }

        const userExists = await User.find({ email });

        if (userExists.length) {
        return res.status(400).json({ 
            message: "User already exists" 
            });
        }
        const user = await User.create({ 
            username, 
            email, 
            password 
        });

        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        // console.log('JWT_SECRET:', process.env.JWT_SECRET);

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({ 
            message: "User registered successfully"
        });

    }catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message
        });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                 message: "Invalid e-mail" 
            });
        }
        const isMatch = user.password === password;

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password" 
            });
        }

        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({ 
            message: "User logged in successfully",
            user 
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};


export const logout = (req,res)=>{
    res.cookie("token","",{
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message:"Sucessfully logged out"
    })
}

export const profile = async (req,res) => {
    res.status(200).json({
        user: req.user
    })
}