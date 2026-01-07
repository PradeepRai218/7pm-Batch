"use client";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/slice/cartSlice";
import { useRazorpay } from "react-razorpay";

export default function CheckoutPage() {
  const { Razorpay } = useRazorpay();
  let cart = useSelector((myAllstore) => myAllstore.cartStore.cart);
  let token = useSelector((myAllstore) => myAllstore.userStore.token);
  console.log(cart);
  let [paymentMethod, setPaymentMethod] = useState(1);
  let finalTot = cart.reduce(
    (t, obj) => (t += obj.productPrice * obj.productQuantity),
    0
  );
  let orderQty = cart.reduce((t, obj) => (t += obj.productQuantity), 0);
  let shippingCharges = 0;
  if (finalTot < 500) {
    shippingCharges = 100;
  }
  let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
  let dispatch = useDispatch();
  let saveOrder = () => {
    let orderObj = {
      OrderID: "MONSTA" + (Math.random() * 9999).toString().slice(0, 3),
      orderItems: cart.map((obj) => {
        return {
          productQuantity: obj.productQuantity,
          productName: obj.productName,
          productImage: obj.productImage,
          productPrice: obj.productPrice,
        };
      }),
      shippingAddess: {
        firstName: "Pradeep",
        lastName: "Demo",
        Email: "pradeep@gmail.com",
        City: "jodhpur",
      },
      paymentMethod,
      orderAmount: finalTot,
      orderQty: orderQty,
      shippingCharges,
    };
    axios
      .post(`${apiBaseUrl}order/create`, orderObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          if (paymentMethod == 1) {
            dispatch(fetchCart());
          } else {
            let {razOrder}=finalRes

            const options= {
              key: "rzp_test_WAft3lA6ly3OBc",
              amount: razOrder.amount_due, // Amount in paise
              currency: "INR",
              name: "WsCubeTech",
              description: "WsCubeTech",
              order_id: razOrder.id, // Generate order_id on server
              handler: (response) => {

                console.log(response);
                //Verify
                alert("Payment Successful!");
              },
              prefill: {
                name: "Pradeep",
                email: "pradeep@gmail.com",
                contact: "9999999999",
              },
              theme: {
                color: "#F37254",
              },
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();

            // console.log(finalRes);
          }
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Details */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
                  <input
                    type="radio"
                    onClick={(e) => setPaymentMethod(e.target.value)}
                    value={1}
                    name="payment"
                    checked={paymentMethod == 1}
                  />
                  <span>Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer">
                  <input
                    type="radio"
                    value={2}
                    onClick={(e) => setPaymentMethod(e.target.value)}
                    name="payment"
                    checked={paymentMethod == 2}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3">
              {cart.map((obj, index) => {
                console.log(obj);

                return (
                  <div className="flex justify-between text-sm">
                    <span>
                      {obj.productName} | {obj.productQuantity}{" "}
                    </span>
                    <span>₹{obj.productPrice}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-sm my-5">
              <span>Total</span>
              <span>₹{finalTot}</span>
            </div>

            <button
              onClick={saveOrder}
              className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
