import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { VscGitCompare } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import { useRef } from "react";
import { Link as ScrollLink } from 'react-scroll';


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const productsRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cart = useSelector((state) => state.cart);

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const { isSuccess } = useQuery({
    queryKey: ["getUser"],
    cacheTime: 15 * (60 * 1000),
    staleTime: 10 * (60 * 1000),
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (token === null) {
        throw new Error("Error retrieving user details");
      }

      try {
        const response = await axios.post("http://localhost:4000/profile", {
          token: token,
        });
        if (response.data.status === "ok") {
          return response.data.user; // Update user state with received user data
        } else {
          console.error("Error retrieving user details:", response.data.data);

          throw new Error("Error retrieving user details");
        }
      } catch (error) {
        console.error("Error retrieving user details:", error.message);

        throw new Error("Error retrieving user details");
      }
    },
  });

  return (
    <Disclosure as="nav" className="bg-color1">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center ">
                <Link to="/">
                  <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-4 md:space-x-2 ">
                    <img
                      className="h-11 w-auto"
                      src="/multimaster.svg"
                      alt="Multimaster logo"
                    />
                    <p
                      className="text-white"
                      style={{
                        fontFamily: "Goldman, sans-serif",
                        letterSpacing: "0.05em",
                        fontSize: "18px",
                      }}
                    >
                      multimaster
                    </p>
                  </div>
                </Link>
                <div className="hidden lg:ml-20 sm:ml-7 md:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link
                      to="/"
                      className="rounded-md bg-color3 px-3 py-2 text-sm font-medium text-white"
                      style={{ fontSize: "13px" }}
                    >
                      Store
                    </Link>
                    {/* <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-color2 hover:text-white"
                      style={{ fontSize: "13px" }}
                    >
                      Store
                    </a> */}
                    <Link
                      // href="#"
                      to="/ReviewsDetails"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-color2 hover:text-white"
                      style={{ fontSize: "13px" }}
                    >
                      Reviews
                    </Link>
                    <Link
                      // href="#"
                      to="/checkrepair"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-color2 hover:text-white"
                      style={{ fontSize: "13px" }}
                    >
                      Repair Status
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 lg:block">
                <div className="flex items-center">
                <ScrollLink to="searchSection" smooth={true} duration={500}>
                  <button
                    type="button"
                    
                    className="relative rounded-full bg-color2 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Search</span>
                    <CiSearch
                      className="h-6 w-6 pr-0.5 pl-0.5"
                      aria-hidden="true"
                    />
                  </button>
                  </ScrollLink>
                  <button
                    type="button"
                    className="relative rounded-full bg-color2 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4 "
                    onClick={() => {
                      if (getTotalQuantity() > 0) {
                        navigate("/cart");
                      }
                    }}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Cart</span>
                    <BsCart2 className="h-6 w-6 pr-1 pl-1" aria-hidden="true" />
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-color4 text-white text-xs rounded-full">
                      {getTotalQuantity() || 0}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate("/compare");
                    }}
                    className="relative rounded-full bg-color2 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Compare</span>
                    <VscGitCompare
                      className="h-6 w-6 pr-1 pl-1"
                      aria-hidden="true"
                    />
                  </button>

                  <div>
                    {!isSuccess ? (
                      <NavLink to={`/login`}>
                        <button className="block  ml-10 w-16 rounded-md bg-color2 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-color3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Login
                        </button>
                      </NavLink>
                    ) : (
                      <Menu
                        as="div"
                        className="relative ml-3 pl-5 hidden sm:block"
                      >
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/orderhistory" // replace with your actual route
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Order History
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={async () => {
                                    await localStorage.removeItem("token");
                                    queryClient.removeQueries({
                                      queryKey: ["getUser"],
                                    });
                                    navigate("/");
                                  }}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className=" lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md bg-color3 px-3 py-2 text-base font-medium text-white"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Store
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Technician
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Repair Stauts
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    tom@example.com
                  </div>
                </div>
                {/* <button 
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <CiSearch className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
