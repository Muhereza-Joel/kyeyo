import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react"; // Import usePage for existing query params

export default function FilterForm({
    filtersConfig,
    className = "",
    url = "",
    display,
    filters = {}, // Receive initial filters from parent
}) {
    const { url: currentUrl } = usePage(); // Get the current URL
    const currentParams = new URLSearchParams(
        new URL(currentUrl, window.location.origin).search
    );

    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters); // Sync local state when filters change
    }, [filters]);

    const handleChange = (e, name) => {
        const { value, checked, type } = e.target;

        setLocalFilters((prevFilters) => {
            if (type === "checkbox") {
                return {
                    ...prevFilters,
                    [name]: checked
                        ? [...(prevFilters[name] || []), value]
                        : prevFilters[name].filter((v) => v !== value),
                };
            }
            return { display, ...prevFilters, [name]: value };
        });
    };

    const generateFilteredUrl = () => {
        const params = new URLSearchParams(currentParams); // Preserve existing params

        Object.entries(localFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                params.delete(key); // Remove existing key before adding new ones
                value.forEach((v) => params.append(key, v)); // Append array values
            } else if (value) {
                params.set(key, value);
            } else {
                params.delete(key); // Remove empty filters
            }
        });

        return `${window.location.pathname}?${params.toString()}`;
    };

    return (
        <div className={`flex flex-wrap items-start gap-2 ${className}`}>
            {filtersConfig.map(
                ({ name, placeholder, type = "text", options }) => (
                    <div
                        key={name}
                        className="flex flex-col sm:flex-row items-start flex-grow"
                    >
                        <label className="font-semibold mx-2 text-gray-100 dark:text-gray-100">
                            {placeholder}
                        </label>
                        {type === "select" ? (
                            <select
                                name={name}
                                value={localFilters[name] || "all"} // Default value
                                onChange={(e) => handleChange(e, name)}
                                className="py-2 border rounded dark:bg-gray-800 dark:text-gray-200 flex-grow"
                            >
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : type === "checkbox" ? (
                            <div className="flex flex-wrap gap-2">
                                {options.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center space-x-1"
                                    >
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={
                                                localFilters[name]?.includes(
                                                    option
                                                ) || false
                                            }
                                            onChange={(e) =>
                                                handleChange(e, name)
                                            }
                                            className="mr-1"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={localFilters[name] || ""}
                                onChange={(e) => handleChange(e, name)}
                                placeholder={placeholder}
                                className="py-1 px-5 border rounded flex-grow"
                            />
                        )}
                    </div>
                )
            )}

            <Link
                href={generateFilteredUrl()} // Generate URL with preserved params
                className="py-2 px-5 bg-blue-500 text-white rounded"
            >
                Filter
            </Link>
        </div>
    );
}
