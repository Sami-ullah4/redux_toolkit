import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo / Brand */}
          <div className="text-xl font-bold text-blue-600">MySite</div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>

          {/* Search Bar */}
          <div className="flex items-center border rounded-md px-2 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none px-2 py-1 w-32 md:w-48"
            />
            <button className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 ml-2">
              Search
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
