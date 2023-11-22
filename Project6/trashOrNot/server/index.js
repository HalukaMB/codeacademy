import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/locationRoutes.js";
import mongoose from "mongoose";

console.log(dotenv.config());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));
// loading .env file
dotenv.config();
const app = express();
app.use("/locations", router);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

