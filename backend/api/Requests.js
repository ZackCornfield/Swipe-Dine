require("dotenv").config();

const { PlacesClient } = require("@googlemaps/places");

const placesClient = new PlacesClient({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

async function getPlaces(lat, long, radius, maxresults, types, rating) {
    const locationRestriction = {
        circle: {
            center: {
                latitude: lat,
                longitude: long,
            },
            radius: radius,
        },
    };
    const request = {
        locationRestriction,
        maxResultCount: maxresults,
        includedTypes: types,
        rating: rating,
    };

    try {
        const response = await placesClient.searchNearby(request, {
            otherArgs: {
                headers: {
                    "X-Goog-FieldMask":
                        "places.id,places.displayName,places.businessStatus",
                },
            },
        });
        return response[0]?.places || [];
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getPlaceDetails() {}
