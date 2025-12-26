"use client";
import ProductCard from "@/app/common/ProductCard";
import React, { useState } from "react";


export default function Tabsection() {
    const [activeTab, setActiveTab] = useState("featured");

    const featured = [
        { id: 1, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg", name: "Gold Necklace", desc: "Elegant gold design", price: "8999", oldPrice: 10999 },
        { id: 2, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg", name: "Diamond Ring", desc: "Shiny diamond beauty", price: "7999", oldPrice: 9999 },
        { id: 3, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620666061907Gloria%20Shoe%20Racks_.jpg", name: "Silver Bracelet", desc: "Stylish and classy", price: "4999", oldPrice: 6999 },
        { id: 4, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg", name: "Pearl Earrings", desc: "Classic pearl charm", price: "5499", oldPrice: 7499 },
        { id: 5, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg", name: "Ruby Pendant", desc: "Romantic and beautiful", price: "6999", oldPrice: 8999 },
        { id: 6, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253179270591620747711033Hardwell%20Temple%20Prayer%20Unit__.jpg", name: "Platinum Bracelet", desc: "Elegant modern design", price: "9999", oldPrice: 12499 },
        { id: 7, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg", name: "Diamond Stud Earrings", desc: "Shiny and elegant", price: "5999", oldPrice: 7999 },
        { id: 8, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253202107041620524598258Paxton%20Office%20Table__.jpg", name: "Crystal Anklet", desc: "Trendy crystal shine", price: "3999", oldPrice: 5999 },
    ];

    const newArrivals = [
        { id: 1, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg", name: "Emerald Necklace", desc: "Fresh new look", price: "8999", oldPrice: 10999 },
        { id: 2, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg", name: "Sapphire Ring", desc: "Royal and bold", price: "9999", oldPrice: 12999 },
        { id: 3, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg", name: "Rose Gold Bracelet", desc: "Stylish and elegant", price: "5499", oldPrice: 7499 },
        { id: 4, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253179270591620747711033Hardwell%20Temple%20Prayer%20Unit__.jpg", name: "Blue Topaz Pendant", desc: "Cool gemstone vibe", price: "7499", oldPrice: 9999 },
        { id: 5, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620666061907Gloria%20Shoe%20Racks_.jpg", name: "Amethyst Ring", desc: "Elegant violet tone", price: "7999", oldPrice: 9999 },
        { id: 6, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg", name: "Rose Quartz Necklace", desc: "Soft pink beauty", price: "6599", oldPrice: 8999 },
        { id: 7, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg", name: "Black Onyx Chain", desc: "Modern and bold", price: "4899", oldPrice: 6999 },
        { id: 8, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253202107041620524598258Paxton%20Office%20Table__.jpg", name: "Citrine Earrings", desc: "Bright and cheerful", price: "5999", oldPrice: 8499 },
    ];

    const onSale = [
        { id: 1, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253179270591620747711033Hardwell%20Temple%20Prayer%20Unit__.jpg", name: "Charm Bracelet", desc: "On sale now", price: "2999", oldPrice: 5999 },
        { id: 2, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg", name: "Stud Earrings", desc: "Simple elegance", price: "1999", oldPrice: 4999 },
        { id: 3, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829892944Evan%20Coffee%20Table__.jpg", name: "Silver Chain", desc: "Minimal and classic", price: "2499", oldPrice: 5999 },
        { id: 4, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg", name: "Gold Pendant", desc: "Elegant everyday wear", price: "4499", oldPrice: 8999 },
        { id: 5, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620666061907Gloria%20Shoe%20Racks_.jpg", name: "Anklet", desc: "Trendy and lightweight", price: "1599", oldPrice: 3999 },
        { id: 6, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617981904164Hrithvik%20Stool__.jpg", name: "Rose Gold Ring", desc: "Best-selling beauty", price: "1999", oldPrice: 4999 },
        { id: 7, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/16253202107041620524598258Paxton%20Office%20Table__.jpg", name: "Gemstone Bracelet", desc: "Multi-color design", price: "2999", oldPrice: 6999 },
        { id: 8, img: "https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617828302132Godfrey%20Coffee%20Table%20Set__.jpg", name: "Pearl Necklace", desc: "Vintage and elegant", price: "3999", oldPrice: 7999 },
    ];


    const data =
        activeTab === "featured"
            ? featured
            : activeTab === "newArrivals"
                ? newArrivals
                : onSale;

    return (
        <section className="pt-10 pb-14 bg-white">
            <div className="max-w-[1320px] mx-auto">
                {/* === Heading === */}
                <h1 className="flex items-center justify-center text-4xl font-bold text-black mb-12 tracking-wide gap-4">
                    <span className="block w-[46%] h-[1px] bg-gradient-to-r from-[#C09578] to-[#e5b9b7]"></span>
                    Products
                    <span className="block w-[46%] h-[1px] bg-gradient-to-l from-[#C09578] to-[#e5b9b7]"></span>
                </h1>

                {/* === Tabs === */}
                <div className="flex justify-center gap-6 mb-10">
                    {["featured", "newArrivals", "onSale"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 border font-semibold uppercase tracking-wide transition-all duration-300 shadow-sm
               ${activeTab === tab
                                    ? "bg-[#C09578] text-white border-black hover:border-[#C09578] shadow-md scale-105"
                                    : "border-black text-black hover:text-[#C09578] hover:border-[#C09578] hover:shadow-md hover:scale-105"
                                }`}
                        >
                            {tab === "featured"
                                ? "Featured"
                                : tab === "newArrivals"
                                    ? "New Arrivals"
                                    : "On Sale"}
                        </button>
                    ))}
                </div>

                {/* === Product Cards === */}
                <div className="flex flex-wrap justify-center gap-8">
                    {data.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
