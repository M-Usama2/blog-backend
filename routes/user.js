import express from "express";
import {
  getPost,
  getSinglePost,
  login,
  logout,
  post,
  profile,
  register,
  updatePost,
} from "../controller/userController.js";

const router = express.Router();
import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.get("/post", getPost);
router.post("/logout", logout);
router.get("/post/:id", getSinglePost);
router.post("/post", uploadMiddleware.single("file"), post);
router.put("/post", uploadMiddleware.single("file"), updatePost);
router.get("/header", (req, res) => {
  res.json("hello");
});

export default router;
