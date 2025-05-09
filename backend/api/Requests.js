require("dotenv").config();

const { PlacesClient } = require("@googlemaps/places");

const placesClient = new PlacesClient({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

const getPlaces = async (lat, lng, radius, maxresults, types, rating) => {
    const locationRestriction = {
        circle: {
            center: {
                latitude: lat,
                longitude: lng,
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
};

const getPlaceDetails = async (id) => {
    const request = {
        name: `places/${id}`,
    };

    const response = await placesClient.getPlace(request, {
        otherArgs: {
            headers: {
                "X-Goog-FieldMask":
                    "id,displayName,formattedAddress,photos,rating,priceLevel,location,googleMapsUri,websiteUri,dineIn,delivery,takeout,reservable",
            },
        },
    });

    return response[0] || {};
};

module.exports = { getPlaces, getPlaceDetails };
