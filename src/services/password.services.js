const users = require("../models/user.model");
const bcrypt = require("bcrypt");

const changepassword = async (email, oldPassword, newPassword) => {
    const user = await users.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Invalid old password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();  
    return "Password changed successfully";
}

const forgotPassword = async (email) => {
    const user = await users.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    // Here you would typically generate a password reset token and send it via email
    return "Password reset link sent to email";
}