import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaImages, FaPenAlt } from "react-icons/fa"; // Importing icons
import BigTextBlock from "@/Components/BigTextBlock";
import ImportanceOfProjects from "@/Components/ImportanceOfProjects";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react"; // Importing Link from inertia
import { usePermission } from "@/Hooks/usePermissions";

export default function Projects({ auth, permissions, avator, projects }) {
    // State to manage opened accordion
    const [openProject, setOpenProject] = useState(null);
    const { can } = usePermission(permissions);

    const toggleAccordion = (index) => {
        setOpenProject(openProject === index ? null : index); // Toggle open/close
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
        >
            <Head title="Projects" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 dark:text-gray-100">
                            <BigTextBlock />
                            <ImportanceOfProjects />
                        </div>
                    </div>

                    {/* Container with border and padding */}
                    <div className="mt-6 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
                        {/* Accordion Container */}
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-300 dark:border-gray-700"
                                >
                                    <div className="flex justify-between items-center">
                                        {can("Update Project") && (
                                            <Link
                                                href={route(
                                                    "projects.edit",
                                                    project.id
                                                )}
                                                className="inline-flex items-center text-blue-500 dark:text-green-500 hover:text-blue-700 dark:hover:text-green-300 transition"
                                            >
                                                <FaPenAlt className="mr-2" />
                                                <span>
                                                    Update Project Details
                                                </span>
                                            </Link>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full text-left px-4 py-3 font-semibold text-xl text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none flex items-center justify-between"
                                    >
                                        <span>{project.title}</span>
                                        <span>
                                            {openProject === index ? (
                                                <FaChevronUp size={20} />
                                            ) : (
                                                <FaChevronDown size={20} />
                                            )}
                                        </span>
                                    </button>
                                    {openProject === index && (
                                        <div
                                            className="px-4 py-2 text-gray-700 dark:text-gray-200"
                                            dangerouslySetInnerHTML={{
                                                __html: project.description,
                                            }}
                                        ></div>
                                    )}

                                    {/* Link to the project's own gallery */}
                                    <div className="px-4 py-2">
                                        <Link
                                            href={route("projects.gallery", {
                                                id: project.id,
                                            })}
                                            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                                        >
                                            <FaImages className="mr-2" />
                                            View {project.title} Gallery
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
