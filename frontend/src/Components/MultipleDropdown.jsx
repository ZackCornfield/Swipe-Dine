import { useState, useEffect } from "react";
import styles from "./MultipleDropdown.module.css";

const formatLabel = (str, rejects = []) => {
    let label = str;
    rejects.forEach((rej) => {
        if (label.endsWith(`_${rej}`)) {
            label = label.replace(`_${rej}`, "");
        }
    });
    return label
        .replace(/_/g, " ")
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};

const MultiSelectCheckboxes = ({ options = [], onChange, rejects = [] }) => {
    const [selected, setSelected] = useState([]);

    const toggleOption = (value) => {
        if (value === "all") {
            const allSelected = selected.length === options.length;
            const newSelection = allSelected ? [] : [...options];
            setSelected(newSelection);
        } else {
            setSelected((prev) =>
                prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
            );
        }
    };

    useEffect(() => {
        if (onChange) onChange(selected);
    }, [selected, onChange]);

    return (
        <div className={styles.multiSelectContainer}>
            <label
                className={`${styles.multiSelectLabel} ${styles.allOption} ${
                    selected.length === options.length ? styles.selected : ""
                }`}
            >
                <input
                    type="checkbox"
                    value="all"
                    checked={selected.length === options.length}
                    onChange={() => toggleOption("all")}
                />
                Select All
            </label>
            {options.map((option) => (
                <label
                    key={option}
                    className={`${styles.multiSelectLabel} ${
                        selected.includes(option) ? styles.selected : ""
                    }`}
                >
                    <input
                        type="checkbox"
                        value={option}
                        checked={selected.includes(option)}
                        onChange={() => toggleOption(option)}
                    />
                    {formatLabel(option, rejects)}
                </label>
            ))}
        </div>
    );
};

export default MultiSelectCheckboxes;
