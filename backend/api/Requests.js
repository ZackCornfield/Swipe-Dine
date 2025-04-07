const { PlacesClient } = require("@googlemaps/places");

const placesClient = new PlacesClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

async function getPlaces(lat, long, radius, maxresults) {
  const locationRestriction = {
    circle: {
      center: {
        latitude: lat,
        longitude: long,
      },
      radius: radius, // TODO add a function to convert from km to meters
    },
  };
  const request = {
    locationRestriction,
    maxResultCount: maxresults,
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
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getPlaceDetails() {}
