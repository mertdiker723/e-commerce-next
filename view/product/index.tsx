"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

// Types
import { Product } from "@/models/product.model";

// Icons
import { MapPinIcon, EnvelopeIcon, PhotoIcon } from "@heroicons/react/24/outline";

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const { data } = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/retailers`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        })();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {products.map((product) => {
                        const {
                            _id,
                            image,
                            name,
                            description,
                            price,
                            createdAt,
                            brand,
                            category,
                            stock,
                            createdBy,
                        } = product;

                        const { thumbnailUrl } = image || {};
                        const { businessName, district, email, neighborhood, province } =
                            createdBy || {};

                        const { name: brandName } = brand || {};
                        const { name: categoryName } = category || {};
                        const { name: districtName } = district || {};
                        const { name: neighborhoodName } = neighborhood || {};
                        const { name: provinceName } = province || {};

                        return (
                            <div
                                key={_id}
                                className="flex justify-between gap-x-4 p-6 hover:bg-gray-50 transition-colors duration-200 group"
                            >
                                <div className="flex gap-x-5 min-w-0">
                                    {/* Product Image */}
                                    <div className="relative">
                                        {thumbnailUrl ? (
                                            <Image
                                                src={thumbnailUrl}
                                                alt={name || "Product image"}
                                                width={80}
                                                height={80}
                                                className="w-20 h-20 flex-none rounded-xl bg-gray-100 object-cover object-center shadow-sm ring-1 ring-gray-200"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 flex-none rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm ring-1 ring-gray-200">
                                                <PhotoIcon className="w-10 h-10 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="min-w-0 flex-auto space-y-2">
                                        {/* Business Name */}
                                        <div className="mb-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                Business Name:{" "}
                                            </span>
                                            <span className="text-sm font-medium text-blue-800 cursor-pointer">
                                                {businessName}
                                            </span>
                                        </div>

                                        {/* Product Name */}
                                        <div className="mb-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                Product Name:{" "}
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                {name}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
                                            {description}
                                        </p>

                                        {/* Category & Brand Badges */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                                                Category: {categoryName}
                                            </span>
                                            {brandName && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                                                    Brand: {brandName}
                                                </span>
                                            )}
                                        </div>

                                        {/* Location & Email */}
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPinIcon className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium">
                                                    {neighborhoodName}, {districtName},{" "}
                                                    {provinceName}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium">{email}</span>
                                            </div>
                                        </div>
                                        <PriceInfo
                                            price={price}
                                            stock={stock}
                                            createdAt={createdAt}
                                            isMobile={true}
                                        />
                                    </div>
                                </div>
                                <PriceInfo
                                    price={price}
                                    stock={stock}
                                    createdAt={createdAt}
                                    isMobile={false}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Price Info Component with clean styling
const PriceInfo = ({
    price,
    stock,
    createdAt,
    isMobile = false,
}: {
    price: number;
    stock: number;
    createdAt: string;
    isMobile?: boolean;
}) => (
    <div
        className={`${
            isMobile
                ? "block sm:hidden mt-4 pt-4 border-t border-gray-200 space-y-3"
                : "hidden sm:flex sm:flex-col sm:items-center sm:text-center space-y-4 min-w-[140px]"
        }`}
    >
        {/* Price */}
        <div className={`${isMobile ? "flex items-center justify-between" : "flex flex-col"}`}>
            <span className={`font-bold text-green-600 ${isMobile ? "text-xl" : "text-3xl"}`}>
                {price.toLocaleString()}₺
            </span>
        </div>

        {/* Stock Status & Date - Mobile: Side by side */}
        <div
            className={`${
                isMobile ? "flex items-center justify-between text-sm" : "flex flex-col space-y-4"
            }`}
        >
            <div className={`${isMobile ? "" : "flex flex-col"}`}>
                <span
                    className={`font-semibold ${
                        stock > 10
                            ? "text-green-600"
                            : stock > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                    } ${isMobile ? "text-xs" : "text-sm"}`}
                >
                    {stock > 0 ? `${stock} adet mevcut` : "Stokta yok"}
                </span>
            </div>

            <div className={`${isMobile ? "text-right" : "flex flex-col"}`}>
                {!isMobile && (
                    <span className="text-xs text-gray-400 mb-1">İlanın verildiği tarih</span>
                )}
                <span className={`text-gray-600 font-medium ${isMobile ? "text-xs" : "text-xs"}`}>
                    {new Date(createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
            Ürün Detay
        </button>
    </div>
);

export default ProductPage;
