import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    FaGlobe,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBuilding,
} from "react-icons/fa";
import NoDataSVG from "@/Components/NoDataSVG";

export default function CompanyProfileDisplay({
    auth,
    profile,
    permissions,
    logo,
    cover_image,
    avator,
}) {
    const { can } = usePermission(permissions);
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
            header={
                <div className="px-48 flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-100 dark:text-gray-200 leading-tight">
                        Company Profile
                    </h2>

                    <div className="flex">
                        {can("Create Company Profile") && !profile && (
                            <Link
                                href={route("company-profile.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                Add Company Profile
                            </Link>
                        )}

                        {can("Update Company Profile") && profile && (
                            <Link
                                href={route("company-profile.edit", profile.id)}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                Update Company Profile
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Company Profile" />
            <div className="py-6 max-w-5xl mx-auto sm:px-6 lg:px-8">
                {profile ? (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        {/* Cover Image */}
                        <div className="relative w-full h-60 bg-gray-300 dark:bg-gray-700">
                            {cover_image && (
                                <img
                                    src={cover_image}
                                    alt="Cover"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        {/* Logo */}
                        <div className="relative flex justify-center -mt-16">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaBuilding className="w-full h-full text-gray-500 p-6" />
                                )}
                            </div>
                        </div>
                        {/* Company Details */}
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {profile.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                {profile.industry}
                            </p>
                        </div>
                        {/* Info Section */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-200">
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-lg" />{" "}
                                {profile.city}, {profile.country}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhone className="text-lg" /> {profile.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-lg" />{" "}
                                {profile.email}
                            </p>
                            {profile.website && (
                                <p className="flex items-center gap-2">
                                    <FaGlobe className="text-lg" />
                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {profile.website}
                                    </a>
                                </p>
                            )}
                        </div>
                        {/* About Section */}
                        <div className="p-6 border-t border-gray-300 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                About Us
                            </h3>
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:text-gray-100 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600"
                                dangerouslySetInnerHTML={{
                                    __html: profile.about || "N/A",
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-96">
                        <NoDataSVG message="No company profile available" />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
