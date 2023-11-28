import userModel from "../model/UserModel.js";
import { encryptPassword } from "../utils/encryptPassword.js";

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
  
  export { register };