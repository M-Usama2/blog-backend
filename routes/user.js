import express from "express";
import {
  getPost,
  login,
  logout,
  post,
  profile,
  register,
} from "../controller/userController.js";

const router = express.Router();
import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.get("/post", getPost);
router.post("/logout", logout);
router.post("/post", uploadMiddleware.single("file"), post);

export default router;
