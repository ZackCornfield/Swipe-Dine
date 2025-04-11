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

async function getPlaceDetails(place) {
  const request = {
    name: `places/${place.id}`,
    fields: [
      "id",
      "displayName",
      "formattedAddress",
      "openingHours",
      "photos",
      "rating",
      "priceLevel",
      "websiteURI",
      "location",
      "hasDineIn",
      "hasDelivery",
      "isReservable",
      "googleMapsURI",
    ],
  };

  const response = await placesClient.getPlace(request, {
    otherArgs: {
      headers: {
        "X-Goog-FieldMask":
          "id,displayName,formattedAddress,photos,rating,priceLevel,location",
      },
    },
  });

  return response[0] || {};
}

async function fjjfj() {
  let types = ["restaurant"];

  let places = await getPlaces(
    37.7749, // Latitude for San Francisco
    -122.4194, // Longitude for San Francisco
    5000, // Radius in meters
    10, // Max results
    types,
    "4" // Minimum rating
  );

  console.log("Places:", places[0]);

  let placeDetails = await getPlaceDetails(places[0]);

  console.log("Place Details:", placeDetails);
}

fjjfj();
