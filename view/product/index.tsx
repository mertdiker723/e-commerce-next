"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Common
import { Table } from "@/common/Table";
import Filter from "@/common/Filter";

// Components
import { FirstColumn } from "@/components/product/listing/FirstColumn";
import { SecondColumn } from "@/components/product/listing/SecondColumn";

// Types
import { Product } from "@/models/product.model";
import { RetailerDropdown } from "@/models/retailer.model";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Services
import { productService } from "@/services/product.service";
import { brandService } from "@/services/brand.services";
import { retailerService } from "@/services/retailer.services";
import { categoryService } from "@/services/category.services";
import { locationService } from "@/services/location.services";

// Models
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";
import { Province } from "@/models/province.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";

type ProductState = {
    products: Product[];
    retailers: RetailerDropdown[];
    categories: Category[];
    brands: Brand[];
    provinces: Province[];
    districts: District[];
    neighborhoods: Neighborhood[];
    productLoader: boolean;
    errorMessage: string | null;
    totalCount: number;
    totalPages: number;
};

const ProductPage = () => {
    const [state, setState] = useMergeState<ProductState>({
        products: [],
        retailers: [],
        categories: [],
        brands: [],
        provinces: [],
        districts: [],
        neighborhoods: [],
        productLoader: true,
        errorMessage: null,
        totalCount: 0,
        totalPages: 0,
    });

    const {
        products,
        retailers = [],
        categories = [],
        brands = [],
        provinces = [],
        districts = [],
        neighborhoods = [],
        productLoader,
        errorMessage,
        totalCount,
        totalPages,
    } = state || {};

    const searchParams = useSearchParams();

    const provinceId = useMemo(() => searchParams?.get("province"), [searchParams]);
    const districtId = useMemo(() => searchParams?.get("district"), [searchParams]);

    useEffect(() => {
        (async () => {
            await Promise.all([
                retailerService.getRetailersDropdown(),
                categoryService.getCategoriesDropdown(),
                brandService.getBrandsDropdown(),
                locationService.getProvinces(),
            ])
                .then(([retailersData, categoriesData, brandsData, provincesData]) => {
                    if (!retailersData.success) {
                        toast.error(retailersData.message as string);
                    }
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
                        retailers: retailersData.data,
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
            const result = await productService.getProducts(searchParams);
            if (!result.status) {
                setState({ errorMessage: result.message, productLoader: false });
                return;
            }

            setState({
                products: result.data,
                productLoader: false,
                totalCount: result.totalCount,
                totalPages: result.totalPages,
            });
        })();
    }, [searchParams, setState]);

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
        retailers,
        categories,
        brands,
        provinces,
        districts,
        neighborhoods,
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
                        loading={productLoader}
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
