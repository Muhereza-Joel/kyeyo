export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-row sm:justify-center items-center pt-6 sm:pt-0 bg-neutral dark:bg-gray-900">
            <div className="w-full sm:max-w-sm my-6 p-0 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
