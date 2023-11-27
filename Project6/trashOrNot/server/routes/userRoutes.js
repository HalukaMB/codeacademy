import express from "express";
import {register } from "../controller/userController.js";
const userrouter = express.Router();
userrouter.post("/register", register)


export default userrouter