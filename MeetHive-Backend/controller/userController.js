const express = require("express");
const User = require("../Models/userModel");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../Middleware/authHelper");

const userController = {
  register: async (req, res) => {
    try {
      const { FullName, userName, password } = req.body;
      if (!FullName || !userName || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existUser = await User.findOne({ userName });
      if (existUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashed = await hashPassword(password);
      const newUser = new User({ FullName, userName, password: hashed });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;

      const user = await User.findOne({ userName });
      if (!user)
        return res
          .status(400)
          .json({ message: "Invalid username or password" });

      const match = await comparePassword(password, user.password);
      if (!match)
        return res
          .status(400)
          .json({ message: "Invalid username or password" });

      const token = generateToken(user._id);

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          FullName: user.FullName,
          userName: user.userName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
