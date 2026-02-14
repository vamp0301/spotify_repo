const musicModel = require("../models/music.model");
const{uploadfile}=require("../services/storage.service");
const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
 
   
    const{title}=req.body;
    const file=req.file;


const result=await uploadfile(file.buffer.toString("base64"));

const music=await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id,
})
res.status(201).json({message:"Music created successfully",music:{
    _id:music._id,
    uri:music.uri,
    title:music.title,
    artist:music.artist
}
})
}
async function createAlbum(req, res) {

    const{title,musicIds}=req.body;
    const album=await albumModel.create({
        title,
        musics:music,
        artist:req.user.id
    })
    res.status(201).json({message:"Album created successfully",album:{
        _id:album._id,
        title:album.title,
        musics:album.musics,
        artist:album.artist
    }})
}
async function getAllMusics(req, res) {
    const musics=await musicModel.find().populate("artist","username");
    res.status(200).json({
        message:"All musics",
        musics:musics,
    })

}
module.exports={createMusic ,createAlbum,getAllMusics};

