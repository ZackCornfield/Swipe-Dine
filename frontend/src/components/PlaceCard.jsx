import styles from "./PlaceCard.module.css";
import { convertPriceLevel } from "../Helper/placeFunc";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";

const PlaceCard = ({ place, onClick }) => {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [displayName, setDisplayName] = useState("Unknown Place");

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

        const photo = data.photos?.[0]?.name
          ? `https://places.googleapis.com/v1/${
              data.photos[0].name
            }/media?maxWidthPx=400&key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }`
          : "https://via.placeholder.com/400";

        setPhotoUrl(photo);
        setDisplayName(data.displayName?.text || "Unknown Place");
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [place.id]);

  return (
    <section className={styles.placeCardContainer} onClick={onClick}>
      <div className={styles.placeCard}>
        <img
          className={styles.placeCardImage}
          src={photoUrl}
          alt={displayName}
        />
      </div>
      <div className={styles.placeCardContent}>
        <h2 className={styles.placeCardTitle}>{displayName}</h2>
        <div>
          {placeDetails && (
            <>
              <p className={styles.placeCardDescription}>
                {placeDetails.formattedAddress}
              </p>
              {placeDetails.rating && (
                <StarRating rating={placeDetails.rating} />
              )}
              <p className={styles.placeCardPriceLevel}>
                Price Level: {convertPriceLevel(placeDetails.priceLevel)}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlaceCard;
