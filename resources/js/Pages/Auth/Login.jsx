import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FaGoogle } from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex items-center justify-center">
                {/* Page Container with Gradient Background */}
                <div
                    className="w-full max-w-sm p-3 rounded-lg  bg-neutral-50 dark:bg-gray-900 
                                 
                          text-gray-900 dark:text-white transition-all duration-300"
                >
                    <ApplicationLogo className="w-72 h-40 fill-current text-gray-500" />

                    {/* Header Section */}
                    <div className="mb-6 text-center">
                        <p className="text-lg font-extrabold  text-gray-900 dark:text-gray-300">
                            Gain experience. Build your career.
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-300">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Enter your email"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-gray-100 dark:text-gray-300">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-900 dark:text-blue-400">
                                    Remember me
                                </span>
                            </label>

                            {/* Forgot Password Link */}
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-900 dark:text-blue-400 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Login Button */}
                        <div className="flex flex-col space-y-4">
                            <PrimaryButton className="w-full bg-gray-900 text-indigo-600 dark:bg-indigo-500 dark:text-white hover:bg-gray-200 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 focus:bg-gray-800 dark:focus:bg-indigo-600 flex items-center justify-center">
                                Log in
                            </PrimaryButton>

                            {errors?.error && (
                                <div className="mb-4 text-red-500 text-sm">
                                    {errors.error}
                                </div>
                            )}

                            {/* Google Login Link */}
                            <div className="text-center">
                                <a
                                    href={route("auth.google")}
                                    className="w-full flex items-center justify-center space-x-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M44.5 20H24v8.5h11.8C34 34 29.6 38 24 38c-7.3 0-13-5.9-13-13s5.9-13 13-13c3.2 0 6.1 1.2 8.3 3.1l6.2-6.2C34.8 5 29.7 3 24 3 11.8 3 2 12.8 2 25s9.8 22 22 22c11 0 21-8 21-22 0-1.2-.1-2.5-.5-3.7z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M6.5 14.7l6.6 4.8C15.3 15.5 19.3 13 24 13c3.2 0 6.1 1.2 8.3 3.1l6.2-6.2C34.8 5 29.7 3 24 3 16.1 3 9 7.2 6.5 14.7z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M24 47c6.1 0 11.7-2 16-5.3l-6.6-5c-2.3 1.6-5.3 2.5-9.4 2.5-5.6 0-10.2-3.8-11.8-8.8l-6.7 5.2C9 42 16 47 24 47z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M44.5 20H24v8.5h11.8c-.6 4-4.3 6.5-8.3 6.5-2.4 0-4.5-.8-6.1-2l-6.6 5c2.7 2.7 6.3 4 10.6 4 5 0 9.2-1.7 12.3-4.5 3.1-2.8 4.7-6.5 4.7-11.3 0-1.2-.1-2.5-.5-3.7z"
                                        />
                                    </svg>
                                    <span className="text-gray-700 dark:text-white font-medium">
                                        Continue with Google
                                    </span>
                                </a>
                            </div>

                            {/* Register Link */}
                            <div className="text-center">
                                <span className="text-sm text-blue-400 dark:text-gray-300">
                                    New here?{" "}
                                    <Link
                                        href={route("register")}
                                        className="text-blue-400 dark:text-blue-400 font-medium hover:underline"
                                    >
                                        Create Your Account
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
