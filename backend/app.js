require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const googleMapsRouter = require("./routes/googleMapsRouter");

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? proccess.env.FRONT_END_URL
    : "http://localhost:3000";

// Middleware to enable CORS for the frontend URL
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Google Maps API server!");
});
app.use("/google-maps", googleMapsRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
