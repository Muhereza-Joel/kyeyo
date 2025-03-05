import {
    FaFilePdf,
    FaFileImage,
    FaFileWord,
    FaFileExcel,
    FaFileAlt,
} from "react-icons/fa";
import { BsFileEarmark } from "react-icons/bs";
import Section from "@/Components/Section";

const getFileIcon = (mimeType) => {
    if (mimeType.includes("pdf"))
        return <FaFilePdf className="text-red-500 w-6 h-6" />;
    if (mimeType.includes("image"))
        return <FaFileImage className="text-blue-500 w-6 h-6" />;
    if (mimeType.includes("word"))
        return <FaFileWord className="text-blue-700 w-6 h-6" />;
    if (mimeType.includes("excel"))
        return <FaFileExcel className="text-green-500 w-6 h-6" />;
    return <BsFileEarmark className="text-gray-500 w-6 h-6" />;
};

const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / 1048576).toFixed(2)} MB`;
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function AttachedFiles({ application }) {
    return (
        <Section title="Attached Files">
            {application.media.length > 0 ? (
                <div className="space-y-2">
                    {application.media.map((media, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                        >
                            <div className="flex items-center space-x-3">
                                {getFileIcon(media.mime_type)}
                                <div>
                                    <a
                                        href={media.original_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        {media.name}
                                    </a>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {media.extension} ·{" "}
                                        {formatFileSize(media.size)}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(media.created_at)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    No files attached.
                </p>
            )}
        </Section>
    );
}
