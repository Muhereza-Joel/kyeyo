import React from "react";
import { router, usePage } from "@inertiajs/react";

const Pagination = ({ links }) => {
    const { url } = usePage();
    const currentParams = new URLSearchParams(
        new URL(url, window.location.origin).search
    );

    const handlePagination = (linkUrl) => {
        if (!linkUrl) return;

        const newUrl = new URL(linkUrl, window.location.origin);
        currentParams.set("page", newUrl.searchParams.get("page"));

        router.get(`${window.location.pathname}?${currentParams.toString()}`);
    };

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center space-x-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <button
                            className={`px-2 py-1 rounded-lg
                                ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                } 
                                dark:hover:bg-gray-600 hover:bg-gray-300 transition-all`}
                            onClick={() => handlePagination(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
