import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { FaSearch } from "react-icons/fa";
import TextInput from "./TextInput";

const SearchBar = () => {
    const { url } = usePage(); // Get current URL with parameters
    const currentParams = new URLSearchParams(
        new URL(url, window.location.origin).search
    );

    const { data, setData, get, processing, reset } = useForm({
        query: currentParams.get("query") || "", // Initialize with existing query param
    });

    const submit = (e) => {
        e.preventDefault();
        if (!data.query.trim()) return;

        const params = new URLSearchParams(currentParams); // Preserve existing params
        params.set("query", data.query.trim()); // Update query param

        get(`/search/jobs?${params.toString()}`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <form className="relative flex items-center" onSubmit={submit}>
                <TextInput
                    id="query"
                    name="query"
                    value={data.query}
                    className="ps-10 mt-1 block w-full"
                    autoComplete="query"
                    onChange={(e) => setData("query", e.target.value)}
                    placeholder="What are you looking for..."
                />
                <FaSearch className="absolute left-3 top-4 text-gray-500 dark:text-gray-400" />
                <button
                    type="submit"
                    disabled={processing || !data.query.trim()}
                    className={`ml-2 px-5 py-2 rounded-lg focus:outline-none focus:ring 
                        ${
                            processing || !data.query.trim()
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300"
                        }`}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
