import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import BackArrow from "@/Components/BackArrow";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa";

export default function Create({
    auth,
    success,
    error,
    permissions,
    roles,
    avator,
}) {
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => reset(), // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
            header={
                <div className="flex items-center space-x-2">
                    <BackArrow link={"users.index"} />
                </div>
            }
        >
            <Head title="Create New  User" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div
                        className="bg-orange-100 dark:bg-orange-900 border border-orange-400 dark:border-orange-700 text-orange-700 dark:text-orange-300 px-4 py-3 m-2 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            <strong>Note:</strong> The system uses role based
                            access model to manage access to the system. Ensure
                            to assign the right role to the user you create from
                            this section
                        </span>
                    </div>

                    <div className="px-4 pt-4 pb-2">
                        {can("Create User") && (
                            <form onSubmit={submit} className="space-y-8">
                                {/* Form fields arranged in column layout */}
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Username"
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
                                            placeholder="Username goes here."
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="email"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="Email of user goes here."
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="role"
                                            value="User Role"
                                        />
                                        <SelectInput
                                            id="role"
                                            name="role"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Role",
                                                },
                                                ...roles
                                                    .filter((role) => {
                                                        // Filter out "root" and "admin" if the user lacks the required permission
                                                        if (
                                                            !can(
                                                                "Create Role"
                                                            ) &&
                                                            [
                                                                "root",
                                                                "admin",
                                                            ].includes(
                                                                role.name
                                                            )
                                                        ) {
                                                            return false;
                                                        }
                                                        return true;
                                                    })
                                                    .map((role) => ({
                                                        value: role.uuid,
                                                        label: role.name,
                                                    })),
                                            ]}
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.role}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />

                                        <TextInput
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="password"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Login password of user goes here."
                                        />

                                        <InputError
                                            message={errors.password}
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
