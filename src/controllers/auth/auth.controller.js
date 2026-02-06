const bcrypt =require("bcrypt");
const user =require("../../models/user.js");
const {generateToken, generateRefreshToken, newAccessToken} = require("../../services/generate_token.js");
const registor= async (req,res)=>{
    try {
        const { name, email, password , role} = req.body;
        const existingUser = await user.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const  login= async (req,res)=>{
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await generateToken(email, password);
        const refreshToken = await generateRefreshToken(email);
        res.status(200).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const newToken = await newAccessToken(refreshToken);
        res.status(200).json({ newToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }   
};

module.exports={registor,login,refresh}          