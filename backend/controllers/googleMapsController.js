const { getPlaces, getPlaceDetails } = require("../api/Requests");

module.exports = {
    getPlaces: async (req, res) => {
        const { lat, lng, radius, maxresults, types, rating } = req.body;

        try {
            const places = await getPlaces(
                lat,
                lng,
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
        const placeId = req.params.id;
        try {
            const placeDetails = await getPlaceDetails(placeId);
            res.status(200).json(placeDetails);
        } catch (error) {
            res.status(500).json({ error: "Error fetching place details" });
        }
    },
};
