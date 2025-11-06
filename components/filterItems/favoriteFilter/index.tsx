"use client";

import { useSearchParams } from "next/navigation";

// Common
import SelectBox from "@/common/SelectBox";
import Checkbox from "@/common/Checkbox";

// Models
import { Retailer } from "@/models/retailer.model";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";
import { StockStatus } from "@/types/general.enum";
import { SubCategory } from "@/models/subCategory.model";

// Hooks

const FavoriteFilter = ({
    filterValues,
    handleFilter,
}: {
    filterValues: {
        retailers: Retailer[];
        categories: Category[];
        brands: Brand[];
        subCategories: SubCategory[];
    };
    handleFilter: (entries: Record<string, string | null>) => void;
}) => {
    const { retailers, categories, brands, subCategories } = filterValues || {};

    const searchParams = useSearchParams();

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
                    onClearChange={() => {
                        handleFilter({ retailer: null });
                    }}
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
                    onClearChange={() => {
                        handleFilter({ category: null, subCategory: null, brand: null });
                    }}
                />
            </div>
            <div className="mb-3 lg:mb-4">
                <SelectBox
                    label="Sub Categories"
                    placeholder="Select a sub category"
                    options={subCategories.map((subCategory) => ({
                        label: subCategory.name,
                        value: subCategory._id,
                    }))}
                    value={searchParams.get("subCategory") || ""}
                    onChange={(value) => handleFilter({ subCategory: value as string })}
                    onClearChange={() => {
                        handleFilter({ subCategory: null });
                    }}
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
                    onClearChange={() => {
                        handleFilter({ brand: null });
                    }}
                />
            </div>

            <div className="mb-3 lg:mb-4">
                <div className="block text-sm font-medium text-gray-700 mb-3">Stock Status</div>

                <div className="mb-3 lg:mb-4">
                    <Checkbox
                        id={StockStatus.IN_STOCK}
                        name="stockStatus"
                        checked={searchParams.get("stockStatus") === StockStatus.IN_STOCK}
                        onChange={() => {
                            const currentValue = searchParams.get("stockStatus");
                            handleFilter({
                                stockStatus:
                                    currentValue === StockStatus.IN_STOCK
                                        ? null
                                        : StockStatus.IN_STOCK,
                            });
                        }}
                        label="In Stock"
                    />
                </div>

                <div className="mb-3 lg:mb-4">
                    <Checkbox
                        id={StockStatus.OUT_OF_STOCK}
                        name="stockStatus"
                        checked={searchParams.get("stockStatus") === StockStatus.OUT_OF_STOCK}
                        onChange={() => {
                            const currentValue = searchParams.get("stockStatus");
                            handleFilter({
                                stockStatus:
                                    currentValue === StockStatus.OUT_OF_STOCK
                                        ? null
                                        : StockStatus.OUT_OF_STOCK,
                            });
                        }}
                        label="Out of Stock"
                    />
                </div>
            </div>
        </>
    );
};

export default FavoriteFilter;
