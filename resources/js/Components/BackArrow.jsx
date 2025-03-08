import { Link } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa";

const BackArrow = ({
    link,
    params = {},
    text = "Go Back",
    className = "",
    size = 20,
    color = "text-gray-900 dark:text-gray-100",
}) => {
    return (
        <Link
            href={route(link, params)}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${className}`}
        >
            <FaArrowLeft size={size} className={`mr-3 ${color}`} />
            <h6 className="text-gray-800 dark:text-gray-200">{text}</h6>
        </Link>
    );
};

export default BackArrow;
