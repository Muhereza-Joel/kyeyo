import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import BackArrow from "@/Components/BackArrow";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast, ToastContainer } from "react-toastify"; // React toastify
import { Head, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineScissor } from "react-icons/ai";
import Modal from "@/Components/Modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import NoDataSVG from "@/Components/NoDataSVG";
import axios from "axios";

export default function ProjectGallery({
    auth,
    permissions,
    avator,
    success,
    error,
    project_id,
    images,
}) {
    const quillRef = useRef(null);
    const [galleryImages, setGalleryImages] = useState(images);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [croppedImage, setCroppedImage] = useState(null);
    const maxImages = 15;

    const { data, setData, post, processing, errors, reset } = useForm({
        project_id: project_id,
        images: selectedImages || [],
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (selectedImages.length + files.length > maxImages) {
            toast.error(
                `You can only upload a maximum of ${maxImages} images.`
            );

            return;
        }
        setSelectedImages([...selectedImages, ...files]);
        setData("images", [...data.images, ...files]);
    };

    const removeImage = (index) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setData("images", updatedImages);
    };

    // Ensure CSRF token is included in Axios requests
    axios.defaults.headers.common["X-CSRF-TOKEN"] = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const removeGalleryImage = async (mediaId) => {
        try {
            const response = await axios.delete(
                route("projects.delete-image", {
                    project_id,
                    media_id: mediaId,
                })
            );

            if (response.status === 200) {
                toast.success("Image deleted successfully!");
                // You may want to update the images list to reflect the removal
                // For example, you could filter out the deleted image from the `images` array
                setGalleryImages(images.filter((img) => img.id !== mediaId));
            }
        } catch (error) {
            toast.error("An error occurred while deleting the image." + error);
        }
    };

    const openCropModal = (img) => {
        setCurrentImage(URL.createObjectURL(img));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImage(null);
        setCroppedImage(null);
    };

    const handleCropComplete = (crop) => {
        if (currentImage && crop.width && crop.height) {
            const image = new Image();
            image.src = currentImage;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                canvas.width = crop.width;
                canvas.height = crop.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    image,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    crop.width,
                    crop.height
                );
                canvas.toBlob((blob) => {
                    setCroppedImage(URL.createObjectURL(blob));
                });
            };
        }
    };

    const confirmCrop = () => {
        setSelectedImages((prevImages) => [...prevImages, croppedImage]);
        closeModal();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("projects.store-gallery", { id: project_id }), {
            onSuccess: () => {
                reset();
                setSelectedImages([]);
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
                    <BackArrow link="projects.index" text="Project Gallery" />
                </div>
            }
        >
            <Head title="Create Project Gallery" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto">
                    {success && <AlertSuccess success={success} />}
                    {error && <AlertError error={error} />}
                    <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                        <form onSubmit={submit} className="space-y-8 p-4">
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {selectedImages.length > 0 ? (
                                        selectedImages.map((img, idx) => (
                                            <div key={idx} className="relative">
                                                <img
                                                    src={
                                                        typeof img === "string"
                                                            ? img
                                                            : URL.createObjectURL(
                                                                  img
                                                              )
                                                    }
                                                    alt="Preview"
                                                    className="max-w-full max-h-60 rounded-lg object-contain"
                                                />
                                                <AiOutlineCloseCircle
                                                    className="absolute top-1 right-8 text-red-500 cursor-pointer"
                                                    size={24}
                                                    onClick={() =>
                                                        removeImage(idx)
                                                    }
                                                />
                                                <AiOutlineScissor
                                                    className="absolute top-1 right-1 text-blue-500 cursor-pointer"
                                                    size={24}
                                                    onClick={() =>
                                                        openCropModal(img)
                                                    }
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-12 h-12 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <PrimaryButton
                                    className="ms-0 mt-2 mb-3"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>

                        <h3 className="text-gray-900 dark:text-gray-200 px-3">
                            Existing Images in Gallery
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {galleryImages.length > 0 ? (
                                galleryImages.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={galleryImages[idx].url}
                                            alt="Preview"
                                            className="max-w-full max-h-60 rounded-lg object-contain"
                                        />
                                        <AiOutlineCloseCircle
                                            className="absolute top-1 right-8 text-red-500 cursor-pointer"
                                            size={24}
                                            onClick={() =>
                                                removeGalleryImage(
                                                    galleryImages[idx].id
                                                )
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center w-full h-fit  my-40  border-gray-300 rounded-lg">
                                    <NoDataSVG />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
                <ReactCrop
                    crop={crop}
                    onChange={setCrop}
                    onComplete={handleCropComplete}
                >
                    <img src={currentImage} alt="Crop" className="max-w-full" />
                </ReactCrop>
                {croppedImage && (
                    <div className="mt-4">
                        <img
                            src={croppedImage}
                            alt="Cropped Preview"
                            className="max-w-full rounded-lg"
                        />
                        <PrimaryButton onClick={confirmCrop} className="mt-2">
                            Confirm Crop
                        </PrimaryButton>
                    </div>
                )}
            </Modal>

            {/* Toast Container */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AuthenticatedLayout>
    );
}
