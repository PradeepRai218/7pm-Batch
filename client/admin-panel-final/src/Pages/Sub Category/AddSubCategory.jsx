import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function AddSubCategory() {

   let [parentCategorydata,setParentCategorydata]=useState([])
    let pImage = import.meta.env.VITE_PREVIEWIMAGE;
  
    let [imagePreview, setImagepreview] = useState(pImage);
    let apiBaseUrl = import.meta.env.VITE_APIBASE;
  
 
    let {id} = useParams()
    let navigate = useNavigate();


  let changeImage = (e) => {
    //Path URL.createObjectURL(e.target.files[0]) ->State
    setImagepreview(URL.createObjectURL(e.target.files[0])); //Url  Create
    
  };

  let saveSubCategory=(e)=>{
      e.preventDefault();
    let form = e.target; //Form

    let formValue = new FormData(form); //Form --> Form Data
    axios
      .post(`${apiBaseUrl}/subcategory/create`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
         
          setTimeout(() => {
            navigate("category/sub-category/view");
          }, 2000);
        } else {
          toast.error(finalRes.error.colorName);
        }
        
      });
  }

  let getParentCategory=()=>{
       axios
      .get(`${apiBaseUrl}/subcategory/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setParentCategorydata(finalRes.data);
       
      });
  }

  useEffect(()=>{
      getParentCategory()
  },[])


  return (
    <section className="w-full">
      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"Add"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form  onSubmit={saveSubCategory} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
               <div className="relative">
                                <img src={imagePreview} width={"20%"} alt="" />
                                <MdDelete
                                  onClick={() => {
                                    setImagepreview(pImage);
                                  }}
                                  className="absolute right-0 top-0 text-3xl text-red-500"
                                />
                                <input  
                                 onChange={changeImage} 
                                 type="file"
                                  name="subcategoryImage"
                                  
                                  />
                              </div>
              

              <div className="w-2/3">
              {/* Parent Category Dropdown */}
              <div className="mb-5">
                  <label className="block  text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    name="parentCategory"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {
                      parentCategorydata.map((obj,index)=>
                         <option key={index} value={obj._id}> {obj.categoryName} </option> )
                    }
                    
                    
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="subcategoryName"
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                 
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="text"
                 
                    id="categoryName"
                    name="subcategoryOrder"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Order"
                  />
                 
                </div>
                
              </div>


            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {id ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
