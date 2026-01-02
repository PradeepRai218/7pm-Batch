"use client"
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyProfile() {

  let token =useSelector((myAllstrore)=>myAllstrore.userStore.token)
  let [userPhoto,setUserPhoto]=useState(null)
  let [user,setUser]=useState(
    {
     userName:"",
     userGender:"Male",
     userEmail:"",
     userAddress:"" ,
     userPhone:"",  
    }
  )
  
  let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;

  let userData=()=>{
     axios.post(`${apiBaseUrl}user/user-details`,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
     .then((res)=>res.data)
     .then((finalRes)=>{
      console.log(finalRes.data);
      setUser({
        userName:finalRes.data.userName,
        userGender:finalRes.data.userGender,
        userEmail:finalRes.data.userEmail,
        userPhone:finalRes.data.userPhone,
        userAddress:finalRes.data.userAddress,
      })
      
     })
  }

  let getValueorSetValue=(e)=>{
    let {name,value}=e.target;
    let tempUser={...user};
    tempUser[name]=value;
    setUser(tempUser);

  }


  let userUpdate=(e)=>{
    e.preventDefault();
    let userdata=new FormData(e.target);
    axios.post(`${apiBaseUrl}user/update-profile`,userdata,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((res)=>res.data)
    .then((finalRes)=>{
      userData()
     
    })
  }

  useEffect(()=>{
      userData()
  },[token])
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <form onSubmit={userUpdate} className="bg-white border border-gray-200 rounded-lg p-8">
        {/* Gender Radio Buttons */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
            
              value="Male"
              name="userGender"
              checked={user.userGender==="Male"}
              className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-900 font-medium">Mr.</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
             
               name="userGender"
              value="Female"
              checked={user.userGender==="Female"}
              className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-900 font-medium">Mrs.</span>
          </label>
        </div>

        {/* Name Field */}
        <div className="mb-6 border-1">
          <label className="block text-gray-900 font-medium mb-2">
            UserPhoto*
          </label>
          <img src="" alt="" />
          <input
           
            type="file"
            name="userPhoto"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-2">
            Name*
          </label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={getValueorSetValue}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-2">
            Email*
          </label>
          <input
            type="email"
            name="userEmail"
            value={user.userEmail}
            className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readOnly
          />
        </div>

        {/* Mobile Number Field */}
        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-2">
            Mobile Number*
          </label>
          <input
            type="tel"
            name="userPhone"
           value={user.userPhone}
             readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Address Field */}
        <div className="mb-8">
          <label className="block text-gray-900 font-medium mb-2">
            Address*
          </label>
          <input
            type="text"
            name="userAddress"
            value={user.userAddress}
              onChange={getValueorSetValue} 
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <button className="px-10 py-3 bg-[#C09578] text-white font-semibold rounded-full hover:bg-[#a67d61] transition-colors">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}