"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Icons
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Components
import ProductFilter from "@/components/filterItems/productFilter";
import Button from "../Button";
import FavoriteFilter from "@/components/filterItems/favoriteFilter";

const Filter = ({
    filterName,
    filterValues,
}: {
    filterName: string;
    filterValues: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (keyOrEntries: Record<string, string | null>): void => {
        const params = new URLSearchParams(searchParams);

        for (const [key, val] of Object.entries(keyOrEntries)) {
            if (val && val !== "") {
                params.set(key, val);
            } else {
                params.delete(key);
            }
        }

        router.replace(`?${params.toString()}`);
    };

    const clearFilters = () => {
        const params = new URLSearchParams();
        router.replace(`?${params.toString()}`);
    };

    const filterItems = {
        product: <ProductFilter filterValues={filterValues} handleFilter={handleFilter} />,
        favorite: <FavoriteFilter filterValues={filterValues} handleFilter={handleFilter} />,
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
                    {filterItems[filterName as keyof typeof filterItems] || null}
                    {searchParams.toString() && (
                        <Button
                            customClassName="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 lg:py-3 px-4 rounded-lg transition-colors"
                            label="Clear Filters"
                            onClick={clearFilters}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;
