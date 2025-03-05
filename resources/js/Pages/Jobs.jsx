import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowRight, FaPen, FaPenAlt, FaTag } from "react-icons/fa"; // Arrow icon
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import defaultLogo from "../../assets/default-logo.png";
import { toast, ToastContainer } from "react-toastify"; // React toastify
import Pagination from "@/Components/Pagination";
import FilterForm from "@/Components/FilterForm";
import SearchBar from "@/Components/SearchBar";

export default function Jobs({
    auth,
    permissions,
    jobs,
    tags,
    currentTag,
    seniorities,
    industries,
    professions,
}) {
    const { can } = usePermission(permissions);
    const { data, setData } = useForm({});

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const filters = {};
        filters.published = urlParams.get("published");
        filters.profession = urlParams.get("profession");
        filters.industry = urlParams.get("industry");
        filters.seniority = urlParams.get("seniority");
        setData(filters);
    }, [setData]);

    const filtersConfig = [
        {
            name: "published",
            type: "select",
            options: [
                "Published",
                "Last 1 Week",
                "Last 30 Days",
                "Latest 24 Hours",
            ],
            defaultValue: "Published",
        },
        {
            name: "profession",
            type: "select",
            options: ["Profession", ...professions],
            defaultValue: "Profession",
        },

        {
            name: "industry",
            type: "select",
            options: ["Industry", ...industries],
            defaultValue: "Industry",
        },

        {
            name: "seniority",
            type: "select",
            options: ["Seniority", ...seniorities], // Use the array directly
            defaultValue: "Seniority",
        },
    ];

    const [jobStates, setJobStates] = useState(
        jobs.data.reduce((acc, job) => {
            acc[job.id] = job.active;
            return acc;
        }, {})
    );

    // Ensure CSRF token is included in Axios requests
    axios.defaults.headers.common["X-CSRF-TOKEN"] = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    // Format the date as "4th, October 2024 at 3:00 PM"
    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        const d = new Date(date);
        return d.toLocaleString("en-GB", options);
    };

    // Toggle active status and update the backend
    const toggleActiveStatus = async (id) => {
        const updatedStatus = !jobStates[id];

        console.log(`Toggling job ${id} to ${updatedStatus}`); // Debugging

        try {
            await axios.patch(route("jobs.toggle", id), {
                active: updatedStatus,
            });

            setJobStates((prevState) => ({
                ...prevState,
                [id]: updatedStatus,
            }));

            toast.success(
                `Job ${
                    updatedStatus
                        ? "application enabled"
                        : "application disabled"
                }!`
            );
        } catch (error) {
            console.error("Error updating job status:", error);
            toast.error("Failed to update job status.");
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex flex-wrap justify-between items-center w-full gap-4">
                    <div className="flex flex-wrap items-center space-x-4 w-full max-w-3xl">
                        <div className="w-full max-w-lg flex-grow">
                            {/* Expands the search bar */}
                            <SearchBar />
                        </div>
                        {currentTag && (
                            <div className="ml-4 mt-2 flex items-center space-x-2">
                                <FaTag className="text-gray-100 dark:text-blue-400" />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Tagged:
                                </span>
                                <h3 className="text-sm font-semibold text-gray-100 dark:text-blue-400 line-clamp-1">
                                    {currentTag.name.en}
                                </h3>
                            </div>
                        )}
                    </div>

                    {can("Create Job") && (
                        <Link
                            href={route("jobs.create")}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Add New Job
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Jobs" />

            <div className="pb-2">
                <div className="max-w-12xl mx-auto mb-3  bg-gray-900 dark:bg-gray-900 py-3 sm:px-2 lg:px-8 flex flex-col md:flex-row gap-2 ">
                    <div className="flex flex-wrap justify-start px-4 sm:px-10 md:px-20 lg:px-28 items-start w-full">
                        <FilterForm
                            filtersConfig={filtersConfig}
                            className="mr-4 flex-grow"
                            url="jobs.index"
                            filters={data} // Pass current filter state to the form
                        />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-2 lg:px-8 flex flex-col md:flex-row gap-2">
                    {/* Jobs List */}
                    <div className="w-full md:w-3/4">
                        <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-lg sm:rounded-lg">
                            <div className="p-2 text-gray-900 dark:text-gray-100">
                                <div className="grid grid-cols-1 gap-4 mt-1">
                                    {jobs.data.map((job) => (
                                        <div
                                            key={job.id}
                                            className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-2 flex gap-4 items-center"
                                        >
                                            {/* Left Section - Company Logo */}
                                            <div className="w-32 h-32 flex-shrink-0">
                                                <img
                                                    src={
                                                        job.logo || defaultLogo
                                                    } // Fallback to default logo if not available
                                                    alt={`${job.title} logo`}
                                                    className="w-full h-full object-cover rounded-sm border"
                                                />
                                            </div>

                                            {/* Right Section - Job Details */}
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-200 truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full">
                                                    {job.title}
                                                </h4>

                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                    Posted On:{" "}
                                                    {formatDate(job.created_at)}
                                                </p>

                                                {/* Job-Specific Tags */}
                                                {Array.isArray(job.tags) &&
                                                    job.tags.length > 0 && (
                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                            Tags:{" "}
                                                            {job.tags.map(
                                                                (
                                                                    tag,
                                                                    index
                                                                ) => (
                                                                    <Link
                                                                        key={
                                                                            index
                                                                        }
                                                                        href={route(
                                                                            "jobs-tagged",
                                                                            tag
                                                                                .slug
                                                                                .en
                                                                        )}
                                                                        className="text-xs bg-blue-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md"
                                                                    >
                                                                        {
                                                                            tag
                                                                                .name
                                                                                .en
                                                                        }
                                                                    </Link>
                                                                )
                                                            )}
                                                        </div>
                                                    )}

                                                <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                                                    {/* Action Links (Edit & View) */}
                                                    <div className="flex items-center space-x-4">
                                                        {can("Update Job") && (
                                                            <Link
                                                                href={route(
                                                                    "jobs.edit",
                                                                    job.id
                                                                )}
                                                                className="inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300 transition"
                                                            >
                                                                <FaPenAlt className="mr-2" />
                                                                <span className="hidden sm:inline">
                                                                    Edit
                                                                </span>
                                                            </Link>
                                                        )}

                                                        {can("View Jobs") && (
                                                            <Link
                                                                href={route(
                                                                    "jobs.show",
                                                                    job.id
                                                                )}
                                                                className="inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300 transition"
                                                            >
                                                                <span className="hidden sm:inline">
                                                                    Read More
                                                                </span>
                                                                <FaArrowRight className="ml-2" />
                                                            </Link>
                                                        )}
                                                    </div>

                                                    {/* Toggle Applications Switch */}
                                                    {can("Create Job") &&
                                                        job.creator ===
                                                            auth.user.id && (
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                                    Applications{" "}
                                                                    <span className="font-semibold">
                                                                        {job.active ===
                                                                        1
                                                                            ? "Enabled"
                                                                            : "Disabled"}
                                                                    </span>
                                                                </span>

                                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                                    <label className="switch">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                jobStates[
                                                                                    job
                                                                                        .id
                                                                                ]
                                                                            }
                                                                            onChange={() =>
                                                                                toggleActiveStatus(
                                                                                    job.id
                                                                                )
                                                                            }
                                                                        />
                                                                        <span className="slider round"></span>
                                                                    </label>
                                                                </label>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* General Tags Section */}
                    <div className="w-full md:w-1/4 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            Popular Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    href={route("jobs-tagged", tag.slug.en)} // Pass the correct slug
                                    className="flex items-center space-x-2 text-xs bg-gray-200 dark:bg-gray-300 text-gray-800 dark:text-gray-900 px-2 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-300"
                                >
                                    <span>{tag.name.en}</span>

                                    {/* Job Count Badge */}
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                            tag.jobs_count === 0
                                                ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                                                : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                        }`}
                                    >
                                        {tag.jobs_count === 0
                                            ? "No Jobs"
                                            : `${tag.jobs_count} job${
                                                  tag.jobs_count > 1 ? "s" : ""
                                              }`}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <Pagination links={jobs.links} />
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <style jsx>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 20px;
                    z-index: 0;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 50px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 12px;
                    width: 12px;
                    border-radius: 50px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.4s;
                }

                input:checked + .slider {
                    background-color: #4caf50;
                }

                input:checked + .slider:before {
                    transform: translateX(22px);
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
