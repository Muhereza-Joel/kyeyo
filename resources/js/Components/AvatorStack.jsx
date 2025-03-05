import { Link } from "@inertiajs/react";
import { useEffect, useRef } from "react";

export default function AvatorStack({
    images = [],
    enableSlide = false,
    autoScrollSpeed = 0,
}) {
    const displayedImages = images.slice(0, 20);
    const hasMore = images.length > 10;
    const scrollRef = useRef(null);

    // Function to handle manual scrolling
    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 150; // Adjust for smooth scrolling
            scrollRef.current.scrollLeft +=
                direction === "left" ? -scrollAmount : scrollAmount;
        }
    };

    // Auto-scrolling effect
    useEffect(() => {
        if (autoScrollSpeed > 0) {
            const interval = setInterval(() => {
                if (scrollRef.current) {
                    if (
                        scrollRef.current.scrollLeft +
                            scrollRef.current.clientWidth >=
                        scrollRef.current.scrollWidth
                    ) {
                        scrollRef.current.scrollLeft = 0; // Reset to the start for infinite looping
                    } else {
                        scrollRef.current.scrollLeft += 1; // Adjust for smooth continuous scrolling
                    }
                }
            }, autoScrollSpeed);

            return () => clearInterval(interval);
        }
    }, [autoScrollSpeed]);

    return (
        <div className="space-y-6 my-3">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center">
                Companies{" "}
                {hasMore && (
                    <Link
                        href="/dashboard"
                        className="ml-4 text-sm sm:text-base font-semibold text-blue-600 hover:underline"
                    >
                        View All
                    </Link>
                )}
            </h2>

            <div className="relative flex items-center">
                {enableSlide && images.length > 0 && (
                    <button
                        onClick={() => handleScroll("left")}
                        className="absolute left-0 z-10 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        ◀
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="flex items-center overflow-x-hidden whitespace-nowrap scroll-smooth"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {images.length > 0 ? (
                        <div className="flex -space-x-4">
                            {displayedImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Avatar ${index}`}
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white shadow-lg"
                                    style={{
                                        zIndex: displayedImages.length - index,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full text-center py-6 text-gray-500">
                            No avatars available.
                        </div>
                    )}
                </div>

                {enableSlide && images.length > 0 && (
                    <button
                        onClick={() => handleScroll("right")}
                        className="absolute right-0 z-10 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        ▶
                    </button>
                )}
            </div>
        </div>
    );
}
