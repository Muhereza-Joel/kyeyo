import { useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import ThemeToggleButton from "@/Components/ThemeToggleButton";
import { usePermission } from "@/Hooks/usePermissions";
import {
    FaBars,
    FaTimes,
    FaTachometerAlt,
    FaBookOpen,
    FaBriefcase,
    FaCog,
    FaUserShield,
    FaCogs,
    FaGraduationCap,
    FaListAlt,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaCalendarPlus,
    FaUserCircle,
    FaUser,
    FaWarehouse,
} from "react-icons/fa";

export default function Authenticated({
    user,
    header,
    children,
    permissions = [],
    avator,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { can } = usePermission(permissions);

    return (
        <div className="flex flex-col min-h-screen bg-neutral dark:bg-gray-900">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-neutral dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
                <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Left Section: Menu Icon + Logo */}
                        <div className="flex items-center space-x-2">
                            {/* Hamburger Menu Button */}
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(true)
                                }
                                className="p-2 text-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition sm:hidden"
                            >
                                <FaBars className="text-2xl" />
                            </button>

                            {/* App Logo - Centered properly */}
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex sm:space-x-6">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="flex items-center py-3 border-none "
                            >
                                <FaTachometerAlt className="mr-2 text-xl text-green-500" />
                                Dashboard
                            </NavLink>
                            {can("Create Company Profile") && (
                                <NavLink
                                    href={route("company-profile.index")}
                                    active={route().current(
                                        "company-profile.index"
                                    )}
                                    className="flex items-center py-3 border-none"
                                >
                                    <FaCalendarPlus
                                        className="mr-2 text-xl"
                                        color="#4caf50"
                                    />
                                    Company Profile
                                </NavLink>
                            )}
                            {can("View Jobs") && (
                                <NavLink
                                    href={route("jobs.index")}
                                    active={route().current("jobs.index")}
                                    className="flex items-center py-3 border-none "
                                >
                                    <FaBriefcase className="mr-2 text-xl text-green-500" />
                                    Jobs
                                </NavLink>
                            )}
                            {can("View Applications") && (
                                <NavLink
                                    href={route("applications.index")}
                                    active={route().current(
                                        "applications.index"
                                    )}
                                    className="flex items-center py-3 border-none "
                                >
                                    <FaBookOpen className="mr-2 text-xl text-green-500" />
                                    Applications
                                </NavLink>
                            )}

                            {can("View Projects") && (
                                <NavLink
                                    href={route("projects.index")}
                                    active={route().current("projects.index")}
                                    className="flex items-center py-3 border-none "
                                >
                                    <FaWarehouse className="mr-2 text-xl text-green-500" />
                                    My Projects
                                </NavLink>
                            )}

                            {can("View Users") && (
                                <NavLink
                                    href={route("users.index")}
                                    active={route().current("users.index")}
                                    className="flex items-center py-3 border-none "
                                >
                                    <FaBriefcase
                                        className="mr-2 text-xl"
                                        color="#4caf50"
                                    />
                                    Manage Users
                                </NavLink>
                            )}
                        </div>

                        {/* Right Section: Profile & Theme Toggle */}
                        <div className="flex flex-row items-center space-x-4 ml-auto">
                            <ThemeToggleButton />

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-blue-900 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 hover:text-gray-700 focus:outline-none transition">
                                        {user.avator || avator ? (
                                            <img
                                                src={user.avator || avator}
                                                alt="Avatar"
                                                className="w-6 h-6 rounded-full mr-2"
                                            />
                                        ) : (
                                            <FaUserCircle className="w-6 h-6 mr-2 text-gray-500" />
                                        )}
                                        <span className="hidden sm:inline">
                                            {user.name}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {/* Large Profile Section */}
                                    <div className="flex flex-col items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                        {user.avator || avator ? (
                                            <img
                                                src={user.avatar || avator}
                                                alt="Avatar"
                                                className="w-32 h-32 rounded-full mb-2"
                                            />
                                        ) : (
                                            <FaUserCircle className="w-32 h-32 text-gray-500 mb-2" />
                                        )}
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Signed in as{" "}
                                            <span className="font-semibold">
                                                {user.name}
                                            </span>
                                        </p>
                                    </div>

                                    {can("Create Personal Profile") && (
                                        <Dropdown.Link
                                            href={route("edit-user-profile")}
                                            className="flex items-center py-3"
                                        >
                                            <FaUser className="mr-2 text-xl text-green-500" />
                                            Your Profile
                                        </Dropdown.Link>
                                    )}

                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className="flex items-center py-3"
                                    >
                                        <FaCog className="mr-2 text-xl text-green-500" />
                                        Account Settings
                                    </Dropdown.Link>

                                    <hr className="border-t border-gray-200 dark:border-gray-700" />
                                    {can("Create Role") && (
                                        <Dropdown.Link
                                            href={route("roles.index")}
                                            active={route().current(
                                                "roles.index"
                                            )}
                                            className="flex items-center py-3"
                                        >
                                            <FaUserShield
                                                className="mr-2 text-xl"
                                                color="#4caf50"
                                            />
                                            Manage Roles
                                        </Dropdown.Link>
                                    )}

                                    <hr className="border-t border-gray-200 dark:border-gray-700" />
                                    {can("Create Role") && (
                                        <Dropdown.Link
                                            href={route("assign-permissions")}
                                            active={route().current(
                                                "assign-permissions"
                                            )}
                                            className="flex items-center py-3"
                                        >
                                            <FaCogs
                                                className="mr-2 text-xl"
                                                color="#4caf50"
                                            />
                                            Assign Permissions
                                        </Dropdown.Link>
                                    )}

                                    <hr className="border-t border-gray-200 dark:border-gray-700" />
                                    {can("Create Profession") && (
                                        <Dropdown.Link
                                            href={route("professions.index")}
                                            active={route().current(
                                                "professions.index"
                                            )}
                                            className="flex items-center py-3"
                                        >
                                            <FaGraduationCap
                                                className="mr-2 text-xl"
                                                color="#4caf50"
                                            />
                                            Manage Professions
                                        </Dropdown.Link>
                                    )}

                                    <hr className="border-t border-gray-200 dark:border-gray-700" />
                                    {can("Create Category") && (
                                        <Dropdown.Link
                                            href={route("categories.index")}
                                            active={route().current(
                                                "categories.index"
                                            )}
                                            className="flex items-center py-3"
                                        >
                                            <FaListAlt
                                                className="mr-2 text-xl"
                                                color="#4caf50"
                                            />
                                            Manage Categories
                                        </Dropdown.Link>
                                    )}
                                    <hr className="border-t border-gray-200 dark:border-gray-700" />
                                    {can("Create Experience Level") && (
                                        <Dropdown.Link
                                            href={route("seniority.index")}
                                            active={route().current(
                                                "seniority.index"
                                            )}
                                            className="flex items-center py-3"
                                        >
                                            <FaGraduationCap
                                                className="mr-2 text-xl"
                                                color="#4caf50"
                                            />
                                            Seniority Levels
                                        </Dropdown.Link>
                                    )}

                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="flex items-center py-3"
                                    >
                                        <FaUserShield className="mr-2 text-xl text-green-500" />
                                        Logout
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Slide-In Menu */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-gray-950 dark:bg-gray-800 transform ${
                    showingNavigationDropdown
                        ? "translate-x-0"
                        : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setShowingNavigationDropdown(false)}
                        className="text-gray-400 hover:text-gray-200"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-4 p-4 text-gray-300">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        <FaTachometerAlt className="mr-2 text-green-500" />
                        Dashboard
                    </ResponsiveNavLink>

                    {can("Create Company Profile") && (
                        <ResponsiveNavLink
                            href={route("company-profile.index")}
                            active={route().current("company-profile.index")}
                            className="flex items-center py-3 border-none"
                        >
                            <FaCalendarPlus
                                className="mr-2 text-xl"
                                color="#4caf50"
                            />
                            Company Profile
                        </ResponsiveNavLink>
                    )}
                    {can("View Jobs") && (
                        <ResponsiveNavLink
                            href={route("jobs.index")}
                            active={route().current("jobs.index")}
                        >
                            <FaBriefcase className="mr-2 text-green-500" />
                            Jobs
                        </ResponsiveNavLink>
                    )}
                    {can("View Applications") && (
                        <ResponsiveNavLink
                            href={route("applications.index")}
                            active={route().current("applications.index")}
                        >
                            <FaBookOpen className="mr-2 text-green-500" />
                            Applications
                        </ResponsiveNavLink>
                    )}

                    {can("View Projects") && (
                        <ResponsiveNavLink
                            href={route("projects.index")}
                            active={route().current("projects.index")}
                            className="flex items-center py-3 border-none "
                        >
                            <FaWarehouse className="mr-2 text-xl text-green-500" />
                            My Projects
                        </ResponsiveNavLink>
                    )}

                    {can("View Users") && (
                        <ResponsiveNavLink
                            href={route("users.index")}
                            active={route().current("users.index")}
                            className="flex items-center py-3 border-none "
                        >
                            <FaBriefcase
                                className="mr-2 text-xl"
                                color="#4caf50"
                            />
                            Manage Users
                        </ResponsiveNavLink>
                    )}

                    <ResponsiveNavLink
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        <FaUserShield className="mr-2 text-green-500" />
                        Logout
                    </ResponsiveNavLink>
                </div>
            </div>

            {header && (
                <header className="bg-gray-100 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            <footer className="bg-gray-900 text-white py-8 dark:bg-gray-800 dark:text-white pt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Company Info */}
                        <div>
                            <h2 className="text-xl font-semibold">
                                Kyeeyo from Xurebuilt
                            </h2>
                            <p className="mt-2 text-sm text-gray-400 dark:text-gray-300">
                                We connect technicians in the construction
                                industry with clients for hassle-free,
                                professional construction services and help
                                companies find trusted experts and manage their
                                projects with ease.
                            </p>

                            <address className="mt-4 text-sm text-gray-400 dark:text-gray-300">
                                <h4>Find Us On</h4>
                                Plot 1 Lugard Street, Fortportal Tourism City,
                                Uganda
                                <br />
                                Call Us On: (+256) 772240510
                                <br />
                                <a
                                    href="mailto:info@xurebuilt.com"
                                    className="text-green-500 hover:text-green-400 dark:text-green-400"
                                >
                                    Email Us: info@xurebuilt.com
                                </a>
                            </address>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold">
                                Quick Links
                            </h3>
                            <ul className="mt-4 space-y-2 text-sm text-gray-400 dark:text-gray-300">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 dark:hover:text-green-400"
                                    >
                                        Our Store
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 dark:hover:text-green-400"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 dark:hover:text-green-400"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 dark:hover:text-green-400"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 dark:hover:text-green-400"
                                    >
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 dark:hover:text-green-400"
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social/Follow Us */}
                        <div>
                            <h3 className="text-xl font-semibold">Follow Us</h3>
                            <div className="mt-4 flex space-x-6">
                                {/* Replace these with actual social icons */}
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    <FaFacebook size={20} />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    <FaTwitter size={20} />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-600 dark:border-gray-700" />

                    <div className="text-center text-sm text-gray-400 dark:text-gray-300">
                        <p>Copyright © Xurebuilt {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
