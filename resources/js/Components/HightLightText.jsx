export default function HighlightText({ text, highlights = [] }) {
    return (
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {text.split(" ").map((word, index) => {
                const highlight = highlights.find((h) => h.word === word);
                return (
                    <span
                        key={index}
                        className={highlight?.className || ""}
                        style={highlight?.style || {}}
                    >
                        {word}{" "}
                    </span>
                );
            })}
        </p>
    );
}
