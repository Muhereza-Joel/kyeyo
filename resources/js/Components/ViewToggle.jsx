import { FaThList, FaTh } from "react-icons/fa";
import { router, usePage } from "@inertiajs/react";

export default function ViewToggle({ viewMode, className = "" }) {
    const { url } = usePage(); // Get the current URL
    const currentParams = new URLSearchParams(
        new URL(url, window.location.origin).search
    );

    const updateViewMode = (mode) => {
        currentParams.set("display", mode); // Update only the viewMode parameter

        router.get(
            `${window.location.pathname}?${currentParams.toString()}`,
            {},
            { preserveScroll: true }
        );
    };

    return (
        <div className={`flex space-x-2 ${className}`}>
            <button
                onClick={() => updateViewMode("table")}
                className={`p-2 rounded-md ${
                    viewMode === "table"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
                <FaThList size={14} className="text-xl" />
            </button>
            <button
                onClick={() => updateViewMode("grid")}
                className={`p-2 rounded-md ${
                    viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
                <FaTh size={14} className="text-xl" />
            </button>
        </div>
    );
}
