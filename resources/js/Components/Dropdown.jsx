import {
    useState,
    useRef,
    useEffect,
    createContext,
    useContext,
    Fragment,
} from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOpen = () => {
        setOpen((previousState) => {
            const newState = !previousState;

            if (newState && dropdownRef.current) {
                // Recalculate dropUp when opening
                const dropdown = dropdownRef.current;
                const rect = dropdown.getBoundingClientRect();
                const viewportHeight =
                    window.innerHeight || document.documentElement.clientHeight;

                const spaceBelow = viewportHeight - rect.bottom;
                const spaceAbove = rect.top;

                if (
                    spaceBelow < dropdown.offsetHeight &&
                    spaceAbove > dropdown.offsetHeight
                ) {
                    setDropUp(true);
                } else {
                    setDropUp(false);
                }
            }

            return newState;
        });
    };

    useEffect(() => {
        const updateDropUp = () => {
            if (open && dropdownRef.current) {
                const dropdown = dropdownRef.current;
                const rect = dropdown.getBoundingClientRect();
                const viewportHeight =
                    window.innerHeight || document.documentElement.clientHeight;

                // Check available space below and above the trigger
                const spaceBelow = viewportHeight - rect.bottom;
                const spaceAbove = rect.top;

                // Set dropUp to true if there's more space above or not enough space below
                if (
                    spaceBelow < dropdown.offsetHeight &&
                    spaceAbove > dropdown.offsetHeight
                ) {
                    setDropUp(true);
                } else {
                    setDropUp(false);
                }
            }
        };

        updateDropUp();

        // Add event listeners for viewport changes
        window.addEventListener("resize", updateDropUp);
        window.addEventListener("scroll", updateDropUp);

        return () => {
            window.removeEventListener("resize", updateDropUp);
            window.removeEventListener("scroll", updateDropUp);
        };
    }, [open]);

    return (
        <DropDownContext.Provider
            value={{ open, setOpen, toggleOpen, dropUp, dropdownRef }}
        >
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {/* Overlay to close dropdown */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
};

const Content = ({
    align = "right",
    width = "80",
    contentClasses = "py-1 bg-white dark:bg-gray-700",
    children,
}) => {
    const { open, setOpen, dropUp, dropdownRef } = useContext(DropDownContext);

    let alignmentClasses = "origin-top";

    if (align === "left") {
        alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
    } else if (align === "right") {
        alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
    }

    let widthClasses = "";

    if (width === "80") {
        widthClasses = "w-80";
    }

    return (
        <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                ref={dropdownRef}
                className={`absolute z-50 ${
                    dropUp ? "bottom-full mb-2" : "top-full mt-2"
                } ${alignmentClasses} ${widthClasses}`}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = "", children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out " +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
