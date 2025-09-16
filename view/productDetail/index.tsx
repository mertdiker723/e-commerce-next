"use client";

import Image from "next/image";
import { useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import Breadcrumb, { BreadcrumbItem } from "../../common/Breadcrumb";
import { productService } from "../../services/product.service";
import { useMergeState } from "@/hooks/useMergeState";
import { Product } from "@/models/product.model";
import ProductDetailSkeleton from "@/common/skeleton/productDetailSkeleton";

type ProductDetailState = {
    product: Product;
    errorMessage: string | null;
    isLoading: boolean;
};

type ProductDetailPageProps = {
    productId: string;
};

const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
    const [state, setState] = useMergeState<ProductDetailState>({
        product: {} as Product,
        errorMessage: null,
        isLoading: true,
    });

    const { product, errorMessage, isLoading } = state || {};

    const {
        name,
        description,
        price,
        status,
        stock,
        image,
        updatedAt,
        brand,
        category,
        createdBy,
    } = product || {};

    const { url } = image || {};
    const {
        businessName,
        district,
        email,
        name: retailerName,
        neighborhood,
        openAddress,
        phoneNumber,
        province,
        surname,
    } = createdBy || {};
    
    const { name: districtName } = district || {};
    const { name: neighborhoodName } = neighborhood || {};
    const { name: provinceName } = province || {};
    const { name: brandName } = brand || {};
    const { name: categoryName } = category || {};

    useEffect(() => {
        (async () => {
            const result = await productService.getProductById(productId);
            const { data, error } = result || {};

            if (error) {
                setState({ errorMessage: error, isLoading: false });
                return;
            }
            setState({ product: data as Product, isLoading: false });
        })();
    }, [productId, setState]);

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Products", href: "/product" },
        { label: product?.name },
    ];

    if (isLoading) {
        return <ProductDetailSkeleton />;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            {url && (
                                <Image
                                    src={url}
                                    alt={name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span
                                className={`mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    status
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {status ? "Active" : "Inactive"}
                            </span>
                            <div className="flex justify-between items-center space-x-2 mb-2 mt-1">
                                <div className="text-3xl font-bold text-gray-900">{name}</div>
                                <div className="text-sm text-gray-400">
                                    {new Date(updatedAt).toLocaleDateString("tr-TR", {
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
                        </div>
                        {description && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    Description
                                </h3>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}

                        <div className="border-t border-b border-gray-200 py-4">
                            <div className="flex justify-between items-center space-x-3">
                                <span className="text-3xl font-bold text-gray-900">
                                    Price: ₺{price?.toLocaleString("tr-TR") || "0"}
                                </span>

                                <div className="flex space-x-3">
                                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <HeartIcon className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>
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

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                Seller Information
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-600">Business:</span>
                                    <span className="text-xs font-medium text-gray-900">
                                        {businessName || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-600">Contact:</span>
                                    <span className="text-xs font-medium text-gray-900">
                                        {retailerName && surname
                                            ? `${retailerName} ${surname}`
                                            : "Not specified"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-600">Email:</span>
                                    <span className="text-xs font-medium text-blue-600">
                                        {email || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-600">Phone:</span>
                                    <span className="text-xs font-medium text-blue-600">
                                        {phoneNumber || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-gray-600">Location:</span>
                                    <span className="text-xs font-medium text-gray-900">
                                        {provinceName && districtName && neighborhoodName
                                            ? `${neighborhoodName}, ${districtName}, ${provinceName}`
                                            : "Not specified"}
                                    </span>
                                </div>
                                {openAddress && (
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">Address:</span>
                                        <span className="text-xs font-medium text-gray-900">
                                            {openAddress}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
