const { getPlaces, getPlaceDetails } = require("../api/Requests");

module.exports = {
  getPlaces: async (req, res) => {
    const { lat, long, radius, maxresults, types, rating } = req.body;

    try {
      const places = await getPlaces(
        lat,
        long,
        radius,
        maxresults,
        types,
        rating
      );

      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: "Error fetching places" });
    }
  },
  getPlaceDetails: async (req, res) => {
    const { place } = req.body;
    try {
      const placeDetails = await getPlaceDetails(place);
      res.status(200).json(placeDetails);
    } catch (error) {
      res.status(500).json({ error: "Error fetching place details" });
    }
  },
};
