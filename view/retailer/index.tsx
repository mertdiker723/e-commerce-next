"use client";

import { useSearchParams } from "next/navigation";

// Components
import RetailerImage from "@/components/retailer/retailerImage";
import RetailerErrorMessage from "@/components/retailer/retailerErrorMessage";
import RetailerProfile from "@/components/retailer/retailerProfile";
import RetailerContact from "@/components/retailer/retailerContact";
import { FirstColumn } from "@/components/product/listing/FirstColumn";
import { SecondColumn } from "@/components/product/listing/SecondColumn";

// Common
import Breadcrumb, { BreadcrumbItem } from "@/common/Breadcrumb";
import RetailerSkeleton from "@/common/skeleton/retailerSkeleton";
import Filter from "@/common/Filter";
import { Table } from "@/common/Table";

// Hooks
import { useProvinces } from "@/lib/react-query/hooks/location/useProvinces";
import { useCategories } from "@/lib/react-query/hooks/category/useCategories";
import { useBrands } from "@/lib/react-query/hooks/brand/useBrands";
import { useSubCategories } from "@/lib/react-query/hooks/subCategory/useSubCategories";
import { useDistricts } from "@/lib/react-query/hooks/location/useDistricts";
import { useNeighborhoods } from "@/lib/react-query/hooks/location/useNeighborhoods";
import { useRetailerById } from "@/lib/react-query/hooks/retailerById/useRetailerById";
import { useProductByRetailerId } from "@/lib/react-query/hooks/productByRetailerId/useProductByRetailerId";

// Models
import { Retailer } from "@/models/retailer.model";
import { Product } from "@/models/product.model";

interface RetailerPageProps {
    retailerId: string;
}

const RetailerPage = ({ retailerId }: RetailerPageProps) => {
    const searchParams = useSearchParams();

    const provinceId = searchParams?.get("province");
    const districtId = searchParams?.get("district");
    const categoryId = searchParams?.get("category");

    // React Query hooks
    const { data: provincesData } = useProvinces();
    const provinces = provincesData?.data || [];

    const { data: districtsData } = useDistricts(provinceId);
    const districts = districtsData?.data || [];

    const { data: neighborhoodsData } = useNeighborhoods(provinceId, districtId);
    const neighborhoods = neighborhoodsData?.data || [];

    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.data || [];

    const { data: brandsData } = useBrands(categoryId as string);
    const brands = brandsData?.data || [];

    const { data: subCategoriesData } = useSubCategories(categoryId as string);
    const subCategories = subCategoriesData?.data || [];

    const { data: retailerData, isLoading: retailerLoading } = useRetailerById(retailerId);
    const retailer = retailerData?.data as Retailer;

    const { data: productsData, isLoading: productsLoading } = useProductByRetailerId(
        retailerId,
        searchParams as URLSearchParams
    );
    const products = productsData?.data || [];
    const totalCount = productsData?.totalCount || 0;
    const totalPages = productsData?.totalPages || 0;
    const errorMessageTable = productsData?.message || null;

    const {
        businessName,
        name,
        surname,
        email,
        image,
        phoneNumber,
        openAddress,
        province,
        district,
        neighborhood,
    } = retailer || {};

    const filterValues = {
        categories,
        brands,
        provinces,
        districts,
        neighborhoods,
        subCategories,
    };

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Products", href: "/product" },
        { label: `Retailer: ${businessName || "-"}` },
    ];
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={breadcrumbItems} />

            {retailerLoading ? (
                <RetailerSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                        <RetailerImage url={image?.url} name={businessName} />
                        <div className="space-y-6">
                            {!retailerData?.success ? (
                                <RetailerErrorMessage errorMessage={retailerData?.message || ""} />
                            ) : (
                                <>
                                    <RetailerProfile
                                        businessName={businessName}
                                        name={name}
                                        surname={surname}
                                    />

                                    <RetailerContact
                                        email={email}
                                        phoneNumber={phoneNumber}
                                        openAddress={openAddress}
                                        province={province}
                                        district={district}
                                        neighborhood={neighborhood}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="lg:flex lg:gap-6 mt-6">
                <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
                    <Filter filterName="retailer" filterValues={filterValues} />
                </div>

                <div className="lg:flex-1">
                    <Table
                        items={products}
                        loading={productsLoading}
                        errorMessage={errorMessageTable}
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

export default RetailerPage;
