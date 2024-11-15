// DrawerComponent.js
import { Drawer } from "flowbite-react"

const DrawerComponent = ({ open, onClose }) => {
    return (
        <div>
            <Drawer open={open} onClose={onClose} className="bg-gray-900">
                <Drawer.Header
                    title="Edit your info"
                    className="mb-4 text-white"
                />
                <Drawer.Items>
                    <p className="mb-1 text-m text-white dark:text-gray-400">
                        Your username:
                    </p>
                    <input
                        className="border-2 bg-gray-100 mb-4"
                        placeholder="username"
                    ></input>
                    <p className="mb-1 text-m text-white dark:text-gray-400">
                        Your display name:
                    </p>
                    <input
                        className="border-2 bg-white mb-4"
                        placeholder="name"
                    ></input>
                    <p className="mb-1 text-m text-white dark:text-gray-400">
                        Reset your password:
                    </p>
                    <input
                        className="border-2 bg-white mb-4"
                        placeholder="password"
                    ></input>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                            Update
                            <svg
                                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </div>
                </Drawer.Items>
            </Drawer>
        </div>
    )
}

export default DrawerComponent
