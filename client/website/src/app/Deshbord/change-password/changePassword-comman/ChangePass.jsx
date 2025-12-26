import React from "react";

export default function ChangePass() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>

      <form className="bg-white border border-gray-200 rounded-lg p-8">
        {/* Current Password */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-3">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-3">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-gray-900 font-medium mb-3">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Change Password Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-[#C09578] text-white font-semibold rounded-full hover:bg-[#a67d61] transition-colors uppercase tracking-wide">
            CHANGE PASSWORD
          </button>
        </div>
      </form>
    </div>
  );
}