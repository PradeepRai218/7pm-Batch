"use client";
import { getProducttabsData } from "@/app/api-services/homeServices";
import ProductCard from "@/app/common/ProductCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Tabsection({ productData }) {
  let [path, setPath] = useState(productData.path);
  let [product, setProduct] = useState(productData.data);

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const productData = async () => {
      const pData = await getProducttabsData(activeTab);
      setProduct(pData.data);
    }
    productData();
  },[activeTab])

//   useEffect(async ()=>{
//     let productData= getProducttabsData(activeTab)
//     console.log(productData);
    
//   },[activeTab])
  return (
    <section className="pt-10 pb-14 bg-white">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="flex items-center justify-center text-4xl font-bold text-black mb-12 tracking-wide gap-4">
          <span className="block w-[46%] h-[1px] bg-gradient-to-r from-[#C09578] to-[#e5b9b7]" />
          Products
          <span className="block w-[46%] h-[1px] bg-gradient-to-l from-[#C09578] to-[#e5b9b7]" />
        </h1>
        <div className="flex justify-center gap-6 mb-10">
          <button
          onClick={()=>setActiveTab(1)}
            className={`px-6 py-3 border font-semibold uppercase tracking-wide transition-all duration-300 shadow-sm
         border-black ${activeTab==1 ? 'text-[#C09578]' : ''} hover:border-[#C09578] shadow-md scale-105`}
          >
            Featured
          </button>
          <button
            onClick={()=>setActiveTab(2)}   
            className={`px-6 py-3 border font-semibold uppercase tracking-wide transition-all duration-300 shadow-sm
         border-black ${activeTab==2 ? 'text-[#C09578]' : ''} hover:border-[#C09578] shadow-md scale-105`}
          >
            New Arrivals
          </button>
          <button
            onClick={()=>setActiveTab(3)}
            className={`px-6 py-3 border font-semibold uppercase tracking-wide transition-all duration-300 shadow-sm
         border-black ${activeTab==3 ? 'text-[#C09578]' : ''} hover:border-[#C09578] shadow-md scale-105`}
          >
            On Sale
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {
            product.map((obj,index)=><ProductCardNew key={index} data={obj} path={path}/>)
          }
        </div>
      </div>
    </section>
  );
}


function ProductCardNew({path,data}){
    let {productName,_id,productPrice,productImage,productSalePrice}=data
    return(
         <div className="w-[290px] bg-white border border-gray-200 shadow-md p-3 flex flex-col items-center    hover:shadow-2xl hover:scale-105 transition-transform duration-300">
           
                <div className="relative w-full h-[230px] overflow-hidden mb-4">
                <img
                    src={path+productImage}
                    alt="Gold Necklace"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:text-[#F8F9F9] transition-all shadow-md">
                    <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                    </svg>
                </button>
                </div>
           
             <Link href={`/product/${_id}`}>
            <h2 className="text-lg font-semibold text-gray-950 mb-1 text-center">
              {productName}
            </h2>
            </Link>
            <p className="text-gray-400 text-sm mb-3 text-center">
              Elegant gold design
            </p>
            <hr className="w-[80%] border-t border-gray-300 mb-3" />
            <div className="flex items-center justify-center gap-3 mb-3">
              <p className="text-gray-400 text-sm line-through">
                ₹{/* */} {productPrice}
              </p>
              <p className="text-[#C09578] text-lg font-bold">₹{/* */}
                {productSalePrice}
              </p>
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold    hover:bg-[#b76e79] transition-all duration-300 shadow-md hover:shadow-lg">
              Add to Cart
            </button>
          </div>
    )
}