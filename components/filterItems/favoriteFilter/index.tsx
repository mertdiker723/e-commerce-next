"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Common
import SelectBox from "@/common/SelectBox";
import Checkbox from "@/common/Checkbox";

// Models
import { Retailer } from "@/models/retailer.model";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

type FavoriteFilterState = {
    stockStatus: string;
};

const FavoriteFilter = ({
    filterValues,
    handleFilter,
}: {
    filterValues: {
        retailers: Retailer[];
        categories: Category[];
        brands: Brand[];
        handleFilter?: (entries: Record<string, string | null>) => void;
    };
    handleFilter: (entries: Record<string, string | null>) => void;
}) => {
    const { retailers, categories, brands } = filterValues || {};

    const [state, setState] = useMergeState<FavoriteFilterState>({
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

export default FavoriteFilter;
