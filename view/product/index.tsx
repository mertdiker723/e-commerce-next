"use client";

import { useSearchParams } from "next/navigation";

// Common
import { Table } from "@/common/Table";
import Filter from "@/common/Filter";

// Components
import { FirstColumn } from "@/components/product/listing/FirstColumn";
import { SecondColumn } from "@/components/product/listing/SecondColumn";

// Types
import { Product } from "@/models/product.model";

// Hooks
import { useProvinces } from "@/lib/react-query/hooks/location/useProvinces";
import { useCategories } from "@/lib/react-query/hooks/category/useCategories";
import { useBrands } from "@/lib/react-query/hooks/brand/useBrands";
import { useSubCategories } from "@/lib/react-query/hooks/subCategory/useSubCategories";
import { useDistricts } from "@/lib/react-query/hooks/location/useDistricts";
import { useNeighborhoods } from "@/lib/react-query/hooks/location/useNeighborhoods";
import { useRetailers } from "@/lib/react-query/hooks/retailer/useRetailer";
import { useProducts } from "@/lib/react-query/hooks/product/useProduct";

const ProductPage = () => {
    const searchParams = useSearchParams();

    const categoryId = searchParams?.get("category") as string;
    const provinceId = searchParams?.get("province") as string;
    const districtId = searchParams?.get("district") as string;

    // React Query hooks
    const { data: provincesData } = useProvinces();
    const provinces = provincesData?.data || [];

    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.data || [];

    const { data: brandsData } = useBrands(categoryId);
    const brands = brandsData?.data || [];

    const { data: subCategoriesData } = useSubCategories(categoryId);
    const subCategories = subCategoriesData?.data || [];

    const { data: districtsData } = useDistricts(provinceId);
    const districts = districtsData?.data || [];

    const { data: neighborhoodsData } = useNeighborhoods(provinceId, districtId);
    const neighborhoods = neighborhoodsData?.data || [];

    const { data: retailersData } = useRetailers();
    const retailers = retailersData?.data || [];

    const { data: productsData, isLoading } = useProducts(searchParams);
    const products = productsData?.data || [];
    const errorMessage = productsData?.message || null;
    const totalCount = productsData?.totalCount || 0;
    const totalPages = productsData?.totalPages || 0;

    const filterValues = {
        retailers,
        categories,
        brands,
        provinces,
        districts,
        neighborhoods,
        subCategories,
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
                <p className="text-gray-600">Browse products from local businesses</p>
            </div>

            <div className="lg:flex lg:gap-6">
                <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
                    <Filter filterName="product" filterValues={filterValues} />
                </div>

                <div className="lg:flex-1">
                    <Table
                        items={products}
                        loading={isLoading}
                        errorMessage={errorMessage}
                        filteringItems={{ searchPlaceholder: "Search by product name" }}
                        FirstColumn={(props: { item: Product }) => (
                            <FirstColumn productData={props.item} />
                        )}
                        SecondColumn={(props: { item: Product }) => (
                            <SecondColumn productData={props.item} productId={props.item._id} />
                        )}
                        totalCount={totalCount}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
