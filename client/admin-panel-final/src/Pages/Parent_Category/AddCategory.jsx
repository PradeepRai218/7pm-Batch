import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { MdDelete } from "react-icons/md";

import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function AddCategory() {
  let pImage = import.meta.env.VITE_PREVIEWIMAGE;

  let [imagePreview, setImagepreview] = useState(pImage);
  let apiBaseUrl = import.meta.env.VITE_APIBASE;

  // update work
  const [updateIdState, setUpdateIdState] = useState(false);
  let updateId = useParams().id;
  let navigate = useNavigate();

  let saveCategory = (e) => {
    e.preventDefault();
    let form = e.target; //Form

    let formValue = new FormData(form); //Form --> Form Data
    axios
      .post(`${apiBaseUrl}/category/create`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          toast.success(finalRes._message);
          setTimeout(() => {
            navigate("/category/view");
          }, 2000);
        } else {
          toast.error(finalRes.error.colorName);
        }
        // finalRes._status  == True
      });
  };

  let changeImage = (e) => {
    //Path URL.createObjectURL(e.target.files[0]) ->State
    setImagepreview(URL.createObjectURL(e.target.files[0])); //Url  Create
  };

  return (
    <section className="w-full">
      <ToastContainer />
      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link
              to={"/home"}
              className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link
                to={"/category/view"}
                className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2"
              >
                Category
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">
                {updateIdState ? "Update" : "Add"}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Category" : "Add Category"}
          </h3>
          <form
            onSubmit={saveCategory}
            autoComplete="off"
            className="border border-t-0 p-3 rounded-b-md border-slate-400"
          >
            <div className="flex gap-5">
              <div className="w-1/3">
                <div className="relative">
                  <img src={imagePreview} width={"100%"} alt="" />
                  <MdDelete
                    onClick={() => {
                      setImagepreview(pImage);
                    }}
                    className="absolute right-0 top-0 text-3xl text-red-500"
                  />
                </div>

                <label className="block  text-md font-medium text-gray-900">
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="categoryImage"
                  id="categoryImage"
                  className="dropify"
                  data-height="250"
                  onChange={changeImage}
                />
              </div>
              <div className="w-2/3">
                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    name="categoryOrder"
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
