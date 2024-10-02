import "dotenv/config";
import express from "express";
import cors from "cors";
import auth from "./routes/user.js";
import { connectDb } from "./database.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

connectDb();

app.use("/api", auth);
app.use("/health", (req, res) => {
  res.json("Hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on PORT: ${process.env.PORT}`);
});
