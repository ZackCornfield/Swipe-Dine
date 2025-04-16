function getBrowserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported."));
        } else {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(pos),
                () => reject(new Error("Failed to retrieve location."))
            );
        }
    });
}

export default getBrowserLocation;
