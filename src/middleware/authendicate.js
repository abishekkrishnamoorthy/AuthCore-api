const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Authorization header missing"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Token missing"});
    }
    try {
        const decoded = jwt.verify(token, "2980d5884ae09f79bf0909a6b8a70491c49f87a8604a179fb5e0b5b99f717ef4");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});         
    }
};

module.exports = authenticate;