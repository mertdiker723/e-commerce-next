"use client";

import { useEffect, useMemo } from "react";
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

// Services
import { retailerService } from "@/services/retailer.services";
import { locationService } from "@/services/location.services";
import { categoryService } from "@/services/category.services";
import { brandService } from "@/services/brand.services";
import { productService } from "@/services/product.service";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Models
import { Retailer } from "@/models/retailer.model";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";
import { Province } from "@/models/province.model";
import { Product } from "@/models/product.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";
import toast from "react-hot-toast";

interface RetailerPageProps {
    retailerId: string;
}

type RetailerState = {
    retailer: Retailer;
    errorMessageDetail: string | null;
    errorMessageTable: string | null;
    isLoading: boolean;
    categories: Category[];
    brands: Brand[];
    provinces: Province[];
    districts: District[];
    neighborhoods: Neighborhood[];
    productLoader: boolean;
    products: Product[];
    totalCount: number;
    totalPages: number;
};

const RetailerPage = ({ retailerId }: RetailerPageProps) => {
    const [state, setState] = useMergeState<RetailerState>({
        retailer: {} as Retailer,
        errorMessageDetail: null,
        errorMessageTable: null,
        isLoading: true,
        categories: [],
        brands: [],
        provinces: [],
        districts: [],
        neighborhoods: [],
        productLoader: true,
        products: [],
        totalCount: 0,
        totalPages: 0,
    });

    const {
        retailer,
        errorMessageDetail,
        errorMessageTable,
        isLoading,
        categories,
        brands,
        provinces,
        districts,
        neighborhoods,
        productLoader,
        products,
        totalCount,
        totalPages,
    } = state || {};

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

    const searchParams = useSearchParams();

    const provinceId = useMemo(() => searchParams?.get("province"), [searchParams]);
    const districtId = useMemo(() => searchParams?.get("district"), [searchParams]);

    useEffect(() => {
        (async () => {
            const result = await retailerService.getRetailerById(retailerId);
            const { data, message, success } = result || {};

            if (!success) {
                setState({ errorMessageDetail: message, isLoading: false });
                return;
            }

            setState({ retailer: data as Retailer, isLoading: false });
        })();
    }, [retailerId, setState]);

    useEffect(() => {
        (async () => {
            await Promise.all([
                categoryService.getCategoriesDropdown(),
                brandService.getBrandsDropdown(),
                locationService.getProvinces(),
            ])
                .then(([categoriesData, brandsData, provincesData]) => {
                    if (!categoriesData.success) {
                        toast.error(categoriesData.message as string);
                    }
                    if (!brandsData.success) {
                        toast.error(brandsData.message as string);
                    }
                    if (!provincesData.success) {
                        toast.error(provincesData.message as string);
                    }
                    setState({
                        categories: categoriesData.data,
                        brands: brandsData.data,
                        provinces: provincesData.data,
                    });
                })
                .catch((error) => {
                    toast.error(
                        error instanceof Error ? error.message : "Failed to load filter data"
                    );
                });
        })();
    }, [setState]);

    useEffect(() => {
        (async () => {
            setState({ productLoader: true });
            if (retailerId) {
                const result = await productService.getProductsByRetailerId(
                    retailerId,
                    searchParams
                );
                if (!result.success) {
                    setState({ errorMessageTable: result.message, productLoader: false });
                    return;
                }

                setState({
                    products: result.data,
                    productLoader: false,
                    totalCount: result.totalCount,
                    totalPages: result.totalPages,
                });
            }
        })();
    }, [retailerId, searchParams, setState]);

    useEffect(() => {
        (async () => {
            if (!provinceId) {
                setState({ districts: [], neighborhoods: [] });
                return;
            }

            const { data, success, message } = await locationService.getDistricts(
                Number(provinceId)
            );

            if (!success) {
                toast.error(message as string);
                setState({ districts: [], neighborhoods: [] });
                return;
            }

            setState({ districts: data, neighborhoods: [] });
        })();
    }, [provinceId, setState]);

    useEffect(() => {
        (async () => {
            if (!districtId || !provinceId) {
                setState({ neighborhoods: [] });
                return;
            }

            const { data, success, message } = await locationService.getNeighborhoods(
                Number(districtId)
            );

            if (!success) {
                toast.error(message as string);
                setState({ neighborhoods: [] });
                return;
            }

            setState({ neighborhoods: data });
        })();
    }, [districtId, provinceId, setState]);

    const filterValues = {
        categories,
        brands,
        provinces,
        districts,
        neighborhoods,
    };

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Products", href: "/product" },
        { label: `Retailer: ${businessName}` },
    ];
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={breadcrumbItems} />

            {isLoading ? (
                <RetailerSkeleton />
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                            <RetailerImage url={image?.url} name={businessName} />
                            <div className="space-y-6">
                                {errorMessageDetail ? (
                                    <RetailerErrorMessage errorMessage={errorMessageDetail || ""} />
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
                </>
            )}

            <div className="lg:flex lg:gap-6 mt-6">
                <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
                    <Filter filterName="retailer" filterValues={filterValues} />
                </div>

                <div className="lg:flex-1">
                    <Table
                        items={products}
                        loading={productLoader}
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
