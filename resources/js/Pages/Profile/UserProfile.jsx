import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaCamera, FaPen, FaSave } from "react-icons/fa";

export default function Create({
    auth,
    success,
    error,
    permissions,
    user,
    logo_url,
    cover_image,
    avator,
}) {
    const { can } = usePermission(permissions);

    const [imagePreview, setImagePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: user.profile?.fullname || "",
        phone_number: user.profile?.phone_number || "",
        nin: user.profile?.nin || "",
        date_of_birth: user.profile?.date_of_birth || "",
        gender: user.profile?.gender || "",
        country: user.profile?.country || "",
        district: user.profile?.district || "",
        village: user.profile?.village || "",
        logo: logo_url || null,
        cover_image: cover_image || null,
        user_id: user.id,
    });

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("cover_image", file); // Ensure consistency in how `setData` is used
            setEditingField("cover_image");
            // Generate preview for cover image
            const reader = new FileReader();
            reader.onload = () => setCoverPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("logo", file); // Ensure consistency in how `setData` is used
            setEditingField("logo");
            // Generate preview for logo
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const toggleEditMode = (fieldId) => {
        setEditingField(editingField === fieldId ? null : fieldId);
    };

    const isFieldEditable = (fieldId) => {
        return editingField === fieldId;
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("updateBioData"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            avator={avator}
        >
            <Head title="Create Your Profile" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div className="px-4 pb-2">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div className="relative w-full h-96 mb-20 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                {/* Cover Image */}
                                {data.cover_image || coverPreview ? (
                                    <img
                                        src={coverPreview || data.cover_image}
                                        alt="Cover Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-full h-full text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                )}
                                <input
                                    type="file"
                                    id="cover_image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleCoverChange}
                                />
                                <label
                                    htmlFor="cover_image"
                                    className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                                >
                                    Change Cover
                                </label>

                                {/* Logo Positioned at the Bottom Center */}
                                <div className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 w-52 h-52 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white shadow-lg z-10">
                                    {data.logo || imagePreview ? (
                                        <img
                                            src={imagePreview || data.logo}
                                            alt="Logo Preview"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-full h-full text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    )}

                                    <input
                                        type="file"
                                        id="logo"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="logo"
                                        className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600"
                                    >
                                        <FaCamera className="text-xl" />
                                    </label>

                                    <InputError
                                        message={errors.logo}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                                {[
                                    {
                                        label: "Fullname",
                                        id: "fullname",
                                        type: "text",
                                        value: data.fullname,
                                        onChange: (e) =>
                                            setData("fullname", e.target.value),
                                        placeholder: "Enter your fullname here",
                                        error: errors.fullname,
                                    },
                                    {
                                        label: "Phone Number",
                                        id: "phone_number",
                                        type: "text",
                                        value: data.phone_number,
                                        onChange: (e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            ),
                                        placeholder:
                                            "Enter your phone number here",
                                        error: errors.phone_number,
                                    },
                                    {
                                        label: "NIN Number",
                                        id: "nin",
                                        type: "text",
                                        value: data.nin,
                                        onChange: (e) =>
                                            setData("nin", e.target.value),
                                        placeholder:
                                            "Enter your nin number here",
                                        error: errors.nin,
                                    },
                                    {
                                        label: "Date of Birth",
                                        id: "date_of_birth",
                                        type: "date",
                                        value: data.date_of_birth,
                                        onChange: (e) =>
                                            setData(
                                                "date_of_birth",
                                                e.target.value
                                            ),
                                        placeholder:
                                            "Enter your date of birth here",
                                        error: errors.date_of_birth,
                                    },
                                    {
                                        label: "Gender",
                                        id: "gender",
                                        type: "select",
                                        value: data.gender,
                                        onChange: (e) =>
                                            setData("gender", e.target.value),
                                        options: [
                                            {
                                                value: "",
                                                label: "Select Gender",
                                            },
                                            {
                                                value: "male",
                                                label: "Male",
                                            },
                                            {
                                                value: "female",
                                                label: "Female",
                                            },
                                            {
                                                value: "other",
                                                label: "Other",
                                            },
                                        ],
                                        error: errors.gender,
                                    },
                                    {
                                        label: "Home Country",
                                        id: "country",
                                        type: "text",
                                        value: data.country,
                                        onChange: (e) =>
                                            setData("country", e.target.value),
                                        placeholder:
                                            "Enter your home country here",
                                        error: errors.country,
                                    },
                                    {
                                        label: "Home District",
                                        id: "district",
                                        type: "text",
                                        value: data.district,
                                        onChange: (e) =>
                                            setData("district", e.target.value),
                                        placeholder:
                                            "Enter your home district here",
                                        error: errors.district,
                                    },
                                    {
                                        label: "Home Village",
                                        id: "village",
                                        type: "text",
                                        value: data.village,
                                        onChange: (e) =>
                                            setData("village", e.target.value),
                                        placeholder:
                                            "Enter your home district here",
                                        error: errors.village,
                                    },
                                ].map((field, index) => (
                                    <div key={index} className="flex flex-col">
                                        <InputLabel
                                            htmlFor={field.id}
                                            value={field.label}
                                        />

                                        <div className="flex items-center">
                                            {field.type === "select" ? (
                                                <SelectInput
                                                    id={field.id}
                                                    name={field.id}
                                                    isFocused={false}
                                                    className="mt-1 block w-full transition-all duration-200 ${isFieldEditable(field.id) ? 'bg-blue-100' : ''}"
                                                    options={field.options}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    readOnly={
                                                        !isFieldEditable(
                                                            field.id
                                                        )
                                                    }
                                                />
                                            ) : field.type === "date" ? (
                                                <DateInput
                                                    type="date"
                                                    id={field.id}
                                                    className={`mt-1 block w-full transition-all duration-200 ${
                                                        isFieldEditable(
                                                            field.id
                                                        )
                                                            ? "bg-blue-100"
                                                            : ""
                                                    }`}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    autoComplete={field.id}
                                                    readOnly={
                                                        !isFieldEditable(
                                                            field.id
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <TextInput
                                                    id={field.id}
                                                    className={`mt-1 block w-full transition-all duration-200 ${
                                                        isFieldEditable(
                                                            field.id
                                                        )
                                                            ? "bg-blue-100"
                                                            : ""
                                                    }`}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    isFocused
                                                    autoComplete={field.id}
                                                    readOnly={
                                                        !isFieldEditable(
                                                            field.id
                                                        )
                                                    }
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleEditMode(field.id)
                                                }
                                                className="ml-2 text-blue-500 hover:text-blue-700 bg-gray-200 p-2 rounded-full shadow-md transition-transform duration-200 transform hover:scale-110"
                                            >
                                                <FaPen />
                                            </button>
                                        </div>

                                        <InputError
                                            className="mt-2"
                                            message={field.error}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                {editingField !== null && (
                                    <>
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            Save Changes
                                        </PrimaryButton>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditingField(null)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
