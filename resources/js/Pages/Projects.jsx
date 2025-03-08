import BigTextBlock from "@/Components/BigTextBlock";
import ImportanceOfProjects from "@/Components/ImportanceOfProjects";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, permissions, avator }) {
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
                        <div className=" text-gray-900 dark:text-gray-100">
                            <BigTextBlock />
                            <ImportanceOfProjects />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
