"use client";
import React, { useState } from "react";
import Breadcrumds from "../common/Breadcrumds";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  let pageName = "My Account";

  let baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [load, setLoad] = useState(false);

  const [otp, setOtp] = useState("");

  // Forget password states
  const [forgetEmail, setForgetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Flags
  const [showOtp, setShowOtp] = useState(false);
  const [showForget, setShowForget] = useState(false);

  // Error states (per field)
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [forgetErrors, setForgetErrors] = useState({});

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = (e) => {
    e.preventDefault();
    let errors = {};
    if (!loginEmail) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(loginEmail))
      errors.email = "Invalid email address.";
    if (!loginPassword) errors.password = "Password is required.";
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("✅ Login successful!");
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  // ---------------- REGISTER HANDLER ----------------
  const handleRegister = (e) => {
    e.preventDefault();
    setLoad(true);
    let obj = {
      userEmail: registerEmail,
    };
    axios
      .post(`${baseUrl}user/send-otp`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        setLoad(false);
        if (finalRes.status) {
          alert(finalRes.message);
          setShowOtp(true);
        } else {
          alert(finalRes.message);
        }
      });
  };

  // ---------------- OTP HANDLER ----------------
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setOtpError("Please enter the OTP.");
      return;
    }

    let obj = {
      userName:registerName,
      userEmail:registerEmail,
      userPhone:registerPhone,
      userPassword:registerPassword,
      OTP:otp,
    };
    axios
      .post(`${baseUrl}user/create`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
      
        if (finalRes.status) {
          alert(finalRes.message);
         
        } else {
          alert(finalRes.message);
        }
      });


    
    setOtpError("");
   
  };

  // ---------------- FORGET PASSWORD HANDLER ----------------
  const handleForgetSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!forgetEmail) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(forgetEmail))
      errors.email = "Invalid email address.";
    if (!newPassword) errors.password = "New password is required.";
    setForgetErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("✅ Password reset successfully!");
      setShowForget(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumds pageName={pageName} />

      <div className="flex justify-center mt-6">
        <hr className="w-4/5 border-t-[1.5px] border-gray-300" />
      </div>

      <section className="w-4/5 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE - LOGIN */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>

          {!showForget ? (
            <form
              onSubmit={handleLogin}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                {/* Email */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {loginErrors.email && (
                  <p className="text-red-600 text-sm mb-3">
                    {loginErrors.email}
                  </p>
                )}

                {/* Password */}
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {loginErrors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {loginErrors.password}
                  </p>
                )}

                <p className="text-sm mt-3">
                  <a
                    href="#"
                    onClick={() => setShowForget(true)}
                    className="text-gray-600 hover:text-[#b76e79] transition-colors duration-300"
                  >
                    Lost your password?
                  </a>
                </p>
                <a
                  href="/Deshbord"
                  onClick={() => setShowForget(true)}
                  className="text-gray-600 hover:text-[#b76e79] transition-colors duration-300"
                >
                  Deshbord
                </a>
              </div>

              <div className="flex justify-end mt-6">
                <Link
                  href=""
                  className="bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Login
                </Link>
              </div>
            </form>
          ) : (
            // Forget Password
            <form
              onSubmit={handleForgetSubmit}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Reset Password
                </h2>

                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgetEmail}
                  onChange={(e) => setForgetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {forgetErrors.email && (
                  <p className="text-red-600 text-sm mb-3">
                    {forgetErrors.email}
                  </p>
                )}

                <label className="block text-gray-700 text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {forgetErrors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {forgetErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowForget(false)}
                  className="text-gray-600 hover:text-[#b76e79] transition duration-300"
                >
                  ← Back to Login
                </button>
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT SIDE - REGISTER */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Register
          </h1>

          {!showOtp ? (
            <form
              onSubmit={handleRegister}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Enter your Name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="Enter your Phone"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {registerErrors.email && (
                  <p className="text-red-600 text-sm mb-3">
                    {registerErrors.email}
                  </p>
                )}

                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {registerErrors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {registerErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={load}
                  className="flex gap-2 bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Register
                  {load && (
                    <div
                      class="w-6 h-6 rounded-full animate-spin
                    border-3 border-solid border-white border-t-transparent"
                    ></div>
                  )}
                </button>
              </div>
            </form>
          ) : (
            // OTP
            <form
              onSubmit={handleOtpSubmit}
              className="border border-gray-300 rounded-xl p-8 shadow-sm h-[410px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Verify OTP
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Enter the 6-digit OTP sent to your email.
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#b76e79] placeholder-black"
                />
                {otpError && (
                  <p className="text-red-600 text-sm mt-1">{otpError}</p>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowOtp(false)}
                  className="text-gray-600 hover:text-[#b76e79] transition duration-300"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-[#b76e79] text-white px-6 py-2 rounded-lg transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
