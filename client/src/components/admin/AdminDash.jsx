import { Fragment, useState } from "react";
import Store from "./Product";

import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  ArchiveBoxIcon,
  AcademicCapIcon,
  TableCellsIcon,
  DocumentIcon,
  ArrowPathRoundedSquareIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function AdminDash({ currentPage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 " onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  {sidebarOpen && (
                  <div className={`flex grow flex-col gap-y-5 overflow-y-auto bg-color1 px-6 pb-2 pt-3 ${sidebarOpen ? '' : 'hidden'}`}>
                    <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-4 md:space-x-2 ">
                      <img
                        className="h-10 w-auto "
                        src="/multimaster.svg"
                        alt="Multimaster Logo"
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
                    <nav className="flex flex-1 flex-col mt-10">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <li>
                              <Link to="/dashboard">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2  ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <HomeIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Dashboard
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/admin-products">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2  ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <BuildingStorefrontIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Store
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/orderview">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <ArchiveBoxIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Order
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/repairform">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <DocumentIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Submit Repair
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/repairtable">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <TableCellsIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Repair Details
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/ReviewsTable">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <TableCellsIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Review Details
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/ReviewsReply">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <ArrowPathRoundedSquareIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Review Reply
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/adminDash">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <UsersIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Admin Management
                                </button>
                              </Link>
                            </li>
                            <li>
                              <Link to="/adminlogin">
                                <button className="text-indigo-200 hover:text-white w-11/12 hover:bg-color2 group flex gap-x-3 rounded-md p-2 ml-2 mb-3  text-sm leading-6 font-semibold">
                                  {/* Replace with your icon */}
                                  <ArrowLeftStartOnRectangleIcon
                                    className="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Sign Out
                                </button>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-color1 px-4 py-4 shadow-sm sm:px-6 ">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-indigo-200 "
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-7 w-7" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            {/* <UserCircleIcon  className="h-8 w-auto rounded-full bg-color2"/> */}
            <img
              className="h-10 w-auto rounded-full bg-indigo-700"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 ">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Your content */}
            {currentPage}
          </div>
        </main>
      </div>
    </>
  );
}
