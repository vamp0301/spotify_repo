const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/* this is the function to register a user and 
it is an async function because we are using await keyword in it and 
it is used to handle the asynchronous code and it will return a promise and
 we can use then and catch method to handle the promise */

async function registerUser(req, res) {
        const { username, email, password, role="user" } = req.body;
    const isUserAlreadyExist = await userModel.findOne({
     /*  username: username,
       email: email
       reson we not use this is beacuse if uservaule and 
       email is same then it will not allow to register and give null value erroror error
     that user already exist but in this case if we use $or operator then it will check either username or
      email is already exist or not and if any one of them is already exist then it will give error that user already exist.
       so we use $or operator to check either username or email is already exist or not */
$or:[{username},
{email}
]
/* this is the syntax of $or operator in mongoose and 
it is used to check either username or email is already exist or not */
 })
    if(isUserAlreadyExist){
        return res.status(409).json({message:"User already exist"})
    }

    const hash = await bcrypt.hash(password,10)
    /* this line of code is used to hash the password and 
    it is an asynchronous function and it will return a promise and we can use then and catch method to handle the promise
     and it takes two parameters one is the password and another is the salt rounds which is 10 in this case and 
     it will return the hashed password */
    const user= await userModel.create({
        username,
        email,
        password : hash,
        role
    })
    const token=jwt.sign({
        _id:user._id,
        role:user.role},
        process.env.JWT_SECRET)

        res.cookie("token",token)
        res.status(201).json({message:"User registered successfully",
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })
}
async function loginUser(req,res){
  const{username,email,password}=req.body;
  const user=await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
  })
  if(!user){
    return res.status(404).json({message:"User not found"})
  }
    const isPasswordMatch=await bcrypt.compare(password,user.password)
    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid password"})
    }
    const token=jwt.sign({
        _id:user._id,
        role:user.role},
        process.env.JWT_SECRET)
        
        res.cookie("token",token)
        res.status(200).json({message:"User logged in successfully",
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })
}   

module.exports= {registerUser,loginUser};
/* this line of code is used to export the registerUser and loginUser function and 
it is used to make the function available in other files and we can import it in other files and use it there */ 