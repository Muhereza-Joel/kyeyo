import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePermission } from "@/Hooks/usePermissions";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FilterForm from "@/Components/FilterForm";
import ViewToggle from "@/Components/ViewToggle";
import PrimaryButton from "@/Components/PrimaryButton";
import NoDataSVG from "@/Components/NoDataSVG";
import Dropdown from "@/Components/Dropdown";
import Pagination from "@/Components/Pagination";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Applications({ auth, permissions, applications }) {
    const { can } = usePermission(permissions);
    const { data, setData } = useForm({});
    const [viewMode, setViewMode] = useState("grid");

    // Initialize filters on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const filters = {};
        filters.status = urlParams.get("status");
        filters.time = urlParams.get("time");
        setData(filters);
        setViewMode(urlParams.get("display") || "grid");
    }, [setData]);

    const filtersConfig = [
        {
            name: "status",
            placeholder: "",
            type: "select",
            options: ["pending", "reviewed", "accepted", "rejected"],
            defaultValue: "pending",
        },
        {
            name: "time",
            placeholder: "",
            type: "select",
            options: [
                "all",
                "To Day",
                "This Week",
                "This Month",
                "Last Three Months",
            ],
            defaultValue: "all",
        },
    ];

    const renderTableView = () => (
        <div className="overflow-x-auto mx-2 min-h-screen">
            {applications && applications.data.length === 0 ? (
                <NoDataSVG showBottonText={false} />
            ) : (
                <table className="w-full mt-4 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700">
                    <thead>
                        <tr className="text-gray-800 dark:text-gray-100">
                            <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                SNo
                            </th>
                            <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                Applicant
                            </th>

                            <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                Position
                            </th>

                            <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                Application Status
                            </th>
                            <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                Created On
                            </th>
                            <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.data.map((application, index) => (
                            <tr
                                key={application.id}
                                className={`text-gray-800 dark:text-gray-100 ${
                                    index % 2 === 0
                                        ? "bg-white dark:bg-gray-900"
                                        : "bg-blue-gray-50/50 dark:bg-gray-800"
                                }`}
                            >
                                <td className="p-2 border-b dark:border-gray-700">
                                    {index + 1}
                                </td>
                                <td className="p-2 border-b dark:border-gray-700">
                                    {application.user.name}
                                </td>

                                <td className="p-2 border-b dark:border-gray-700">
                                    {application.job.title}
                                </td>

                                <td className="p-2 border-b dark:border-gray-700">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                            application.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                                                : application.status ===
                                                  "reviewed"
                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                                : application.status ===
                                                  "accepted"
                                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                                : application.status ===
                                                  "rejected"
                                                ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                                                : ""
                                        }`}
                                    >
                                        {application.status}
                                    </span>
                                </td>

                                <td className="p-2 border-b dark:border-gray-700">
                                    {application.applied_at &&
                                        new Date(application.applied_at)
                                            .toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                            })
                                            .replace(",", "")}{" "}
                                    {/* Format as "Feb 13th, 2024 at 1:46 PM" */}
                                </td>

                                <td className="p-2 border-b dark:border-gray-700">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                            >
                                                Select Action
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {can("View Applications") && (
                                                <Dropdown.Link
                                                    href={route(
                                                        "applications.show",
                                                        application.id
                                                    )}
                                                >
                                                    View Applications Details
                                                </Dropdown.Link>
                                            )}
                                        </Dropdown.Content>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    const renderGridView = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
            {applications && applications.data.length === 0 ? (
                <NoDataSVG showBottonText={false} />
            ) : (
                applications.data.map((application) => (
                    <div
                        key={application.id}
                        className="relative bg-neutral dark:bg-gray-900 p-6 rounded-lg transform transition duration-300 hover:scale-105"
                    >
                        {/* Status Tag - Top Left Clip */}
                        <span
                            className={`absolute top-0 left-0 px-3 py-1 rounded-br-lg text-sm font-semibold shadow-md ${
                                application.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                                    : application.status === "reviewed"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                    : application.status === "accepted"
                                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                    : application.status === "rejected"
                                    ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                                    : ""
                            }`}
                        >
                            {application.status}
                        </span>

                        <h3 className="font-semibold text-md text-gray-900 dark:text-gray-100 mt-5">
                            Applicant: {application.user.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            Email: {application.user.email}
                        </p>

                        <h3 className="font-semibold text-md my-2 text-gray-900 dark:text-gray-100 line-clamp-1">
                            Position: {application.job.title}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Created On:{" "}
                            {application.applied_at &&
                                new Date(application.applied_at)
                                    .toLocaleString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })
                                    .replace(",", "")}
                        </p>

                        <Link
                            href={route("applications.show", application.id)}
                            className="w-full items-center px-4 py-2 mt-4 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            View Details
                        </Link>
                    </div>
                ))
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap items-center gap-4">
                        <FilterForm
                            filtersConfig={filtersConfig}
                            className="mr-10"
                            url="applications.index"
                            display={viewMode}
                            filters={data} // Pass current filter state to the form
                        />
                        <ViewToggle
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            className="mr-8"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Applications" />
            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-x-hidden shadow-sm sm:rounded-lg m-2 p-2 px-0">
                    {viewMode === "table"
                        ? renderTableView()
                        : renderGridView()}
                </div>

                <div>
                    <Pagination links={applications.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
