import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import BackArrow from "@/Components/BackArrow";
import BigTextBlock from "@/Components/BigTextBlock";
import ImportanceOfProjects from "@/Components/ImportanceOfProjects";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function CreateProject({
    auth,
    permissions,
    avator,
    success,
    error,
}) {
    const quillRef = useRef(null);
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            onSuccess: () => {
                reset(); // Reset form fields

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
                    {success && <AlertSuccess success={success} />}
                    {error && <AlertError error={error} />}
                    <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                        {can("Create Project") && (
                            <form onSubmit={submit} className="space-y-8 p-4">
                                <div className="space-y-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Project Title"
                                        />
                                        <TextInput
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            autoComplete="title"
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            placeholder="Project title goes here."
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Project Description"
                                        />
                                        <QuillEditor
                                            id="description"
                                            ref={quillRef}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                height: "300px",
                                                marginBottom: "3.5em",
                                            }}
                                            placeholder="Write a good description about your project here..."
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    {can("Create Project") && (
                                        <div className="flex items-center justify-start">
                                            <PrimaryButton
                                                className="ms-0 mt-2 mb-3"
                                                disabled={processing}
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
