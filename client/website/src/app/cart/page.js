"use client"
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/slice/cartSlice";

export default function Cart() {
    let cart = useSelector((myAllstore) => myAllstore.cartStore.cart)


    return (

        <>
            {
                cart.length >= 1 ?
                    <section className="max-w-4xl mx-auto p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

                        {/* Cart Items */}
                        <div className="space-y-4 mb-8">
                            {
                                cart.map((obj, index) => {
                                    return (
                                        <CartRow key={index} obj={obj}/>
                                    )
                                })
                            }


                        </div>

                        {/* Order Summary */}
                        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹2298</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹50</span>
                                </div>
                                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                                    <span>Total</span>
                                    <span>₹2348</span>
                                </div>
                            </div>
                            <Link href={"/checkout"}>
                                <button className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </section>
                    :
                    <section>No Data in Cart</section>

            }


        </>

    );
}


function CartRow({obj}) {
    let dispatch=useDispatch()
    let cartId=obj._id
    let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
    let changeQty=(symbol)=>{
        let currentQty= obj.productQuantity
        if(symbol=="+"){
            currentQty++
        }
        if(symbol=="-"){
            currentQty--
        }
        axios.post(`${apiBaseUrl}cart/change-qty`,{ cartId,quantity:currentQty })
        .then((res)=>res.data)
        .then((finalRes)=>{
            dispatch(fetchCart())
            alert(finalRes._message)
        })
       
    }

    let deleteCart=()=>{
        axios.post(`${apiBaseUrl}cart/delete`,{ cartId })
       .then((res)=>res.data)
        .then((finalRes)=>{
            dispatch(fetchCart())
            alert(finalRes._message)
        })
    }

    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-4">
                <div>
                    <img
                        src={obj.productImage}
                        alt="Classic White T-Shirt"
                        className="w-20 h-20 rounded-lg object-cover"
                    />
                
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            {obj.productName}
                        </h3>

                    </div>
                </div>
                 <button onClick={deleteCart}>Delete Cart</button>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={()=>changeQty("-")} className="px-3 py-1 text-gray-600">−</button>
                    <span className="px-4 text-sm font-medium">{
                        obj.productQuantity} </span>
                    <button onClick={()=>changeQty("+")} className="px-3 py-1 text-gray-600">+</button>
                </div>
                <p className="text-base font-semibold text-gray-800">₹{
                    obj.productPrice}</p>

                <p className="text-base font-semibold text-gray-800"> Total:- ₹{
                    obj.productPrice * obj.productQuantity}</p>
            </div>
        </div>
    )
}