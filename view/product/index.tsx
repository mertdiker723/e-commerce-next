"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Common
import { Table } from "@/common/Table";
import Filter from "@/common/Filter";

// Components
import { FirstColumn } from "@/components/product/table/FirstColumn";
import { SecondColumn } from "@/components/product/table/SecondColumn";

// Types
import { Product } from "@/models/product.model";
import { Retailer } from "@/models/retailer.model";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Services
import { productService } from "@/services/product.service";

// Models
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";
import { Province } from "@/models/province.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";

type ProductState = {
    products: Product[];
    retailers: Retailer[];
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

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const [retailersData, categoriesData, brandsData, provincesData] =
                    await Promise.all([
                        await productService.getRetailers(),
                        await productService.getCategories(),
                        await productService.getBrands(),
                        await productService.getProvinces(),
                    ]);

                setState({
                    retailers: retailersData,
                    categories: categoriesData,
                    brands: brandsData,
                    provinces: provincesData,
                });
            } catch (error) {
                console.error("Data loading error:", error);
            }
        };

        loadAllData();
    }, [setState]);

    useEffect(() => {
        (async () => {
            setState({ productLoader: true });
            const result = await productService.getProducts(searchParams);
            if (result.error) {
                setState({ errorMessage: result.error });
            }

            console.log(result);

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
            const provinceId = searchParams?.get("province");
            const districtId = searchParams?.get("district");

            if (provinceId) {
                const districts = await productService.getDistricts(Number(provinceId));
                setState({ districts, neighborhoods: [] });

                if (districtId) {
                    const neighborhoods = await productService.getNeighborhoods(Number(districtId));
                    setState({ neighborhoods });
                }
            }
        })();
    }, [searchParams, setState]);

    // get districts
    const handleProvinceChange = async (provinceId: string | number) => {
        if (provinceId) {
            const districts = await productService.getDistricts(Number(provinceId));
            setState({ districts, neighborhoods: [] });
            return;
        }
        setState({ districts: [], neighborhoods: [] });
    };

    // get neighborhoods
    const handleDistrictChange = async (districtId: string | number) => {
        if (districtId) {
            const neighborhoods = await productService.getNeighborhoods(Number(districtId));
            setState({ neighborhoods });
            return;
        }
        setState({ neighborhoods: [] });
    };

    const filterValues = {
        retailers: retailers,
        categories: categories,
        brands: brands,
        provinces: provinces,
        districts: districts,
        neighborhoods: neighborhoods,
        handleProvinceChange: handleProvinceChange,
        handleDistrictChange: handleDistrictChange,
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
                        FirstColumn={FirstColumn}
                        SecondColumn={SecondColumn}
                        totalCount={totalCount}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
