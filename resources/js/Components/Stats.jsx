import {
    FaUsers,
    FaClipboardList,
    FaBookOpen,
    FaWarehouse,
} from "react-icons/fa";

export default function Stats({ users, jobs, applications, companies }) {
    const stats = [
        {
            title: "Users",
            value: users,
            icon: (
                <FaUsers className="text-purple-500 text-6xl bg-neutral rounded-full p-2 border-2 border-sky-300" />
            ),
        },
        {
            title: "Opportunities",
            value: jobs,
            icon: (
                <FaClipboardList className="text-red-500 text-6xl bg-neutral rounded-full p-2 border-2 border-sky-300" />
            ),
        },
        {
            title: "Applications",
            value: applications,
            icon: (
                <FaBookOpen className="text-orange-500 text-6xl bg-neutral rounded-full p-2 border-2 border-sky-300" />
            ),
        },
        {
            title: "Companies",
            value: companies,
            icon: (
                <FaWarehouse className="text-green-500 text-6xl bg-neutral rounded-full p-2 border-2 border-sky-300" />
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex items-center"
                >
                    <div className="mr-4">{stat.icon}</div>
                    <div>
                        <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
                            {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {stat.value || 0}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
