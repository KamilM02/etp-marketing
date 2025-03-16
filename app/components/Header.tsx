"use client";

import Link from 'next/link';
import { Navbar } from 'flowbite-react';

export default function Header() {
  return (
    <Navbar fluid rounded className="w-full bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Navbar.Brand href="#">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-gray-700">
          MasterTicket
        </span>
      </Navbar.Brand>

      {/* Toggle Button for mobile screens */}
      <Navbar.Toggle />

      {/* Navbar Menu */}
      <Navbar.Collapse className="font-medium flex flex-col md:space-x-8 rtl:space-x-reverse mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:space-x-8 text-md py-3 px-4 md:py-0">
          <Link
            href="/"
            className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="#"
            className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100"
          >
            Create Event
          </Link>
          <Link
            href="/marketing"
            className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100"
          >
            Marketing
          </Link>
          <Link
            href="#"
            className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100"
          >
            Resale
          </Link>
          <Link
            href="#"
            className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100"
          >
            Admin?
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
