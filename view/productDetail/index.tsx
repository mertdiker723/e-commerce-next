"use client";

import { useEffect } from "react";

// Common
import Breadcrumb, { BreadcrumbItem } from "@/common/Breadcrumb";
import ProductDetailSkeleton from "@/common/skeleton/productDetailSkeleton";

// Components
import ProductErrorMessage from "@/components/product/detail/productErrorMessage";
import ProductImage from "@/components/product/detail/productImage";
import ProductInformation from "@/components/product/detail/productInformation";
import SellerInformation from "@/components/product/detail/sellerInformation";

// Models
import { Product } from "@/models/product.model";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Services
import { productService } from "@/services/product.service";

type ProductDetailPageProps = {
    productId: string;
};

type ProductDetailState = {
    product: Product;
    errorMessage: string | null;
    isLoading: boolean;
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
                    <ProductImage url={url} name={name} />

                    <div className="space-y-6">
                        {errorMessage ? (
                            <ProductErrorMessage errorMessage={errorMessage} />
                        ) : (
                            <>
                                <ProductInformation
                                    status={status}
                                    name={name}
                                    updatedAt={updatedAt}
                                    brandName={brandName}
                                    categoryName={categoryName}
                                    description={description}
                                    price={price}
                                    stock={stock}
                                />
                                <SellerInformation
                                    businessName={businessName}
                                    retailerName={retailerName}
                                    surname={surname}
                                    email={email}
                                    phoneNumber={phoneNumber}
                                    provinceName={provinceName}
                                    districtName={districtName}
                                    neighborhoodName={neighborhoodName}
                                    openAddress={openAddress}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
