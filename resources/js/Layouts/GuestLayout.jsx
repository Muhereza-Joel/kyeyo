import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-neutral dark:bg-gray-900">
            <div className="w-full sm:max-w-sm mt-6 p-0 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
