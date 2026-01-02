"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ResetPassword() {
  let urlParms = useSearchParams()
  let resetToken = urlParms.get("token");

  let handleResetPassword=(e)=>{
  
    e.preventDefault();
    let newPassword=e.target.password.value;
    let confirmPassword=e.target.confirmPassword.value;
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
     let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
    let obj={
      newPassword,
      confirmPassword,
      
    }
    axios.post(`${apiBaseUrl}user/reset-password`,obj,{
      headers:{
         Authorization:`Bearer ${resetToken}`
      }
    })
    .then((res)=>res.data)
    .then((finalRes)=>{
      console.log(finalRes);
      
    })
   
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
     
      <form onSubmit={handleResetPassword} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
        
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="confirm-password"
            name="confirmPassword"
            id="confirm-password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div className=" ">
          
          
          <button className="ml-auto text-sm text-primary-600 hover:underline dark:text-primary-500">
            
            Reset Password
          </button>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Reset passwod
        </button>
      </form>
    </div>
  </div>
</section>

    </div>
  )
}
