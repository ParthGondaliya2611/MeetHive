const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const connectDB = require("./db");
const userRoute = require("./Routes/userRoutes");
const MeetingRoute = require("./Routes/mettingRoutes");

const initSocket = require("./server"); // import socket logic

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/backend/auth", userRoute);
app.use("backend/meeting", MeetingRoute);
// connect DB
connectDB();

// create HTTP server
const server = createServer(app);

// initialize socket.io
initSocket(server);

// start server
server.listen(port, () => {
  console.log(`✅ Server listening on port: ${port}`);
});
