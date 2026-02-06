const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")
const users =require("../models/user.js")
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async (email, password) => {
    const user = await users.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id, email: user.email , name : user.name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m",
    });
    return token;
};

const generateRefreshToken = async (email) => {
    const user = await users.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const refreshToken = jwt.sign({ email : user.email}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return refreshToken;
};

const newAccessToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await users.findOne({ email: decoded.email });
        if (!user) {
            throw new Error("User not found");
        }
        const token = jwt.sign({ id: user._id, email: user.email , name : user.name }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1m",
        });
        return token;
    } catch (error) {
        throw new Error("Invalid refresh token");
    }
};

module.exports = { generateToken, generateRefreshToken, newAccessToken };