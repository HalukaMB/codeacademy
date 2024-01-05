import { response } from "express";
import LocationModel from "../model/LocationModel.js";

import userModel from "../model/UserModel.js";
import { encryptPassword, verifyPassword } from "../utils/passwordUtils.js";
import { issueToken } from "../utils/jwt.js";

const register = async (req, res) => {
    console.log("req.body :>> ", req.body);

    if (!req.body.email.includes("@") && req.body.length()<6){
        res.status(422).json({
            status:"422",
            message: "email does not seem proper or password is too short",
          });
    }
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
        const token = issueToken({"UserID":savedUser._id,
        "name":savedUser.username,
        "reportedplaces":savedUser.reportedplaces,
        "cleanedplaces":savedUser.cleanedplaces})

        console.log("savedUser :>> ", savedUser);
  
        res.status(201).json({
        status:"201",
          message: "user registered!!",
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            id:savedUser._id

          },
          token: token
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
    if (!email && !password){
        res.status(400).json({
            message: "password or email are missing"
        })
    }else{
        try {
            const exisitingUser = await userModel.findOne({email:email})
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
                  console.log(exisitingUser)
                  const argument = {"userID":exisitingUser._id,"name":exisitingUser.email,
                  "reportedplaces":exisitingUser.reportedplaces,
                  "cleanedplaces":exisitingUser.cleanedplaces
                }
                    const token = issueToken(argument)
                    console.log(token)
                if (token){
                    const trashLocationsOfUser = await LocationModel.find({reportedby:exisitingUser._id})
                    const cleanLocationsOfUser = await LocationModel.find({cleanedby:exisitingUser._id})

                    res.status(200).json({
                        message: "user successfully logged in",
                        user:{
                            username: exisitingUser.username,
                            email: exisitingUser.email,
                            id:exisitingUser._id,
                            reportedby:trashLocationsOfUser,
                            cleanedby:cleanLocationsOfUser

                        },
                        token:token
                    })

                }

            }
        }
        } catch (error) {       
        }
    }
}

const profile = async(req, res)=>{
    const queryurl=req._parsedUrl.query
    const userID=queryurl.slice(2)
    if (userID!=""){
      console.log(userID)
      const exisitingUser = await userModel.findOne({_id:userID})
      console.log(exisitingUser)

      const trashLocationsOfUser = await LocationModel.find({reportedby:userID})
      const cleanLocationsOfUser = await LocationModel.find({cleanedby:userID})


      res.status(200).json({
        message: "user profile",
        user:{

            username: exisitingUser.username,
            reportedby:trashLocationsOfUser,
            cleanedby:cleanLocationsOfUser

        },
    })

    }

}

  export { register, login, profile };