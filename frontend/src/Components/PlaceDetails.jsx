import { useState, useEffect } from "react";
import styles from "./PlaceDetails.module.css";
import Carousel from "./Carousel";

const PlaceDetails = ({ place, onClose }) => {
    const [photos, setPhotos] = useState(["https://via.placeholder.com/400"]); // Default fallback photo
    const displayName = place.displayName?.text || "Unknown";

    useEffect(() => {
        if (place.photos && place.photos.length > 0) {
            const photoUrls = place.photos.map(
                (element) =>
                    element.name
                        ? `https://places.googleapis.com/v1/${
                              element.name
                          }/media?maxWidthPx=400&key=${
                              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                          }`
                        : "https://via.placeholder.com/400" // Fallback image if no photo is available
            );
            setPhotos(photoUrls); // Set the photos state with the generated URLs
        }
    }, [place.photos]); // Dependency array ensures this runs only when place.photos changes

    return (
        <section className={styles.placeDetailsContainer}>
            <div className={styles.placeDetailsHeader}>
                <h2>{displayName}</h2>
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
            </div>
            <div>
                <Carousel photos={photos}></Carousel>
            </div>
            <div className={styles.placeDetailsContent}>
                <p>{place.formattedAddress}</p>
                <p>{place.rating}</p>
                <p>{place.priceLevel}</p>
                <a
                    href={place.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on Google Maps
                </a>
                <a
                    href={place.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
                <p>{place.dineIn ? "Dine In Available" : "No Dine In"}</p>
                <p>{place.delivery ? "Delivery Available" : "No Delivery"}</p>
                <p>{place.takeout ? "Takeout Available" : "No Takeout"}</p>
                <p>{place.reservable ? "Reservable" : "Not Reservable"}</p>
            </div>
        </section>
    );
};

export default PlaceDetails;
