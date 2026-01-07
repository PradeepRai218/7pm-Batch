"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCart } from '@/app/redux/slice/cartSlice';
export default function SingleProduct({data}) {
    let [pData,setPData]=useState(data.productDetails)
    let token = useSelector((myAllsore) => myAllsore.userStore.token);
    let dispatch=useDispatch()
    let [qty,setQty]=useState(1)
    let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
   
    let path=data.path
    
    let addToCart=()=>{

        if(token){
            let obj={
                productId:pData._id,
                productName:pData.productName,
                productImage:path+pData.productImage,
                productPrice:pData.productSalePrice,
                productQuantity:qty,
            }
            axios.post(`${apiBaseUrl}cart/add-to-cart`,obj,{
                headers:{
                   Authorization:`Bearer ${token}`
                }
            })
            .then((res)=>res.data)
            .then((finalres)=>{
                dispatch(fetchCart())
            })
        }
        else{
            alert("Please Login")
        }
        
       
       
        
    }

    return (
        <div>
            <div>
                <>
                    {/* Breadcrumbs */}
                    <section className="bg-gray-100 py-6">
                        <div className="container mx-auto px-4">
                            <h3 className="text-2xl font-semibold mb-2">
                                Caroline Study Tables
                            </h3>
                            <ul className="flex items-center gap-2 text-sm text-gray-600">
                                <li>
                                    <Link href="/" className="hover:text-black">Home</Link>
                                </li>
                                <li>&gt;</li>
                                <li>
                                    <Link href="/categories/nest-of-tables" className="hover:text-black">
                                        Nest Of Tables
                                    </Link>
                                </li>
                                <li>&gt;</li>
                                <li className="text-black font-medium">
                                {pData.productName}
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Product Section */}
                    <section className="py-12">
                        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">

                            {/* Product Image */}
                            <div className="border rounded-lg p-4">
                                <img
                                    src={path+pData.productImage}
                                    alt="Caroline Study Tables"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto object-cover rounded"
                                />
                            </div>

                            {/* Product Info */}
                            <div>
                                <h1 className="text-3xl font-semibold mb-4">
                                {pData.productName}
                                </h1>

                                {/* Price */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-gray-400 line-through text-lg">
                                        Rs.   {pData.productPrice}
                                    </span>
                                    <span className="text-2xl font-bold text-black">
                                        Rs.  {pData.productSalePrice}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6">
                                    {data.productName}
                                </p>

                                <input type="number" min={1} max={10} onChange={(e)=>setQty(e.target.value)}  value={qty} className='border p-3' />

                                {/* Add to Cart */}
                                <button
                                    className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
                                    onClick={addToCart}
                                >
                                    Add to Cart
                                </button>

                                {/* Meta Info */}
                                <div className="mt-8 space-y-2 text-sm text-gray-700">
                                    <p><strong>Code:</strong> jodST0011</p>
                                    <p><strong>Dimension:</strong> 72L × 32H × 30W</p>
                                    <p><strong>Estimated Delivery:</strong> 40–45 Days</p>
                                    <p><strong>Category:</strong> Nest Of Tables</p>
                                    <p><strong>Color:</strong> Cobalt Blue</p>
                                    <p><strong>Material:</strong> Sheesham Wood</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Description Tab */}
                    <section className="border-t py-10">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <h2 className="text-xl font-semibold mb-4">
                                Product Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Caroline table is sure to make you travel back in time.
                                Its royal and periodic aesthetics enhance the look and feel of
                                any space. The drawer offers convenient storage and blends
                                seamlessly with the carved front. Crafted from Sheesham wood,
                                it ensures long-lasting durability.
                            </p>
                        </div>
                    </section>
                </>

            </div>
        </div>
    )
}
