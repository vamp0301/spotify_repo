const imagekit = require("../config/imagekit.config");
const imageKitClient =  new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
