import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChromePicker } from "react-color";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { Axios } from "axios";

import { ToastContainer, toast } from "react-toastify";
export default function AddColor() {
  let apiBaseUrl = import.meta.env.VITE_APIBASE;

  let [formValue, setFormValue] = useState({
    colorName: "",
    colorCode: "",
    colorOrder: "",
  });

  const [color, setColor] = useState("#000000");

  const { id } = useParams(); //

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    let obj = {
      colorName: e.target.colorName.value,
      colorCode: e.target.colorCode.value,
      colorOrder: e.target.colorOrder.value, //1
    };

    if (id) {
        axios
        .put(`${apiBaseUrl}/color/update/${id}`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);
            setTimeout(() => {
              navigate("/color/view");
            }, 2000);
          } else {
            toast.error(finalRes.error.colorName);
          }
          // finalRes._status  == True
        });

    } else {
      axios
        .post(`${apiBaseUrl}/color/create`, obj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);
            setTimeout(() => {
              navigate("/color/view");
            }, 2000);
          } else {
            toast.error(finalRes.error.colorName);
          }
          // finalRes._status  == True
        });
    }
  };

  let getValueSetvalue = (e) => {
    let oldObj = { ...formValue };
    let inputName = e.target.name; //colorName
    let inputValue = e.target.value;
    oldObj[inputName] = inputValue;
    setFormValue(oldObj);
  };

  useEffect(() => {
    //First Input blank
    setFormValue({
      colorCode: "",
      colorName: "",
      colorOrder: "",
    });
    if (id) {
      axios
        .get(`${apiBaseUrl}/color/get-details/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          let { colorCode, colorName, colorOrder } = finalRes.data;
          setFormValue({
            colorCode,
            colorName,
            colorOrder,
          });
        });
    }
  }, [id]);

  console.log(formValue);

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
          {id ? "Update Color" : "Add Colors"}
        </h3>

        <form
          onSubmit={onSubmit}
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
        >
          {/* Color Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">
              Color Name
            </label>
            <input
              type="text"
              name="colorName"
              value={formValue.colorName}
              onChange={getValueSetvalue}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Color Name"
            />
          </div>

          {/* Color Picker */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">
              Color Picker
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formValue.colorCode}
                onChange={getValueSetvalue}
                name="colorCode"
              />
            </div>
          </div>

          {/* Color Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">
              Order
            </label>
            <input
              type="number"
              name="colorOrder"
              value={formValue.colorOrder}
              onChange={getValueSetvalue}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {id ? "Update Color" : "Add Color"}
          </button>
        </form>
      </div>
    </div>
  );
}
