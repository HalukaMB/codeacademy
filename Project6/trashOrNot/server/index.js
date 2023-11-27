import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/locationRoutes.js";
import mongoose from "mongoose";
import { getTrashLocations } from "./controller/locationController.js";
import userrouter from "./routes/userRoutes.js";

dotenv.config()
const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors()
  );
};

const addRoutes = () => {
  app.use("/locations", router);
  app.use("/users", userrouter);

};


const startServer = () => {

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });}
const  mongooseFunction =async() =>{
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));
}
(async function controller() {
  await mongooseFunction();
  addMiddlewares();
  addRoutes();
  startServer();
})();





