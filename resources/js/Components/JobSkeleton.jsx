import ContentLoader from "react-content-loader";

const JobSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={120}
        viewBox="0 0 400 120"
        backgroundColor="#fdfdfd"
        foregroundColor="#ecebeb"
        {...props}
    >
        {/* Job Image */}
        <rect x="15" y="15" rx="5" ry="5" width="80" height="80" />
        {/* Job Title */}
        <rect x="110" y="20" rx="4" ry="4" width="220" height="20" />
        {/* Job Meta */}
        <rect x="110" y="50" rx="3" ry="3" width="180" height="15" />
        <rect x="110" y="70" rx="3" ry="3" width="160" height="15" />
        {/* Button */}
        <rect x="320" y="50" rx="8" ry="8" width="80" height="30" />
    </ContentLoader>
);

export default JobSkeleton;
