"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFetch from "#root/hooks/useFetch";
import { signup } from "#root/api/user";
import Link from "next/link";
import { useAppStore } from "#root/app/store";

const Signup = () => {
    const { setUser } = useAppStore();
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState("");
    const [dispatchSignup, user, isLoading, error] = useFetch({
        log: "signup",
    });

    useEffect(() => {
        if (user) {
            setUser(user);
            router.push("/");
        }
    }, [user]);

    const doSignup = () => {
        if (form.password !== form.confirmPassword) {
            return setFormError("Confirm password incorrect");
        }
        dispatchSignup(() => signup(form));
    };

    // 如果撞名彈警告
    const onFormChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "confirmPassword") {
            setFormError("");
        }
        if (name === "username") {
            value = value.toLowerCase();
        }
        setForm({
            ...form,
            [name]: value,
        });
    };

    return (
        <>
            <section className="bg-darkblue-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        Flowbite
                    </a>
                    <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                                    >
                                        Your username
                                    </label>
                                    <input
                                        name="username"
                                        type="text"
                                        value={form.username}
                                        onChange={onFormChange}
                                        minLength={4}
                                        maxLength={10}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                                    >
                                        Your display name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={onFormChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={onFormChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={onFormChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div>
                                    {formError && <p>{formError}</p>}
                                    {error && <p>{error}</p>}
                                </div>

                                <button
                                    type="button"
                                    onClick={doSignup}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
