import { response } from "express";
import userModel from "../model/UserModel.js";
import { encryptPassword, verifyPassword } from "../utils/passwordUtils.js";

const register = async (req, res) => {
    console.log("register controller working");
    console.log("req.body :>> ", req.body);
  
    //Check if the user already exist in our DB
    const exisitingUser = await userModel.findOne({$or: [
        {email: req.body.email},
        {username: req.body.username}]
    })
    if (exisitingUser) {
      res.status(409).json({
        status:"409",
        message: "email or username already exist",
      });
    }
    if (!exisitingUser) {
      //encrypt passorwd
      const hashedPassword = await encryptPassword(req.body.password);
      if (hashedPassword) {
        // creating the user
  
        const newUser = new userModel({
        username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
  
        const savedUser = await newUser.save();
        console.log("savedUser :>> ", savedUser);
  
        res.status(201).json({
        status:"201",
          message: "user registered!!",
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            userImage: savedUser.userImage,
          },
        });
      } else {
        res.status(500).json({
          message: "something went wrong",
        });
      }
    }
  };
  
const login = async(req, res)=>{
    const {email, password}=req.body
    console.log("first")
    console.log(email, password)
    if (!email && !password){
        res.status(400).json({
            message: "password or email are missing"
        })
    }else{
        try {
            const exisitingUser = await userModel.findOne({email:email})
            console.log(exisitingUser)
            if (!exisitingUser){
                res.status(400).json({
                    message:"email not found"
                })
            }
            if (exisitingUser){
                const isPasswordMatch=await verifyPassword(password, exisitingUser.password)
                if (!isPasswordMatch){
                    res.status(400).json({
                        message:"wrong password"
                    })
                }
                if (isPasswordMatch){
                    res.status(200).json({
                        message:"password matches"
                    })

            }
        }
        } catch (error) {
            
        }
    }
}

  export { register, login };