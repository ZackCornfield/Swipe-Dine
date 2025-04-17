import { useState } from "react";
import { PuffLoader } from "react-spinners";
import Geosuggest from "@ubilabs/react-geosuggest";
import useGoogleMaps from "../hooks/useGoogleMaps";
import styles from "./SearchForm.module.css";
import getBrowserLocation from "../Helper/locationFunc";
import MultiSelectCheckboxes from "./MultipleDropdown";

const SearchForm = () => {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const mapsLoaded = useGoogleMaps();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxDistance, setMaxDistance] = useState(5000);
  const [rating, setRating] = useState(1);
  const [maxResults, setMaxResults] = useState(5);

  const restaurantTypes = [
    "american_restaurant",
    "asian_restaurant",
    "barbecue_restaurant",
    "chinese_restaurant",
    "coffee_shop",
    "dessert_restaurant",
    "fast_food_restaurant",
    "hamburger_restaurant",
    "ice_cream_shop",
    "indian_restaurant",
    "italian_restaurant",
    "japanese_restaurant",
    "korean_restaurant",
    "lebanese_restaurant",
    "mexican_restaurant",
    "middle_eastern_restaurant",
    "pizza_restaurant",
    "seafood_restaurant",
    "steak_house",
    "sushi_restaurant",
    "thai_restaurant",
    "vegan_restaurant",
    "vietnamese_restaurant",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        lat: coords.lat,
        long: coords.lng,
        radius: maxDistance,
        maxresults: maxResults,
        types: selectedTypes,
        rating,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/google-maps/places`,
        {
          method: "POST", // Use POST method
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(formData), // Convert formData to JSON string
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const places = await response.json(); // Parse the JSON response
    } catch (error) {
      console.error("Error searching for places", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = async (e) => {
    e.preventDefault();

    try {
      const pos = await getBrowserLocation(); // Get the current location of the user
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
    } catch (error) {
      console.error("Location error: ", error);
    }
  };

  const handleSuggestSelect = (suggest) => {
    if (suggest) {
      const { location } = suggest; // Taking location from the suggest object
      const { latitude, longitude } = location; // Taking latitude and longitude from the suggest object
      setCoords({ lat: latitude, long: longitude }); // Set the coordinates in the state
    } else {
      console.error("No location selected");
    }
  };

  return (
    <section className={styles.searchFormContainer}>
      {loading ? (
        <div className="loaderContainer">
          <PuffLoader color="#424347" size={60} />
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.searchForm}>
          <div className={styles.searchSection}>
            <div className={styles.distanceSection}>
              <label htmlFor="distance">
                How far are you willing to travel
              </label>
              <select
                id="distance"
                name="distance"
                onChange={(e) => setMaxDistance(e.target.value)}
              >
                <option value="1000">1km</option>
                <option value="5000">5km</option>
                <option value="10000">10km</option>
                <option value="20000">20km</option>
                <option value="50000">50km</option>
              </select>
            </div>
            <div className={styles.searchLocationSection}>
              <p className={styles.locationLabel}>Where are you?</p>
              <button
                className={styles.locationButton}
                onClick={handleLocationClick}
              >
                Use current location
              </button>

              {mapsLoaded ? (
                <Geosuggest
                  className={styles.geosuggest}
                  placeholder="Start typing an address..."
                  onSuggestSelect={
                    (suggest) => handleSuggestSelect(suggest) // Handle the selected suggestion
                  }
                />
              ) : (
                <p>Loading address suggestions...</p>
              )}
            </div>
            <div className={styles.typeSection}>
              <label htmlFor="types">Whats the crave?</label>
              <MultiSelectCheckboxes
                options={restaurantTypes}
                rejects={["restaurant", "shop"]}
                onChange={
                  (selected) => setSelectedTypes(selected) // Set the selected restaurant types in the state
                }
              ></MultiSelectCheckboxes>
            </div>
            <div className={styles.ratingSection}>
              <label htmlFor="rating">What rating are you looking for?</label>
              <select
                id="rating"
                name="rating"
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1 ★</option>
                <option value="2">2 ★</option>
                <option value="3">3 ★ </option>
                <option value="4">4 ★</option>
                <option value="5">5 ★</option>
              </select>
            </div>
            <div className={styles.maxResultsSection}>
              <label htmlFor="maxResults">
                How many results do you want to see?
              </label>
              <select
                id="maxResults"
                name="maxResults"
                onChange={(e) => setMaxResults(e.target.value)}
              >
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton}>
              Search
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default SearchForm;
