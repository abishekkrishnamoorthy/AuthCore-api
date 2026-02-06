const connectdb = require("./config/db.js");
const dotenv = require("dotenv");
const express =require("express");
const authenticate = require("./middleware/authendicate.js");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config();
connectdb();
app.use(express.json());
app.use("/api/auth", require("./routes/auth.route.js"));
app.get("/",authenticate, (req, res) => {
    res.json("Welcome to the Authcore API");
});

module.exports = app;