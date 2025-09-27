const express = require("express");
const app = express();
const connectDB = require("./db");
const userRoute = require("./Routes/userRoutes");
const port = 3030;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//routes

app.use(`/backend/auth`, userRoute);

connectDB();

app.listen(port, () => {
  console.log("Server Listening PORT : 3030 ");
});
