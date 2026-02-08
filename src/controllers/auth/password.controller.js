const users = require("../../models/user.model");
const bcrypt = require("bcrypt");
const { changepassword } = require("../../services/password.services");

const changepassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const message = await changepassword(email, oldPassword, newPassword);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const message = await forgotPassword(email);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { forgotPassword };