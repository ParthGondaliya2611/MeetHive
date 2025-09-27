const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connection;
