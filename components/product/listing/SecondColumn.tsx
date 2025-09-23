"use client";

import { useRouter } from "next/navigation";

import Button from "@/common/Button";
import { Product } from "@/models/product.model";

interface SecondColumnProps {
    productData: Product;
    productId: string;
    onDelete?: () => void;
}

export const SecondColumn = ({ productData, productId, onDelete }: SecondColumnProps) => {
    const router = useRouter();
    const { price, stock, createdAt } = productData || {};

    return (
        <div className="flex flex-col items-center space-y-4 min-w-[140px] md:items-center md:text-center">
            {/* Price section */}
            <div className="flex flex-col">
                <span className="font-bold text-green-600 text-2xl md:text-3xl">
                    {price?.toLocaleString()}₺
                </span>
            </div>

            {/* Stock and date info */}
            <div className="flex flex-col space-y-3 md:space-y-4">
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

                <div className="flex flex-col gap-2">
                    {createdAt && (
                        <>
                            <span className="text-xs text-gray-400 mb-1">Listed date</span>
                            <span className="text-gray-600 font-medium text-xs">
                                {new Date(createdAt).toLocaleDateString("tr-TR", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Button section - responsive layout */}
            <div className="flex flex-row gap-2 md:flex-col md:gap-3">
                <Button
                    onClick={() => router.push(`/product/${productId}`)}
                    customClassName="flex-1 md:w-35 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer"
                    label="View Details"
                />

                {onDelete && (
                    <Button
                        onClick={onDelete}
                        customClassName="flex-1 md:w-35 bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-6 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer"
                        label="Delete"
                    />
                )}
            </div>
        </div>
    );
};
