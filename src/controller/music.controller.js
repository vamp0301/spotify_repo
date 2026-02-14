const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
 const token = req.cookies.token;
    if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
    }
    try{
    jwt.verify(token, process.env.JWT_SECRET)

    if(decoded.role !== "artist")
        {
            return res.status(403).json({ message: "Forbidden" });
    }}
    catch(error){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const{title}=req.body;
    const file=req.file;
}