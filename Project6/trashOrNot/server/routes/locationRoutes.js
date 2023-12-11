import express from "express";
import { deleteLocations, getAllLocations, getCleanedLocations, getTrashLocations, modifyLocations, postLocations } from "../controller/locationController.js";
import jwtAuthorization from "../middleware/jwtAuthorization.js";
const router = express.Router();
router.get("/all", getAllLocations)
router.get("/clean", getCleanedLocations)
router.get("/trash", getTrashLocations)
router.post("/post", jwtAuthorization, postLocations);
router.post("/modify", modifyLocations);

router.post("/delete", jwtAuthorization, deleteLocations);


export default router