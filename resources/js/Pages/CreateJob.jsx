import { useEffect, useState, useRef } from "react";
import axios from "axios";
import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowCircleLeft, FaInfoCircle } from "react-icons/fa";
import SelectInput from "@/Components/SelectInput";

export default function CreateJob({
    auth,
    permissions,
    success,
    error,
    professions,
    industries,
    seniorities,
}) {
    const quillRef = useRef(null);
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        profession_id: "",
        industry_id: "",
        seniority_id: "",
        tags: "", // Comma-separated string of selected tags
    });

    const [availableTags, setAvailableTags] = useState([]); // Store fetched tags
    const [selectedTags, setSelectedTags] = useState([]); // Track selected tags

    // Fetch available tags when the component mounts
    useEffect(() => {
        axios.get("/tags").then((res) => {
            setAvailableTags(res.data);
        });
    }, []);

    // Handle selecting/deselecting tags
    const toggleTagSelection = (tag) => {
        let updatedTags;
        if (selectedTags.includes(tag)) {
            updatedTags = selectedTags.filter((t) => t !== tag); // Remove tag if already selected
        } else {
            updatedTags = [...selectedTags, tag]; // Add tag if not selected
        }
        setSelectedTags(updatedTags);
        setData("tags", updatedTags.join(", ")); // Store as a comma-separated string
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("jobs.store"), {
            onSuccess: () => {
                reset(); // Reset form fields
                setSelectedTags([]); // Reset selected tags
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
                    <h2 className="font-semibold text-xl text-gray-100 dark:text-gray-200 leading-tight">
                        Create New Job Entry
                    </h2>
                    <div className="flex">
                        {can("View Jobs") && (
                            <Link
                                href={route("jobs.index")}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                <FaArrowCircleLeft size={20} className="mr-3" />
                                Go Back
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Create Job" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && <AlertSuccess success={success} />}
                    {error && <AlertError error={error} />}
                    <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                        {can("Create Job") && (
                            <form onSubmit={submit} className="space-y-8 p-4">
                                <div className="space-y-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Job Title"
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
                                            placeholder="Job title goes here."
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="profession"
                                            value="Profession"
                                        />
                                        <SelectInput
                                            id="profession_id"
                                            name="profession_id"
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Profession",
                                                },
                                                ...professions.map(
                                                    (profession) => ({
                                                        value: profession.id,
                                                        label: profession.name,
                                                    })
                                                ),
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "profession_id",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.profession_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="industry"
                                            value="Industry"
                                        />
                                        <SelectInput
                                            id="industry_id"
                                            name="industry_id"
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Industry",
                                                },
                                                ...industries.map(
                                                    (industry) => ({
                                                        value: industry.id,
                                                        label: industry.name,
                                                    })
                                                ),
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "industry_id",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.industry_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="seniority"
                                            value="Seniority"
                                        />
                                        <SelectInput
                                            id="seniority_id"
                                            name="seniority_id"
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Seniority",
                                                },
                                                ...seniorities.map(
                                                    (seniority) => ({
                                                        value: seniority.id,
                                                        label: seniority.name,
                                                    })
                                                ),
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "seniority_id",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.seniority_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Job Description"
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
                                            placeholder="Write job description here..."
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Tags Selection */}
                                    <div className="my-3">
                                        <InputLabel
                                            htmlFor="tags"
                                            value="Select Tags"
                                        />

                                        {/* Info Alert */}
                                        <div className="flex items-start bg-blue-100 text-blue-700 p-3 rounded-lg mb-3 text-sm">
                                            <FaInfoCircle className="mr-2 mt-1" />
                                            <span>
                                                Click on tags to select them.
                                                Tags help job seekers find
                                                relevant jobs more easily.
                                            </span>
                                        </div>

                                        {/* Available Tags */}
                                        <div className="flex flex-wrap gap-1">
                                            {availableTags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className={`px-3 py-1 text-sm rounded-full cursor-pointer transition ${
                                                        selectedTags.includes(
                                                            tag
                                                        )
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    }`}
                                                    onClick={() =>
                                                        toggleTagSelection(tag)
                                                    }
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Hidden Input to Store Selected Tags */}
                                        <input
                                            type="hidden"
                                            name="tags"
                                            value={data.tags}
                                        />

                                        <InputError
                                            message={errors.tags}
                                            className="mt-2"
                                        />
                                    </div>

                                    {can("Create Job") && (
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
