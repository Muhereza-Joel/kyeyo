import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { FiUpload, FiTrash2 } from "react-icons/fi";

const FileUpload = ({
    label,
    name,
    required = false,
    maxSizeMB = 2,
    onFileSelect,
}) => {
    const [fileName, setFileName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            toast.error(`File size exceeds ${maxSizeMB}MB limit.`);
            return;
        }

        setFileName(file.name);
        setUploadProgress(0);
        simulateUpload(file);

        // Ensure onFileSelect passes the actual file and its name
        onFileSelect(name, file);
    };

    const simulateUpload = (file) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 200);
    };

    const handleValidation = () => {
        if (required && !fileName) {
            toast.error(`Please upload a file for ${label}.`);
            fileInputRef.current.focus();
        }
    };

    const handleFileRemove = () => {
        setFileName("");
        setUploadProgress(0);
        fileInputRef.current.value = "";
        onFileSelect(name, null); // Notify parent component (CreateApplication)
        toast.info(`${label} file removed.`);
    };

    return (
        <div>
            <label
                htmlFor={name}
                className="block font-medium text-gray-700 dark:text-gray-200"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div
                className="flex items-center gap-2 border p-2 rounded cursor-pointer dark:border-gray-600 dark:bg-gray-800"
                onClick={() => fileInputRef.current.click()}
                onBlur={handleValidation}
            >
                <FiUpload className="text-gray-600 dark:text-gray-300" />
                <span className="text-gray-600 dark:text-gray-300">
                    {fileName || "Choose a file"}
                </span>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                name={name}
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                required={required}
                onBlur={handleValidation}
            />
            {fileName && (
                <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Selected: {fileName}
                    </p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from triggering file input
                            handleFileRemove();
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
