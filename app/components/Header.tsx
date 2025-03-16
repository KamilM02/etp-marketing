"use client";

import { Navbar } from "flowbite-react";

export default function Header() {
  return (
    <Navbar fluid={true} rounded={true} className="w-full bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Navbar.Brand href="#" className="flex items-center space-x-4">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-gray-700">
          MasterTicket
        </span>
      </Navbar.Brand>

      {/* Toggle Button (for mobile screens) */}
      <Navbar.Toggle />

      {/* Navbar Menu */}
      <Navbar.Collapse className="font-medium flex flex-col md:space-x-8 rtl:space-x-reverse mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:space-x-8 text-md py-3 px-4 md:py-0">
        <Navbar.Link href="#" active className="py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500">
          Home (Book Now or List Events?)
        </Navbar.Link>
        <Navbar.Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
          Create Event
        </Navbar.Link>
        <Navbar.Link
          href="/marketing" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
          Marketing
        </Navbar.Link>
        <Navbar.Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
          Resale
        </Navbar.Link>
        <Navbar.Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
          Admin?
        </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
