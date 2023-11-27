import express from "express";
import { getAllLocations, getCleanedLocations, getTrashLocations, postLocations } from "../controller/locationController.js";
const router = express.Router();
router.get("/all", getAllLocations)
router.get("/clean", getCleanedLocations)
router.get("/trash", getTrashLocations)
router.post("/post", postLocations);


export default router