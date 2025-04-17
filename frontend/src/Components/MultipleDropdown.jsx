import { useState, useEffect } from "react";

const formatLabel = (str, rejects = []) => {
    let label = str;
    // Remove unwanted suffixes
    rejects.forEach((rej) => {
        if (label.endsWith(`_${rej}`)) {
            label = label.replace(`_${rej}`, "");
        }
    });
    // Clean formatting (e.g. snake_case => Title Case)
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
        <div>
            <label
                style={{
                    cursor: "pointer",
                    marginRight: "10px",
                    color: selected.length === options.length ? "green" : "blue",
                    textDecoration: "underline",
                }}
            >
                <input
                    type="checkbox"
                    value="all"
                    checked={selected.length === options.length}
                    onChange={() => toggleOption("all")}
                    style={{ display: "none" }}
                />
                All
            </label>
            {options.map((option) => (
                <label
                    key={option}
                    style={{
                        cursor: "pointer",
                        marginRight: "10px",
                        color: selected.includes(option) ? "green" : "blue",
                        textDecoration: "underline",
                    }}
                >
                    <input
                        type="checkbox"
                        value={option}
                        checked={selected.includes(option)}
                        onChange={() => toggleOption(option)}
                        style={{ display: "none" }}
                    />
                    {formatLabel(option, rejects)}
                </label>
            ))}
        </div>
    );
};

export default MultiSelectCheckboxes;
