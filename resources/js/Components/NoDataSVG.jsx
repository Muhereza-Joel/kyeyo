export default function NoDataSVG({ showBottonText = true }) {
    return (
        <div className="flex flex-col justify-center items-center">
            <svg
                width="400"
                height="350"
                viewBox="0 0 300 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background */}
                <rect
                    width="300"
                    height="250"
                    rx="15"
                    className="fill-gray-200 dark:fill-gray-700"
                />

                {/* Floating Dots */}
                <circle
                    cx="30"
                    cy="30"
                    r="5"
                    className="fill-gray-400 dark:fill-gray-600 animate-bounce"
                />
                <circle
                    cx="270"
                    cy="50"
                    r="7"
                    className="fill-gray-300 dark:fill-gray-500 animate-pulse"
                />
                <circle
                    cx="250"
                    cy="200"
                    r="4"
                    className="fill-gray-400 dark:fill-gray-600 animate-bounce"
                />

                {/* Placeholder Profile Icon */}
                <path
                    d="M150 50C176.51 50 198 71.49 198 98C198 124.51 176.51 146 150 146C123.49 146 102 124.51 102 98C102 71.49 123.49 50 150 50Z"
                    className="fill-gray-300 dark:fill-gray-500"
                />
                {/* User's Head */}
                <path
                    d="M150 70C160.493 70 169 78.5066 169 89C169 99.4934 160.493 108 150 108C139.507 108 131 99.4934 131 89C131 78.5066 139.507 70 150 70Z"
                    className="fill-gray-400 dark:fill-gray-600"
                />
                {/* User's Body */}
                <path
                    d="M75 202C75 177.91 112.33 160 150 160C187.67 160 225 177.91 225 202V210C225 212.21 223.21 214 221 214H79C76.79 214 75 212.21 75 210V202Z"
                    className="fill-gray-300 dark:fill-gray-500"
                />

                {/* No Data Found Text */}
                <text
                    x="50%"
                    y="80%"
                    textAnchor="middle"
                    className="fill-gray-500 dark:fill-gray-300 text-lg font-semibold"
                    fontFamily="Arial, sans-serif"
                >
                    No Data Found!
                </text>
            </svg>

            {showBottonText && (
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm text-center">
                    Looks like there's nothing here yet. Try adding some data!
                </p>
            )}
        </div>
    );
}
