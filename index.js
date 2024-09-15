import "dotenv/config";
import express from "express";
import cors from "cors";
import auth from "./routes/user.js";
import { connectDb } from "./database.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

connectDb();

app.use("/api", auth);

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on PORT: ${process.env.PORT}`);
});
