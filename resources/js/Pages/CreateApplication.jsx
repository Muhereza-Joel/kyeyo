import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import { ToastContainer } from "react-toastify";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function CreateApplication({
    auth,
    success,
    error,
    permissions,
    job_id,
    avator,
}) {
    const { can } = usePermission(permissions);
    const quillRef = useRef(null);
    const [cvName, setCvName] = useState(null);
    const [transcriptName, setTranscriptName] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        job_id: job_id,
        cover_letter: "",
        cv: cvName,
        transcript: transcriptName,
    });

    const handleFileChange = (name, file) => {
        setData(name, file);
        if (name === "cv") setCvName(file ? file.name : "");
        if (name === "transcript") setTranscriptName(file ? file.name : "");
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("applications.store"), {
            onSuccess: () => {
                reset();
                // Clear QuillEditor content
                if (quillRef.current) {
                    quillRef.current.getEditor().setText("");
                }
            }, // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
            header={
                <h2 className="font-semibold text-xl text-gray-100 dark:text-gray-200 leading-tight">
                    Create New Application
                </h2>
            }
        >
            <Head title="Create New Application" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div className="px-4 pt-4 pb-2">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="cover_letter"
                                    value="Please explain why you think you are the best candidate for this position"
                                />
                                <QuillEditor
                                    id="cover_letter"
                                    ref={quillRef}
                                    value={data.cover_letter}
                                    onChange={(e) =>
                                        setData("cover_letter", e.target.value)
                                    }
                                    style={{
                                        height: "300px",
                                        marginBottom: "3.5em",
                                    }}
                                    placeholder="Write your explanation here..."
                                />
                                <InputError
                                    message={errors.cover_letter}
                                    className="mt-2"
                                />
                            </div>

                            <FileUpload
                                label="Upload Request Letter (PDF, DOC, DOCX)"
                                name="cv"
                                required
                                onFileSelect={handleFileChange}
                            />
                            <InputError message={errors.cv} className="mt-2" />

                            <FileUpload
                                label="Upload Transcript (Optional)"
                                name="transcript"
                                onFileSelect={handleFileChange}
                            />
                            <InputError
                                message={errors.transcript}
                                className="mt-2"
                            />

                            {can("Create Application") && (
                                <div className="flex items-center justify-start">
                                    <PrimaryButton
                                        className="ms-0 mt-2 mb-3"
                                        disabled={processing}
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            )}

                            <ToastContainer />
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
