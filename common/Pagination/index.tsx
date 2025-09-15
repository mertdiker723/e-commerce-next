import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { generatePageNumbers } from "@/helpers/helperMethods";

interface PaginationProps {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    loading?: boolean;
    className?: string;
    pageParam?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    totalItems,
    itemsPerPage,
    loading = false,
    className = "",
    pageParam = "page",
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get(pageParam) || "1", 10);

    const startItem = (currentPage - 1) * itemsPerPage + 1;

    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    const pageNumbers = generatePageNumbers(currentPage, totalPages);

    const updateURL = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            params.delete(pageParam);
        } else {
            params.set(pageParam, page.toString());
        }

        const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
        router.push(newURL, { scroll: false });
    };

    const handlePrevious = () => {
        if (currentPage > 1 && !loading) {
            updateURL(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages && !loading) {
            updateURL(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage && !loading) {
            updateURL(page);
        }
    };

    if (totalPages <= 1 && totalItems === 0) {
        return null;
    }

    return (
        <div
            className={`flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 ${className}`}
        >
            {/* Mobile pagination */}
            <div className="flex flex-1 justify-between items-center sm:hidden">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1 || loading}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                    Previous
                </button>

                <div className="flex flex-col items-center text-sm text-gray-700">
                    <span className="font-medium text-gray-900">
                        {currentPage} / {totalPages}
                    </span>
                    <span className="text-xs text-gray-500">Page</span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages || loading}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                    Next
                </button>
            </div>

            {/* Desktop pagination */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium text-gray-900">{startItem}</span> to{" "}
                        <span className="font-medium text-gray-900">{endItem}</span> of{" "}
                        <span className="font-medium text-gray-900">{totalItems}</span> results
                    </p>
                </div>

                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
                    >
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1 || loading}
                            className="relative inline-flex items-center rounded-l-lg px-3 py-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {pageNumbers.map((pageNumber, index) => {
                            if (pageNumber === "...") {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const isCurrentPage = pageNumber === currentPage;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageClick(pageNumber as number)}
                                    disabled={loading}
                                    aria-current={isCurrentPage ? "page" : undefined}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-all duration-200 disabled:cursor-not-allowed focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        isCurrentPage
                                            ? "z-10 bg-blue-600 text-white border-blue-600 shadow-sm"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400"
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages || loading}
                            className="relative inline-flex items-center rounded-r-lg px-3 py-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
