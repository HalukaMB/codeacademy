import express from "express";
import {login, register, profile } from "../controller/userController.js";
import jwtAuthorization from "../middleware/jwtAuthorization.js";
const userrouter = express.Router();
userrouter.post("/register", register)
userrouter.post("/login", login)
userrouter.get("/profile", profile)

/* userrouter.get("/account",jwtAuthorization, getUserProfile)
 */

export default userrouter