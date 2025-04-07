const { PlacesClient } = require("@googlemaps/places");
import { GoogleAuth } from "google-auth-library";

const authClient = new GoogleAuth().fromAPIKey(process.env.GOOGLE_MAP_API_KEY);
const placesClient = new PlacesClient({
  auth: authClient,
});

async function getPlaces() {}

async function getPlaceDetails() {}
