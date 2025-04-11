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
            "places.id,places.displayName,places.businessStatus,places.rating",
        },
      },
    });

    console.log(
      response[0].places.map((place) => {
        return {
          id: place.id,
          name: place.displayName,
          businessStatus: place.businessStatus,
          rating: place.rating,
        };
      })
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getPlaceDetails() {}

let types = ["restaurant"];

getPlaces(
  37.7749, // Latitude for San Francisco, CA
  -122.4194, // Longitude for San Francisco, CA
  5000, // Radius in meters
  10, // Max results
  types,
  4.5 // Minimum rating
);
