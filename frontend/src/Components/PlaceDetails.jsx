import { useState, useEffect } from "react";
import styles from "./PlaceDetails.module.css";
import Carousel from "./Carousel";
import StarRating from "./StarRating";
import { convertPriceLevel } from "../Helper/placeFunc";
import AmenityIcon from "./AmenityIcon";

const PlaceDetails = ({ place, onClose }) => {
    const [photos, setPhotos] = useState(["https://via.placeholder.com/400"]);
    const displayName = place.displayName?.text || "Unknown";

    useEffect(() => {
        if (place.photos && place.photos.length > 0) {
            const photoUrls = place.photos.map((element) =>
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

        // Prevent body scrolling when modal is open
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [place.photos]);

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
                <div>
                    <Carousel photos={photos}></Carousel>
                </div>
                <div className={styles.amenitiesGrid}>
                    <AmenityIcon available={place.dineIn} type="dineIn" />
                    <AmenityIcon available={place.delivery} type="delivery" />
                    <AmenityIcon available={place.takeout} type="takeout" />
                    <AmenityIcon
                        available={place.reservable}
                        type="reservable"
                    />
                </div>
                <div className={styles.placeDetailsContent}>
                    <p>{place.formattedAddress}</p>
                    {place.rating && <StarRating rating={place.rating} />}
                    <p>Price Level: {convertPriceLevel(place.priceLevel)}</p>
                    <a
                        className={styles.link}
                        href={place.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Google Maps
                    </a>
                    {place.websiteUri && (
                        <a
                            className={styles.link}
                            href={place.websiteUri}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website
                        </a>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PlaceDetails;
