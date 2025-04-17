import { useEffect, useState } from "react";

export default function useGoogleMaps() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (
            typeof window.google === "object" &&
            typeof window.google.maps === "object"
        ) {
            setLoaded(true); // Already loaded
            return;
        }

        const existingScript = document.getElementById("googleMaps");

        if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }&libraries=places`;
            script.id = "googleMaps";
            script.async = true;
            script.defer = true;

            script.onload = () => setLoaded(true);
            document.body.appendChild(script);
        } else {
            existingScript.addEventListener("load", () => setLoaded(true));
        }
    }, []);

    return loaded;
}
