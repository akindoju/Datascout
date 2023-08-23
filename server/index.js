import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import Products from "./models/Products.js";
import ProductsStat from "./models/ProductsStat.js";
import User from "./models/User.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

//CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

    //To manually add users to database one, comment out after use
    Products.insertMany(dataProduct);
    ProductsStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
