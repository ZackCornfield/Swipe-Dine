const express = require("express");
const router = express.Router();
const googleMapsController = require("../controllers/googleMapsController");

// Route to get places based on location and other parameters
router.post("/places", googleMapsController.getPlaces);

// Route to get details of a specific place
router.get("/placeDetails/:id", googleMapsController.getPlaceDetails);

module.exports = router;
