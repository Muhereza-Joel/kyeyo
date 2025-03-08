import { Link } from "@inertiajs/react";

export default function ImportanceOfProjects() {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Projects not only provide valuable opportunities for technicians
                to showcase their skills and expertise but also serve as a
                stepping stone for career growth. By taking part in diverse
                projects, technicians gain hands-on experience, improve their
                problem-solving abilities, and build a strong portfolio. As a
                technician, engaging in a variety of construction projects
                enhances your credibility, expands your professional network,
                and increases your chances of securing more lucrative and
                impactful job opportunities.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-4">
                Whether you're working on large-scale projects or smaller,
                specialized ones, every project offers a chance to refine your
                craft and stand out in a competitive job market. Kyeeyo Connect
                makes it easier than ever to access top construction projects
                and build a solid reputation as a skilled professional in your
                field.
            </p>

            <div className="text-center mt-8">
                <Link
                    href={route("projects.create")}
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Add Your Project
                </Link>
            </div>
        </div>
    );
}
