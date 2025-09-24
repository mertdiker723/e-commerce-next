"use client";

import { HeartIcon } from "@heroicons/react/24/outline";

// Common
import Button from "@/common/Button";

// Services
import { favoriteService } from "@/services/favorite.service";
import { useMergeState } from "@/hooks/useMergeState";

type ProductInformationProps = {
    status?: boolean;
    name?: string;
    updatedAt?: string;
    brandName?: string;
    categoryName?: string;
    description?: string | null;
    price?: number;
    stock?: number;
    productId?: string;
    isFavorited?: boolean;
};

const ProductInformation = ({
    status,
    name,
    updatedAt,
    brandName,
    categoryName,
    description,
    price,
    stock,
    productId,
    isFavorited,
}: ProductInformationProps) => {
    const [state, setState] = useMergeState({
        message: null as string | null,
        isFavorited: isFavorited,
    });

    const { isFavorited: isFavoritedState } = state || {};

    const { message } = state || {};

    const handleAddFavorite = async () => {
        if (!productId) return;
        const { message, success } = await favoriteService.addFavorite(productId);
        if (success) {
            setState({ isFavorited: true });
        }
        setState({ message: message });
    };
    return (
        <>
            <span
                className={`mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
                {status ? "Active" : "Inactive"}
            </span>
            <div className="flex justify-between items-center space-x-2 mb-2 mt-1">
                <div className="text-3xl font-bold text-gray-900">{name || "--"}</div>
                <div className="text-sm text-gray-400">
                    {new Date(updatedAt || "").toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>
            <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Brand:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {brandName}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {categoryName}
                    </span>
                </div>
            </div>

            {description && (
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-xs text-gray-700 leading-relaxed">{description}</p>
                </div>
            )}

            <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                        Price: ₺{price?.toLocaleString("tr-TR") || "--"}
                    </span>

                    <div className="flex items-center space-x-3">
                        <div className="text-sm text-gray-600">Add Favorite:</div>
                        <Button
                            customClassName={`p-3 border rounded-lg transition-all duration-150 ${
                                isFavoritedState
                                    ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-75"
                                    : "border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 active:bg-blue-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transform"
                            }`}
                            icon={
                                <HeartIcon
                                    className={`w-6 h-6 transition-colors ${
                                        isFavoritedState ? "text-gray-500" : "text-blue-600"
                                    }`}
                                />
                            }
                            onClick={handleAddFavorite}
                            disabled={isFavoritedState}
                        />
                    </div>
                </div>
                {message && <div className="flex justify-end text-blue-600">{message}</div>}
            </div>

            <div className="flex items-center space-x-2">
                <div
                    className={`w-3 h-3 rounded-full ${
                        stock && stock > 0 ? "bg-green-400" : "bg-red-400"
                    }`}
                ></div>
                <span className="text-sm text-gray-700">
                    {stock && stock > 0 ? `In stock: ${stock} items` : "Out of stock"}
                </span>
            </div>
        </>
    );
};

export default ProductInformation;
