import BackArrow from "@/Components/BackArrow";
import BigTextBlock from "@/Components/BigTextBlock";
import ImportanceOfProjects from "@/Components/ImportanceOfProjects";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";

export default function CreateProject({ auth, permissions, avator }) {
    const { can } = usePermission(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
            header={
                <div className="flex items-center space-x-2">
                    <BackArrow
                        link={"projects.index"}
                        text=" Create New Project"
                    />
                </div>
            }
        >
            <Head title="Create Projects" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
