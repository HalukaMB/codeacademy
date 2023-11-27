import express from "express";
import {register } from "../controller/userController.js";
const userrouter = express.Router();
userrouter.get("/register", register)


export default userrouter