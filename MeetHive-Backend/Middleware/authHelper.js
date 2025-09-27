const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "mysecret", {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "mysecret");
};

module.exports = { hashPassword, comparePassword, generateToken, verifyToken };
