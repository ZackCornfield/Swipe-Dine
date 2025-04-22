export function convertPriceLevel(priceLevel) {
    switch (priceLevel) {
        case "PRICE_LEVEL_UNSPECIFIED":
            return "Price not specified";
        case "PRICE_LEVEL_FREE":
            return "Free";
        case "PRICE_LEVEL_INEXPENSIVE":
            return "Inexpensive";
        case "PRICE_LEVEL_MODERATE":
            return "Moderate";
        case "PRICE_LEVEL_EXPENSIVE":
            return "Expensive";
        case "PRICE_LEVEL_VERY_EXPENSIVE":
            return "Very expensive";
        default:
            return "Unknown price level";
    }
}
