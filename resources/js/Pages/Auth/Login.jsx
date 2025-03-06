import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

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
                                    onClick={() => setShowPassword(!showPassword)}
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
