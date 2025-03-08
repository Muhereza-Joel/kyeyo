import { useState } from "react";
import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import defaultLogo from "../../assets/default-logo.png";
import {
    FaBriefcase,
    FaIndustry,
    FaUserTie,
    FaCheckCircle,
    FaTimesCircle,
    FaUser,
    FaArrowCircleLeft,
    FaArrowCircleRight,
} from "react-icons/fa";
import BackArrow from "@/Components/BackArrow";

export default function JobDetails({
    auth,
    success,
    error,
    permissions,
    job,
    logo,
    cover_image,
    avator,
}) {
    const { can } = usePermission(permissions);
    const [activeTab, setActiveTab] = useState("job"); // Default to job description

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
            header={
                <div className="flex items-center space-x-2">
                    <BackArrow link={"jobs.index"} />
                </div>
            }
        >
            <Head title="Job Details" />

            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Display Success & Error Messages */}
                {success && <AlertSuccess success={success} />}
                {error && <AlertError error={error} />}

                {/* Job Details Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                    <div className="flex items-center mb-4 space-x-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border dark:border-gray-600">
                        {/* Company Logo */}
                        <div className="w-32 h-32 flex-shrink-0">
                            <img
                                src={logo || defaultLogo} // Fallback to default logo if not available
                                alt={`${
                                    job.companyProfile?.title || "Company"
                                } logo`}
                                className="w-full h-full object-cover rounded-md border shadow-sm"
                            />
                        </div>

                        {/* Company Details */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                                {job.company_profile?.name || "N/A"}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Location:</strong>{" "}
                                {`${job.company_profile?.city || "N/A"}, ${
                                    job.company_profile?.country || "N/A"
                                }`}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Website:</strong>{" "}
                                {job.company_profile?.website ? (
                                    <a
                                        href={job.company_profile.website}
                                        className="text-blue-500 underline"
                                        target="_blank"
                                    >
                                        {job.company_profile.website}
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </p>

                            {can("View Jobs") && job.active && (
                                <Link
                                    href={route("create-application", job.id)}
                                    className="inline-flex items-center px-4 py-2 mt-4 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    Apply
                                    <FaArrowCircleRight
                                        size={20}
                                        className="ml-3"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        {job.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <FaUserTie className="text-blue-500" size={18} />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                <strong>Profession:</strong>{" "}
                                {job.profession?.name || "N/A"}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaIndustry className="text-green-500" size={18} />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                <strong>Industry:</strong>{" "}
                                {job.industry?.name || "N/A"}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaBriefcase
                                className="text-purple-500"
                                size={18}
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                <strong>Seniority:</strong>{" "}
                                {job.seniority?.name || "N/A"}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            {job.active ? (
                                <FaCheckCircle
                                    className="text-green-500"
                                    size={18}
                                />
                            ) : (
                                <FaTimesCircle
                                    className="text-red-500"
                                    size={18}
                                />
                            )}
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`inline-block px-3 py-1 rounded-lg ${
                                        job.active
                                            ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300"
                                            : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300"
                                    }`}
                                >
                                    {job.active
                                        ? "Applications Open"
                                        : "Applications Closed"}
                                </span>
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <FaUser className="text-yellow-500" size={18} />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                <strong>Posted By:</strong>{" "}
                                {job.creator?.name || "Unknown"}
                            </span>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="mt-6 border-b border-gray-200 dark:border-gray-600">
                        <nav className="flex space-x-6">
                            <button
                                className={`py-2 px-4 font-semibold ${
                                    activeTab === "job"
                                        ? "border-b-2 border-blue-500 dark:text-gray-200"
                                        : "text-gray-600 dark:text-gray-400"
                                }`}
                                onClick={() => setActiveTab("job")}
                            >
                                Job Description
                            </button>
                            <button
                                className={`py-2 px-4 font-semibold ${
                                    activeTab === "company"
                                        ? "border-b-2 border-blue-500 dark:text-gray-200"
                                        : "text-gray-600 dark:text-gray-400"
                                }`}
                                onClick={() => setActiveTab("company")}
                            >
                                Company Details
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {activeTab === "job" ? (
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:text-gray-100 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: job.description,
                                }}
                            />
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-md border dark:border-gray-600">
                                {/* Cover Image */}

                                <div className="relative w-full h-60 mb-3 bg-gray-300 dark:bg-gray-700">
                                    {cover_image && (
                                        <img
                                            src={cover_image}
                                            alt="Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                <div className="px-3 space-y-4 mb-3">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Name:</strong>{" "}
                                        {job.company_profile?.name || "N/A"}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Industry:</strong>{" "}
                                        {job.company_profile?.industry || "N/A"}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Website:</strong>{" "}
                                        {job.company_profile?.website ? (
                                            <a
                                                href={
                                                    job.company_profile.website
                                                }
                                                className="text-blue-500"
                                            >
                                                {job.company_profile.website}
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </p>

                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Founded In:</strong>{" "}
                                        {job.company_profile?.founded_year ||
                                            "N/A"}
                                    </p>

                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Phone Number:</strong>{" "}
                                        {job.company_profile?.phone || "N/A"}
                                    </p>

                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Email Address:</strong>{" "}
                                        {job.company_profile?.email || "N/A"}
                                    </p>

                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Company Size:</strong>{" "}
                                        {`${job.company_profile?.company_size} Employees` ||
                                            "N/A"}
                                    </p>

                                    <div>
                                        <hr />
                                        <h5 className="text-gray-800 dark:text-gray-200">
                                            About Us
                                        </h5>
                                        <div
                                            className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:text-gray-100 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    job.company_profile
                                                        ?.about || "N/A",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
