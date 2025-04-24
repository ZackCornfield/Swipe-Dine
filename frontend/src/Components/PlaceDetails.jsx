import { useState, useEffect } from "react";
import styles from "./PlaceDetails.module.css";
import Carousel from "./Carousel";
import StarRating from "./StarRating";
import { convertPriceLevel } from "../Helper/placeFunc";
import AmenityIcon from "./AmenityIcon";

const PlaceDetails = ({ place, onClose }) => {
  const [photos, setPhotos] = useState(["https://via.placeholder.com/400"]);
  const displayName = place.displayName?.text || "Unknown";
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/google-maps/placeDetails/${
            place.id
          }`
        );
        const data = await response.json();

        setPlaceDetails(data);

        // Move photo processing here after data is set
        if (data.photos && data.photos.length > 0) {
          const photoUrls = data.photos.map((element) =>
            element.name
              ? `https://places.googleapis.com/v1/${
                  element.name
                }/media?maxWidthPx=400&key=${
                  import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                }`
              : "https://via.placeholder.com/400"
          );
          setPhotos(photoUrls);
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [place.id]); // Changed dependency to place.id to prevent unnecessary re-renders

  return (
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.placeDetailsContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.placeDetailsHeader}>
          <h2>{displayName}</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          ></button>
        </div>

        {!placeDetails ? (
          <div>Loading details...</div>
        ) : (
          <>
            <div>
              <Carousel photos={photos}></Carousel>
            </div>
            <div className={styles.amenitiesGrid}>
              <AmenityIcon available={placeDetails.dineIn} type="dineIn" />
              <AmenityIcon available={placeDetails.delivery} type="delivery" />
              <AmenityIcon available={placeDetails.takeout} type="takeout" />
              <AmenityIcon
                available={placeDetails.reservable}
                type="reservable"
              />
            </div>
            <div className={styles.placeDetailsContent}>
              <p>{placeDetails.formattedAddress}</p>
              {placeDetails.rating && (
                <StarRating rating={placeDetails.rating} />
              )}
              <p>Price Level: {convertPriceLevel(placeDetails.priceLevel)}</p>
              <a
                className={styles.link}
                href={placeDetails.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
              {placeDetails.websiteUri && (
                <a
                  className={styles.link}
                  href={placeDetails.websiteUri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default PlaceDetails;
