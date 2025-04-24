import { useState, useRef } from "react";
import { PuffLoader } from "react-spinners";
import Geosuggest from "@ubilabs/react-geosuggest";
import useGoogleMaps from "../Hooks/useGoogleMaps";
import styles from "./SearchForm.module.css";
import getBrowserLocation from "../Helper/locationFunc";
import MultiSelectCheckboxes from "./MultipleDropdown";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({
    lat: 37.42223303312427,
    lng: -122.08525446256903,
  });
  const mapsLoaded = useGoogleMaps();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [maxDistance, setMaxDistance] = useState(1000);
  const [rating, setRating] = useState(1);
  const [maxResults, setMaxResults] = useState(5);
  const navigate = useNavigate();
  const geosuggestRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

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

  const resetState = () => {
    setCoords({
      lat: 37.42223303312427,
      lng: -122.08525446256903,
    });
    setSelectedTypes([]);
    setMaxDistance(1000);
    setRating(1);
    setMaxResults(5);
    setIsUsingCurrentLocation(false);
    setShowSuggestions(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        lat: coords.lat,
        lng: coords.lng,
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
      sessionStorage.setItem("places", JSON.stringify(places)); // Store the places in session storage
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error searching for places", error);
    } finally {
      setLoading(false);
      resetState(); // Reset the state after fetching the data
      navigate("/matchup"); // Navigate to the /matchup route after fetching the data
    }
  };

  const handleLocationClick = async (e) => {
    e.preventDefault();

    try {
      const pos = await getBrowserLocation(); // Get the current location of the user
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
      setIsUsingCurrentLocation(true); // Indicate that the current location is being used
    } catch (error) {
      console.error("Location error: ", error);
      setIsUsingCurrentLocation(false); // Reset if there's an error
    }
  };

  const handleSuggestSelect = (suggest) => {
    if (suggest) {
      const { location } = suggest; // Taking location from the suggest object
      const { lat, lng } = location; // Taking latitude and longitude from the suggest object
      setCoords({ lat: lat, lng: lng }); // Set the coordinates in the state
      setShowSuggestions(false); // hide suggestions
      if (geosuggestRef.current) {
        geosuggestRef.current.blur(); // Remove focus from the input
      }
      setIsUsingCurrentLocation(false); // Reset the current location flag
    } else {
      console.error("No location selected");
    }
  };
  const handleGeoInputFocus = () => {
    setShowSuggestions(true); // Show suggestions when input is focused
  };
  return (
    <section className={styles.searchFormContainer}>
      {loading ? (
        <div className={styles.loaderContainer}>
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
                className={`${styles.locationButton} ${
                  isUsingCurrentLocation ? styles.activeLocationButton : ""
                }`}
                onClick={handleLocationClick}
              >
                Use current location
              </button>

              {mapsLoaded ? (
                <Geosuggest
                  ref={geosuggestRef}
                  className={styles.geosuggest}
                  placeholder="Start typing an address..."
                  onFocus={handleGeoInputFocus}
                  autoActivateFirstSuggest={false}
                  suggestsHiddenClassName={styles.hiddenSuggestions}
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
