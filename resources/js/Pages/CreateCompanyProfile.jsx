import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import BackArrow from "@/Components/BackArrow";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { FaArrowCircleLeft, FaCamera } from "react-icons/fa";

export default function CreateCompanyProfile({
    auth,
    success,
    error,
    permissions,
    avator,
}) {
    const [imagePreview, setImagePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    const quillRef = useRef(null);
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        industry: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        city: "",
        website: "",
        about: "",
        logo: null,
        cover_image: null,
        founded_year: "",
        company_size: "",
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1950 + 1 },
        (_, i) => 1950 + i
    ).reverse();

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
        post(route("company-profile.store"), {
            onSuccess: () => {
                reset();
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
                    <BackArrow link={"company-profile.index"} />
                </div>
            }
        >
            <Head title="Create Company Profile" />

            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                {success && <AlertSuccess success={success} />}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div>
                        {can("Create Company Profile") && (
                            <form onSubmit={submit} className="space-y-8">
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
                                                No Logo
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
                                            htmlFor="name"
                                            value="Name of Company"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Company name goes here."
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="industry"
                                            value="Industry"
                                        />
                                        <TextInput
                                            id="industry"
                                            name="industry"
                                            value={data.industry}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "industry",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Industry where company falls goes here."
                                        />
                                        <InputError
                                            message={errors.industry}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Contact Phone Number"
                                        />
                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            placeholder="Company phone goes here."
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Company Email Address"
                                        />
                                        <TextInput
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="Company email goes here."
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="address"
                                            value="Company Address"
                                        />
                                        <TextInput
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Company address goes here."
                                        />
                                        <InputError
                                            message={errors.address}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="country"
                                            value="Operating Country"
                                        />
                                        <TextInput
                                            id="country"
                                            name="country"
                                            value={data.country}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "country",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Country of operation goes here."
                                        />
                                        <InputError
                                            message={errors.country}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="city"
                                            value="Operating City"
                                        />
                                        <TextInput
                                            id="city"
                                            name="city"
                                            value={data.city}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                            placeholder="City of operation goes here."
                                        />
                                        <InputError
                                            message={errors.city}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="website"
                                            value="Company Website Link"
                                        />
                                        <TextInput
                                            id="website"
                                            name="website"
                                            value={data.website}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "website",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Forexample https://xurebuilt.com"
                                        />
                                        <InputError
                                            message={errors.website}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="founded_year"
                                            value="Year Founded"
                                        />
                                        <SelectInput
                                            id="founded_year"
                                            name="founded_year"
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Year",
                                                }, // Default option
                                                ...years.map((year) => ({
                                                    value: year.toString(),
                                                    label: year.toString(),
                                                })),
                                            ]}
                                            value={data.founded_year}
                                            onChange={(e) =>
                                                setData(
                                                    "founded_year",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.founded_year}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="company_size"
                                            value="Company Size"
                                        />
                                        <SelectInput
                                            id="company_size"
                                            name="company_size"
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Company Size",
                                                },
                                                {
                                                    value: "1-10",
                                                    label: "1-10 Employees",
                                                },
                                                {
                                                    value: "11-50",
                                                    label: "11-50 Employees",
                                                },
                                                {
                                                    value: "51-200",
                                                    label: "51-200 Employees",
                                                },
                                                {
                                                    value: "201-500",
                                                    label: "201-500 Employees",
                                                },
                                                {
                                                    value: "501-1000",
                                                    label: "501-1000 Employees",
                                                },
                                                {
                                                    value: "1000+",
                                                    label: "1000+ Employees",
                                                },
                                            ]}
                                            value={data.company_size}
                                            onChange={(e) =>
                                                setData(
                                                    "company_size",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.company_size}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                        <InputLabel
                                            htmlFor="about"
                                            value="Company Biography"
                                        />
                                        <QuillEditor
                                            id="about"
                                            ref={quillRef}
                                            value={data.about}
                                            onChange={(e) =>
                                                setData("about", e.target.value)
                                            }
                                            style={{
                                                height: "300px",
                                                marginBottom: "3.5em",
                                            }}
                                            placeholder="Write company description here..."
                                        />
                                        <InputError
                                            message={errors.about}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-start ms-4">
                                    <PrimaryButton
                                        className="ms-0 mb-3"
                                        disabled={processing}
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
