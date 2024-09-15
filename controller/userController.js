import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import { Post } from "../models/postModel.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  if ((!username, !password)) {
    return res.status(404).json({
      message: "Please enter all the Credentials",
    });
  }

  try {
    const hash = bcrypt.hash(password, 10);

    const user = await UserModel.create({ username, password: hash });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if ((!username, !password)) {
    return res.status(404).json({
      message: "Please enter all the Credentials",
    });
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const comaprePassword = bcrypt.compareSync(password, user.password);

    if (comaprePassword) {
      jwt.sign({ username, id: user._id }, "asda", {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: user._id,
          username,
        });
      });
    } else {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const profile = (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, "asda", (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

export const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

export const post = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;

  try {
    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
    });

    res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
