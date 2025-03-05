import HighlightText from "./HightLightText";

export default function TextHighLightBlock() {
    const text = `Kyeeyo Connect links skilled technicians with top construction projects, 
    enabling them to showcase their expertise and secure reliable job opportunities. 
    Contractors can post jobs, review technician profiles, and hire qualified professionals, 
    while technicians gain access to diverse projects and enhance their experience. 
    Join today and take your career to the next level!`;

    const highlights = [
        { word: "technicians", className: "font-bold text-blue-600" },
        { word: "construction", className: "text-green-600 font-semibold" },
        { word: "projects", className: "text-red-600 font-medium" },
        { word: "experience", className: "text-purple-600 font-bold" },
        { word: "career", className: "text-orange-600 font-semibold" },
    ];

    return <HighlightText text={text} highlights={highlights} />;
}
