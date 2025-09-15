"use client";

import { useRouter } from "next/navigation";

import Button from "@/common/Button";
import { Product } from "@/models/product.model";

export const SecondColumn = ({ item }: { item: Product }) => {
    const { price, stock, createdAt } = item;
    const router = useRouter();

    return (
        <div className="sm:flex sm:flex-col sm:items-center sm:text-center space-y-4 min-w-[140px]">
            <div className="flex flex-col">
                <span className="font-bold text-green-600 text-3xl">{price.toLocaleString()}₺</span>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <span
                        className={`font-semibold text-sm ${
                            stock > 10
                                ? "text-green-600"
                                : stock > 0
                                ? "text-yellow-600"
                                : "text-red-600"
                        }`}
                    >
                        {stock > 0 ? `${stock} in stock` : "Out of stock"}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 mb-1">Listed date</span>
                    <span className="text-gray-600 font-medium text-xs">
                        {new Date(createdAt).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>
            <Button
                onClick={() => router.push(`/product/${item._id}`)}
                customClassName="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer"
                label="View Details"
            />
        </div>
    );
};
