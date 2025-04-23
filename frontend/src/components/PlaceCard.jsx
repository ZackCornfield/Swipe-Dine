import styles from "./PlaceCard.module.css";
import PlaceDetails from "./PlaceDetails"; // Import the details component
import { convertPriceLevel } from "../Helper/placeFunc"; // Import the utility function
import StarRating from "./StarRating";
import { useEffect, useState } from "react";

const PlaceCard = ({ place }) => {
    const [showDetails, setShowDetails] = useState(false); // Toggle for showing details
    const [placeDetails, setPlaceDetails] = useState(null); // Store place details
    const [photoUrl, setPhotoUrl] = useState(""); // Store photo URL
    const [displayName, setDisplayName] = useState("Unknown Place"); // Store display name

    const handleCardClick = () => setShowDetails(true); // Show details on card click
    const handleCloseDetails = () => setShowDetails(false); // Hide details on close

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/google-maps/placeDetails/${place.id}`
                );
                const data = await response.json();

                setPlaceDetails(data); // Set fetched place details

                // Construct photo URL or fallback to placeholder
                const photo = data.photos?.[0]?.name
                    ? `https://places.googleapis.com/v1/${
                          data.photos[0].name
                      }/media?maxWidthPx=400&key=${
                          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                      }`
                    : "https://via.placeholder.com/400";

                setPhotoUrl(photo); // Update photo URL
                setDisplayName(data.displayName?.text || "Unknown Place"); // Update display name
            } catch (error) {
                console.error("Error fetching place details:", error);
            }
        };

        fetchPlaceDetails();
    }, [place.id]); // Re-run effect if place.id changes

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
                    {placeDetails && ( // Ensure placeDetails is not null before rendering
                        <>
                            <p className={styles.placeCardDescription}>
                                {placeDetails.formattedAddress}
                            </p>
                            {placeDetails.rating && (
                                <StarRating rating={placeDetails.rating} />
                            )}
                            <p className={styles.placeCardPriceLevel}>
                                Price Level:{" "}
                                {convertPriceLevel(placeDetails.priceLevel)}
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* Render the details component if showDetails is true */}
            {showDetails && placeDetails && (
                <PlaceDetails
                    place={placeDetails}
                    onClose={handleCloseDetails}
                />
            )}
        </>
    );
};

export default PlaceCard;
