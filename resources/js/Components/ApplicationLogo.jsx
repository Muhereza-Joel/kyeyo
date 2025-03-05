export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 80"
            fill="currentColor"
            width="500"
            height="80"
        >
            {/* "Hiring" Text */}
            <text
                x="90"
                y="50"
                fontSize="58"
                fontWeight="bold"
                className="fill-current text-blue-500 dark:text-white"
            >
                Kyeeyo
            </text>

            {/* Accent Underline */}
            <line
                x1="150"
                y1="60"
                x2="190"
                y2="60"
                stroke="currentColor"
                strokeWidth="4"
                className="stroke-blue-600 dark:stroke-yellow-500"
            />

            <polygon
                points="245,35 260,40 245,45"
                fill="currentColor"
                className="fill-green-600 dark:fill-yellow-500"
            />
        </svg>
    );
}
