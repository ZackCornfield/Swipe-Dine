import styles from "./StarRating.module.css";

const StarRating = ({ rating }) => {
    const maxStars = 5;

    return (
        <div className={styles.starRating}>
            {[...Array(maxStars)].map((_, i) => {
                const starValue = i + 1;
                let fillPercentage;

                if (rating >= starValue) {
                    fillPercentage = 100; // Full star
                } else if (rating >= starValue - 0.5) {
                    fillPercentage = 50; // Half star
                } else {
                    fillPercentage = 0; // Empty star
                }

                return (
                    <svg key={i} className={styles.starSvg} viewBox="0 0 24 24">
                        <defs>
                            <linearGradient
                                id={`gradient-${i}`}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop
                                    offset={`${fillPercentage}%`}
                                    stopColor="#FFD700"
                                />
                                <stop
                                    offset={`${fillPercentage}%`}
                                    stopColor="#CCCCCC"
                                />
                            </linearGradient>
                        </defs>
                        <path
                            fill={`url(#gradient-${i})`}
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                    </svg>
                );
            })}
            <span className={styles.ratingText}>({rating.toFixed(1)})</span>
        </div>
    );
};
export default StarRating;
