"use client";

import Image from "next/image";
import { MapPinIcon, EnvelopeIcon, PhotoIcon } from "@heroicons/react/24/outline";

import { Product } from "@/models/product.model";
import Link from "next/link";

interface FirstColumnProps {
    productData: Product;
    favoriteCreatedAt?: string | Date;
}

export const FirstColumn = ({ productData, favoriteCreatedAt }: FirstColumnProps) => {
    const { image, name, description, brand, category, createdBy } = productData || {};

    const { thumbnailUrl } = image || {};
    const {
        businessName,
        district,
        neighborhood,
        province,
        email,
        _id: retailerId,
    } = createdBy || {};

    const { name: brandName } = brand || {};
    const { name: categoryName } = category || {};
    const { name: districtName } = district || {};
    const { name: neighborhoodName } = neighborhood || {};
    const { name: provinceName } = province || {};

    return (
        <div className="flex gap-x-5 min-w-0">
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

            <div className="min-w-0 flex-auto space-y-2">
                <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Product Name: </span>
                    <span className="text-xl font-bold text-gray-900">{name}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">
                    {description}
                </p>

                {businessName && (
                    <div className="mb-2">
                        <span className="text-sm font-medium text-gray-700">Business Name: </span>
                        <Link
                            href={`/retailer/${retailerId}`}
                            className="text-sm font-medium text-blue-800 cursor-pointer hover:text-blue-600 hover:underline transition-all duration-200"
                        >
                            {businessName}
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                    {categoryName && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                            Category: {categoryName}
                        </span>
                    )}
                    {brandName && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                            Brand: {brandName}
                        </span>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                    {neighborhoodName && districtName && provinceName && (
                        <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">
                                {neighborhoodName}, {districtName}, {provinceName}
                            </span>
                        </div>
                    )}

                    {email && (
                        <div className="flex items-center gap-1">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{email}</span>
                        </div>
                    )}
                </div>
                {favoriteCreatedAt && (
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-blue-600 font-bold bg-gray-200 px-2 py-1 rounded-md ">
                            Favorite added at:{" "}
                            {new Date(favoriteCreatedAt).toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
