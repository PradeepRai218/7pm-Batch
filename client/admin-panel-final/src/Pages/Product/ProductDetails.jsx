import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  let [parentCategorydata, setParentCategorydata] = useState([]);
  let [subCategorydata, setSubCategorydata] = useState([]);
  let [subsubCategorydata, setsubSubCategorydata] = useState([]);
  let [color, setColor] = useState([]);

  //Form Data State
  let [formValue, setFormvalue] = useState({
    productName: "",
    parentCategory: "",
    subCategory: "",
    subsubCategory: "",
    productColor: [],
    prodcutType: null,
    prodcutBestSelling: null,
    prodcutIsUpsell: null,
    productPrice: "",
    productSalePrice: "",
    productOrder: "",
    productStock: "",
    prodcutTopRated: "",
  });

  let getValueSetvalue = (e) => {
    let oldObj = { ...formValue };
    let inputName = e.target.name; //colorName
    let inputValue = e.target.value;
    oldObj[inputName] = inputValue;
    setFormvalue(oldObj);
  };

  let apiBaseUrl = import.meta.env.VITE_APIBASE;

  const [value, setValue] = useState("");

  let updateId = useParams().id;

  let [productData, setProductData] = useState(null);
  let [path, setPath] = useState("");

  let productCreate = (e) => {
    e.preventDefault();
    let form = e.target; //Form

    let formValue = new FormData(form); //Form --> Form Data
    formValue.append("productDescription", value);

    axios
      .post(`${apiBaseUrl}/product/create`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);
      });
  };

  let getParentCategory = () => {
    axios
      .get(`${apiBaseUrl}/product/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setParentCategorydata(finalRes.data);
      });
  };

  let subCategory = (e) => {
    // console.log(e.target.value);

    let oldObj = { ...formValue };
    let inputName = e.target.name; //colorName
    let inputValue = e.target.value;
    oldObj[inputName] = inputValue;
    setFormvalue(oldObj);

    let parentId = e.target.value;

    axios
      .get(`${apiBaseUrl}/product/sub-category/${parentId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setSubCategorydata(finalRes.data);
      });
  };

  //Edit Case
  let subCategoryonEdit = (id) => {
    // console.log(e.target.value);

    let parentId = id;

    axios
      .get(`${apiBaseUrl}/product/sub-category/${parentId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setSubCategorydata(finalRes.data);
      });
  };

  let subSubCategory = (e) => {
    let parentId = e.target.value;
    let oldObj = { ...formValue };
    let inputName = e.target.name; //colorName
    let inputValue = e.target.value;
    oldObj[inputName] = inputValue;
    setFormvalue(oldObj);

    axios
      .get(`${apiBaseUrl}/product/sub-sub-category/${parentId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setsubSubCategorydata(finalRes.data);
      });
  };

  let subSubCategoryonEdit = (id) => {
    axios
      .get(`${apiBaseUrl}/product/sub-sub-category/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setsubSubCategorydata(finalRes.data);
      });
  };

  let getColors = () => {
    axios
      .get(`${apiBaseUrl}/product/color`)
      .then((res) => res.data)
      .then((finalRes) => {
        setColor(finalRes.data);
      });
  };

  let productDetails = (id) => {
    axios
      .get(`${apiBaseUrl}/product/details/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        let { productDetails } = finalRes;

        subCategoryonEdit(productDetails.parentCategory._id);
        subSubCategoryonEdit(productDetails.subCategory._id);
        setFormvalue({
          productName: productDetails.productName,
          parentCategory: productDetails.parentCategory._id,
          subCategory: productDetails.subCategory._id,
          subsubCategory: productDetails.subsubCategory._id,
          productColor: [],
          prodcutType: productDetails.prodcutType,
          prodcutBestSelling: productDetails.prodcutBestSelling,
          prodcutIsUpsell: productDetails.prodcutIsUpsell,
          prodcutTopRated: productDetails.prodcutTopRated,
          productPrice: productDetails.productPrice,
          productSalePrice: productDetails.productSalePrice,
          productOrder: productDetails.productOrder,
          productStock: productDetails.productStock,
        });
        setValue(productDetails.productDescription);
        setPath(finalRes.path);
      });
  };

  useEffect(() => {
    getParentCategory();
    getColors();
  }, []);

  useEffect(() => {
    if (updateId) {
      productDetails(updateId);
    }
  }, [updateId]);

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  return (
    <section className="w-full">
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
                to={"/product/view"}
                className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2"
              >
                Product
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">
                {updateId ? "Update" : "Add"}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="w-full px-6 py-6  ">
        <form onSubmit={productCreate}>
          <div className="grid grid-cols-3 gap-[10px] ">
            {/* for left */}
            <div className="for-images ">
              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="ProductImage"
                  name="productImage"
                  className="dropify"
                  data-height="160"
                />
              </div>

              <div className="">
                <label
                  htmlFor="backImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Back Image
                </label>
                <input
                  type="file"
                  id="backImage"
                  name="productbackImage"
                  className="dropify"
                  data-height="160"
                />
              </div>

              <div className="">
                <label
                  htmlFor="GalleryImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Gallery Image
                </label>
                <input
                  type="file"
                  id="GalleryImage"
                  multiple
                  name="productGallery"
                  className="dropify"
                  data-height="160"
                />
              </div>
            </div>

            {/* for midd */}
            <div className="middle">
              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Prodct Name
                </label>
                <input
                  type="text"
                  value={formValue.productName}
                  onChange={getValueSetvalue}
                  name="productName"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Prodct Name"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select
                  name="subCategory"
                  onChange={subSubCategory}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Select Category</option>
                  {subCategorydata.map((obj, index) => (
                    <option
                      selected={obj._id == formValue.subCategory}
                      value={obj._id}
                    >
                      {obj.subcategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Meterial
                </label>
                <select className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Neem</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Prodcut Type
                </label>
                <select
                  name="prodcutType"
                  onChange={getValueSetvalue}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={formValue.prodcutType == 1}>
                    Featured
                  </option>
                  <option value="2" selected={formValue.prodcutType == 2}>
                    New Arrivals
                  </option>
                  <option value="3" selected={formValue.prodcutType == 3}>
                    Onsale
                  </option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Top Rated
                </label>
                <select
                  name="prodcutTopRated"
                  onChange={getValueSetvalue}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  <option
                    value="1"
                    selected={formValue.prodcutTopRated == true}
                  >
                    Yes
                  </option>
                  <option
                    value="0"
                    selected={formValue.prodcutTopRated == false}
                  >
                    No
                  </option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                  type="text"
                  name="productPrice"
                  onChange={getValueSetvalue}
                  value={formValue.productPrice}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Actual Price"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Total In Stocks
                </label>
                <input
                  type="text"
                  name="productStock"
                  onChange={getValueSetvalue}
                  value={formValue.productStock}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Total In Stocks"
                />
              </div>
            </div>

            {/* for right */}
            <div className="right-items">
              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Parent Category
                </label>
                <select
                  name="parentCategory"
                  onChange={subCategory}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  {parentCategorydata.map((obj, index) => (
                    <option
                      value={obj._id}
                      selected={obj._id == formValue.parentCategory}
                    >
                      {" "}
                      {obj.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Sub Category
                </label>
                <select
                  name="subsubCategory"
                  onChange={getValueSetvalue}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  {subsubCategorydata.map((obj, index) => (
                    <option
                      selected={obj._id == formValue.subsubCategory}
                      value={obj._id}
                    >
                      {obj.subSubcategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select
                  multiple
                  name="productColor[]"
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  {color.map((obj, index) => (
                    <option value={obj._id}>{obj.colorName}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Best Selling
                </label>
                <select
                  onChange={getValueSetvalue}
                  name="prodcutBestSelling"
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  <option
                    value="1"
                    selected={formValue.prodcutBestSelling == true}
                  >
                    Yes
                  </option>
                  <option
                    value="0"
                    selected={formValue.prodcutBestSelling == false}
                  >
                    No
                  </option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Upsell
                </label>
                <select
                  name="prodcutIsUpsell"
                  onChange={getValueSetvalue}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3"
                >
                  <option value="">Nothing Selected</option>
                  <option
                    value="1"
                    selected={formValue.prodcutIsUpsell == true}
                  >
                    Yes
                  </option>
                  <option
                    value="0"
                    selected={formValue.prodcutIsUpsell == false}
                  >
                    No
                  </option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  type="text"
                  name="productSalePrice"
                  value={formValue.productSalePrice}
                  onChange={getValueSetvalue}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=" Sale Price"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  type="text"
                  name="productOrder"
                  onChange={getValueSetvalue}
                  value={formValue.productOrder}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Order"
                />
              </div>
            </div>
          </div>

          <div className="py-[40px]">
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="h-[200px]"
            />
          </div>

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateId ? "Update Product " : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
