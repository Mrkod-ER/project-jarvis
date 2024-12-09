'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            ☰
          </button>
        </div>

        {/* Navbar Links - Shown horizontally on medium and larger screens */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          {/* <Link href="/about" className="text-white">
            About
          </Link> */}

          {/* Services Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="text-white focus:outline-none">
              Services
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link href="/routine" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  routine-management
                </Link>
                <Link href="/todolist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  To-Do List
                </Link>
                <Link href="/share-holding" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Share Holding ...nextupdate
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-white">
            Contact
          </Link>
        </div>

        {/* Profile Dropdown / Sign In Button */}
        <div className="relative">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Menu - Shown vertically when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link href="/" className="block text-white px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
            Home
          </Link>
          <Link href="/about" className="block text-white px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
            About
          </Link>

          {/* Services Dropdown in Mobile View */}
          <div className="block text-white px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
            <button onClick={toggleDropdown} className="w-full text-left focus:outline-none">
              Services
            </button>
            {dropdownOpen && (
              <div className="mt-2 space-y-2">
                <Link href="/routine" className="block text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">
                 routine-management
                </Link>
                <Link href="/todolist" className="block text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">
                  To-Do List
                </Link>
                <Link href="/share-holding" className="block text-white px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500">
                  Share Holding ...nextupadate
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="block text-white px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
