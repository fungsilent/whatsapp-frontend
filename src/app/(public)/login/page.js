"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import useFetch from "#root/hooks/useFetch";
import { signin } from "#root/api/user";
import { useAppStore } from "#root/app/store";
import Link from "next/link";

const LoginPage = () => {
    const { setUser } = useAppStore();
    const [dispatchSignin, user, isLoading, error] = useFetch();
    const [{ username, password }, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            setUser(user);
            redirect("/");
        }
    }, [user]);

    const doLogin = () => {
        dispatchSignin(() => signin({ username, password }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            doLogin();
        }
    };

    const setFormValue = (event) => {
        event.target.value;
        setForm((state) => ({
            ...state,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <section className="bg-darkblue-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    WhatsLam
                </Link>
                <div className="w-full bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={setFormValue}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={setFormValue}
                                    onKeyDown={handleKeyDown}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>

                            <button
                                type="button"
                                onClick={doLogin}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    href="/signup"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
