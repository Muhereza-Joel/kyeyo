import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import AttachedFiles from "@/Components/AtachedFiles";
import InfoRow from "@/Components/InfoRow";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LongTextInfoRow from "@/Components/LongTextInfoRow";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import Section from "@/Components/Section";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function ApplicationDetails({
    auth,
    success,
    error,
    permissions,
    application,
    comments,
}) {
    const { can } = usePermission(permissions);
    const quillRef = useRef(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        comments: application.comments,
        status: application.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("applications.update", application.id), {
            onSuccess: () => {
                reset();
                // Clear QuillEditor content
                if (quillRef.current) {
                    quillRef.current.getEditor().setText("");
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <h2 className="font-semibold sm:pl-48 text-xl text-gray-100 dark:text-gray-200 leading-tight">
                            Application Details
                        </h2>

                        <span
                            className={`inline-block px-3 mx-3 py-1 rounded-full text-sm font-semibold ${
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
                            Application Status: {application.status}
                        </span>
                    </div>

                    {can("View Applications") && (
                        <Link
                            href={route("applications.index")}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            <FaArrowCircleLeft size={20} className="mr-3" />
                            Go Back
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Application Details" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Left Section: Application Information */}
                <div className="col-span-2">
                    {/* Success & Error Messages */}
                    {success && <AlertSuccess success={success} />}
                    {error && <AlertError error={error} />}

                    {/* Application Information */}
                    <div className="max-w-full rounded shadow-sm p-2 overflow-hidden bg-white dark:bg-gray-800">
                        <div className="space-y-6 p-3">
                            <Section title="Applicant Information">
                                <InfoRow
                                    label="Name"
                                    value={application.user.name}
                                />
                                <InfoRow
                                    label="Email Address"
                                    value={application.user.email}
                                />
                            </Section>
                        </div>

                        <div className="space-y-6 p-3 mt-3  dark:bg-gray-900">
                            <Section title="Job Information">
                                <InfoRow
                                    label="Opportunity Title"
                                    value={application.job.title}
                                />
                                <InfoRow
                                    label="Category"
                                    value={application.job.profession.name}
                                />
                            </Section>
                        </div>

                        <div className="space-y-6 p-3 mt-3">
                            <Section title="Job Information">
                                <InfoRow
                                    label="Opportunity Title"
                                    value={application.job.title}
                                />
                                <InfoRow
                                    label="Category"
                                    value={application.job.profession.name}
                                />
                            </Section>
                        </div>

                        <div className="space-y-6 p-3 mt-3 bg-gray-200 dark:bg-gray-900">
                            <Section title="Cover Letter">
                                <LongTextInfoRow
                                    label="Reason why applicant thinks he/she is better for this position"
                                    value={application.cover_letter}
                                />
                            </Section>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Attached Files Section */}
                    <div className="rounded shadow-sm p-4 bg-white dark:bg-gray-800">
                        <AttachedFiles application={application} />
                    </div>

                    {/* Comments Section */}
                    {can("Create Job") && (
                        <div className="rounded shadow-sm p-4 bg-white dark:bg-gray-800">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Application Status"
                                    />
                                    <SelectInput
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        isFocused={false}
                                        className="mt-1 block w-full"
                                        options={[
                                            {
                                                value: "",
                                                label: "Select Status",
                                            },
                                            {
                                                value: "pending",
                                                label: "Pending",
                                            },
                                            {
                                                value: "reviewed",
                                                label: "Reviewed",
                                            },
                                            {
                                                value: "accepted",
                                                label: "Accepted",
                                            },
                                            {
                                                value: "rejected",
                                                label: "Rejected",
                                            },
                                        ]}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="comments"
                                        value="Add Comment"
                                    />
                                    <QuillEditor
                                        id="comments"
                                        ref={quillRef}
                                        value={data.comments}
                                        onChange={(e) =>
                                            setData("comments", e.target.value)
                                        }
                                        style={{
                                            height: "150px",
                                            marginBottom: "4.5em",
                                            marginTop: "1.0em",
                                        }}
                                        placeholder="Write your comment here..."
                                    />
                                    <InputError
                                        message={errors.comments}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-start">
                                    <PrimaryButton
                                        className="ms-0 mt-2 mb-3"
                                        disabled={processing}
                                    >
                                        Update Application Details
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
