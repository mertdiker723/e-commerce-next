"use client";

import Input from "@/common/Input/input";
import SelectBox from "@/common/SelectBox";
import { Retailer } from "@/models/retailer.model";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";
import { Province } from "@/models/province.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";
import Checkbox from "@/common/Checkbox";
import { useMergeState } from "@/hooks/useMergeState";

type ProductFilterState = {
    stockStatus: string;
};

const ProductFilter = ({
    filterValues,
    handleFilter,
}: {
    filterValues: {
        retailers: Retailer[];
        categories: Category[];
        brands: Brand[];
        provinces: Province[];
        districts: District[];
        neighborhoods: Neighborhood[];
        handleProvinceChange?: (value: string | number) => void;
        handleDistrictChange?: (value: string | number) => void;
        handleFilter?: (entries: Record<string, string | null>) => void;
    };
    handleFilter: (entries: Record<string, string | null>) => void;
}) => {
    const {
        retailers,
        categories,
        brands,
        provinces,
        districts,
        neighborhoods,
        handleProvinceChange = () => {},
        handleDistrictChange = () => {},
    } = filterValues || {};

    const [state, setState] = useMergeState<ProductFilterState>({
        stockStatus: "",
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams) {
            setState({ stockStatus: searchParams.get("stockStatus") || "" });
        }
    }, [searchParams, setState]);

    const handleStockStatusChange = (value: string) => {
        const newValue = value === state.stockStatus ? "" : value;

        setState({ stockStatus: newValue });
        handleFilter({ stockStatus: newValue });
    };

    return (
        <>
            <div className="mb-3 lg:mb-4">
                <Input label="Search" placeholder="Search" type="text" id="search" name="search" />
            </div>

            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Retailers"
                    placeholder="Select a retailer"
                    options={retailers.map((retailer) => ({
                        label: retailer.businessName,
                        value: retailer._id,
                    }))}
                    value={searchParams.get("retailer") || ""}
                    onChange={(value) => handleFilter({ retailer: value as string })}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Categories"
                    placeholder="Select a category"
                    options={categories.map((category) => ({
                        label: category.name,
                        value: category._id,
                    }))}
                    value={searchParams.get("category") || ""}
                    onChange={(value) => handleFilter({ category: value as string })}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Brands"
                    placeholder="Select a brand"
                    options={brands.map((brand) => ({
                        label: brand.name,
                        value: brand._id,
                    }))}
                    value={searchParams.get("brand") || ""}
                    onChange={(value) => handleFilter({ brand: value as string })}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Provinces"
                    placeholder="Select a province"
                    options={provinces.map((province) => ({
                        label: province.name,
                        value: province._id,
                    }))}
                    value={searchParams.get("province") || ""}
                    onChange={(value) => {
                        handleFilter({
                            province: value as string,
                            district: null,
                            neighborhood: null,
                        });
                        handleProvinceChange(value as number);
                    }}
                    onClearChange={() => {
                        handleFilter({
                            province: null,
                            district: null,
                            neighborhood: null,
                        });
                    }}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Districts"
                    placeholder="Select a district"
                    options={districts.map((district) => ({
                        label: district.name,
                        value: district._id,
                    }))}
                    value={searchParams.get("district") || ""}
                    onChange={(value) => {
                        handleFilter({
                            district: value as string,
                            neighborhood: null,
                        });
                        handleDistrictChange(value as number);
                    }}
                    onClearChange={() => {
                        handleFilter({
                            district: null,
                            neighborhood: null,
                        });
                    }}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Neighborhoods"
                    placeholder="Select a neighborhood"
                    options={neighborhoods.map((neighborhood) => ({
                        label: neighborhood.name,
                        value: neighborhood._id,
                    }))}
                    value={searchParams.get("neighborhood") || ""}
                    onChange={(value) => handleFilter({ neighborhood: value as string })}
                    onClearChange={() => {
                        handleFilter({ neighborhood: null });
                    }}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <div className="block text-sm font-medium text-gray-700 mb-3">Stock Status</div>

                <div className="mb-3 lg:mb-4">
                    <Checkbox
                        id="inStock"
                        name="stockStatus"
                        checked={state.stockStatus === "inStock"}
                        onChange={() => handleStockStatusChange("inStock")}
                        label="In Stock"
                    />
                </div>

                <div className="mb-3 lg:mb-4">
                    <Checkbox
                        id="outOfStock"
                        name="stockStatus"
                        checked={state.stockStatus === "outOfStock"}
                        onChange={() => handleStockStatusChange("outOfStock")}
                        label="Out of Stock"
                    />
                </div>
            </div>
        </>
    );
};

export default ProductFilter;
