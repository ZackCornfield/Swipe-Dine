import {
    FaUtensils,
    FaMotorcycle,
    FaBox,
    FaCalendarCheck,
} from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import styles from "./AmenityIcons.module.css";

const AmenityIcon = ({ available, type }) => {
    const icons = {
        dineIn: <FaUtensils />,
        delivery: <FaMotorcycle />,
        takeout: <FaBox />,
        reservable: <FaCalendarCheck />,
    };

    const labels = {
        dineIn: "Dine In",
        delivery: "Delivery",
        takeout: "Takeout",
        reservable: "Reservable",
    };

    return (
        <div
            className={`${styles.amenity} ${
                available ? styles.available : styles.unavailable
            }`}
        >
            <div className={styles.icon}>
                {available ? icons[type] : <MdOutlineClose />}
            </div>
            <span className={styles.label}>{labels[type]}</span>
            <span className={styles.status}>{available ? "Yes" : "No"}</span>
        </div>
    );
};

export default AmenityIcon;
