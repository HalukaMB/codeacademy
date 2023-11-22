import express from "express";
import Location from "../model/LocationModel.js";
import { getAllLocations, getCleanedLocations, getTrashLocations } from "../controller/locationController.js";
const router = express.Router();
router.get("/all", getAllLocations)
router.get("/clean", getCleanedLocations)
router.get("/trash", getTrashLocations)


export default router