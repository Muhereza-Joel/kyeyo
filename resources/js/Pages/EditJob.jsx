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
import BackArrow from "@/Components/BackArrow";

export default function EditJob({
    auth,
    permissions,
    success,
    error,
    job,
    professions,
    industries,
    seniorities,
    avator,
}) {
    const quillRef = useRef(null);
    const { can } = usePermission(permissions);
    const { data, setData, put, processing, errors, reset } = useForm({
        title: job.title,
        profession_id: job.profession_id,
        industry_id: job.industry_id,
        seniority_id: job.seniority_id,
        description: job.description,
        tags: job.tags.map((tag) => tag.name.en).join(", "), // Extract English names
    });

    const [availableTags, setAvailableTags] = useState([]); // Store fetched tags
    const [selectedTags, setSelectedTags] = useState([]); // Track selected tags

    useEffect(() => {
        axios.get("/tags").then((res) => {
            setAvailableTags(res.data);
        });

        // Pre-select tags attached to the job
        setSelectedTags(job.tags.map((tag) => tag.name.en)); // Extract English names
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
        put(route("jobs.update", job.id), {
            onSuccess: () => {},
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
            header={
                <div className="flex items-center space-x-2">
                    <BackArrow link={"jobs.index"} />
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
                                            value={data.profession_id} // Ensure selected value is maintained
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
                                            value={data.industry_id} // Ensure selected value is maintained
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
                                            value={data.seniority_id} // Ensure selected value is maintained
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

                                    {/* Tags Input with Info Alert */}
                                    <div className="my-3 relative">
                                        <InputLabel
                                            htmlFor="tags"
                                            value="Tags (comma separated)"
                                        />

                                        {/* Info Alert */}
                                        <div className="flex items-start bg-blue-100 text-blue-700 p-3 rounded-lg mb-3 text-sm">
                                            <FaInfoCircle className="mr-2 mt-1" />
                                            <span>
                                                Tags help job seekers find
                                                relevant jobs more easily. Use
                                                keywords like{" "}
                                                <strong>
                                                    Plumber, Electrician, Mason
                                                </strong>{" "}
                                                to categorize your job.
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
                                                            ? "bg-blue-500 text-white" // Pre-selected tags will be highlighted
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

                                    {can("Update Job") && (
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
