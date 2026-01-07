"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../redux/slice/userSlice";
import { redirect } from "next/navigation";
import { fetchCart } from "../redux/slice/cartSlice";

export default function Header() {
  let token = useSelector((myAllsore) => myAllsore.userStore.token);

  
  
  let dispatch=  useDispatch()



  let [click, setClick] = useState(false);

  let handleclick = () => {
    setClick(true);
  };

  let handleclose = () => {
    setClick(false);
  };

  useEffect(() => {
    handleclick;
    handleclose;
  }, []);


  let logOut=()=>{
    dispatch(clearToken())
    redirect('/Login-Register')
  }
useEffect(()=>{
  dispatch(fetchCart())
},[token])

let cart=useSelector((myAllsore) => myAllsore.cartStore.cart);


  return (
    <header className="w-full font-poppins sticky top-0 z-50 bg-white text-black">
      <div className="border-b border-gray-300 py-2">
        <div className="max-w-[1320px] mx-auto flex justify-between items-center px-4">
          <p className="text-sm text-black">
            Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com
          </p>
          {token ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <Link
              href="/Login-Register"
              className="text-sm text-black hover:text-[#b76e79] transition"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>

      <div className="border-b border-gray-300 bg-white py-4">
        <div className="max-w-[1320px] mx-auto flex justify-between items-center gap-4 px-4">
          <div className="w-[150px]">
            <img
              src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
              alt="Logo"
              className="w-full"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-[600px]">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-sm outline-none text-black"
            />
            <button className="px-4 py-2 text-black hover:text-[#b76e79] transition">
              <FaSearch />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/Wish-list">
              <button className="border border-gray-300 rounded-full px-3 py-2 flex items-center justify-center hover:border-[#C09578] hover:text-[#C09578] transition">
                <FaHeart />
              </button>
            </Link>

           
          <Link href={'/cart'}>
            <button
              
              className="border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-[#b76e79] hover:text-[#b76e79] transition"
            >
              <span className="text-sm text-black">Add to Cart</span>
              <FaShoppingCart /> ({cart.length})
              <FaAngleDown />
            </button>
            </Link>
          </div>
        </div>
      </div>

      <nav className="border-b border-gray-300 py-3">
        <div className="max-w-[1320px] mx-auto flex justify-center items-center">
          <ul className="flex items-center gap-10 text-[15px] font-bold text-black ">
            <li>
              <Link href="/" className="hover:text-[#b76e79] transition">
                HOME
              </Link>
            </li>

            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-[#b76e79]"
              >
                LIVING <FaAngleDown />
              </a>

              <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-lg border border-gray-300 p-4 gap-10 min-w-max">
                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">Tables</li>
                  <li>
                    <Link
                      href="/Product-Listing-page"
                      className="hover:text-[#b76e79] block"
                    >
                      Living Room
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Product-Listing-page"
                      className="hover:text-[#b76e79] block"
                    >
                      Side and End Tables
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Nest Of Tables
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Coffee Table Sets
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Coffee Tables
                    </a>
                  </li>
                </ul>

                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">Mirror</li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Wooden Mirror
                    </a>
                  </li>
                </ul>
                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">
                    Living Storage/collections
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Prayer Units
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Display Unit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Shoe Racks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Chest Of Drawers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Cabinets and Sideboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Bookshelves
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Tv Units
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-[#b76e79]"
              >
                SOFA <FaAngleDown />
              </a>

              <div className="gap-10 absolute top-full left-0 hidden group-hover:flex bg-white shadow-lg border border-gray-300 p-4 min-w-max transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">Sofa Cum Bed</li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Wooden Sofa Cum Bed
                    </a>
                  </li>
                </ul>

                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">Sofa Seat</li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      L Shape Sofa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      1 Seater Sofa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      2 Seater Sofa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      3 Seater Sofa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Wooden Sofa Sets
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Normal
                    </a>
                  </li>
                </ul>

                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">Swing Jhula</li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      Wooden Jhula
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-[#b76e79]"
              >
                PAGE <FaAngleDown />
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg border border-gray-300 p-4 w-48">
                <ul className="space-y-2 text-black">
                  <li className="text-[16px] text-[#b76e79]">Main Page</li>
                  <li>
                    <Link
                      href="/about-us"
                      className="hover:text-[#b76e79] block"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Shoping-Cart"
                      className="hover:text-[#b76e79] block"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#b76e79] block">
                      CheckOut
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/FAQ-Section"
                      className="hover:text-[#b76e79] block"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link
                href="/Contact-us"
                className="hover:text-[#b76e79] transition"
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
