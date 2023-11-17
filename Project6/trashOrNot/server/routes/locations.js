import express from "express";
import Location from "../model/LocationModel.js";
const router = express.Router();
router.get("/all", async(req, res) => {
    try {
        const locations = await Location.find({});
        console.log('locations', locations)
        if (locations) {
          return res.send(locations)
        } else {
          return res.send({ error: "No users found" })
        }
      } catch (err) {
        return res.send({ error: err.message })
      }
    });

export default router