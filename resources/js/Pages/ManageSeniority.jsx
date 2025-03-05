import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ManageSeniority({
    auth,
    success,
    error,
    permissions,
    seniorities,
}) {
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("seniority.store"), {
            onSuccess: () => reset(), // Reset the form on success
        });
    };

    const renderTableView = () => (
        <div className="overflow-x-auto mx-2">
            <table className="w-full mt-4 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700">
                <thead>
                    <tr className="text-gray-800 dark:text-gray-100">
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            SNo
                        </th>
                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Experience Level
                        </th>

                        <th className="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {seniorities.map((item, index) => (
                        <tr
                            key={item.id}
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
                                {item.name}
                            </td>

                            <td className="p-2 border-b dark:border-gray-700">
                                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                    <option value="">Select Action</option>
                                    <option value="view">View</option>
                                    <option value="delete">Delete</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-100 dark:text-gray-200 leading-tight">
                    Manage Experience Levels
                </h2>
            }
        >
            <Head title="Create Profession" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div className="px-4 pt-4 pb-2">
                        {can("Create Experience Level") && (
                            <form onSubmit={submit} className="space-y-8">
                                {/* Form fields arranged in column layout */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Experience Level"
                                        />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Experience level goes here."
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-start">
                                        <PrimaryButton
                                            className="ms-0 mb-3"
                                            disabled={processing}
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        )}

                        {can("View Experience Levels") &&
                            seniorities.length > 0 &&
                            renderTableView()}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
