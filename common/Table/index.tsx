"use client";

import Sorting from "./filtering/SortingTable";
import SkeletonRow from "../skeleton/tableSkeleton";
import Pagination from "../Pagination";

interface TableProps<T> {
    items: T[];
    className?: string;
    FirstColumn: React.ComponentType<{ item: T }>;
    SecondColumn: React.ComponentType<{ item: T }>;
    filteringItems?: {
        searchPlaceholder?: string;
    };
    loading?: boolean;
    errorMessage?: string | null;
    totalCount: number;
    totalPages: number;
    itemsPerPage?: number;
    pageParam?: string;
}

export const Table = <T,>({
    items,
    className = "",
    FirstColumn,
    SecondColumn,
    filteringItems,
    loading = false,
    errorMessage = null,
    totalCount,
    totalPages,
    itemsPerPage = 5,
    pageParam = "page",
}: TableProps<T>) => {
    return (
        <div className={className}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    <Sorting filteringItems={filteringItems} />
                    {loading ? (
                        <SkeletonRow rowCount={10} />
                    ) : items && items.length > 0 ? (
                        items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex justify-between gap-x-4 p-6 hover:bg-gray-50 transition-colors duration-200 group">
                                        <FirstColumn item={item} />
                                        <SecondColumn item={item} />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p className="text-lg">No items found</p>
                            <p className="text-sm">
                                {errorMessage || "Try adjusting your search criteria"}
                            </p>
                        </div>
                    )}
                    <Pagination
                        totalItems={totalCount}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        loading={loading}
                        pageParam={pageParam}
                    />
                </div>
            </div>
        </div>
    );
};

export default Table;
