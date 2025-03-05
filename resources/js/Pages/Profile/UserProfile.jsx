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
import { FaCamera } from "react-icons/fa";

export default function Create({
    auth,
    success,
    error,
    permissions,
    user,
    logo,
}) {
    const { can } = usePermission(permissions);

    const [imagePreview, setImagePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: user.profile?.fullname || "",
        phone_number: user.profile?.phone_number || "",
        nin: user.profile?.nin || "",
        date_of_birth: user.profile?.date_of_birth || "",
        gender: user.profile?.gender || "",
        country: user.profile?.country || "",
        district: user.profile?.district || "",
        village: user.profile?.village || "",
        logo: logo || null,
        cover_image: null,
        user_id: user.id,
    });

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("cover_image", file); // Ensure consistency in how `setData` is used

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

            // Generate preview for logo
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("updateBioData"));
    };

    return (
        <AuthenticatedLayout user={auth.user} permissions={permissions}>
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
                                {data.cover_image ? (
                                    <img
                                        src={URL.createObjectURL(
                                            data.cover_image
                                        )}
                                        alt="Cover Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500">
                                        No Cover Image Selected
                                    </span>
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
                                    className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                                >
                                    Change Cover
                                </label>

                                {/* Logo Positioned at the Bottom Center */}
                                <div className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 w-52 h-52 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white shadow-lg z-10">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Logo Preview"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No Avator
                                        </div>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
                                <div>
                                    <InputLabel
                                        htmlFor="fullname"
                                        value="Fullname"
                                    />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.fullname}
                                        onChange={(e) =>
                                            setData("fullname", e.target.value)
                                        }
                                        placeholder="Enter your fullname here"
                                        isFocused
                                        autoComplete="fullname"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.fullname}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="phone_number"
                                        value="Phone Number"
                                    />

                                    <TextInput
                                        id="phone_number"
                                        className="mt-1 block w-full"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your phone number here"
                                        isFocused
                                        autoComplete="phone_number"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.phone_number}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="nin"
                                        value="NIN Number"
                                    />

                                    <TextInput
                                        id="nin"
                                        className="mt-1 block w-full"
                                        value={data.nin}
                                        onChange={(e) =>
                                            setData("nin", e.target.value)
                                        }
                                        placeholder="Enter your nin number here"
                                        isFocused
                                        autoComplete="nin"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.nin}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="date_of_birth"
                                        value="Date of Birth"
                                    />

                                    <DateInput
                                        id="date_of_birth"
                                        className="mt-1 block w-full"
                                        value={data.date_of_birth}
                                        onChange={(e) =>
                                            setData(
                                                "date_of_birth",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your date of birth here"
                                        isFocused
                                        autoComplete="date_of_birth"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.date_of_birth}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="gender"
                                        value="Gender"
                                    />
                                    <SelectInput
                                        id="gender"
                                        name="gender"
                                        isFocused={false}
                                        className="mt-1 block w-full"
                                        options={[
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
                                        ]}
                                        value={data.gender || ""}
                                        onChange={(e) =>
                                            setData("gender", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.gender}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="country"
                                        value="Home Country"
                                    />

                                    <TextInput
                                        id="country"
                                        className="mt-1 block w-full"
                                        value={data.country}
                                        onChange={(e) =>
                                            setData("country", e.target.value)
                                        }
                                        placeholder="Enter your home country here"
                                        isFocused
                                        autoComplete="country"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.country}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="district"
                                        value="Home District"
                                    />

                                    <TextInput
                                        id="district"
                                        className="mt-1 block w-full"
                                        value={data.district}
                                        onChange={(e) =>
                                            setData("district", e.target.value)
                                        }
                                        placeholder="Enter your home district here"
                                        isFocused
                                        autoComplete="district"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.district}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="village"
                                        value="Home Village"
                                    />

                                    <TextInput
                                        id="village"
                                        className="mt-1 block w-full"
                                        value={data.village}
                                        onChange={(e) =>
                                            setData("village", e.target.value)
                                        }
                                        placeholder="Enter your home district here"
                                        isFocused
                                        autoComplete="village"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.village}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
