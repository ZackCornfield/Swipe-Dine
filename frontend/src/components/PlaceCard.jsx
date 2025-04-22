import { useState } from "react";
import styles from "./PlaceCard.module.css";
import PlaceDetails from "./PlaceDetails"; // Import the details component
import { convertPriceLevel } from "../Helper/placeFunc"; // Import the utility function

const PlaceCard = ({ place }) => {
    const [showDetails, setShowDetails] = useState(false); // State to toggle details

    // Construct the photo URL using the new API format
    const photoUrl = place.photos?.[0]?.name
        ? `https://places.googleapis.com/v1/${
              place.photos[0].name
          }/media?maxWidthPx=400&key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }`
        : "https://via.placeholder.com/400"; // Fallback image if no photo is available

    const displayName = place.displayName?.text || "Unknown Place";

    const handleCardClick = () => {
        setShowDetails(true); // Show the details component
    };

    const handleCloseDetails = () => {
        setShowDetails(false); // Hide the details component
    };

    return (
        <>
            <section
                className={styles.placeCardContainer}
                onClick={handleCardClick} // Make the card clickable
            >
                <div className={styles.placeCard}>
                    <img
                        className={styles.placeCardImage}
                        src={photoUrl}
                        alt={displayName}
                    />
                </div>
                <div className={styles.placeCardContent}>
                    <h2 className={styles.placeCardTitle}>{displayName}</h2>
                    <p className={styles.placeCardDescription}>
                        {place.formattedAddress}
                    </p>
                    <p className={styles.placeCardRating}>
                        Rating: {place.rating}
                    </p>
                    <p className={styles.placeCardPriceLevel}>
                        Price Level: {convertPriceLevel(place.priceLevel)}
                    </p>
                </div>
            </section>

            {/* Render the details component if showDetails is true */}
            {showDetails && (
                <PlaceDetails place={place} onClose={handleCloseDetails} />
            )}
        </>
    );
};

export default PlaceCard;
