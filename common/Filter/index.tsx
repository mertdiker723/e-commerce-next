"use client";

import { useState } from "react";

// Common
import SelectBox from "../SelectBox";

// Types
import { Retailer } from "@/models/retailer.model";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";

// Icons
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Input from "@/common/Input/input";
import Checkbox from "../Checkbox";

const Filter = ({
    retailers,
    categories,
    brands,
}: {
    retailers: Retailer[];
    categories: Category[];
    brands: Brand[];
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [stockStatus, setStockStatus] = useState<string>("");

    const handleStockStatusChange = (value: string) => {
        setStockStatus(value === stockStatus ? "" : value);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="lg:hidden p-4 border-b border-gray-200">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <ChevronDownIcon
                        className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>
            </div>

            <div className="hidden lg:block p-6 lg:pb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>

            <div
                className={`lg:block overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-100" : "max-h-0 opacity-0"
                } lg:opacity-100`}
            >
                <div className="p-4 lg:p-6 lg:pt-0">
                    <div className="mb-3 lg:mb-4">
                        <Input
                            label="Search"
                            placeholder="Search"
                            type="text"
                            id="search"
                            name="search"
                        />
                    </div>
                    <div className="mb-3 lg:mb-4">
                        <SelectBox
                            label="Retailers"
                            placeholder="Select a retailer"
                            options={retailers.map((retailer) => ({
                                label: retailer.businessName,
                                value: retailer._id,
                            }))}
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
                        />
                    </div>

                    <div className="mb-3 lg:mb-4">
                        <div className="block text-sm font-medium text-gray-700 mb-3">
                            Stock Status
                        </div>

                        <div className="mb-3 lg:mb-4">
                            <Checkbox
                                id="inStock"
                                name="stockStatus"
                                checked={stockStatus === "inStock"}
                                onChange={() => handleStockStatusChange("inStock")}
                                label="In Stock"
                            />
                        </div>

                        <div className="mb-3 lg:mb-4">
                            <Checkbox
                                id="outOfStock"
                                name="stockStatus"
                                checked={stockStatus === "outOfStock"}
                                onChange={() => handleStockStatusChange("outOfStock")}
                                label="Out of Stock"
                            />
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 lg:py-3 px-4 rounded-lg transition-colors">
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
